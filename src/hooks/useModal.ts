import { useState, useCallback } from 'react';
import { Tool } from '../types';

interface ModalContent {
  title: string;
  description: string;
  icon: string;
  colorClass: string;
  content: React.ReactNode;
}

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openModal = useCallback((toolId: string) => {
    const toolContent = getToolContent(toolId);
    setModalContent(toolContent);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setModalContent(null), 300);
  }, []);

  return {
    isModalOpen,
    modalContent,
    openModal,
    closeModal
  };
};

const getToolContent = (toolId: string): ModalContent => {
  switch (toolId) {
    case 'filters':
      return {
        title: 'Photo Filters',
        description: 'Apply artistic filters to your image',
        icon: '✨',
        colorClass: 'text-pink-400',
        content: <FilterToolContent />
      };
    case 'adjust':
      return {
        title: 'Brightness & Adjustments',
        description: 'Fine-tune image parameters',
        icon: '🎛️',
        colorClass: 'text-emerald-400',
        content: <AdjustmentToolContent />
      };
    case 'flip-rotate':
      return {
        title: 'Flip & Rotate',
        description: 'Rotate and flip images',
        icon: '🔄',
        colorClass: 'text-amber-400',
        content: <FlipRotateToolContent />
      };
    case 'text-add':
      return {
        title: 'Add Text to Image',
        description: 'Overlay custom text on photos',
        icon: '🔤',
        colorClass: 'text-blue-400',
        content: <TextAddToolContent />
      };
    case 'img-compress':
      return {
        title: 'Image Compressor',
        description: 'Reduce image file size',
        icon: '📦',
        colorClass: 'text-emerald-400',
        content: <ImageCompressToolContent />
      };
    case 'img-convert':
      return {
        title: 'Format Converter',
        description: 'Convert between image formats',
        icon: '🔄',
        colorClass: 'text-amber-400',
        content: <ImageConvertToolContent />
      };
    case 'bg-remove':
      return {
        title: 'Background Remover',
        description: 'Remove image backgrounds',
        icon: '🎭',
        colorClass: 'text-emerald-400',
        content: <BackgroundRemoveToolContent />
      };
    case 'passport':
      return {
        title: 'Passport Photo Maker',
        description: 'Government-standard passport photos',
        icon: '🪪',
        colorClass: 'text-blue-400',
        content: <PassportToolContent />
      };
    case 'social-resize':
      return {
        title: 'Social Media Resizer',
        description: 'Resize for any social platform',
        icon: '📱',
        colorClass: 'text-indigo-400',
        content: <SocialResizeToolContent />
      };
    case 'blur-bg':
      return {
        title: 'Blur Background',
        description: 'Apply blur effects to images',
        icon: '🌫️',
        colorClass: 'text-pink-400',
        content: <BlurBackgroundToolContent />
      };
    case 'sticker':
      return {
        title: 'Sticker Overlay',
        description: 'Add stickers and emoji to photos',
        icon: '🎭',
        colorClass: 'text-purple-400',
        content: <StickerToolContent />
      };
    case 'color-correct':
      return {
        title: 'Color Correction',
        description: 'White balance and color grading',
        icon: '🎨',
        colorClass: 'text-amber-400',
        content: <ColorCorrectToolContent />
      };
    case 'vignette':
      return {
        title: 'Vignette & Borders',
        description: 'Add artistic borders and effects',
        icon: '⭕',
        colorClass: 'text-blue-400',
        content: <VignetteToolContent />
      };
    case 'draw':
      return {
        title: 'Draw & Annotate',
        description: 'Freehand draw and add annotations',
        icon: '✏️',
        colorClass: 'text-emerald-400',
        content: <DrawToolContent />
      };
    case 'ocr':
      return {
        title: 'OCR Text Extractor',
        description: 'Extract text from images',
        icon: '🔍',
        colorClass: 'text-indigo-400',
        content: <OcrToolContent />
      };
    case 'zip-create':
      return {
        title: 'ZIP Creator',
        description: 'Compress files into ZIP archive',
        icon: '🗂️',
        colorClass: 'text-blue-400',
        content: <ZipCreateToolContent />
      };
    case 'pdf-merge':
      return {
        title: 'PDF Merger',
        description: 'Merge multiple PDFs into one',
        icon: '🔗',
        colorClass: 'text-pink-400',
        content: <PdfMergeToolContent />
      };
    default:
      return {
        title: 'Tool',
        description: 'Tool description',
        icon: '🛠️',
        colorClass: 'text-indigo-400',
        content: <div>Tool content will appear here</div>
      };
  }
};

// Component for filter tool content
const FilterToolContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-gray-700 rounded-xl p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
            <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-sm text-gray-400">Drag & drop your image here</p>
            <p className="text-xs text-gray-500 mt-1">or</p>
            <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              Browse Files
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Filter
            </label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100">
              <option>None</option>
              <option>Grayscale</option>
              <option>Sepia</option>
              <option>Invert</option>
              <option>Vintage</option>
              <option>Vivid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Intensity
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="80"
              className="w-full"
            />
            <div className="text-xs text-gray-400 mt-1">80%</div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-700 rounded-xl p-4">
        <h3 className="font-medium text-gray-200 mb-3">Preview</h3>
        <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="text-sm text-gray-400">Image preview will appear here</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium flex items-center">
          <span>Apply Filter</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Component for adjustment tool content
const AdjustmentToolContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border border-gray-700 rounded-xl p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
            <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-sm text-gray-400">Drag & drop your image here</p>
            <p className="text-xs text-gray-500 mt-1">or</p>
            <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              Browse Files
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-300">Brightness</label>
              <span className="text-xs text-gray-400">+0</span>
            </div>
            <input type="range" min="-100" max="100" defaultValue="0" className="w-full" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-300">Contrast</label>
              <span className="text-xs text-gray-400">+0</span>
            </div>
            <input type="range" min="-100" max="100" defaultValue="0" className="w-full" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-300">Saturation</label>
              <span className="text-xs text-gray-400">+0</span>
            </div>
            <input type="range" min="-100" max="100" defaultValue="0" className="w-full" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-300">Hue</label>
              <span className="text-xs text-gray-400">0°</span>
            </div>
            <input type="range" min="-180" max="180" defaultValue="0" className="w-full" />
          </div>
        </div>
      </div>
      
      <div className="border border-gray-700 rounded-xl p-4">
        <h3 className="font-medium text-gray-200 mb-3">Preview</h3>
        <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="text-sm text-gray-400">Image preview will appear here</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium flex items-center">
          <span>Download</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h13a2 2 0 012 2v13a2 2 0 01-2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Placeholder components for other tools
const FlipRotateToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Flip & Rotate Tool</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const TextAddToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Add Text Tool</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const ImageCompressToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Image Compressor</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const ImageConvertToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Format Converter</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const BackgroundRemoveToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Background Remover</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const PassportToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Passport Photo Maker</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Photo Size Converter</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Photo Size Converter
    </button>
  </div>
);

const SocialResizeToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18a2 2 0 00-2-2H8v-2m0-2v-2a2 2 0 012-2h2m-2 0V6a2 2 0 012-2h2a2 2 0 012 2v2m0 4h-4m4 6h2m-6 0a2 2 0 01-2-2v-2m0 4a2 2 0 002 2h2"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Social Media Resizer</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Photo Size Converter</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Photo Size Converter
    </button>
  </div>
);

const BlurBackgroundToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Blur Background</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const StickerToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.32 0-.618-.21-.719-.53L9.08 8.53A2 2 0 0111.004 6h1.86c.32 0 .618.21.719.53l.395 1.185A2 2 0 0014 10zm-4 6.5h2.554c.32 0 .618.21.719.53l.395 1.185A2 2 0 0014 18h-1.86c-.32 0-.618-.21-.719-.53l-1.359-4.078A2 2 0 009.004 12h-1.86c-.32 0-.618.21-.719.53L5.08 12.53A2 2 0 013.004 14h1.86c.32 0 .618.21.719.53l.395 1.185A2 2 0 006 16.5h2.554c.32 0 .618.21.719.53l.395 1.185A2 2 0 0010 18h1.86c.32 0 .618-.21.719-.53l.395-1.185A2 2 0 0012 15.5zm-2.054-7.562a1 1 0 010-1.876h1.86c.32 0 .618.21.719.53l.395 1.185A1 1 0 0012 10h-1.86c-.32 0-.618-.21-.719-.53l-.395-1.185a1 1 0 01.07-1.026z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Sticker Overlay</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const ColorCorrectToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8m-8 0a2 2 0 002 2 2 2 0 002-2v-4a2 2 0 00-2-2 2 2 0 00-2 2v4zm3-13a2 2 0 01-2-2 2 2 0 012-2h3a2 2 0 012 2 2 2 0 01-2 2H7z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Color Correction</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const VignetteToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v4zM7 8h10v4H7V8z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Vignette & Borders</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const DrawToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Draw & Annotate</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const OcrToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898.777M17.188 16.223l.777 2.897M19.136 12.035l-2.898.777"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">OCR Text Extractor</h3>
    <p className="text-gray-400 mb-4">This tool is available in the Image Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open Image Editor
    </button>
  </div>
);

const ZipCreateToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">ZIP Creator</h3>
    <p className="text-gray-400 mb-4">This tool is available in the File Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open File Editor
    </button>
  </div>
);

const PdfMergeToolContent: React.FC = () => (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898.777M17.188 16.223l.777 2.897M19.136 12.035l-2.898.777"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">PDF Merger</h3>
    <p className="text-gray-400 mb-4">This tool is available in the PDF Editor</p>
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
      Open PDF Editor
    </button>
  </div>
);

export default FilterToolContent;
