import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/common/Navbar';
import Footer from './Components/common/Footer';
import HomePage from './Components/pages/HomePage';
import ActivityPage from './Components/pages/ActivityPage';
import AboutPage from './Components/pages/AboutPage';
import ContactPage from './Components/pages/ContactPage';
import BookingSection from './Components/sections/BookingSection';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingSection />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;