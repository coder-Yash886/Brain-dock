import { X, ExternalLink, Twitter, Youtube, FileText, Link as LinkIcon } from 'lucide-react';
import type { ContentItem } from '../types/content';

interface PreviewModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

const PreviewModal = ({ item, onClose }: PreviewModalProps) => {
  if (!item) return null;

  const getIcon = () => {
    switch (item.type) {
      case 'tweet': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'video': return <Youtube className="w-5 h-5 text-red-500" />;
      case 'document': return <FileText className="w-5 h-5 text-indigo-400" />;
      case 'link': return <LinkIcon className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl relative flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-800 bg-zinc-950/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              {getIcon()}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-2 py-1 bg-zinc-800 rounded-full">
              {item.type}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800 bg-zinc-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {item.title}
          </h2>

          {/* YouTube Embed */}
          {item.link && item.type === 'video' && item.link.includes('youtube.com') && (
            <div className="w-full rounded-xl overflow-hidden border border-zinc-800 bg-black aspect-video mb-6">
              <iframe 
                className="w-full h-full" 
                src={item.link.replace("watch?v=", "embed/")} 
                title="YouTube Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          )}

          {/* Regular Link Button */}
          {item.link && !(item.type === 'video' && item.link.includes('youtube.com')) && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors mb-6 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Link destination
            </a>
          )}

          {/* Content Text (Documents / Tweets notes) */}
          {item.content && (
            <div className="mt-2 bg-zinc-950 p-6 rounded-xl border border-zinc-800/50">
              <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                {item.content}
              </p>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-800/50">
              {item.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-sm text-zinc-300 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
