import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Phone, Menu, X, ChevronDown, User, BookOpen } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleToggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          {/* Logo Brand: Freestanding 3D Emblem with Clean Typography */}
          <a
            href="#home"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <img
              src="/logo.png?v=full"
              alt="NT PHYSIOTHERAPY CLINIC"
              className="navbar-brand-logo"
              style={{
                height: '54px',
                width: 'auto',
                borderRadius: '10px',
                objectFit: 'contain',
                display: 'block',
                flexShrink: 0
              }}
            />
            <div className="navbar-brand-text">
              <span className="navbar-brand-title">
                NT PHYSIOTHERAPY
              </span>
              <span className="navbar-brand-sub">
                CLINIC
              </span>
            </div>
          </a>

          {/* Navigation Menu (Home, About, Services, Pages ⌄, Contact Us) */}
          <ul className={`nav-menu ${mobileOpen ? 'mobile-open' : ''}`}>
            <li>
              <a
                href="#home"
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
              >
                Services
              </a>
            </li>
            <li
              ref={dropdownRef}
              className="nav-dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#pages"
                className={`nav-link nav-dropdown-toggle ${['team', 'appointment', 'blog'].includes(activePage) ? 'active' : ''}`}
                onClick={handleToggleDropdown}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span>Pages</span>
                <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`} />
              </a>
              {dropdownOpen && (
                <div
                  className="nav-dropdown-menu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="#team"
                    className={`nav-dropdown-item ${activePage === 'team' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick('team'); }}
                  >
                    <User size={15} color="#128C7E" />
                    <span>Doctor Profile</span>
                  </a>
                  <a
                    href="#appointment"
                    className={`nav-dropdown-item ${activePage === 'appointment' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick('appointment'); }}
                  >
                    <Calendar size={15} color="#128C7E" />
                    <span>Book Appointment</span>
                  </a>
                  <a
                    href="#blog"
                    className={`nav-dropdown-item ${activePage === 'blog' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}
                  >
                    <BookOpen size={15} color="#128C7E" />
                    <span>Clinical Blog</span>
                  </a>
                </div>
              )}
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                Contact Us
              </a>
            </li>
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Direct Call Button (Visible on desktop) */}
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="btn btn-secondary"
              style={{ display: 'none', md: 'inline-flex' }}
              title="Call Clinic Directly"
            >
              <Phone size={15} color="var(--bs-primary)" />
              <span>{CLINIC_INFO.phone}</span>
            </a>

            {/* Book Consultation Primary CTA */}
            <button
              onClick={() => handleNavClick('appointment')}
              className="btn btn-primary"
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Menu Toggler */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
