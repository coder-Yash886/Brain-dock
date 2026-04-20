import { Brain, Twitter, Youtube, FileText, Link, Share2 } from 'lucide-react';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col p-4">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8 mt-2">
        <Brain className="w-8 h-8 text-indigo-500" />
        <span className="text-xl font-bold text-white tracking-tight">MindVault</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavItem icon={<Brain className="w-5 h-5" />} label="All Notes" active />
        <NavItem icon={<Twitter className="w-5 h-5" />} label="Tweets" />
        <NavItem icon={<Youtube className="w-5 h-5" />} label="Videos" />
        <NavItem icon={<FileText className="w-5 h-5" />} label="Documents" />
        <NavItem icon={<Link className="w-5 h-5" />} label="Links" />
      </nav>

      {/* Share Button (Bottom) */}
      <div className="mt-auto">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all rounded-lg p-3 text-sm font-medium text-white">
          <Share2 className="w-4 h-4 text-indigo-400" />
          Share Brain
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
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
