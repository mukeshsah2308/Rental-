
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Home, FileText, MessageSquare, Settings, X, Plus } from 'lucide-react';


const Sidebar = ({ isOpen, onClose, onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 lg:w-64 bg-white border-r border-gray-100 flex flex-col
        transform transition-transform duration-300 ease-in-out
        shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-gray-100/50 shrink-0">
          <span className="text-[#0b57d0] font-bold text-xl tracking-tight">The Sanctuary</span>
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 lg:px-4 py-8 flex flex-col">
          <h3 className="text-xs font-bold text-gray-400 tracking-widest mb-4 px-3 uppercase">Categories</h3>
          <nav className="flex flex-col gap-1 mb-8">
            <button
              type="button"
              onClick={() => { navigate('/dashboard'); onClose(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold shadow-sm text-left transition-colors ${location.pathname === '/dashboard'
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-gray-600 hover:bg-gray-100 font-medium'
                }`}
            >
              <LayoutGrid size={20} />
              Overview
            </button>
            <button
              type="button"
              onClick={() => { navigate('/list-property'); onClose(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold shadow-sm text-left transition-colors ${location.pathname.startsWith('/list-property')
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-gray-600 hover:bg-gray-100 font-medium'
                }`}
            >
              <Plus size={20} />
              List Property
            </button>
            <button
            onClick={()=>{navigate('/users-property'); onClose();}}
            >
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-xl font-medium transition-colors">
                <Home size={20} className="text-gray-500" />
                My Properties
              </a>
            </button>

            <a href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-xl font-medium transition-colors">
              <FileText size={20} className="text-gray-500" />
              Lease Agreements
            </a>
            <button
              onClick={() => { navigate('/message'); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${location.pathname === '/message'
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-gray-600 hover:bg-gray-100 font-medium'
                }`}
            >
              <MessageSquare size={20} className={location.pathname === '/message' ? 'text-white' : 'text-gray-500'} />
              Messages
            </button>
            <button
              onClick={() => { navigate('/setting'); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${location.pathname === '/setting'
                  ? 'bg-[#3b82f6] text-white'
                  : 'text-gray-600 hover:bg-gray-100 font-medium'
                }`}
            >
              <Settings size={20} className={location.pathname === '/setting' ? 'text-white' : 'text-gray-500'} />
              Settings
            </button>
          </nav>

          {/* Verified Owner CTA */}
          <div className="mt-auto bg-[#a7f3d0] rounded-2xl p-6 text-emerald-950 mx-2 lg:mx-0">
            <h4 className="font-bold mb-2">Verified Owner?</h4>
            <p className="text-sm font-medium mb-5 opacity-90 leading-relaxed">
              Increase your visibility by 40% with a verified badge.
            </p>
            <button
              type="button"
              onClick={() => { navigate('/list-property'); onClose(); }}
              className="w-full bg-[#064e3b] hover:bg-[#022c22] text-white rounded-lg py-2.5 font-semibold text-sm transition-colors shadow-sm"
            >
              Add New Listing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
