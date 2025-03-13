import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import api from '../services/api';
import { format } from 'date-fns';

const Dashboard = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        const data = response.data;
        console.log('API Response:', data); // Add this line to debug
        // Recent Items
        const formattedItems = Array.isArray(data.recentItems) ? data.recentItems.map(item => ({
          id: item.contentId,
          title: item.title,
          category: item.category || 'Uncategorized',
          date: format(new Date(item.createdAt), 'MMM d, yyyy, h:mm a') || 'Unknown'
        })) : []
        setRecentItems(formattedItems);

        const categoryCounts = formattedItems.reduce((acc, item) => {
          const category = item.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        const categoryColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
        setCategories(
          Object.keys(categoryCounts).length > 0
            ? Object.entries(categoryCounts).map(([name, count], index) => ({
                name,
                count,
                color: categoryColors[index % categoryColors.length]
              }))
            : []
        );
        setStats({ 
          totalItems: data.totalItems || 0,
          overdueReminders: data.overdueReminders || 0
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data: ' + err.message);
        setLoading(false);
        console.error('Dashboard fetch error: ', err);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="loading-indicator">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="stat-number">{stats.totalItems}</p>
        </div>
        <div className="stat-card">
          <h3>Overdue Reminders</h3>
          <p className="stat-number">{stats.overdueReminders}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-items">
          <h2>Recent Items</h2>
          <div className="items-list">
            {recentItems.length > 0 ? (
              recentItems.map(item => (
                <div key={item.id} className="item-card fade-in">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                  <span>{item.date}</span>
                </div>
              ))
            ) : (
              <p>No recent items available.</p> 
            )}
          </div>
        </div>

        <div className="categories-panel">
          <h2>Categories</h2>
          <div className="categories-list">
            {categories.length > 0 ? (
              categories.map(category => (
                <div key={category.name} className="category-item">
                  <div className="category-header">
                    <span className="category-dot" style={{ backgroundColor: category.color }}></span>
                    <h3>{category.name}</h3>
                  </div>
                  <p>{category.count}</p>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;