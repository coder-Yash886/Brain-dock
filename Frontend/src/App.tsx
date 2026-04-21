import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Share from './pages/Share';
import Dashboard from './pages/Dashboard';
import { hasValidSession } from './utils/session';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={hasValidSession() ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/auth" element={hasValidSession() ? <Navigate to="/dashboard" replace /> : <Auth />} />
        <Route path="/dashboard" element={hasValidSession() ? <Dashboard /> : <Navigate to="/auth" replace />} />
        <Route path="/share/:hash" element={<Share />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
