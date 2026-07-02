const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const { poolPromise } = require('../db');

async function sendResetEmail(toEmail, resetLink) {
    console.log(`\n========================================\n[PASSWORD RESET LINK]: ${resetLink}\n========================================\n`);

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const host = process.env.EMAIL_HOST; // optional host
    const port = process.env.EMAIL_PORT; // optional port

    if (!user || !pass) {
        console.log("NOTE: EMAIL_USER or EMAIL_PASS not configured in .env. Reset link printed to console above.");
        return;
    }

    try {
        let transporter;
        if (host) {
            transporter = nodemailer.createTransport({
                host: host,
                port: parseInt(port) || 587,
                secure: port == 465,
                auth: { user, pass }
            });
        } else {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user, pass }
            });
        }

        const mailOptions = {
            from: `"Rental Support" <${user}>`,
            to: toEmail,
            subject: 'Reset your password - Hearth & Horizon',
            html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <h2 style="color: #0b57d0; font-weight: bold;">Hearth & Horizon Password Reset</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset for your account. Please click the button below to set a new password. This link is valid for 15 minutes.</p>
                    <div style="margin: 24px 0;">
                        <a href="${resetLink}" style="background-color: #0b57d0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
                    </div>
                    <p>If you did not request this, you can safely ignore this email.</p>
                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
                    <p style="font-size: 12px; color: #6b7280;">If the button doesn't work, copy and paste this link into your browser: <br/> <a href="${resetLink}">${resetLink}</a></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Password reset email successfully sent to: ${toEmail}`);
    } catch (err) {
        console.error("Failed to send password reset email:", err);
    }
}

async function forgotPassword(request, reply) {
    const { email } = request.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.VarChar, email.trim())
            .execute('sp_GetUserByEmail');

        if (result.recordset.length === 0) {
            // Keep user experience safe: don't reveal if account doesn't exist
            return reply.send({ message: 'If that email exists, a reset link has been sent.' });
        }

        const user = result.recordset[0];
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        await pool.request()
            .input('userId', sql.Int, user.user_id)
            .input('token', sql.VarChar, token)
            .input('expiresAt', sql.DateTime, expiresAt)
            .execute('sp_SetResetToken');

        // PREVIOUS CODE: Static hardcoded URL redirect and undefined helper call
        // const resetLink = `https://yourapp.com/reset-password?token=${token}`;
        // await sendResetEmail(user.email, resetLink);

        // UPDATED CODE: Dynamic frontend host url with correct route mapping, and implementation of sendResetEmail with console logging fallback
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${frontendUrl}/reset-password?token=${token}`;
        
        await sendResetEmail(user.email, resetLink);

        // Re-enabled devResetLink for the client redirect helper button per user request.
        const devResetLink = (process.env.NODE_ENV !== 'production' || !process.env.EMAIL_USER) ? resetLink : undefined;

        return reply.send({ 
            message: 'If that email exists, a reset link has been sent.',
            devResetLink
        });

    } catch (err) {
        request.log.error(err);
        return reply.status(500).send('Something went wrong');
    }
}

async function resetPassword(request, reply) {
    const { token, newPassword } = request.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('sp_GetUserByResetToken');

        if (result.recordset.length === 0) {
            return reply.status(400).send('Invalid or expired reset token');
        }

        const user = result.recordset[0];

        if (new Date(user.reset_token_expires) < new Date()) {
            return reply.status(400).send('Reset token has expired');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.request()
            .input('userId', sql.Int, user.user_id)
            .input('password', sql.VarChar, hashedPassword)
            .execute('sp_ResetPassword');

        return reply.send({ message: 'Password has been reset successfully' });

    } catch (err) {
        request.log.error(err);
        return reply.status(500).send('Something went wrong');
    }
}

module.exports = { forgotPassword, resetPassword };