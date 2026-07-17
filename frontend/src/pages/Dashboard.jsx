import { useState, useEffect } from 'react';

import { Map as MapIcon } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import config from '../config';

const { API_BASE_URL } = config;
const Dashboard = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [propertylist, setPropertyList] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/properties`);
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        const result = await response.json();
        setPropertyList(result.data);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProperty();
  }, [])




  return (
    <div className="flex h-screen bg-[#f9fafc] font-sans overflow-hidden ">

      {/* Sidebar fixed to the left taking full height */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto lg:ml-64 relative scroll-smooth">

        {/* Top Navbar */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />



        {/* Floating Map Button */}
        <button className="fixed bottom-8 right-8 lg:right-12 bg-[#0b57d0] hover:bg-[#0947a8] text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-transform hover:-translate-y-1 active:scale-[0.98] z-40">
          <MapIcon size={20} />
          Show Map
        </button>

      </div>
    </div>
  );
};

export default Dashboard;

