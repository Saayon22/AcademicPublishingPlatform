import React from 'react';
import './PaperList.css';

function PaperList({ papers, onViewPaper }) {
  if (papers.length === 0) {
    return (
      <div className="no-papers">
        <p>📭 No papers found. Be the first to publish!</p>
      </div>
    );
  }

  return (
    <div className="paper-list">
      <h2>Published Papers ({papers.length})</h2>
      <div className="papers-grid">
        {papers.map((paper) => (
          <div key={paper.id} className="paper-card">
            <div className="paper-header">
              <h3 className="paper-title">{paper.title}</h3>
              <span className="paper-id">#{paper.id}</span>
            </div>

            <p className="paper-author">by {paper.author}</p>

            <div className="paper-content-preview">
              {paper.content_preview || paper.content_hash.substring(0, 80) + '...'}
            </div>

            <div className="paper-meta">
              <div className="meta-item">
                <span className="meta-label">Hash</span>
                <span className="meta-value" title={paper.content_hash}>
                  {paper.content_hash.substring(0, 16)}...
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Published</span>
                <span className="meta-value">
                  {new Date(paper.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="paper-stats">
              <div className="paper-stat">
                <span>👁️ {paper.views || 0}</span>
              </div>
              <div className="paper-stat">
                <span>📌 {paper.citations || 0}</span>
              </div>
            </div>

            <button
              className="view-button"
              onClick={() => onViewPaper(paper.id)}
            >
              View Paper →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaperList;
