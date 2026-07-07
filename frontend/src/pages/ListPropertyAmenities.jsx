import { useState, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Check,
  CloudUpload,
  Grid2X2,
  ShieldCheck,
  Sparkles,
  Trash2
} from "lucide-react";
import config from "../config";

const { API_BASE_URL } = config;

const comfortGroups = [
  {
    title: "Comfort",
    items: ["Air Conditioning", "Heating"],
  },
  {
    title: "Utility",
    items: ["Fast Wifi", "Laundry", "Kitchen", "Dishwasher"],
  },
  {
    title: "Building",
    items: ["Gym", "Pool", "Parking", "Elevator"],
  },
];

const gallerySlots = [
  { id: "image_1", label: "Image 1" },
  { id: "image_2", label: "Image 2" },
  { id: "image_3", label: "Image 3" },
  { id: "image_4", label: "Image 4" },
  { id: "image_5", label: "Image 5" },
  { id: "image_6", label: "Image 6" },
  { id: "image_7", label: "Image 7" },
  { id: "image_8", label: "Image 8" },
];

export default function ListPropertyAmenities() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();
  const { formData, updateFormData } = useOutletContext();

  // Local state to keep track of uploaded photos for each slot, mapped from the formData.photos array
  const initialPhotos = {};
  if (Array.isArray(formData.photos)) {
    formData.photos.forEach((photo, idx) => {
      initialPhotos[`image_${idx + 1}`] = photo;
    });
  }
  const [photos, setPhotos] = useState(initialPhotos);

  const bulkInputRef = useRef(null);
  const singleInputRef = useRef(null);
  const [activeSlot, setActiveSlot] = useState(null);


  const handleAmenityChange = (amenity) => {
    const currentAmenities = formData.amenities || [];
    // Controlled Checkbox Logic
    // If already selected → remove it
    // Otherwise → add it
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    updateFormData({ amenities: updatedAmenities });
  };

  // Trigger file picker for a specific category capsule
  const triggerSingleFileInput = (slotId) => {
    setActiveSlot(slotId);
    if (singleInputRef.current) {
      singleInputRef.current.value = "";
      singleInputRef.current.click();
    }
  };

  // Trigger bulk file picker
  const triggerBulkFileInput = () => {
    if (bulkInputRef.current) {
      bulkInputRef.current.value = "";
      bulkInputRef.current.click();
    }
  };

  // Helper to assign a list of selected files to empty slots
  const assignFilesToSlots = (files) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith("image/")); //Prevents non-image uploads.
    if (fileArray.length === 0) return;

    const slots = gallerySlots.map(s => s.id);
    let currentSlotIndex = 0;

    // Maintain a local mutable copy of photos to avoid triggering state updates mid-render
    let accumulatedPhotos = { ...photos };

    const readAndAssign = (fileIndex) => {
      // Base case: Finished processing all files or slots are filled
      if (fileIndex >= fileArray.length || currentSlotIndex >= slots.length) {
        setPhotos(accumulatedPhotos);
        updateFormData({ photos: Object.values(accumulatedPhotos) });
        return;
      }

      // Find the first empty slot in our accumulated copy
      while (currentSlotIndex < slots.length && accumulatedPhotos[slots[currentSlotIndex]]) {
        currentSlotIndex++;
      }

      if (currentSlotIndex >= slots.length) {
        setPhotos(accumulatedPhotos);
        updateFormData({ photos: Object.values(accumulatedPhotos) });
        toast.error("All photo slots are full!");
        return;
      }

      const file = fileArray[fileIndex];
      const reader = new FileReader();
      reader.onloadend = () => {
        const slot = slots[currentSlotIndex];
        accumulatedPhotos[slot] = reader.result;
        currentSlotIndex++;
        readAndAssign(fileIndex + 1); //Recursive Function
      };
      //Converts image file into previewable Base64 string.
      reader.readAsDataURL(file);
    };

    readAndAssign(0);
  };

  // Handle single photo slot assignment
  const handleSingleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlot) return;

    const reader = new FileReader();
    //Runs after image conversion finishes.
    // Then you store image preview in state.
    reader.onloadend = () => {
      const updatedPhotos = { ...photos, [activeSlot]: reader.result }; //Copies old data and updates only one value.
      setPhotos(updatedPhotos);
      updateFormData({ photos: Object.values(updatedPhotos) });
      toast.success(`Photo added to ${gallerySlots.find(s => s.id === activeSlot)?.label}`);
    };
    reader.readAsDataURL(file);
  };

  // Handle bulk upload file selection
  const handleBulkFileChange = (e) => {
    if (e.target.files) {
      assignFilesToSlots(e.target.files);
    }
  };

  // Delete photo from a specific slot
  const handleDeletePhoto = (slotId, e) => {
    e.stopPropagation(); // Stop triggerSingleFileInput from firing
    //     Without this:
    // Clicking delete button
    // Would also trigger image upload click

    const updatedPhotos = { ...photos };
    delete updatedPhotos[slotId];
    setPhotos(updatedPhotos);
    updateFormData({ photos: Object.values(updatedPhotos) });
    toast.success("Photo removed");
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      assignFilesToSlots(e.dataTransfer.files);
    }
  };

  const handlePublish = async () => {
    // ── Step 1 ──
    const step1Rules = [
      { field: "listingTitle", message: "Please enter a Listing Title", trim: true },
      { field: "description", message: "Please enter a Description", trim: true },
      { field: "propertyType", message: "Please select a Property Type" },
      { field: "category", message: "Please select a Property Category" },
      { field: "availableFrom", message: "Please select an Available From date" },
    ];

    for (const { field, message, trim } of step1Rules) {
      const value = formData[field];
      if (!value || (trim && !value.trim())) {
        toast.error(`${message} (Step 1)`);
        return navigate("/list-property/");
      }
    }

    //steps 2 
    const steps2Rules = [
      { field: "monthlyRent", message: "Please enter a Listing Title ", trim: true },
      { field: "securityDeposit", message: " Please enter a Listing Title", trim: true },
      { field: "address", message: "Please enter a Listing Title ", trim: true },
      { field: "city", message: " Please enter a Listing Title", trim: true },
      { field: "state", message: "Please enter a Listing Title ", trim: true },
      { field: "zipCode", message: "Please enter a Listing Title ", trim: true },
    ]
    for (const { field, message, trim } of steps2Rules) {
      const value = formData[field];
      if (!value || (trim && !value.trim())) {
        toast.error(`${message} (Step 2)`);
        return navigate("/list-property/pricing");
      }
    }

    // ── Step 3 validation ──
    if (!formData.photos || formData.photos.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }


    // Navigate directly to the preview details page passing the local state
    navigate('/see-property/preview', { state: { previewData: formData } });
  };

  const handleSaveDraft = () => {
    toast.success("Progress saved as draft!");
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
        <main className="flex-1 px-5 md:px-8 lg:px-10 py-8 lg:py-10">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0b57d0] mb-3">
                Step 3 of 3
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Amenities & Photos
              </h1>
              <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
                Select the features that define the stay and upload the visuals that sell it.
              </p>
            </div>

            {/* Main Grid: Left (Amenities) & Right (Photos) */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">

              {/* Left Column: Amenities */}
              <section className="space-y-6">
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-center gap-2.5 mb-6 text-gray-900">
                    <ShieldCheck size={20} className="text-[#0b57d0]" />
                    <h2 className="text-xl font-bold">Essential Comforts</h2>
                  </div>

                  {/* Groups */}
                  <div className="grid gap-6">
                    {comfortGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#0b57d0] mb-3">
                          {group.title}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {group.items.map((item) => (
                            <label
                              key={item}
                              htmlFor={`amenity-${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 cursor-pointer transition-all duration-200 ${formData?.amenities?.includes(item)
                                ? "border-[#0b57d0] bg-[#0b57d0]/5 shadow-sm"
                                : "border-gray-200 bg-[#fbfbfe] hover:border-[#0b57d0]/40"
                                }`}
                            >
                              {/* logic */}
                              <input
                                id={`amenity-${item.toLowerCase().replace(/\s+/g, "-")}`}
                                type="checkbox"
                                checked={formData?.amenities?.includes(item) || false}
                                onChange={() => handleAmenityChange(item)}
                                className="h-4 w-4 rounded border-gray-300 text-[#0b57d0] focus:ring-[#0b57d0]"
                              />
                              <span className="text-sm font-semibold text-gray-700">
                                {item}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Banner Card */}
                <div className="bg-emerald-100/80 rounded-[24px] p-5 border border-emerald-200 text-emerald-950 shadow-sm flex items-start gap-3">
                  <ShieldCheck size={20} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-emerald-900">
                      Verified amenities increase booking rates
                    </h4>
                    <p className="text-xs leading-relaxed text-emerald-800/90 mt-1">
                      Ensure your details are accurate so guests can trust the experience before arrival.
                    </p>
                  </div>
                </div>
              </section>

              {/* Right Column: Media Upload */}
              <section className="space-y-6">
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Gallery & Media</h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload crisp photos in the recommended aspect ratio.
                      </p>
                    </div>
                    <button className="text-xs font-semibold text-[#0b57d0] hover:underline">
                      Photography Guide
                    </button>
                  </div>

                  {/* Drag & Drop Upload Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerBulkFileInput}
                    className={`rounded-[26px] border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                      ? "border-[#0b57d0] bg-[#0b57d0]/5 scale-[0.99]"
                      : "border-gray-200 bg-[#fcfcff] hover:border-[#0b57d0]/50 hover:bg-[#0b57d0]/1"
                      }`}
                  >
                    <input
                      type="file"
                      ref={bulkInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleBulkFileChange}
                    />

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b57d0]/10 text-[#0b57d0]">
                      <CloudUpload size={26} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Drag and drop photos here
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Or click to browse your files. High resolution recommended.
                    </p>
                    <button
                      type="button"
                      className="mt-4 rounded-xl bg-[#0b57d0] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0947a8] transition-colors"
                    >
                      Select Photos
                    </button>
                  </div>

                  {/* Categories Capsule Grid */}
                  <input
                    type="file"
                    ref={singleInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleSingleFileChange}
                  />

                  <div className="mt-6 grid grid-cols-2 gap-3.5 md:grid-cols-3">
                    {gallerySlots.map((slot) => {
                      const photoUrl = photos[slot.id];
                      return (
                        <div
                          key={slot.id}
                          onClick={() => triggerSingleFileInput(slot.id)}
                          className={`group relative rounded-2xl flex flex-col items-center justify-center text-center px-4 py-6 font-semibold text-xs cursor-pointer overflow-hidden transition-all duration-300 ${photoUrl
                            ? "h-24 text-white"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                            }`}
                          style={
                            photoUrl
                              ? {
                                backgroundImage: `url(${photoUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }
                              : {}
                          }
                        >
                          {photoUrl && (
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                          )}

                          <span className="relative z-10 font-bold uppercase tracking-wider">
                            {slot.label}
                          </span>

                          {photoUrl && (
                            <button
                              onClick={(e) => handleDeletePhoto(slot.id, e)}
                              className="absolute top-1.5 right-1.5 z-20 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              title="Delete photo"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Helper Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-[24px] bg-white border border-gray-100 shadow-sm p-4.5 flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-2xl bg-[#0b57d0]/10 flex items-center justify-center text-[#0b57d0] shrink-0">
                      <Grid2X2 size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Cover First</p>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">
                        The first photo shapes the listing preview.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-white border border-gray-100 shadow-sm p-4.5 flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-2xl bg-[#0b57d0]/10 flex items-center justify-center text-[#0b57d0] shrink-0">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Stage the rooms</p>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">
                        Open curtains and use natural light.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between mt-10 gap-4 flex-wrap border-t border-gray-200/80 pt-8">
              <Link
                to="/list-property/pricing"
                className="text-[#0b57d0] font-bold text-sm flex items-center gap-2 hover:underline transition-all"
              >
                <ArrowLeft size={16} />
                Back to Pricing
              </Link>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-colors"
                >
                  Save as Draft
                </button>
                {/* <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="bg-[#0b57d0] hover:bg-[#0947a8] disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm inline-flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? "Publishing..." : "Publish Listing"}
                  <Check size={16} />
                </button> */}
                {/* <Link to="/list-property/upload"> */}
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="bg-[#0b57d0] hover:bg-[#0947a8] disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm inline-flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? "Loading..." : "See Details"}
                  <Check size={16} />
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}