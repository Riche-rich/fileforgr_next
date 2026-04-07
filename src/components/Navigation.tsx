import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const { isDark } = useTheme();
  
  const navItems = [
    { id: 'home', label: '🏠 Home', path: '/' },
    { id: 'img-editor', label: '🎨 Image Editor', path: '/img-editor' },
    { id: 'pdf-editor', label: '📄 PDF Editor', path: '/pdf-editor' },
    { id: 'photo-size', label: '📐 Photo Sizes', path: '/photo-size' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => onSectionChange('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <span className="font-bold text-xl text-white">File<span className="text-indigo-400">Forge</span></span>
            <span className="ml-1 px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-xs text-indigo-300">
              PRO
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              // Theme toggle would go here
            }}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
