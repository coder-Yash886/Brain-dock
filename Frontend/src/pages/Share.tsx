import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Brain, ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import type { ContentItem } from '../types/content';
import { API_BASE_URL } from '../config/api';

const Share = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/brain/${hash}`);
        if (res.data.success) {
          setContents(res.data.data.contents);
          setUsername(res.data.data.username);
        }
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || 'Failed to load shared vault');
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedBrain();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-zinc-400">
          <Brain className="w-8 h-8 text-indigo-500 animate-pulse" />
          <p>Accessing Vault...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl border border-red-500/20 max-w-md">
          <h2 className="text-xl font-semibold mb-2">Vault Unavailable</h2>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-2 w-full"
          >
            <ArrowLeft className="w-4 h-4" /> Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/50 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-indigo-500" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-tight">MindVault</span>
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Shared Access</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/auth')}
          className="text-sm font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Create your own
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            <span className="text-indigo-400 capitalize">{username}'s</span> Vault
          </h1>
          <p className="text-lg text-zinc-400">
            Exploring {contents.length} curated thoughts and links.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {contents.map((item) => (
             <Card 
               key={item._id}
               type={item.type}
               title={item.title}
               link={item.link}
               tags={item.tags}
               // No onDelete passed because it's read-only
             />
          ))}
          
          {contents.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-zinc-800 text-zinc-500 bg-zinc-900/20 text-lg">
              This vault is currently empty.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Share;
