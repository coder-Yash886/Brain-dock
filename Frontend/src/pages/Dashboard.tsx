import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, X, Copy, Check, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import AddContentModal from '../components/AddContentModal';
import PreviewModal from '../components/PreviewModal';
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import type { ContentItem } from '../types/content';
import { API_BASE_URL } from '../config/api';
import { clearSession } from '../utils/session';

const Dashboard = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(() => {
    const cachedUser = localStorage.getItem('user');
    return cachedUser ? JSON.parse(cachedUser) : null;
  });

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    contents.forEach(item => {
      if (item.tags) {
        item.tags.forEach((t: string) => tags.add(t));
      }
    });
    return Array.from(tags).sort();
  }, [contents]);

  const handleLogout = useCallback(() => {
    clearSession();
    window.location.assign('/auth');
  }, []);

  const fetchContent = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth', { replace: true });
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/content`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContents(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  const fetchMe = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const nextUser = {
          username: res.data.data.username,
          email: res.data.data.email
        };
        setUser(nextUser);
        localStorage.setItem('user', JSON.stringify(nextUser));
      }
    } catch (error) {
      console.error(error);
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMe();
    fetchContent();
  }, [fetchMe, fetchContent]);

  const handleShare = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE_URL}/brain/share`, { share: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        
        setShareUrl(`${window.location.origin}/share/${res.data.data.hash}`);
      }
    } catch (error) {
      console.error("Error generating share link", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visibleContents = contents.filter(c => 
    activeFilter === 'all' || 
    c.type === activeFilter || 
    (c.tags && c.tags.includes(activeFilter))
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      <Sidebar 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        onShare={handleShare}
        tags={uniqueTags}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8 lg:mb-10 pt-2 flex flex-col gap-4 sm:gap-5">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg border border-zinc-800"
                title="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight capitalize">
                {activeFilter === 'all' ? 'Welcome to your Mind' : `${activeFilter}s`}
              </h1>
            </div>
            <button 
              onClick={() => setModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 lg:px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-5 h-5" />
              Add Knowledge
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button 
              onClick={() => setModalOpen(true)}
              className="sm:hidden flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-5 h-5" />
              Add Knowledge
            </button>
            <div className="sm:ml-auto flex items-center justify-between sm:justify-end gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <div>
                <p className="text-sm font-semibold text-white">
                  {user?.username ?? 'User'}
                </p>
                <p className="text-xs text-zinc-400 break-all">
                  {user?.email ?? 'Loading profile...'}
                </p>
              </div>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-700"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Bento Grid layout for cards */}
        <div className="columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-4">
          
          {visibleContents.map((item) => (
             <Card 
               key={item._id}
               type={item.type}
               title={item.title}
               link={item.link}
               tags={item.tags}
               onClick={() => setPreviewItem(item)}
               onDelete={async () => {
                 const token = localStorage.getItem('token');
                 await axios.delete(`${API_BASE_URL}/content/${item._id}`, {
                   headers: { Authorization: `Bearer ${token}` }
                 });
                 fetchContent();
               }}
             />
          ))}

          
          {contents.length === 0 && (
            <div className="col-span-full p-10 flex text-center justify-center items-center rounded-xl border border-dashed border-zinc-800 text-zinc-500">
              Your mind vault is empty. Click 'Add Knowledge' to store something!
            </div>
          )}
        </div>
      </div>

      <AddContentModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={() => {
          setModalOpen(false);
          fetchContent();
        }}
      />

      <PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />

      {/* Share Brain Overlay Modal */}
      {shareUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl relative p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-white">Share your Brain</h2>
              <button onClick={() => setShareUrl('')} className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-zinc-400">
              Anyone with this link can view your entire MindVault collection.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <input 
                type="text" 
                readOnly 
                value={shareUrl} 
                className="flex-1 rounded-lg bg-zinc-950 border border-zinc-800 p-3 text-sm text-indigo-300 outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className="bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg text-white transition-colors flex items-center justify-center"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
