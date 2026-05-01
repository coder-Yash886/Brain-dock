import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Share from './pages/Share';
import Dashboard from './pages/Dashboard';
import { hasValidSession } from './utils/session';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(hasValidSession());

  useEffect(() => {
    const handleAuthChange = () => setIsLoggedIn(hasValidSession());
    // Storage event for other tabs
    window.addEventListener('storage', handleAuthChange);
    // Custom event dispatched on login/logout
    window.addEventListener('authChanged', handleAuthChange as EventListener);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChanged', handleAuthChange as EventListener);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/auth" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Auth />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" replace />} />
        <Route path="/share/:hash" element={<Share />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
