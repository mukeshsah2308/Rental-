import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/auth/AuthPage';
import Register from './features/auth/Register';
import ResetPassword from './features/auth/ResetPassword';
import VerifyEmail from './features/auth/VerifyEmail';
import Dashboard from './pages/Dashboard';
import ListProperty from './pages/ListProperty';
import ListPropertyPricing from './pages/ListPropertyPricing';
import ListPropertyAmenities from './pages/ListPropertyAmenities';
import MainListProperty from './pages/MainListProperty';
import { Toaster } from 'react-hot-toast';
import PropertyUpload from './pages/PropertyUpload'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage type="user" />} />
        <Route path="/admin" element={<AuthPage type="admin" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/list-property" element={<MainListProperty />}>
          <Route index element={<ListProperty />} />
          <Route path="pricing" element={<ListPropertyPricing />} />
          <Route path="amenities" element={<ListPropertyAmenities />} />
          <Route path="upload" element={<PropertyUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
