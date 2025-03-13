import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const {isAuthenticated} = useAuth();
  const features = [
    {
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced AI algorithms.'
    },
    {
      title: 'Smart Summaries',
      description: 'Get instant summaries of long articles and documents.'
    },
    {
      title: 'Cross-Platform Sync',
      description: 'Access your knowledge base across all your devices.'
    },
    {
      title: 'Advanced Search',
      description: 'Find anything instantly with our powerful search capabilities.'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>Your Personal Knowledge Hub</h1>
        <p>Organize, store, and retrieve your information effortlessly with AI-powered assistance.</p>
        {isAuthenticated? (
          <>
        <Link to="/dashboard" className="btn">Get Started</Link>
          </>
        ) : (<Link to="/login" className="btn">Get Started</Link>
        )}
      </section>

      <section className="cards-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="card fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
      {isAuthenticated ? (
        <>        
      <section className="drag-drop-area">
        <h2>Start Adding Content</h2>
        <p>Drag and drop files here or use the upload button</p>
        <button className="btn">Upload Files</button>
      </section>
        </>
      ) : (<></>)}
    </div>
  );
};

export default Home;
