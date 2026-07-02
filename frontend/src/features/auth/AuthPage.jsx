import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, MapPin, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider
} from '../auth/FireBase';
import config from '../../config';

const { API_BASE_URL } = config;


const AuthPage = ({ type = 'user' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAdmin = type === 'admin';

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: login.email,
        password: login.password,
      });

      if (response.data?.user?.id) {
        localStorage.setItem('userId', String(response.data.user.id));
      }
      localStorage.setItem('fullname', response.data?.user?.fullname || '');
      localStorage.setItem('email', response.data?.user?.email || login.email);

      toast.success("login successfull");
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      const errorMessage = typeof err.response?.data === 'string' 
        ? err.response.data 
        : err.response?.data?.message || err.response?.data?.error || 'Login failed';
      toast.error(errorMessage);
    }

    // console.log(login.email)
    // console.log(login.password)
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };
  // 🟢 Social Login (Google / GitHub / Facebook)
  const handleSocialLogin = async (provider) => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User:", user);

      // 🔑 Get Firebase token
      const token = await user.getIdToken();

      // 🔄 Send token to backend
      const res = await fetch(`${API_BASE_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Social login failed");
      }

      console.log("Backend:", data);

      // 💾 Store user
      if (data?.user?.id) {
        localStorage.setItem("userId", String(data.user.id));
      }
      localStorage.setItem("fullname", data?.user?.fullname || user.displayName || "");
      localStorage.setItem("email", data?.user?.email || user.email || "");

      // 🚀 Redirect
      toast.success('Signed in successfully!')
      navigate("/dashboard");

    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Popup closed by user");
      } else if (error.code === "auth/cancelled-popup-request") {
        console.log("Multiple popup requests");
      } else {
        console.error(error);
        toast.error(error?.message || "Unable to sign in with provider.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* Left side hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1f5b9d] to-[#144075] text-white p-14 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=2962&auto=format&fit=crop')] bg-cover bg-center opacity-15 mix-blend-overlay z-0"></div>

        <div className="relative z-10 font-bold text-xl">The Sanctuary</div>

        <div className="relative z-10 mt-16 flex-1 flex flex-col justify-center">
          <h1 className="text-[3.5rem] font-bold leading-[1.15] mb-6 tracking-tight">
            Find your place,<br />
            where you <span className="text-[#b3d4ff]">belong.</span>
          </h1>
          <p className="text-[1.1rem] opacity-90 max-w-[380px] leading-relaxed">
            Join a curated community of modern renters and property owners. Your journey to a better living space starts here.
          </p>
        </div>

        <div className="relative z-10 bg-white/40 backdrop-blur-md border border-white/30 p-7 rounded-xl max-w-[420px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-[#0b2240] mt-8">
          <div className="text-emerald-400 flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="italic font-medium text-base leading-relaxed mb-3">
            "The most seamless rental experience I've ever had. Truly feels like a concierge service."
          </p>
          <p className="text-sm text-[#3b5a80] font-semibold">— Sarah Jenkins, Designer</p>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:max-w-[600px] bg-white p-8 md:p-16 flex flex-col justify-center relative min-h-screen lg:min-h-0">
        <div className="w-full max-w-[420px] mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
          <p className="text-gray-500 text-[1rem] mb-10">
            {isAdmin ? "Please enter your details to sign in to your admin dashboard." : "Please enter your details to sign in to your account."}
          </p>

          <div className="flex gap-6 mb-8 border-b border-gray-200">
            <button
              className={`pb-3 font-semibold text-base relative transition-colors ${!isAdmin ? 'text-[#0b57d0]' : 'text-gray-500 hover:text-gray-900'}`}
              onClick={() => navigate('/login')}
            >
              Login
              {!isAdmin && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#0b57d0] rounded-t-sm"></div>}
            </button>
            {/* <button 
              className={`pb-3 font-semibold text-base relative transition-colors ${isAdmin ? 'text-[#0b57d0]' : 'text-gray-500 hover:text-gray-900'}`}
              onClick={() => navigate('/admin')}
            >
              Admin Login
              {isAdmin && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#0b57d0] rounded-t-sm"></div>}
            </button> */}
          </div>

          <form onSubmit={(e) => (e.preventDefault(), handleLogin())}>
            <div className="mb-5 relative">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-gray-400" size={18} />
                <input
                  id="email"
                  type="email"
                  className="w-full py-3.5 pl-11 pr-4 border border-gray-300 rounded-lg text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all placeholder:text-gray-400"
                  placeholder="name@company.com"
                  required
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-5 relative">
              <div className="flex justify-between items-center mb-2">
                {/* PREVIOUS CODE: Linked directly to /reset-password which was the Enter Email form */}
                {/* {!isAdmin && <Link to="/reset-password" ... /> */}
                {!isAdmin && <Link to="/forgot-password" className="text-sm font-semibold text-[#0b57d0] hover:underline">Forgot password?</Link>}
              </div>
              <div className="relative flex items-center group">
                <Lock className="absolute left-3.5 text-gray-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full py-3.5 pl-11 pr-11 border border-gray-300 rounded-lg text-[0.95rem] text-gray-900 focus:outline-none focus:border-[#0b57d0] focus:ring-4 focus:ring-[#0b57d0]/10 transition-all placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-7">
              <label htmlFor="rememberMe" className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer select-none">
                <input id="rememberMe" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0b57d0] focus:ring-[#0b57d0] cursor-pointer" />
                Remember me for 30 days
              </label>
              {/* PREVIOUS CODE: Linked directly to /reset-password which was the Enter Email form */}
              {/* {isAdmin && <Link to="/reset-password" ... /> */}
              {isAdmin && <Link to="/forgot-password" className="text-sm font-semibold text-[#0b57d0] hover:underline">Forgot password?</Link>}
            </div>

            <button type="submit" className="w-full bg-[#0b57d0] hover:bg-[#0947a8] text-white rounded-lg p-3.5 text-base font-semibold transition-all active:scale-[0.98]">
              Sign In
            </button>
          </form>

          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={() => handleSocialLogin(googleProvider)} disabled={loading} title="Login with Google" aria-label="Login with Google" className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60" >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.659 29.307 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.967 3.036l5.657-5.657C34.241 6.053 29.417 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z" />
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.967 3.036l5.657-5.657C34.241 6.053 29.417 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.317 0 10.045-1.811 13.81-4.912l-6.38-5.388C29.34 35.91 26.815 36.8 24 36.8c-5.285 0-9.618-3.324-11.262-7.946l-6.52 5.02C9.534 39.27 16.223 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.08 12.08 0 0 1-4.874 5.72l.003-.002 6.38 5.388C36.354 38.545 44 32 44 24c0-1.341-.138-2.651-.389-3.917z" />
              </svg>
            </button>
            <button type="button" onClick={() => handleSocialLogin(githubProvider)} disabled={loading} title="Login with GitHub" aria-label="Login with GitHub" className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-900 bg-slate-900 text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60" >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 .5C5.648.5.5 5.675.5 12.058c0 5.106 3.292 9.438 7.863 10.966.575.107.784-.251.784-.558 0-.275-.01-1.004-.016-1.971-3.2.701-3.877-1.552-3.877-1.552-.523-1.337-1.277-1.694-1.277-1.694-1.045-.718.079-.704.079-.704 1.156.082 1.764 1.197 1.764 1.197 1.027 1.773 2.695 1.261 3.352.964.104-.75.402-1.261.731-1.551-2.554-.293-5.239-1.286-5.239-5.722 0-1.264.447-2.298 1.18-3.109-.118-.292-.512-1.473.112-3.07 0 0 .964-.311 3.16 1.188a10.924 10.924 0 0 1 5.752 0c2.195-1.5 3.158-1.188 3.158-1.188.626 1.597.232 2.778.114 3.07.735.811 1.178 1.845 1.178 3.109 0 4.447-2.688 5.426-5.249 5.713.413.359.78 1.064.78 2.146 0 1.55-.014 2.801-.014 3.181 0 .31.207.671.79.557C20.212 21.492 23.5 17.162 23.5 12.058 23.5 5.675 18.352.5 12 .5Z" />
              </svg>
            </button>
            <button type="button" onClick={() => handleSocialLogin(facebookProvider)} disabled={loading} title="Login with Facebook" aria-label="Login with Facebook" className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500 bg-blue-600 text-white transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.027 4.388 11.023 10.125 11.926v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.685 4.533-4.685 1.313 0 2.686.236 2.686.236v2.964h-1.514c-1.491 0-1.956.931-1.956 1.887v2.257h3.328l-.532 3.49h-2.796V24C19.612 23.096 24 18.1 24 12.073Z" />
              </svg>
            </button>
          </div>


          {!isAdmin && (
            <>
              <div className="flex items-center my-8 text-gray-400 text-sm font-medium before:content-[''] before:flex-1 before:h-[1px] before:bg-gray-200 before:mr-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-gray-200 after:ml-4">
                Or continue with
              </div>



              <p className="text-center text-[0.95rem] text-gray-600">
                Don't have an account? <Link to="/register" className="font-semibold text-[#0b57d0] hover:underline">Sign up for free</Link>
              </p>
            </>
          )}
        </div>

        {/* Bottom Icons / Help */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col md:flex-row justify-center items-center px-10 gap-6 lg:justify-between lg:px-16 pb-6 lg:pb-0">
          <div className="flex justify-center gap-6 text-gray-400 flex-1">
            <CheckCircle2 size={20} className="cursor-pointer hover:text-gray-600 transition-colors" />
            <ShieldCheck size={20} className="cursor-pointer hover:text-gray-600 transition-colors" />
            <MapPin size={20} className="cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-[#0b57d0] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-2px_rgba(0,0,0,0.1)] transition-all lg:absolute lg:right-16">
            <HelpCircle size={16} /> Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
