import { X } from 'lucide-react';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config/api';

interface AddContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddContentModal = ({ open, onClose, onSuccess }: AddContentModalProps) => {
  const [type, setType] = useState('document');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        type,
        title,
        link: link || undefined,
        content: content || undefined,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await axios.post(`${API_BASE_URL}/content`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setTitle('');
        setLink('');
        setContent('');
        setTags('');
        onSuccess();
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Failed to add content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-zinc-900/50">
          <h2 className="text-xl font-semibold text-white">Add Knowledge</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 transition-all"
            >
              <option value="document">Document</option>
              <option value="tweet">Tweet</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Project Ideas"
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 transition-all"
            />
          </div>

          {(type === 'tweet' || type === 'video' || type === 'link') && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">URL / Link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 transition-all"
              />
            </div>
          )}

          {(type === 'document' || type === 'tweet') && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">Content / Notes</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder="Type your notes here..."
                className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 transition-all resize-none"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. ideas, work, personal"
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 transition-all"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Knowledge'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;
