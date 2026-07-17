import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  User, CreditCard, Shield, Sliders, HelpCircle, LogOut,
  Bell, Mail, Phone, ShieldCheck, Building2, Upload, MessageSquare, Edit2
} from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import config from '../config';

const { API_BASE_URL } = config;

export default function Setting() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const id = sessionStorage.getItem('userId');
  // Local state for UI inputs (no backend / fetch details as requested)
  const [formData, setFormData] = useState({
    firstName: 'Julian',
    lastName: 'Vandermeer',
    email: 'julian.v@hearthhorizon.com',
    phoneNumber: '+1 (555) 0123 4567',
    bio: 'Architectural enthusiast searching for a modern sanctuary in the Pacific Northwest. Passionate about sustainable living and minimalist design aesthetics.'
  });

  const [activeTab, setActiveTab] = useState('account');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success('Settings saved successfully (Mock UI Mode)!');
  };

  const handleDiscard = () => {
    setFormData({
      firstName: 'Julian',
      lastName: 'Vandermeer',
      email: 'julian.v@hearthhorizon.com',
      phoneNumber: '+1 (555) 0123 4567',
      bio: 'Architectural enthusiast searching for a modern sanctuary in the Pacific Northwest. Passionate about sustainable living and minimalist design aesthetics.'
    });
    toast.error('Changes discarded!');
  };
  useEffect(() => {
    const fetchuser = async () => {
      if (!id) {
        console.log("No logged-in user ID found in sessionStorage");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not okay");
        }
        const result = await res.json();
        console.log("Logged-in user data:", result);
        //  setFormData({
        //    firstName: result.fullname.split(" ")[0],
        //    lastName: result.fullname.split(" ")[1],
        //    email: result.email,
        //  })


      } catch (err) {
        console.log(err);
      }
    }
    fetchuser();
  }, [id])

  return (
    <div className="flex h-screen bg-[#f9fafc] font-sans overflow-hidden">

      {/* Sidebar fixed to the left */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      <div className="flex-1 flex flex-col lg:ml-64 overflow-y-auto relative scroll-smooth">
        {/* Top Navbar */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Main Content Pane */}
        <main className="flex-1 max-w-5xl mx-auto px-6 md:px-8 py-10 w-full space-y-8">

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10 space-y-8">

            {/* Header Title */}
            <div>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
                Profile Status: Verified
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-3">Account Details</h1>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">Update your personal information and profile picture.</p>
            </div>

            {/* Profile Picture Card */}
            <div className="bg-[#f0f4f9]/30 rounded-3xl p-6 border border-gray-50 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-24 w-24 rounded-3xl overflow-hidden shadow-sm shrink-0 border border-gray-100 group">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="Profile Avatar"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-1 right-1 h-7 w-7 bg-[#0b57d0] text-white rounded-full flex items-center justify-center cursor-pointer border border-white hover:bg-[#0947a8] transition-colors shadow-md">
                  <Edit2 size={12} />
                </div>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <h3 className="font-bold text-gray-950 text-base">Profile Picture</h3>
                  <p className="text-xs text-gray-400 leading-normal max-w-sm mt-0.5">
                    We recommend an image of at least 400x400. Gifs and PNGs are supported.
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <button className="bg-[#f0f4f9] hover:bg-[#e4e9f0] text-gray-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors">
                    <Upload size={14} />
                    Upload New
                  </button>
                  <button className="text-red-600 hover:text-red-800 font-bold text-xs px-2 py-1 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0]/30 font-semibold text-gray-800 transition-colors shadow-sm/5"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0]/30 font-semibold text-gray-800 transition-colors shadow-sm/5"
                />
              </div>

              {/* Email Address */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-5 text-gray-400" size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0]/30 font-semibold text-gray-800 transition-colors shadow-sm/5"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-5 text-gray-400" size={18} />
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0]/30 font-semibold text-gray-800 transition-colors shadow-sm/5"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="bio" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Bio / Introduction
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0]/30 font-medium text-gray-750 transition-colors shadow-sm/5 leading-relaxed resize-none"
                />
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 flex-wrap">
              <span className="text-xs text-gray-400 italic">
                Last updated: Today at 09:42 AM
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscard}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#0b57d0] hover:bg-[#0947a8] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  Save Changes
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Status Grid (2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Card: Verified */}
            <div className="bg-[#5eead4]/20 border border-[#5eead4]/40 rounded-3xl p-6 flex items-start gap-4 shadow-sm/5">
              <div className="h-10 w-10 bg-[#0d9488]/10 text-[#0d9488] rounded-xl flex items-center justify-center shrink-0 border border-[#0d9488]/10">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-sm">Identity Verified</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-normal">
                  You're fully cleared to book elite properties.
                </p>
              </div>
            </div>

            {/* Right Card: Active Inquiries */}
            <div className="bg-[#eef2f7] border border-gray-100 rounded-3xl p-6 flex items-start gap-4 shadow-sm/5">
              <div className="h-10 w-10 bg-blue-50 text-[#0b57d0] rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-950 text-sm">3 Active Inquiries</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                  Across Seattle and Portland regions.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
