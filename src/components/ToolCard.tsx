import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const getBadgeStyles = () => {
    if (tool.badge?.type === 'new') {
      return 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400';
    }
    if (tool.badge?.type === 'free') {
      return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    }
    return 'bg-gray-800 text-gray-400';
  };

  return (
    <div 
      className="group relative bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-4 right-4">
        {tool.badge && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getBadgeStyles()}`}>
            {tool.badge.text}
          </span>
        )}
      </div>
      
      <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center mb-4">
        <span className={`text-2xl ${tool.colorClass}`}>{tool.icon}</span>
      </div>
      
      <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-400 transition-colors">
        {tool.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex items-center text-indigo-400 text-sm font-medium">
        <span>Open Tool</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
    </div>
  );
};

export default ToolCard;
