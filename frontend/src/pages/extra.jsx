import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, Banknote, Map as MapIcon,
  Heart, MapPin, Bed, Bath, Maximize, Wifi, Users, Utensils,
  Snowflake, Dumbbell, ShieldCheck, PaintRoller, Video
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const listings = [
  {
    id: 1,
    title: "The Azure Lofts",
    price: "$1,450",
    location: "Upper East Side, New York",
    badge: "AVAILABLE NOW",
    badgeStyles: "bg-emerald-300 text-emerald-950",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop",
    features: [
      { icon: Bed, text: "2 Beds" },
      { icon: Bath, text: "1 Bath" },
      { icon: Maximize, text: "850 sqft" }
    ]
  },
  {
    id: 2,
    title: "Cedar Street Suites",
    price: "$950",
    location: "Williamsburg, Brooklyn",
    badge: "VERIFIED OWNER",
    badgeStyles: "bg-cyan-200 text-cyan-950",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
    features: [
      { icon: Bed, text: "Studio" },
      { icon: Bath, text: "1 Bath" },
      { icon: Wifi, text: "Included" }
    ]
  },
  {
    id: 3,
    title: "The Heritage PG",
    price: "$600",
    location: "Downtown, Jersey City",
    badge: "BEST VALUE",
    badgeStyles: "bg-green-200 text-green-900",
    image: "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?q=80&w=600&auto=format&fit=crop",
    features: [
      { icon: Users, text: "Shared (2)" },
      { icon: Utensils, text: "Meals Inc." },
      { icon: Snowflake, text: "AC Central" }
    ]
  },
  {
    id: 4,
    title: "Skyline Heights",
    price: "$2,100",
    location: "Financial District, Manhattan",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    features: [
      { icon: Bed, text: "1 Bed" },
      { icon: Dumbbell, text: "Gym Inc." },
      { icon: ShieldCheck, text: "Secured" }
    ]
  },
  {
    id: 5,
    title: "Park View Residence",
    price: "$1,200",
    location: "Astoria, Queens",
    badge: "LAST UNIT",
    badgeStyles: "bg-red-200 text-red-900",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    features: [
      { icon: Bed, text: "2 Beds" },
      { icon: Bath, text: "In-unit" },
      { icon: LayoutGrid, text: "Balcony" }
    ]
  },
  {
    id: 6,
    title: "Marble Square PG",
    price: "$550",
    location: "Hoboken, NJ",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=600&auto=format&fit=crop",
    features: [
      { icon: Users, text: "Shared (3)" },
      { icon: PaintRoller, text: "Cleaning Inc." },
      { icon: Video, text: "CCTV" }
    ]
  }
];

// Helper imported here just so the 5th item doesn't crash if LayoutGrid wasn't kept in array
import { LayoutGrid } from 'lucide-react';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
                  {/* Image & Badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {listing.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase shadow-sm ${listing.badgeStyles}`}>
                        {listing.badge}
                      </div>
                    )}
                    <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-2 rounded-full transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{listing.title}</h3>
                      <div className="text-right">
                        <span className="font-bold text-[#0b57d0] text-lg">{listing.price}</span>
                        <span className="text-xs text-gray-500 font-medium">/mo</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-6 mt-1">
                      <MapPin size={14} className="mr-1 shrink-0" />
                      <span className="truncate">{listing.location}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-gray-600">
                      {listing.features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                          <feature.icon size={16} className="text-gray-400" />
                          <span className="text-[0.65rem] font-bold tracking-wider uppercase text-center leading-tight">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
