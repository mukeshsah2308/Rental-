import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, SlidersHorizontal, Banknote, Map as MapIcon,
  Heart, MapPin
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import config from '../config';

const { API_BASE_URL } = config;

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [propertylist, setPropertyList] = useState([]);

  //backend response
  useEffect(() => {
    const fetchPropertyList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/properties`);
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        const data = await response.json();
        setPropertyList(data);
        console.log(data);
      } catch (err) {
        console.log(err)
      } 
    }
    fetchPropertyList();
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

        <main className="flex-1">
          {/* Header Section */}
          <div className="bg-[#fcfdff] pt-12 pb-24 px-6 md:px-8 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-[3.5rem] font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                Find Your Peace.
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                Curated living spaces that feel like home. Discover premium PG and rental opportunities across the city's most quiet sanctuaries.
              </p>
            </div>
          </div>

          {/* Listings & Search wrapper */}
          <div className="max-w-6xl mx-auto w-full px-6 md:px-8 lg:px-10 -mt-10 relative z-10 pb-24">

            {/* Search Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200/60 flex flex-col md:flex-row gap-3 mb-10">
              <div className="flex-1 relative flex items-center bg-[#f8f9fb] rounded-xl px-4 py-3 border border-gray-100">
                <Search className="text-gray-400 mr-3" size={20} />
                <label htmlFor="searchQuery" className="sr-only">Search properties</label>
                <input
                  id="searchQuery"
                  name="searchQuery"
                  autoComplete="off"
                  type="text"
                  placeholder="Search by location or property name..."
                  className="bg-transparent w-full focus:outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm shrink-0">
                  <Banknote size={18} className="text-gray-500" />
                  Price Range
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm shrink-0">
                  <SlidersHorizontal size={18} className="text-gray-500" />
                  More Filters
                </button>
                <button className="bg-[#0b57d0] hover:bg-[#0947a8] text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-[0.98] shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {propertylist.map((listing) => {
                const imageUrl = (listing.photos && listing.photos.length > 0) 
                  ? listing.photos[0] 
                  : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop";

                 return (
                  <div 
                    key={listing.id} 
                    onClick={() => navigate(`/see-property/${listing.id}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                  >
                    {/* Image & Badges */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={listing.listingTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {listing.category && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase shadow-sm bg-emerald-300 text-emerald-950">
                          {listing.category}
                        </div>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // like listing
                        }}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
                      >
                        <Heart size={18} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{listing.listingTitle}</h3>
                        <div className="text-right">
                          <span className="font-bold text-[#0b57d0] text-lg">₹{listing.monthlyRent}</span>
                          <span className="text-xs text-gray-500 font-medium">/mo</span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-500 text-sm mb-6 mt-1">
                        <MapPin size={14} className="mr-1 shrink-0" />
                        <span className="truncate">{listing.address}, {listing.city}</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2 text-gray-600">
                        {listing.amenities && listing.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="bg-[#f0f4f9] text-gray-700 text-[0.65rem] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                            {amenity}
                          </span>
                        ))}
                        {(!listing.amenities || listing.amenities.length === 0) && (
                          <span className="text-[0.65rem] text-gray-400 font-semibold italic">No amenities specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-[#eef2f7] hover:bg-[#e4e9f0] text-[#0b57d0] font-bold px-8 py-3.5 rounded-xl transition-colors">
                Load more sanctuaries
              </button>
            </div>
          </div>
        </main>

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

