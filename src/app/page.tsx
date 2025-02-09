'use client';

import { useState, useEffect } from 'react';
import AddFrameModal from '@/components/AddFrameModal';

interface Frame {
  id: string;
  url: string;
}

export default function Home() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load saved frames from localStorage on component mount
    const savedFrames = localStorage.getItem('frames');
    if (savedFrames) {
      setFrames(JSON.parse(savedFrames));
    }
  }, []);

  const addFrame = (url: string) => {
    const newFrame = {
      id: crypto.randomUUID(),
      url: url.startsWith('http') ? url : `https://${url}`,
    };
    const updatedFrames = [...frames, newFrame];
    setFrames(updatedFrames);
    localStorage.setItem('frames', JSON.stringify(updatedFrames));
  };

  const removeFrame = (id: string) => {
    const updatedFrames = frames.filter((frame) => frame.id !== id);
    setFrames(updatedFrames);
    localStorage.setItem('frames', JSON.stringify(updatedFrames));
  };

  return (
    <main className='min-h-screen p-8 bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Your Web</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            <span className='text-xl font-bold'>+</span>
            Add Frame
          </button>
        </div>

        <div className='grid grid-cols-3 gap-12 p-4'>
          {frames.map((frame) => (
            <div key={frame.id} className='relative w-[30vw] h-[50vh] bg-gray-100 rounded-lg shadow-md'>
              <button
                onClick={() => removeFrame(frame.id)}
                className='absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
              >
                ×
              </button>
              <iframe
                src={frame.url}
                className='w-full h-full rounded-lg'
                sandbox='allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-presentation'
                loading='lazy'
                referrerPolicy='no-referrer'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              />
            </div>
          ))}
        </div>

        <AddFrameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addFrame} />
      </div>
    </main>
  );
}
