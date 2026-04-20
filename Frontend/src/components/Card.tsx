import { Twitter, Youtube, FileText, Link as LinkIcon, Trash2 } from 'lucide-react';

interface CardProps {
  type: 'tweet' | 'video' | 'document' | 'link';
  title: string;
  tags?: string[];
  link?: string;
  onClick?: () => void;
  onDelete?: () => void;
}

const Card = ({ type, title, tags, link, onClick, onDelete }: CardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'tweet': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'video': return <Youtube className="w-5 h-5 text-red-500" />;
      case 'document': return <FileText className="w-5 h-5 text-indigo-400" />;
      case 'link': return <LinkIcon className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`group relative break-inside-avoid mb-4 rounded-xl bg-zinc-900 border border-zinc-800 p-5 hover:border-zinc-700 transition-all flex flex-col gap-4 shadow-sm hover:shadow-lg hover:shadow-black/20 ${onClick ? 'cursor-pointer' : ''}`}
    >
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800/50">
            {getIcon()}
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {type}
          </span>
        </div>
        {onDelete && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-zinc-200 leading-snug">
          {title}
        </h3>
        
        {/* Youtube Embed Layout */}
        {link && type === 'video' && link.includes('youtube.com') && (
          <div className="mt-4 rounded-lg overflow-hidden border border-zinc-800">
            <iframe 
              className="w-full aspect-video" 
              src={link.replace("watch?v=", "embed/")} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        )}
        
        {/* Generic Link Fallback */}
        {link && !(type === 'video' && link.includes('youtube.com')) && (
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="mt-3 flex items-center text-sm text-indigo-400 hover:text-indigo-300 break-all border border-indigo-500/20 bg-indigo-500/5 p-2 rounded-md hover:bg-indigo-500/10 transition-colors">
            {link}
          </a>
        )}
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-400 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
