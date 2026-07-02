import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/auth/AuthPage';
import Register from './features/auth/Register';
// PREVIOUS IMPORTS: There was only ResetPassword which served as the enter-email form, and no separate ForgotPassword component.
// import ResetPassword from './features/auth/ResetPassword';
import ForgotPassword from './features/auth/ForgotPassword'; // Page 1: Enter email
import ResetPassword from './features/auth/ResetPassword';   // Page 2: Enter new password with token
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
        {/* PREVIOUS ROUTE: /reset-password was configured to render the enter-email form directly. */}
        {/* We have now separated them into /forgot-password (Page 1) and /reset-password (Page 2) */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
