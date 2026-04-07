import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from '@react-spring/web';

const ImageEditorPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string>('select');
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize canvas
  useEffect(() => {
    if (containerRef.current && !image) {
      setCanvasSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
  }, [image]);

  // Apply filters to canvas
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image with filters
    if (ctx.filter) {
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) hue-rotate(${filters.hue}deg) blur(${filters.blur}px)`;
    }
    
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image, filters]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = useDrag(({ down, movement: [x, y], memo }) => {
    if (!down || !canvasRef.current || !containerRef.current) {
      return memo;
    }
    
    setIsDragging(true);
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    // Calculate new position within container bounds
    const maxX = container.clientWidth - canvas.clientWidth;
    const maxY = container.clientHeight - canvas.clientHeight;
    
    let newX = Math.max(0, Math.min(maxX, memo.x + x));
    let newY = Math.max(0, Math.min(maxY, memo.y + y));
    
    return { x: newX, y: newY };
  }, {
    from: () => [0, 0],
    filterTaps: true,
    pointer: { touch: true },
    eventOptions: { passive: false }
  });

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 280, friction: 60 }
  }));

  useEffect(() => {
    if (isDragging) {
      api.start({
        x: 0,
        y: 0
      });
    }
  }, [isDragging, api]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              className={`p-2 rounded-lg ${activeTool === 'select' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTool('select')}
              title="Select"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5m0 6H7"></path>
              </svg>
            </button>
            
            <button 
              className={`p-2 rounded-lg ${activeTool === 'crop' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTool('crop')}
              title="Crop"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
              </svg>
            </button>
            
            <div className="w-px h-5 bg-gray-600 mx-2"></div>
            
            <button 
              className={`p-2 rounded-lg ${activeTool === 'draw' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTool('draw')}
              title="Draw"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            
            <button 
              className={`p-2 rounded-lg ${activeTool === 'text' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTool('text')}
              title="Text"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l-4-16m2 16l4-16m-6 7h14M4 15h14"></path>
              </svg>
            </button>
            
            <div className="w-px h-5 bg-gray-600 mx-2"></div>
            
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-white"
              title="Undo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-white"
              title="Redo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
            
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-white"
              title="Clear"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-white"
              title="Zoom In"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
            
            <button 
              className="p-2 rounded-lg text-gray-400 hover:text-white"
              title="Zoom Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13H5m0 0l6-6m-6 6l6 6"></path>
              </svg>
            </button>
            
            <span className="text-gray-400 text-sm">100%</span>
            
            <button 
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 relative" ref={containerRef}>
          {image ? (
            <animated.div
              style={{ x, y }}
              {...handleDrag()}
              className="absolute"
            >
              <canvas 
                ref={canvasRef} 
                width={canvasSize.width} 
                height={canvasSize.height}
                className="border border-gray-700 rounded-lg shadow-lg"
              />
            </animated.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-300 mb-2">Upload an image to start editing</h3>
              <p className="text-gray-400 mb-4">Use the panel on the right to upload</p>
              <label className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white cursor-pointer">
                Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          )}
        </div>
        
        {/* Right Panel - Tools */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Upload Image
            </h3>
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 border border-gray-600 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span className="text-sm text-gray-300">Click to upload or drag & drop</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Adjustments
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-300">Brightness</label>
                  <span className="text-xs text-indigo-400">{filters.brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={filters.brightness}
                  onChange={e => setFilters({...filters, brightness: Number(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-300">Contrast</label>
                  <span className="text-xs text-indigo-400">{filters.contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={filters.contrast}
                  onChange={e => setFilters({...filters, contrast: Number(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-300">Saturation</label>
                  <span className="text-xs text-indigo-400">{filters.saturation}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={filters.saturation}
                  onChange={e => setFilters({...filters, saturation: Number(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-300">Hue</label>
                  <span className="text-xs text-indigo-400">{filters.hue}°</span>
                </div>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  value={filters.hue}
                  onChange={e => setFilters({...filters, hue: Number(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-300">Blur</label>
                  <span className="text-xs text-indigo-400">{filters.blur}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={filters.blur}
                  onChange={e => setFilters({...filters, blur: Number(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Filters
            </h3>
            <select 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100"
              defaultValue="none"
            >
              <option value="none">None</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
              <option value="vintage">Vintage</option>
              <option value="vivid">Vivid</option>
              <option value="fade">Fade</option>
              <option value="noir">Noir</option>
              <option value="chrome">Chrome</option>
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Export
            </h3>
            <div className="space-y-3">
              <select 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100"
              >
                <option>JPEG (Best Quality)</option>
                <option>PNG (Transparent)</option>
                <option>WebP (Smallest)</option>
              </select>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-300">Quality</label>
                  <span className="text-xs text-indigo-400">95%</span>
                </div>
                <input type="range" min="50" max="100" defaultValue="95" className="w-full" />
              </div>
              
              <button 
                className="w-full px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium flex items-center justify-center"
                onClick={handleDownload}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h13a2 2 0 012 2v13a2 2 0 01-2 2z"></path>
                </svg>
                Download Edited Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorPage;
