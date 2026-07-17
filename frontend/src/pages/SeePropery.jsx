import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Heart, Share2, MapPin, Wifi, Car, Dumbbell,
  Snowflake, Building, CheckCircle2, Leaf, Edit2, Check, ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import config from '../config';

const { API_BASE_URL } = config;

export default function SeePropery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id === 'preview') {
      const previewData = location.state?.previewData;
      if (previewData) {
        setProperty(previewData);
        setLoading(false);
      } else {
        setError('No preview data found. Please enter listing details first.');
        setLoading(false);
      }
    } else {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_BASE_URL}/api/properties/${id}`);
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('Property not found');
            }
            throw new Error('Failed to fetch property details');
          }
          const data = await response.json();
          setProperty(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id, location.state]);

  const handleSubmit = async () => {
    if (id !== 'preview') {
      navigate('/dashboard');
      return;
    }

    setIsSubmitting(true);
    try {
      const rawUserId = sessionStorage.getItem('userId');
      if (!rawUserId) {
        toast.error("You must be logged in to publish a property listing.");
        setIsSubmitting(false);
        return;
      }
      const userId = parseInt(rawUserId, 10);

      const payload = {
        ...property,
        title: property.listingTitle,
        userId,
      };

      const response = await fetch(`${API_BASE_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Listing published successfully!");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to publish listing");
      }
    } catch (error) {
      console.error("Error publishing property:", error);
      toast.error("An error occurred while publishing");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9fafc]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 font-semibold">Loading Sanctuary Details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9fafc]">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full text-center">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Unable to load property</h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            {error || 'The property you are looking for does not exist or could not be retrieved.'}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 w-full bg-[#0b57d0] hover:bg-[#0947a8] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Fallback image array if photos are empty or not loaded
  const defaultImages = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop'
  ];

  const photos = property.photos && property.photos.length > 0 ? property.photos : defaultImages;
  const primaryImage = photos[0];
  const sideImages = photos.slice(1, 4);
  const remainingCount = photos.length > 4 ? photos.length - 4 : 12; // Visual match to +12 more in screenshot

  return (
    <div className="min-h-screen bg-[#f9fafc] font-sans antialiased text-gray-900 pb-20">
      {/* Consumer Portal Navigation Bar */}
      <nav className="w-full border-b border-gray-100 bg-white px-8 h-20 flex items-center justify-between sticky top-0 z-30 shadow-sm/5">
        <div 
          onClick={() => navigate('/dashboard')}
          className="text-[#0b57d0] font-extrabold text-2xl tracking-tight cursor-pointer hover:opacity-90"
        >
          Sanctuary
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          <Link to="/dashboard" className="hover:text-gray-900 transition-colors">Explore</Link>
          <span className="cursor-pointer hover:text-gray-900 transition-colors">Saved</span>
          <span className="cursor-pointer hover:text-gray-900 transition-colors">Messages</span>
          <span className="cursor-pointer hover:text-gray-900 transition-colors">Support</span>
        </div>

        <div className="flex items-center gap-5 text-gray-400">
          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className={`p-2 rounded-full hover:bg-gray-50 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-gray-800'}`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-50 hover:text-gray-800 transition-colors">
            <Share2 size={20} />
          </button>
          <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        
        {/* Breadcrumbs & Action Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <nav className="text-xs font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
              <span>Listings</span>
              <span className="text-[10px] text-gray-300">&#9658;</span>
              <span className="text-[#0b57d0]">Final Review</span>
            </nav>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-2 leading-tight">
              {property.listingTitle}
            </h1>
            <p className="text-gray-500 text-sm max-w-xl leading-relaxed mt-2.5">
              Please review your property details carefully. This is how your sanctuary will appear to potential guests across our editorial platforms.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            {id === 'preview' ? (
              <>
                <button 
                  onClick={() => navigate(`/list-property/amenities`)} // Navigate back to editor (last step)
                  className="flex items-center gap-2 bg-[#f0f4f9] hover:bg-[#e4e9f0] text-gray-700 px-5 py-3 rounded-2xl font-bold text-sm transition-all"
                >
                  <Edit2 size={16} />
                  Edit Details
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-[#0b57d0] hover:bg-[#0947a8] disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-[#f0f4f9] hover:bg-[#e4e9f0] text-gray-705 px-5 py-3 rounded-2xl font-bold text-sm transition-all"
              >
                <ArrowLeft size={16} />
                Back to Explore
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-2 relative aspect-[16/10] bg-gray-100 rounded-[32px] overflow-hidden group shadow-sm">
            <img 
              src={primaryImage} 
              alt="Featured View" 
              className="h-full w-full object-cover group-hover:scale-101 transition-transform duration-500"
            />
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm text-gray-900 px-3.5 py-1.5 rounded-full text-[0.65rem] font-bold tracking-widest uppercase shadow-sm">
              Featured View
            </div>
          </div>

          {/* Right Side Mini Images Stack */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-5">
            {/* Display up to 3 side images */}
            {sideImages.map((img, idx) => {
              const isLast = idx === 2;
              return (
                <div 
                  key={idx} 
                  className="flex-1 relative aspect-[16/10] lg:aspect-[16/9.5] bg-gray-100 rounded-3xl overflow-hidden shadow-sm/5 group cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`View ${idx + 2}`} 
                    className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  {isLast && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-white font-bold text-lg select-none">
                      +{remainingCount} more
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Render placeholder side images if actual pictures are fewer than 3 */}
            {sideImages.length === 0 && (
              <>
                <div className="flex-1 bg-gray-150 rounded-3xl animate-pulse"></div>
                <div className="flex-1 bg-gray-150 rounded-3xl animate-pulse"></div>
                <div className="flex-1 bg-gray-150 rounded-3xl animate-pulse flex items-center justify-center text-gray-400 font-bold">
                  +12 more
                </div>
              </>
            )}
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column - Space Details (70% width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 md:p-10 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Space</h2>
                <p className="text-gray-600 leading-relaxed text-sm font-medium whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-50">
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  Verified Owner
                </div>
                <div className="bg-teal-50 text-teal-700 border border-teal-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Leaf size={15} />
                  Eco-Friendly
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Rent Card & Details (30% width) */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
              
              {/* Rent Block */}
              <div>
                <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">
                  Monthly Rent
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-[#0b57d0]">
                    ₹{property.monthlyRent?.toLocaleString('en-IN') || property.monthlyRent}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">/ month</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <span>&darr;</span> 15% lower than market average
                </div>
              </div>

              {/* Location Block */}
              <div className="flex gap-3 border-t border-gray-50 pt-5">
                <div className="h-10 w-10 shrink-0 bg-blue-50 text-[#0b57d0] rounded-xl flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</h4>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {property.address}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {property.city}, {property.state} {property.zipCode}
                  </p>
                </div>
              </div>

              {/* Map Preview */}
              <div className="relative aspect-[16/10] bg-sky-50 rounded-2xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
                {/* Styled static placeholder map representation */}
                <div className="absolute inset-0 bg-[#e5e3df] opacity-80" style={{
                  backgroundImage: `radial-gradient(circle, #d0cfcb 20%, transparent 20%), 
                                    radial-gradient(circle, #d0cfcb 20%, transparent 20%)`,
                  backgroundSize: '15px 15px',
                  backgroundPosition: '0 0, 7.5px 7.5px'
                }}></div>
                {/* Stylized road lines */}
                <div className="absolute w-full h-1 bg-white top-1/3 rotate-12"></div>
                <div className="absolute w-full h-1.5 bg-white top-2/3 -rotate-6"></div>
                <div className="absolute w-1 bg-white h-full left-1/2 rotate-45"></div>
                
                {/* Map Circle locator */}
                <div className="absolute h-10 w-10 bg-blue-500/20 border border-blue-500 rounded-full animate-ping"></div>
                <div className="absolute h-5 w-5 bg-blue-600 border-2 border-white rounded-full shadow-md flex items-center justify-center">
                  <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                </div>

                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[9px] font-bold text-gray-500 shadow-sm border border-gray-100">
                  {property.city || 'Location Map'}
                </div>
              </div>

              {/* Amenities Mosaic */}
              <div className="border-t border-gray-50 pt-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Amenities Mosaic</h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 font-semibold">
                  <div className="flex items-center gap-2 py-1.5">
                    <Wifi size={16} className="text-gray-400" />
                    <span>Gigabit Fiber</span>
                  </div>
                  <div className="flex items-center gap-2 py-1.5">
                    <Car size={16} className="text-gray-400" />
                    <span>2 Spaces</span>
                  </div>
                  <div className="flex items-center gap-2 py-1.5">
                    <Dumbbell size={16} className="text-gray-400" />
                    <span>Private Gym</span>
                  </div>
                  <div className="flex items-center gap-2 py-1.5">
                    <Snowflake size={16} className="text-gray-400" />
                    <span>Central AC</span>
                  </div>
                  <div className="flex items-center gap-2 py-1.5">
                    <Building size={16} className="text-gray-400" />
                    <span>Terrace</span>
                  </div>
                  <div className="flex items-center gap-2 py-1.5">
                    <Check size={16} className="text-emerald-500" />
                    <span>In-Unit</span>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action */}
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#0b57d0] hover:bg-[#0947a8] disabled:bg-gray-400 text-white py-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                {id === 'preview' ? (isSubmitting ? 'Submitting...' : 'Confirm and Submit') : 'Book Sanctuary'}
              </button>

              <p className="text-[9px] font-bold text-center text-gray-400 uppercase tracking-wider leading-relaxed">
                BY SUBMITTING, YOU AGREE TO OUR EDITORIAL STANDARDS &amp; COMMUNITY GUIDELINES.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
