import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, X, Copy, Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import AddContentModal from '../components/AddContentModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/content', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContents(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const handleShare = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/brain/share', { share: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        // Assume frontend is on localhost:5173
        setShareUrl(`http://localhost:5173/share/${res.data.data.hash}`);
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

  const visibleContents = contents.filter(c => activeFilter === 'all' || c.type === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      <Sidebar 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        onShare={handleShare}
      />

      {/* Main Content Area (Sidebar ke aage) */}
      <div className="flex-1 ml-64 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10 pt-2">
          <h1 className="text-3xl font-bold text-white tracking-tight h-[40px] capitalize">
            {activeFilter === 'all' ? 'Welcome to your Mind' : `${activeFilter}s`}
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-5 h-5" />
              Add Knowledge
            </button>
            <button 
              onClick={handleLogout} 
              className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Bento Grid layout for cards */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          
          {visibleContents.map((item) => (
             <Card 
               key={item._id}
               type={item.type as any}
               title={item.title}
               link={item.link}
               tags={item.tags}
               onDelete={async () => {
                 const token = localStorage.getItem('token');
                 await axios.delete(`http://localhost:5000/api/content/${item._id}`, {
                   headers: { Authorization: `Bearer ${token}` }
                 });
                 fetchContent();
               }}
             />
          ))}

          {/* Fallback Dummy Items if no real content */}
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
