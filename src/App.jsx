import React, { useState, useEffect } from 'react';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import AppointmentPage from './pages/AppointmentPage';
import TeamPage from './pages/TeamPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Remove dark theme attributes and clear stored theme preferences
    document.documentElement.removeAttribute('data-theme');
    try {
      localStorage.removeItem('nt_physio_theme');
      localStorage.removeItem('nt_physio_theme_v2');
      localStorage.removeItem('auratherapy_theme');
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  const handleSelectService = (service) => {
    setSelectedDepartment(service.category);
    setActivePage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setActivePage('appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = () => {
    setActivePage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookDepartment = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="app-root">
      {/* 1. Global Topbar */}
      <Topbar />

      {/* 2. Global Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* 3. Main Page Content View */}
      <main id="main-content">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onSelectService={handleSelectService}
            onSelectDoctor={handleSelectDoctor}
            onSelectBlog={handleSelectBlog}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            onSelectDoctor={handleSelectDoctor}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            setActivePage={setActivePage}
            onSelectService={handleSelectService}
            onBookDepartment={handleBookDepartment}
          />
        )}

        {activePage === 'appointment' && (
          <AppointmentPage
            setActivePage={setActivePage}
            selectedDepartment={selectedDepartment}
          />
        )}

        {activePage === 'team' && (
          <TeamPage
            setActivePage={setActivePage}
            onSelectDoctor={handleSelectDoctor}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            setActivePage={setActivePage}
          />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer setActivePage={setActivePage} />

      {/* 5. Floating Actions: WhatsApp & Back To Top */}
      <FloatingActions />
    </div>
  );
}
