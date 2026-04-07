import React, { useState } from 'react';
import ToolCard from '../components/ToolCard';
import { Tool } from '../types';
import { useModal } from '../hooks/useModal';

interface HomePageProps {
  onToolClick: (toolId: string) => void;
  tools: Tool[];
}

const HomePage: React.FC<HomePageProps> = ({ onToolClick, tools }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
          50+ Tools · Image Editor · PDF Editor · Photo Resizer
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          The <span className="font-extrabold">ultimate</span> file toolkit
        </h1>
        <p className="text-gray-400 text-lg">
          Edit, convert, resize, compress — everything in one place. No installs, no uploads.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>

      {/* Image Editing Tools */}
      <div className="mb-10">
        <h2 className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          🎨 Image Editing Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools
            .filter(tool => tool.category === 'image')
            .map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={() => tool.id === 'img-editor' ? window.location.href = '/img-editor' : onToolClick(tool.id)} 
              />
            ))}
        </div>
      </div>

      {/* PDF Editing Tools */}
      <div className="mb-10">
        <h2 className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          📄 PDF Editing Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools
            .filter(tool => tool.category === 'pdf')
            .map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={() => tool.id === 'pdf-editor' ? window.location.href = '/pdf-editor' : onToolClick(tool.id)} 
              />
            ))}
        </div>
      </div>

      {/* Photo Size Tools */}
      <div className="mb-10">
        <h2 className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          📐 Photo Size Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools
            .filter(tool => tool.category === 'photo')
            .map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={() => tool.id === 'photo-size' ? window.location.href = '/photo-size' : onToolClick(tool.id)} 
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
