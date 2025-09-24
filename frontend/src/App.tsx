import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProofOfConceptBanner from './components/ProofOfConceptBanner';
import DevSidebar from './components/DevSidebar';
import JobsTaskbar from './components/JobsTaskbar';
import Footer from './components/Footer';
import JobExchangePage from './pages/JobExchangePage';
import JobsPage from './pages/JobsPage';
import PostJobPage from './pages/PostJobPage';
import { useBitcoinOS } from './utils/useBitcoinOS';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { isInOS, setTitle } = useBitcoinOS();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== 'false';
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Set app title when running in Bitcoin OS
  useEffect(() => {
    if (isInOS) {
      setTitle('Bitcoin Jobs');
    }
  }, [isInOS, setTitle]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
    setCurrentUser(null);
    window.location.replace('/');
  };

  return (
    <>
      {!isInOS && <ProofOfConceptBanner />}
      {!isInOS && <DevSidebar />}
      <div className={`${isInOS ? 'app-full-width' : 'app-with-sidebar'}`}>
        {!isInOS && <JobsTaskbar
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogout={handleLogout}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />}
        <div className="App" style={{ paddingTop: isInOS ? '0px' : '68px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/exchange" replace />} />
            <Route path="/exchange" element={
              <JobExchangePage 
                isAuthenticated={isAuthenticated} 
                currentUser={currentUser} 
                onLogout={handleLogout} 
              />
            } />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/developers" element={
              <div className="page-placeholder">
                <h1>Developers Portal</h1>
                <p>Developer profiles and team formation coming soon...</p>
              </div>
            } />
            <Route path="/docs" element={
              <div className="page-placeholder">
                <h1>Documentation</h1>
                <p>Bitcoin Jobs API documentation and guides...</p>
              </div>
            } />
            <Route path="/my-jobs" element={
              <div className="page-placeholder">
                <h1>My Job Listings</h1>
                <p>Manage your posted jobs...</p>
              </div>
            } />
            <Route path="/my-teams" element={
              <div className="page-placeholder">
                <h1>My Teams</h1>
                <p>Manage your development teams...</p>
              </div>
            } />
            <Route path="/about" element={
              <div className="page-placeholder">
                <h1>About Bitcoin Jobs</h1>
                <p>Decentralized job marketplace on Bitcoin SV...</p>
              </div>
            } />
            <Route path="*" element={<Navigate to="/exchange" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;