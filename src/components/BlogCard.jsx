import React from 'react';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';

export default function BlogCard({ post, onReadPost }) {
  return (
    <div className="blog-card">
      <div className="blog-img-wrapper">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="blog-tag">{post.category}</span>
      </div>
      <div className="blog-body">
        <div className="blog-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="var(--bs-primary)" />
            {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={14} color="var(--bs-primary)" />
            {post.comments} Comments
          </span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.snippet}</p>
        
        <button
          onClick={() => onReadPost(post)}
          className="btn btn-primary btn-sm"
        >
          <span>Read Full Article</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
