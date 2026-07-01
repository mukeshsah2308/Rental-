import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { 
  ArrowLeft, 
  Check, 
  Loader2, 
  Home,
  CheckCircle2,
  Building,
  Image,
  Tag
} from "lucide-react";
import config from "../config";

const { API_BASE_URL } = config;

export default function PropertyUpload() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  
  // 1. Get the shared form state from MainListProperty's Outlet context!
  const { formData } = useOutletContext();

  // 2. Handle the backend publication request
  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      // Map listingTitle to title as required by the backend API schema
      const payload = {
        ...formData,
        title: formData.listingTitle,
      };

      const response = await fetch(`${API_BASE_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Listing published successfully!");
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

  return (
    <div className="flex h-screen bg-[#f7f8fd] overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto lg:ml-64 relative scroll-smooth">
        {/* Header */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 px-5 md:px-8 lg:px-10 py-10 lg:py-12 flex items-center justify-center">
          <div className="max-w-xl w-full">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10 text-center">
              
              {!isSuccess ? (
                <>
                  <div className="h-16 w-16 mx-auto mb-6 bg-blue-100/70 text-[#0b57d0] rounded-full flex items-center justify-center">
                    <Building size={32} />
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Confirm & Publish Listing
                  </h1>
                  <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Review your collected listing details before publishing them live to the server database.
                  </p>

                  {/* Visual Data Summary to prove context data transfer */}
                  <div className="mt-8 border border-gray-100 rounded-2xl p-5 bg-[#fbfbfe] text-left space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Listing Summary
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Title:</span>
                      <span className="text-gray-800 font-semibold truncate max-w-[200px]">
                        {formData?.listingTitle || "Not specified"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Rent:</span>
                      <span className="text-gray-800 font-semibold">
                        {formData?.monthlyRent ? `₹${formData.monthlyRent}/mo` : "Not specified"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Amenities Selected:</span>
                      <span className="bg-[#0b57d0]/10 text-[#0b57d0] px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {formData?.amenities?.length || 0} items
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Photos Added:</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {formData?.photos?.length || 0} photos
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col gap-3">
                    <button
                      onClick={handlePublish}
                      disabled={isSubmitting}
                      className="w-full bg-[#0b57d0] hover:bg-[#0947a8] disabled:bg-gray-400 text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Publishing to Server...
                        </>
                      ) : (
                        <>
                          Publish Listing
                          <Check size={16} />
                        </>
                      )}
                    </button>

                    <Link
                      to="/list-property/amenities"
                      className="text-[#0b57d0] font-bold text-sm flex items-center gap-2 justify-center hover:underline transition-all mt-2"
                    >
                      <ArrowLeft size={16} />
                      Back to Amenities
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-16 w-16 mx-auto mb-6 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Listing Published!
                  </h1>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    Congratulations! Your property <strong className="text-gray-800 font-semibold">{formData?.listingTitle || "New Property"}</strong> has been successfully saved to the server and is now live!
                  </p>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-8 w-full bg-[#0b57d0] hover:bg-[#0947a8] text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Home size={16} />
                    Go to Dashboard
                  </button>
                </>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}