import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { CVManager } from './pages/CVManager';
import { Companies } from './pages/Companies';
import { CompanyDetails } from './pages/CompanyDetails';
import { Jobs } from './pages/Jobs';
import { JobDetails } from './pages/JobDetails';
import { Applications } from './pages/Applications';
import { ApplicationAssistant } from './pages/ApplicationAssistant';
import { SavedJobs } from './pages/SavedJobs';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 960);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 960) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen && window.innerWidth > 960 ? 'var(--sidebar-width)' : '0'
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cv-manager" element={<CVManager />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/assistant" element={<ApplicationAssistant />} />
            <Route path="/saved" element={<SavedJobs />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
