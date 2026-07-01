import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useNavigate, useOutletContext } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineDescription } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

export default function ListProperty() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { formData, updateFormData } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Main Section */}
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              {/* Heading */}
              <div className="mb-8">
                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                  Step 1
                </p>

                <h1 className="text-3xl font-bold text-gray-800 mt-1">
                  Property Identity
                </h1>

                <p className="text-gray-500 mt-2">
                  Fill in the basic details of your property listing.
                </p>
              </div>

              {/* Listing Title */}
              <div className="mb-6">
                <label
                  htmlFor="listingTitle"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Listing Title <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  id="listingTitle"
                  type="text"
                  name="listingTitle"
                  value={formData.listingTitle}
                  onChange={handleChange}
                  placeholder="Enter property title"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
                  Description<span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Write property description"
                  className="w-full min-h-[140px] px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>

                    <InputLabel id="propertyType-label" htmlFor="propertyType">
                      Property Type
                    </InputLabel>

                    <Select
                      name="propertyType"
                      labelId="propertyType-label"
                      id="propertyType-select"
                      inputProps={{ id: "propertyType" }}
                      value={formData.propertyType}
                      label="Property Type"
                      onChange={handleChange}
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: "white",
                      }}
                    >
                      <MenuItem value={"Flat / Apartment"}>
                        Flat / Apartment
                      </MenuItem>

                      <MenuItem value={"House / Villa"}>
                        House / Villa
                      </MenuItem>

                      <MenuItem value={"Independent House"}>
                        Independent House
                      </MenuItem>

                    </Select>
                  </FormControl>
                </Box>
              </div>
              {/* Category */}
              <div className="mb-6">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>

                    <InputLabel id="category-label" htmlFor="category">
                      Property Category
                    </InputLabel>

                    <Select
                      name="category"
                      labelId="category-label"
                      id="category-select"
                      inputProps={{ id: "category" }}
                      value={formData.category}
                      label="Property Category"
                      onChange={handleChange}
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: "white",
                      }}
                    >
                      <MenuItem value={"Unfurnished"}>
                        Unfurnished
                      </MenuItem>

                      <MenuItem value={"Semi-Furnished"}>
                        Semi-Furnished
                      </MenuItem>

                      <MenuItem value={"Furnished"}>
                        Furnished
                      </MenuItem>

                    </Select>
                  </FormControl>
                </Box>
              </div>

              {/* Available Date */}
              <div className="mb-8">
                <label htmlFor="availableFrom" className="block mb-2 text-sm font-semibold text-gray-700">
                  Available From<span className="text-red-500">*</span>
                </label>

                <input
                  id="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  name="availableFrom"
                  type="date"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/list-property/pricing")}
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                >
                  Continue to Pricing

                  <FaLongArrowAltRight className="mt-1" />
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Preview / Info
              </h2>

              <div className="space-y-5">
                {/* Property Preview */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-5 hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <HiOutlineHomeModern size={22} />
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      Property Preview
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500">
                    Your property image and details preview will appear here.
                  </p>
                </div>

                {/* Description Info */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-5 hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-3 rounded-xl text-green-600">
                      <MdOutlineDescription size={22} />
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      Description Info
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500">
                    Add a clear and attractive description to get more viewers.
                  </p>
                </div>

                {/* Location Details */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-5 hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                      <CiLocationOn size={22} />
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      Location Details
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500">
                    Accurate location details help tenants find your property
                    faster.
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Form Progress
                  </span>

                  <span className="text-sm font-semibold text-blue-600">
                    25%
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}