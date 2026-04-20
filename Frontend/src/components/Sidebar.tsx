import { Brain, Twitter, Youtube, FileText, Link, Share2 } from 'lucide-react';
import React from 'react';

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onShare: () => void;
}

const Sidebar = ({ activeFilter, onFilterChange, onShare }: SidebarProps) => {
  return (
    <div className="w-64 fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col p-4">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8 mt-2 cursor-pointer" onClick={() => onFilterChange('all')}>
        <Brain className="w-8 h-8 text-indigo-500" />
        <span className="text-xl font-bold text-white tracking-tight">MindVault</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavItem onClick={() => onFilterChange('all')} icon={<Brain className="w-5 h-5" />} label="All Notes" active={activeFilter === 'all'} />
        <NavItem onClick={() => onFilterChange('tweet')} icon={<Twitter className="w-5 h-5" />} label="Tweets" active={activeFilter === 'tweet'} />
        <NavItem onClick={() => onFilterChange('video')} icon={<Youtube className="w-5 h-5" />} label="Videos" active={activeFilter === 'video'} />
        <NavItem onClick={() => onFilterChange('document')} icon={<FileText className="w-5 h-5" />} label="Documents" active={activeFilter === 'document'} />
        <NavItem onClick={() => onFilterChange('link')} icon={<Link className="w-5 h-5" />} label="Links" active={activeFilter === 'link'} />
      </nav>

      {/* Share Button (Bottom) */}
      <div className="mt-auto">
        <button onClick={onShare} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all rounded-lg p-3 text-sm font-medium text-white shadow-xl shadow-indigo-500/5 cursor-pointer">
          <Share2 className="w-4 h-4 text-indigo-400" />
          Share Brain
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
        active 
          ? 'bg-indigo-500/10 text-indigo-400' 
          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Sidebar;
