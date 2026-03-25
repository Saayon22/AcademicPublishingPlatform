import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PaperList from './components/PaperList';
import PublishPaper from './components/PublishPaper';
import Statistics from './components/Statistics';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [papers, setPapers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPapers, setFilteredPapers] = useState([]);

  useEffect(() => {
    fetchPapers();
    fetchStats();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPapers(papers);
    } else {
      setFilteredPapers(
        papers.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, papers]);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/papers`);
      setPapers(response.data.papers);
    } catch (error) {
      console.error('Error fetching papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handlePublishPaper = async (paperData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/papers/publish`, paperData);
      if (response.data.success) {
        setPapers([...papers, response.data.paper]);
        setStats({
          ...stats,
          total_papers: stats.total_papers + 1,
        });
        setActiveTab('browse');
        return true;
      }
    } catch (error) {
      console.error('Error publishing paper:', error);
      return false;
    }
  };

  const handleViewPaper = async (paperId) => {
    try {
      await axios.post(`${API_BASE_URL}/papers/${paperId}/view`);
      fetchPapers();
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  return (
    <div className="app">
      <Header stats={stats} />

      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            📚 Browse Papers
          </button>
          <button
            className={`tab-button ${activeTab === 'publish' ? 'active' : ''}`}
            onClick={() => setActiveTab('publish')}
          >
            ✍️ Publish Paper
          </button>
        </div>

        {activeTab === 'browse' && (
          <div className="browse-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search papers by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {stats && (
              <Statistics stats={stats} />
            )}

            {loading ? (
              <div className="loading">Loading papers...</div>
            ) : (
              <PaperList
                papers={filteredPapers}
                onViewPaper={handleViewPaper}
              />
            )}
          </div>
        )}

        {activeTab === 'publish' && (
          <PublishPaper onPublish={handlePublishPaper} />
        )}
      </div>

      <footer className="footer">
        <p>
          🌐 Academic Publishing Platform • Built on Stellar Soroban • Contract:{' '}
          <code>CDDOFRJSIYSF5QD2KFYNE4BPZPBH7YWJKOIXQC2M7JBX7LMYL7OK5FCT</code>
        </p>
      </footer>
    </div>
  );
}

export default App;
