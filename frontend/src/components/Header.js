import React from 'react';
import './Header.css';

function Header({ stats }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>📚 Academic Publishing Platform</h1>
          <p>Decentralized Research Publishing on Stellar Blockchain</p>
        </div>
        {stats && (
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-label">Papers</span>
              <span className="stat-value">{stats.total_papers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Authors</span>
              <span className="stat-value">{stats.total_authors}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Published Today</span>
              <span className="stat-value">{stats.papers_published_today}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
