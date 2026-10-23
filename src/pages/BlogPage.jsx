import React, { useState } from 'react';
import { Search, Calendar, MessageSquare, ArrowRight, BookOpen, Clock, User, Share2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BlogCard from '../components/BlogCard';
import { BLOG_POSTS } from '../data/clinicData';

export default function BlogPage({ setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Ergonomics', 'Sports Health', 'Spine Wellness'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Page Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <h1>Health Blog & Recovery Articles</h1>
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a>
            <span>/</span>
            <span style={{ color: '#ffffff' }}>Our Blog</span>
          </div>
        </div>
      </div>

      {/* Main Blog Section */}
      <section className="section">
        <div className="container">
          <SectionHeading
            subtitle="Clinical Knowledge"
            title="Insights for Pain-Free Movement and Injury Prevention"
            description="Explore guides written by our doctors covering ergonomics, athletic conditioning, and spinal disc preservation."
          />

          {/* Search and Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <input
                type="text"
                placeholder="Search articles by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.8rem' }}
              />
              <Search size={18} color="var(--bs-gray)" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Category Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-light'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <BookOpen size={48} color="var(--bs-gray)" style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
              <h3>No articles found</h3>
              <p style={{ color: 'var(--bs-gray)' }}>Try searching for a different keyword or category.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onReadPost={(p) => setActiveArticle(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div className="modal-content-box" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--bs-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {activeArticle.category}
              </span>
              <button onClick={() => setActiveArticle(null)} className="modal-close-btn">&times;</button>
            </div>

            <div className="modal-body-content" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
              />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--bs-gray)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--bs-primary)" /> {activeArticle.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="var(--bs-primary)" /> Lead Physical Therapist
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--bs-primary)" /> 4 Min Read
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem', lineHeight: '1.3' }}>
                {activeArticle.title}
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--bs-dark)', lineHeight: '1.7', marginBottom: '1.5rem', fontWeight: '500' }}>
                {activeArticle.snippet}
              </p>

              <div style={{ color: 'var(--bs-gray)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '2rem' }}>
                <p>{activeArticle.content}</p>
                <p>
                  Proper kinetic loading is essential when recovering from musculoskeletal stress. Our physical therapists encourage taking micro-breaks every 45 minutes, hydrating consistently to preserve disc hydration, and engaging in dynamic core stabilizing stretches before starting any prolonged workout or desk session.
                </p>
              </div>

              {/* In-Article Booking Banner */}
              <div style={{ background: 'var(--bs-primary-light)', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: 'var(--bs-dark)' }}>Struggling With Persistent Discomfort?</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--bs-gray-dark)' }}>Schedule an in-person diagnostic evaluation with our specialists.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    setActivePage('appointment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Book Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
