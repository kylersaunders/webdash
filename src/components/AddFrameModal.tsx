'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface AddFrameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (url: string) => void;
}

export default function AddFrameModal({ isOpen, onClose, onAdd }: AddFrameModalProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAdd(url.trim());
      setUrl('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='mx-auto max-w-sm rounded-lg bg-white p-6'>
          <Dialog.Title className='text-lg font-medium mb-4'>Add New Frame</Dialog.Title>

          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Enter website URL'
              className='w-full p-2 border border-gray-300 rounded-md mb-4'
            />

            <div className='flex justify-end gap-2'>
              <button type='button' onClick={onClose} className='px-4 py-2 text-gray-600 hover:text-gray-800'>
                Cancel
              </button>
              <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
                Add
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
