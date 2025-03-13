import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const{ isAuthenticated,logout } = useAuth();
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>  
      {/* Remove the head tag - use React Helmet instead if needed */}
      <nav>
        <div className="nav-content">
          <Link to="/" className="logo">PKM<span>Manager</span></Link>
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/" className={isActive('/')}>Home</Link>
                <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                <Link to="/knowledge-base" className={isActive('/knowledge-base')}>Knowledge Base</Link>
                <Link to="/settings" className={isActive('/settings')}>Settings</Link>
                <button onClick={logout} className='btn'>Logout</button>
              </>
            ): (
              <>
                <Link to="/" className={isActive('/')}>Home</Link>
                <Link to="/login" className="btn">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="main-content">
        <div className="gradient-bg" />
        <Outlet/>
      </main>
    </>
  );
};

export default Layout;
