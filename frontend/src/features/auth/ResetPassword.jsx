import React from 'react';
import { Mail, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-email');
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* Left side hero */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#5f9ea0]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-60 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c5254] via-[#2c5254]/40 to-transparent z-10"></div>
        
        <div className="relative z-20 flex flex-col justify-end p-16 h-full w-full text-white">
          <div className="flex items-center gap-2 font-bold text-xl mb-4 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 15l-10-5v5l10 5 10-5v-5l-10 5z"/>
            </svg>
            Hearth & Horizon
          </div>
          <p className="text-[1.1rem] opacity-90 max-w-[400px] leading-relaxed font-medium">
            Find your next sanctuary in the world's most curated editorial property listings.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:max-w-[600px] xl:max-w-[700px] bg-white p-8 md:p-16 flex flex-col justify-center relative min-h-screen lg:min-h-0">
        <div className="w-full max-w-[420px] mx-auto relative z-10 flex flex-col h-full justify-center">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Reset your password</h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">Email address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-gray-400" size={18} />
                <input 
                  id="email"
                  type="email" 
                  className="w-full py-3.5 pl-11 pr-4 border border-gray-300 rounded-lg text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all placeholder:text-gray-400" 
                  placeholder="name@example.com" 
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#0b57d0] hover:bg-[#0947a8] text-white rounded-lg p-3.5 text-[0.95rem] font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Send Reset Link <ArrowRight size={18} />
            </button>
          </form>

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
