import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const MainListProperty = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    listingTitle: '',
    description: '',
    propertyType: '',
    availableFrom: '',
    category: '',

    // Pricing & Location
    monthlyRent: '',
    securityDeposit: '',
    maintenanceFees: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Amenities & Photos
    amenities: [],
    photos: []
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Outlet context={{ formData, updateFormData }} />
  );
};

export default MainListProperty;
