import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function ListPropertyPricing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { formData, updateFormData } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value,
    });
  };

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
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        <div className="p-4 md:p-8 space-y-6">
          {/* Pricing Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Pricing Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Rent */}
              <div>
                <label htmlFor="monthlyRent" className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Rent / Pricing per month<span className="text-red-500">*</span>
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-4 bg-gray-50 text-gray-500 font-medium">
                    ₹
                  </span>

                  <input
                    id="monthlyRent"
                    type="number"
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full h-12 px-4 outline-none"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Security Deposit */}
              <div>
                <label htmlFor="securityDeposit" className="block text-sm font-semibold text-gray-700 mb-2">
                  Security Deposit
                </label>

                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-4 bg-gray-50 text-gray-500 font-medium">
                    ₹
                  </span>

                  <input
                    id="securityDeposit"
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full h-12 px-4 outline-none"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            {/* Maintenance Fees */}
            <div className="mt-6">
              <label htmlFor="maintenanceFees" className="block text-sm font-semibold text-gray-700 mb-2">
                Maintenance Fees (Optional)
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-4 bg-gray-50 text-gray-500 font-medium">
                  ₹
                </span>

                <input
                  id="maintenanceFees"
                  type="number"
                  name="maintenanceFees"
                  value={formData.maintenanceFees}
                  onChange={handleChange}
                  placeholder="Enter maintenance fees"
                  className="w-full h-12 px-4 outline-none"
                  autoComplete="off"
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Including garbage collection, landscaping, and building
                security.
              </p>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Location Details
            </h2>

            {/* Address */}
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 1<span className="text-red-500">*</span>
              </label>

              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter property address"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="street-address"
              />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City<span className="text-red-500">*</span>
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="address-level2"
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State / Province<span className="text-red-500">*</span>
                </label>

                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="address-level1"
                />
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                Zip Code / Postal Code<span className="text-red-500">*</span>
              </label>

              <input
                id="zipCode"
                type="number"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="000000"
                className="w-full md:w-1/2 h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="postal-code"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pb-10">
            <Link
              to="/list-property/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition-all duration-300 font-medium text-gray-700"
            >
              <FaArrowLeft />
              Back to Basic Info
            </Link>

            <Link
              to="/list-property/amenities"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-medium shadow-md"
            >
              Continue to Amenities
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}