import React from 'react';
import './Statistics.css';

function Statistics({ stats }) {
  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <h3>Total Papers</h3>
          <p className="stat-number">{stats.total_papers}</p>
          <span className="stat-description">Published on blockchain</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <h3>Authors</h3>
          <p className="stat-number">{stats.total_authors}</p>
          <span className="stat-description">Contributing researchers</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📅</div>
        <div className="stat-content">
          <h3>Today</h3>
          <p className="stat-number">{stats.papers_published_today}</p>
          <span className="stat-description">Papers published today</span>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
