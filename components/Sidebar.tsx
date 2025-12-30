
import React from 'react';
import { ENDPOINTS } from '../constants';
import { Endpoint } from '../types';

interface SidebarProps {
  activeEndpoint: Endpoint;
  onSelect: (endpoint: Endpoint) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeEndpoint, onSelect }) => {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-screen overflow-hidden">
      <div className="p-6 border-b border-slate-800 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          DramaBox Unofficial
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">API Explorer v2.0</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <h2 className="text-xs font-bold text-slate-500 mb-3 px-2">ENDPOINTS</h2>
        {ENDPOINTS.map((ep) => (
          <button
            key={ep.id}
            onClick={() => onSelect(ep)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group flex items-start gap-3 ${
              activeEndpoint.id === ep.id
                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                : 'text-slate-400 hover:bg-slate-800 border border-transparent'
            }`}
          >
            <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${
              activeEndpoint.id === ep.id ? 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'bg-slate-700'
            }`} />
            <div className="flex flex-col">
              <span className="font-medium truncate">{ep.path}</span>
              <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {ep.id.toLowerCase().replace('_', ' ')}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Real-time Scraping Active</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
