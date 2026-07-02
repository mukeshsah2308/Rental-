import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../../config';

const { API_BASE_URL } = config;

// NOTE ON REFACTORING:
// Previously, this component (ResetPassword) functioned as Page 1 (where the user entered their email to request a reset link).
// It has now been correctly refactored as Page 2 (Enter New Password), which reads the token query parameter from the link sent to the user's email.
// The "Forgot Password" email submission form (Page 1) has been moved to a new component: `ForgotPassword.jsx`.
//
// Previous code:
// const handleSubmit = (e) => {
//   e.preventDefault();
//   navigate('/verify-email');
// };
// (The previous form only took an email field input, which didn't allow updating password or receiving verification tokens)

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMsg('No reset token found in URL. Please click the link sent to your email.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Token is missing. Cannot reset password.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Resetting password...');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        token,
        newPassword: password,
      });

      toast.success(response.data?.message || 'Password reset successfully!', { id: toastId });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error(err);
      const errorMessage = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message || err.response?.data?.error || 'Failed to reset password';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#f8f9fb]">
      {/* Left side hero */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#3b8da7]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687931-cebf55dc93c7?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b4352] via-[#1b4352]/40 to-transparent z-10"></div>
        
        <div className="relative z-20 flex flex-col justify-end p-16 h-full w-full text-white">
          <div className="flex items-center gap-2 font-bold text-xl mb-4 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 15l-10-5v5l10 5 10-5v-5l-10 5z"/>
            </svg>
            Hearth & Horizon
          </div>
          <p className="text-[1.1rem] opacity-90 max-w-[400px] leading-relaxed font-medium">
            Take back control of your access. Save and secure your sanctuary account.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:max-w-[600px] xl:max-w-[700px] bg-white p-8 md:p-16 flex flex-col justify-center relative min-h-screen lg:min-h-0">
        <div className="w-full max-w-[420px] mx-auto relative z-10 flex flex-col h-full justify-center">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Reset password</h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed">
              Please enter your new password below. Ensure it is secure and at least 6 characters long.
            </p>
          </div>

          {errorMsg ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[0.95rem] flex items-start gap-3 mb-6">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold">Reset Link Invalid</p>
                <p className="mt-1 text-sm text-red-600">{errorMsg}</p>
                <button 
                  onClick={() => navigate('/forgot-password')} 
                  className="mt-3 text-sm font-semibold underline text-red-700 hover:text-red-800 flex items-center gap-1"
                >
                  Request a new link
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">New Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-gray-400" size={18} />
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3.5 pl-11 pr-11 border border-gray-300 rounded-lg text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all placeholder:text-gray-400" 
                    placeholder="••••••••" 
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">Confirm New Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-gray-400" size={18} />
                  <input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-3.5 pl-11 pr-11 border border-gray-300 rounded-lg text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all placeholder:text-gray-400" 
                    placeholder="••••••••" 
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0b57d0] hover:bg-[#0947a8] disabled:bg-gray-400 text-white rounded-lg p-3.5 text-[0.95rem] font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? 'Resetting...' : 'Update Password'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/login')} 
              className="inline-flex items-center gap-2 font-semibold text-[#0b57d0] hover:text-[#0947a8] transition-colors text-sm"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>
          </div>
          
        </div>

        {/* Bottom secure text */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center text-xs font-bold tracking-widest text-gray-400 uppercase gap-2 items-center">
          <ShieldCheck size={16} /> Secure Authentication
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
