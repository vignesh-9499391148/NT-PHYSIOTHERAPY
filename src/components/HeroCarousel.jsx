import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: "In-Clinic & Home Visits Available",
    title: "Best Clinical Solution For A Pain-Free Life",
    desc: "Evidence-based physical therapy, hands-on manual therapy, and dedicated home visit care designed to restore natural movement and eliminate chronic discomfort.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    primaryCta: "Book Appointment",
    secondaryCta: "Our Services"
  },
  {
    id: 2,
    tag: "Doorstep Care • Home Visit Available",
    title: "Doctor-Led Physiotherapy In The Comfort of Your Home",
    desc: "Can't travel to our clinic? Dr. Yuvanraj DN, BPT provides personalized home visit physiotherapy for post-surgery rehabilitation, stroke recovery, and elderly mobility care across Vadamadurai & Dindigul.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80",
    primaryCta: "Book Home Visit",
    secondaryCta: "Our Services"
  },
  {
    id: 3,
    tag: "Advanced Spine & Sports Recovery",
    title: "Get Your Active Lifestyle & Strength Back",
    desc: "Dedicated 1-on-1 personalized recovery plans led directly by Dr. Yuvanraj DN, BPT, with zero wait times and comprehensive kinetic retraining.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80",
    primaryCta: "Book Appointment",
    secondaryCta: "Meet Our Doctor"
  }
];

export default function HeroCarousel({ setActivePage }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="hero-slider"
      style={{
        backgroundImage: `linear-gradient(rgba(23, 24, 40, 0.75), rgba(23, 24, 40, 0.75)), url('${slide.image}')`,
        transition: 'background-image 0.8s ease-in-out'
      }}
    >
      <div className="container">
        <div className="hero-content">
          <span className="hero-subtitle-tag">{slide.tag}</span>
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-description">{slide.desc}</p>
          
          <div className="hero-buttons">
            <button
              onClick={() => setActivePage('appointment')}
              className="btn btn-primary btn-lg"
            >
              <Calendar size={18} />
              <span>{slide.primaryCta}</span>
            </button>
            <button
              onClick={() => setActivePage(currentSlide === 0 ? 'services' : 'team')}
              className="btn btn-light btn-lg"
            >
              <span>{slide.secondaryCta}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '3rem' }}>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="btn-circle"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none', cursor: 'pointer' }}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="btn-circle"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none', cursor: 'pointer' }}
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
