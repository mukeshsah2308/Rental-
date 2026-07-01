const { poolPromise } = require('../db');

async function resetpassword(){
    const {email} = request.body || {};
    if(!email.trim()){
        return reply.status(400).send({ error: "Please enter email" });
    }
    try{
         const pool = await poolPromise;
         const result = await pool.request()
         .input('email', sql.VarChar, email.trim())
         .execute();


    }catch(err){
        console.log(err);
    }
}
module.export={resetpassword};