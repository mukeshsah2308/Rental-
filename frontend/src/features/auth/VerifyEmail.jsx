import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success('Password verified and set successfully!');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen font-sans bg-white border-[16px] border-[#eff3fc]">
      {/* Left side hero */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#3b8da7] rounded-l-[1rem]">
        {/* Using a clean minimal gradient to simulate the 3D room aesthetic from the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#80c8d8] to-[#25687d] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b4352] via-transparent to-transparent z-10 opacity-70"></div>
        
        <div className="relative z-20 flex flex-col justify-end p-16 h-full w-full text-white">
          <div className="flex items-center gap-2 font-bold text-xl mb-4 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 01-8-8c0-3.1 1.8-5.8 4.5-7.1L12 11l3.5-6.1C18.2 6.2 20 8.9 20 12a8 8 0 01-8 8z"/>
            </svg>
            Hearth & Horizon
          </div>
          <h1 className="text-[3rem] tracking-tight font-bold max-w-[400px] leading-[1.1] mb-2">
            Finding your space,<br />
            defining your future.
          </h1>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:max-w-[550px] xl:max-w-[650px] bg-white p-8 md:p-16 flex flex-col justify-center relative min-h-screen lg:min-h-0 rounded-r-[1rem]">
        <div className="w-full max-w-[400px] mx-auto relative z-10 flex flex-col h-full justify-center">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[2rem] font-bold text-gray-900 mb-4 tracking-tight">Verify password</h2>
            <p className="text-gray-500 text-[0.95rem] leading-relaxed">
              Please enter and confirm your password to complete your account setup.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                Enter Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-lg p-3.5 focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 focus:outline-none transition-all shadow-sm text-[0.95rem]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="confirmPassword">
                Re-enter Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-lg p-3.5 focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 focus:outline-none transition-all shadow-sm text-[0.95rem]"
              />
            </div>

            <button type="submit" className="w-full bg-[#0b57d0] hover:bg-[#0947a8] text-white rounded-lg p-3.5 text-[0.95rem] font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Save and Continue <ArrowRight size={18} />
            </button>
          </form>

        </div>

        {/* Bottom secure text */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center text-[0.65rem] font-bold tracking-widest text-gray-400 uppercase gap-8 items-center px-8">
          <div className="flex items-center gap-1.5"><ShieldCheck size={14} /> Secure Verification</div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600 transition-colors"><HelpCircle size={14} /> Get Help</div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
