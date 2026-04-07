import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ImageEditorPage from './pages/ImageEditorPage';
import PdfEditorPage from './pages/PdfEditorPage';
import PhotoSizeConverterPage from './pages/PhotoSizeConverterPage';
import Modal from './components/Modal';
import { Tool } from './types';
import { useModal } from './hooks/useModal';
import './index.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const { isModalOpen, modalContent, openModal, closeModal } = useModal();
  
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    window.history.pushState({}, '', `#${sectionId}`);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const section = window.location.hash.replace('#', '') || 'home';
      setActiveSection(section);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tools: Tool[] = [
    {
      id: 'filters',
      category: 'image',
      title: 'Photo Filters',
      description: 'Apply Instagram-style filters: Vintage, Noir, Vivid, Fade, Chrome, and 20+ more.',
      icon: '✨',
      colorClass: 'text-pink-400',
      badge: { type: 'new', text: 'New' }
    },
    {
      id: 'adjust',
      category: 'image',
      title: 'Brightness / Contrast',
      description: 'Fine-tune brightness, contrast, saturation, hue, sharpness, and exposure sliders.',
      icon: '🎛️',
      colorClass: 'text-emerald-400'
    },
    {
      id: 'flip-rotate',
      category: 'image',
      title: 'Flip & Rotate',
      description: 'Rotate images by any angle, flip horizontally/vertically, straighten horizons.',
      icon: '🔄',
      colorClass: 'text-amber-400'
    },
    {
      id: 'text-add',
      category: 'image',
      title: 'Add Text to Image',
      description: 'Add custom text overlays with fonts, colors, sizes, shadows, and positioning.',
      icon: '🔤',
      colorClass: 'text-blue-400'
    },
    {
      id: 'img-compress',
      category: 'image',
      title: 'Image Compressor',
      description: 'Compress JPEG, PNG, WebP up to 90% smaller.',
      icon: '📦',
      colorClass: 'text-emerald-400'
    },
    {
      id: 'img-convert',
      category: 'image',
      title: 'Image Format Converter',
      description: 'Convert between JPG, PNG, WebP, GIF, BMP, AVIF.',
      icon: '🔄',
      colorClass: 'text-amber-400'
    },
    {
      id: 'zip-create',
      category: 'file',
      title: 'ZIP Compressor',
      description: 'Create ZIP archives from multiple files in browser.',
      icon: '🗂️',
      colorClass: 'text-blue-400'
    },
    {
      id: 'ocr',
      category: 'file',
      title: 'OCR Text Extractor',
      description: 'Extract text from images and scanned documents.',
      icon: '🔍',
      colorClass: 'text-indigo-400'
    },
    {
      id: 'pdf-merge',
      category: 'pdf',
      title: 'PDF Merger',
      description: 'Combine multiple PDFs into one document.',
      icon: '🔗',
      colorClass: 'text-pink-400'
    },
    {
      id: 'bg-remove',
      category: 'image',
      title: 'Background Remover',
      description: 'Remove backgrounds and get transparent PNGs.',
      icon: '🎭',
      colorClass: 'text-emerald-400'
    },
    {
      id: 'passport',
      category: 'photo',
      title: 'Passport Photo Maker',
      description: 'Create government-standard passport photos for US, UK, EU, India & more.',
      icon: '🪪',
      colorClass: 'text-blue-400'
    },
    {
      id: 'social-resize',
      category: 'photo',
      title: 'Social Media Resizer',
      description: 'Resize for Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok & Pinterest.',
      icon: '📱',
      colorClass: 'text-indigo-400'
    },
    {
      id: 'blur-bg',
      category: 'image',
      title: 'Blur Background',
      description: 'Apply Gaussian blur, radial blur, or tilt-shift effects to backgrounds.',
      icon: '🌫️',
      colorClass: 'text-pink-400'
    },
    {
      id: 'sticker',
      category: 'image',
      title: 'Sticker & Emoji Overlay',
      description: 'Add emoji, shapes, and sticker overlays to your photos.',
      icon: '🎭',
      colorClass: 'text-purple-400'
    },
    {
      id: 'color-correct',
      category: 'image',
      title: 'Color Correction',
      description: 'White balance, color curves, shadows/highlights, vibrance, and tint adjustments.',
      icon: '🎨',
      colorClass: 'text-amber-400'
    },
    {
      id: 'vignette',
      category: 'image',
      title: 'Vignette & Borders',
      description: 'Add vignette effects, artistic borders, and frame overlays to images.',
      icon: '⭕',
      colorClass: 'text-blue-400'
    },
    {
      id: 'draw',
      category: 'image',
      title: 'Draw & Annotate',
      description: 'Freehand drawing, arrows, rectangles, circles, and annotation tools.',
      icon: '✏️',
      colorClass: 'text-emerald-400'
    },
    {
      id: 'pdf-annotate',
      category: 'pdf',
      title: 'PDF Annotator',
      description: 'Highlight text, add comments, sticky notes, and draw on PDFs.',
      icon: '🖊️',
      colorClass: 'text-pink-400'
    },
    {
      id: 'pdf-sign',
      category: 'pdf',
      title: 'PDF Signature',
      description: 'Add digital signatures to PDF documents — draw, type, or upload your signature.',
      icon: '✍️',
      colorClass: 'text-emerald-400'
    },
    {
      id: 'pdf-watermark',
      category: 'pdf',
      title: 'PDF Watermark',
      description: 'Add text or image watermarks to all pages of a PDF document.',
      icon: '💧',
      colorClass: 'text-amber-400'
    },
    {
      id: 'pdf-page-num',
      category: 'pdf',
      title: 'Add Page Numbers',
      description: 'Insert page numbers with custom position, style, and starting number.',
      icon: '🔢',
      colorClass: 'text-blue-400'
    },
    {
      id: 'pdf-rotate',
      category: 'pdf',
      title: 'Rotate PDF Pages',
      description: 'Rotate single pages, page ranges, or entire PDFs by 90/180/270 degrees.',
      icon: '🔃',
      colorClass: 'text-purple-400'
    },
    {
      id: 'pdf-redact',
      category: 'pdf',
      title: 'PDF Redaction',
      description: 'Permanently black out sensitive text and images from PDF documents.',
      icon: '🔲',
      colorClass: 'text-pink-400'
    },
    {
      id: 'pdf-header',
      category: 'pdf',
      title: 'PDF Header & Footer',
      description: 'Add custom headers and footers with text, date, logo, and page info.',
      icon: '📋',
      colorClass: 'text-emerald-400'
    }
  ];

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-x-hidden">
          {/* Background effects */}
          <div className="fixed inset-0 pointer-events-none opacity-30">
            <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 to-transparent"></div>
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>

          <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage onToolClick={openModal} tools={tools} />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/img-editor" element={<ImageEditorPage />} />
              <Route path="/pdf-editor" element={<PdfEditorPage />} />
              <Route path="/photo-size" element={<PhotoSizeConverterPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={modalContent?.title || ''}
            description={modalContent?.description || ''}
            icon={modalContent?.icon || ''}
            colorClass={modalContent?.colorClass || ''}
          >
            {modalContent?.content}
          </Modal>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
