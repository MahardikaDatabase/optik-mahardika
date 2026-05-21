import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import Hero from './components/LandingPage/Hero';
import TrustBar from './components/LandingPage/TrustBar';
import About from './components/LandingPage/About';
import Insurance from './components/LandingPage/Insurance';
import Services from './components/LandingPage/Services';
import Promo from './components/LandingPage/Promo';
import Products from './components/LandingPage/Products';
import Footer from './components/LandingPage/Footer';
import LoginPage from './components/Login/LoginPage';
import DashboardLayout from './components/DashboardAdmin/DashboardLayout';
import DashboardOverview from './components/DashboardAdmin/DashboardOverview';
import EditProduk from './components/EditProduk/EditProduk';
import EditPromo from './components/EditPromo/EditPromo';
import EditSettingAdmin from './components/EditSettingAdmin/EditSettingAdmin';
import ECatalogue from './components/ECatalogue/ECatalogue';
import LuckyWheelPage from './components/LuckyWheel/LuckyWheelPage';
import LuckyWheelAdmin from './components/LuckyWheel/LuckyWheelAdmin';
import { AppDataContext } from './context/AppDataContext';

const LandingPage = () => (
  <div className="App">
    <Navbar />
    <main>
      <Hero />
      <TrustBar />
      <About />
      <Insurance />
      <Services />
      <Promo />
      <Products />
    </main>
    <Footer />
  </div>
);

// Route given only to unauthenticated users (Guests)
const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppDataContext);
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children ? children : <Outlet />;
};

// Route given only to authenticated users (Admins)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppDataContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <GuestRoute>
          <LandingPage />
        </GuestRoute>
      } />
      
      <Route path="/login" element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      } />

      <Route path="/catalogue" element={
        <GuestRoute>
          <ECatalogue />
        </GuestRoute>
      } />

      <Route path="/lucky-wheel" element={
        <GuestRoute>
          <LuckyWheelPage />
        </GuestRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardOverview />} />
        <Route path="products" element={<EditProduk />} />
        <Route path="promo" element={<EditPromo />} />
        <Route path="lucky-wheel" element={<LuckyWheelAdmin />} />
        <Route path="settings" element={<EditSettingAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;

