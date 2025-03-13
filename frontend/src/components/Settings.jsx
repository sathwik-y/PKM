import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoSummary: true,
    summaryLength: 'medium',
    syncFrequency: 'realtime',
    exportFormat: 'json'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="settings">
      <h1>Settings</h1>

      <div className="settings-grid">
        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="setting-item">
            <label>
              Notifications
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              Dark Mode
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>AI Features</h2>
          <div className="setting-item">
            <label>
              Auto Summary
              <input
                type="checkbox"
                checked={settings.autoSummary}
                onChange={(e) => handleChange('autoSummary', e.target.checked)}
              />
            </label>
          </div>
          <div className="setting-item">
            <label>
              Summary Length
              <select
                value={settings.summaryLength}
                onChange={(e) => handleChange('summaryLength', e.target.value)}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Sync & Backup</h2>
          <div className="setting-item">
            <label>
              Sync Frequency
              <select
                value={settings.syncFrequency}
                onChange={(e) => handleChange('syncFrequency', e.target.value)}
              >
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              Export Format
              <select
                value={settings.exportFormat}
                onChange={(e) => handleChange('exportFormat', e.target.value)}
              >
                <option value="json">JSON</option>
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
              </select>
            </label>
          </div>
          <button className="btn export-btn">Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
