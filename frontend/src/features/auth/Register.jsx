import { useState } from 'react';
import { User, AtSign, Lock, BadgeCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import config from '../../config';

const { API_BASE_URL } = config;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.68 3.08.68.6 0 1.94-.78 3.53-.62 1.48.15 2.76.71 3.53 1.83-2.9 1.77-2.4 5.92.51 7.15-.69 1.81-1.63 3.08-2.65 3.93zm-3.8-14.8c.84-.96 1.41-2.26 1.25-3.48-1.12.04-2.52.74-3.38 1.73-.78.85-1.43 2.15-1.25 3.48 1.25 0 2.53-.78 3.38-1.73z" />
  </svg>
);



const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleregister = async () => {

    const trimmedForm = {
      fullname: form.fullname.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      confirmpassword: form.confirmpassword.trim(),
    };
    if (trimmedForm.password !== trimmedForm.confirmpassword) {
      toast.error('Passwords do not match')
      return;
    }
    try {
     const res = await axios.post(`${API_BASE_URL}/api/auth/register`, trimmedForm);
      toast.success("Registered successfully 🎉");
      navigate("/login");
      console.log(res.data);

    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Server is not working"
      toast.error(errorMessage);
    }
  }


  return (
    <div className="min-h-screen bg-[#f8f9fb] font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="px-8 lg:px-12 py-5 flex items-center justify-between">
        <div className="text-[#0b57d0] font-bold text-xl tracking-tight">The Sanctuary</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Explore</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Saved</a>
          <a href="#" className="hover:text-gray-900 transition-colors">About</a>
        </nav>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#0b57d0] hover:bg-[#0947a8] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Sign In
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 lg:px-12 pb-12 flex items-center justify-center">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row w-full max-w-[1280px] min-h-[760px] overflow-hidden">

          {/* Left Side: Image & Marketing */}
          <div className="relative flex-1 hidden lg:flex flex-col justify-end p-12 overflow-hidden bg-gray-900 min-h-[500px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687931-cebf55dc93c7?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07244a] via-[#07244a]/80 to-transparent z-10"></div>

            <div className="relative z-20 w-full max-w-[460px]">
              <div className="inline-flex items-center gap-1.5 bg-[#a7f3d0] text-emerald-950 px-3 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.1em] mb-6 shadow-sm">
                <CheckCircle2 size={12} strokeWidth={2.5} />
                EDITORIAL CURATION
              </div>

              <h1 className="text-[3.25rem] font-bold leading-[1.05] text-white tracking-tight mb-4">
                Find your piece of <br />
                <span className="text-[#a7f3d0]">tranquility.</span>
              </h1>

              <p className="text-[#b0c4de] text-[1.05rem] leading-relaxed mb-10 pr-4">
                Join an exclusive community where premium properties meet seamless digital concierge service.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-[#07244a] object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#07244a] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#07244a] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="User" />
                </div>
                <span className="text-white text-sm font-medium">Join 2,400+ members today</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-[600px] flex flex-col justify-center p-8 md:p-14 lg:p-16 relative">
            <div className="w-full max-w-[440px] mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h2>
              <p className="text-gray-500 text-[1rem] mb-8">
                Start your journey with The Sanctuary
              </p>

              <div className="flex gap-4 mb-8">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#f4f7fb] hover:bg-[#edf2f8] border border-blue-50/50 rounded-xl py-3.5 text-sm font-semibold text-gray-700 transition-all shadow-sm">
                  <GoogleIcon /> Google
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#f4f7fb] hover:bg-[#edf2f8] border border-blue-50/50 rounded-xl py-3.5 text-sm font-semibold text-gray-700 transition-all shadow-sm">
                  <AppleIcon /> Apple
                </button>
              </div>

              <div className="flex items-center my-6 text-gray-400 text-xs font-bold tracking-widest before:content-[''] before:flex-1 before:h-[1px] before:bg-gray-100 before:mr-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-100 after:ml-4">
                OR USE EMAIL
              </div>

              {/* Form */}
              <form onSubmit={(e) => { e.preventDefault(); handleregister() }}>
                <div className="mb-4 relative">
                  <label htmlFor="fullname" className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 text-gray-400" size={18} />
                    <input
                      id="fullname"
                      name="fullname"
                      value={form.fullname}
                      onChange={handleChange}
                      type="text"
                      className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all font-medium placeholder:text-gray-400 placeholder:font-normal shadow-sm"
                      placeholder="Johnathan Doe"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                  <div className="relative flex items-center">
                    <AtSign className="absolute left-3.5 text-gray-400" size={18} />
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all font-medium placeholder:text-gray-400 placeholder:font-normal shadow-sm"
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                    <div className="relative flex items-center group">
                      <Lock className="absolute left-3.5 text-gray-400" size={18} />
                      <input
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all font-medium placeholder:text-gray-400 placeholder:font-normal shadow-sm tracking-[0.2em]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <label htmlFor="confirmpassword" className="block text-sm font-semibold text-gray-800 mb-2">Confirm</label>
                    <div className="relative flex items-center group">
                      <BadgeCheck className="absolute left-3.5 text-gray-400" size={18} />
                      <input
                        id="confirmpassword"
                        name="confirmpassword"
                        value={form.confirmpassword}
                        onChange={handleChange}
                        type="password"
                        className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all font-medium placeholder:text-gray-400 placeholder:font-normal shadow-sm tracking-[0.2em]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-8">
                  <input id="agreeTerms" type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0b57d0] focus:ring-[#0b57d0] cursor-pointer shrink-0" required />
                  <label htmlFor="agreeTerms" className="text-xs text-gray-500 leading-snug cursor-pointer select-none">
                    I agree to the <a href="#" className="font-semibold text-[#0b57d0] hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-[#0b57d0] hover:underline">Privacy Policy</a>.
                  </label>
                </div>

                <button type="submit" className="w-full bg-[#0b57d0] hover:bg-[#0947a8] text-white rounded-xl p-4 text-base font-bold shadow-sm transition-all active:scale-[0.98]">
                  Sign Up
                </button>
              </form>

              <p className="text-center text-sm font-medium text-gray-500 mt-8">
                Already have an account? <button onClick={() => navigate('/login')} className="font-bold text-[#0b57d0] hover:underline">Sign In</button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
