import React, { useEffect, useRef, useState } from 'react';
import { Bell, UserCircle, Menu } from 'lucide-react';
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('email');
    setIsProfileOpen(false);
    // Hard refresh/redirect so the browser network history log is cleared
    window.location.href = '/login';
  };

  return (
    <header className="bg-white px-4 md:px-8 lg:px-10 h-20  flex items-center justify-between border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-xl hover:bg-gray-50"
        >
          <RxHamburgerMenu size={24} />
        </button>
        <div className="text-[#0b57d0] font-bold text-xl tracking-tight lg:hidden">The Sanctuary</div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 text-gray-600 ml-auto">
        <Bell className="cursor-pointer hover:text-gray-900 transition-colors" size={20} />
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((open) => !open)}
            className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
          >
            <UserCircle size={24} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-gray-100 bg-white shadow-xl shadow-black/5 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">My Account</p>
                <p className="text-xs text-gray-500 truncate">
                  {sessionStorage.getItem('email') || 'Signed in user'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
