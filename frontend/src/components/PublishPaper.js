import React, { useState } from 'react';
import './PublishPaper.css';

function PublishPaper({ onPublish }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content_hash: '',
    content_preview: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.content_hash) {
      setMessageType('error');
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    const success = await onPublish(formData);

    if (success) {
      setMessageType('success');
      setMessage('🎉 Paper published successfully!');
      setFormData({
        title: '',
        author: '',
        content_hash: '',
        content_preview: '',
      });
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessageType('error');
      setMessage('Failed to publish paper. Please try again.');
    }

    setLoading(false);
  };

  const generateContentHash = () => {
    const hash = 'QmV' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setFormData((prev) => ({
      ...prev,
      content_hash: hash,
    }));
  };

  return (
    <div className="publish-container">
      <div className="publish-paper">
        <div className="publish-header">
          <h2>✍️ Publish Your Research</h2>
          <p>Share your academic work on the Stellar blockchain</p>
        </div>

        <form onSubmit={handleSubmit} className="publish-form">
          <div className="form-group">
            <label htmlFor="title">Paper Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the title of your paper"
              maxLength={200}
            />
            <span className="char-count">{formData.title.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name or research institution"
              maxLength={100}
            />
            <span className="char-count">{formData.author.length}/100</span>
          </div>

          <div className="form-group">
            <label htmlFor="content_hash">Content Hash (IPFS) *</label>
            <div className="hash-input-group">
              <input
                type="text"
                id="content_hash"
                name="content_hash"
                value={formData.content_hash}
                onChange={handleChange}
                placeholder="IPFS hash (e.g., QmXxxx...)"
              />
              <button
                type="button"
                className="generate-hash-button"
                onClick={generateContentHash}
              >
                Generate Sample
              </button>
            </div>
            <small>
              Upload your paper to IPFS and paste the hash here
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="content_preview">Preview (Optional)</label>
            <textarea
              id="content_preview"
              name="content_preview"
              value={formData.content_preview}
              onChange={handleChange}
              placeholder="Brief preview or abstract of your paper..."
              rows={5}
              maxLength={500}
            />
            <span className="char-count">
              {formData.content_preview.length}/500
            </span>
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Publishing...' : '🚀 Publish to Blockchain'}
          </button>
        </form>

        <div className="publish-info">
          <h3>📋 Publishing Information</h3>
          <ul>
            <li>
              <strong>Smart Contract:</strong> CDDOFRJSIYSF5QD2KFYNE4BPZPBH7YWJKOIXQC2M7JBX7LMYL7OK5FCT
            </li>
            <li>
              <strong>Network:</strong> Stellar Testnet
            </li>
            <li>
              <strong>Storage:</strong> IPFS or decentralized storage
            </li>
            <li>
              <strong>Accessibility:</strong> Publicly readable on blockchain
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PublishPaper;
