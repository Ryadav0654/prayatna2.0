  'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import apiClient from '../utils/apiclient';


const ProcessForm = React.memo(() => {
  const [applicationId, setApplicationId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setError('');
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setError('');
      } else {
        setError('Please upload a valid image file (e.g., JPG, PNG, GIF).');
        setImageFile(null);
      }
    }
  }, []);

  const processNoc = async (applicationId: string, imageFile: File) => {
    try {
        console.log("applicationId in processNoc", applicationId);
        console.log("imageFile in processNoc", imageFile);
      const response = await apiClient.post('/noc/process', { 
        applicationId:applicationId, 
        document: imageFile,
      });

      console.log('response in processNoc', response);
      
    } catch (error) {
      console.error('Error processing NOC:', error);
    }
  }; 
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId.trim()) {
      setError('Please enter an Application ID.');
      return;
    }
    if (!imageFile) {
      setError('Please select an image file.');
      return;
    }
    processNoc(applicationId, imageFile);
    setApplicationId('');
    setImageFile(null);
  }, [applicationId, imageFile]);

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

    const ImagePreview = React.memo(() => {
        return imageFile ? (
            <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded Preview"
                className="mt-4 mx-auto max-h-48 rounded"
            />
        ) : null;
    });


  return (
    <motion.div
      className="bg-[#020030] py-12"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white  mb-8">
          Process Noc
        </h2>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white w-full rounded-lg shadow-lg p-6"
        >
          <div className="flex flex-wrap gap-4 items-end"> {/* Added items-end */}
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="applicationId" className="block text-lg font-medium text-gray-700">
                Application ID
              </label>
              <input
                type="text"
                id="applicationId"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex-1 min-w-[300px]">
              <label htmlFor="imageFile" className="block text-lg font-medium text-gray-700">
                Image Upload
              </label>
              <div
                className={`border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer mt-1 ${
                  isDragging ? 'bg-gray-100 border-blue-500' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                 <label htmlFor="imageFile" className='cursor-pointer'>
                  <span className="block text-sm  text-gray-700">
                  {imageFile ? `Selected: ${imageFile.name}` : 'Drag & Drop or Click'}
                  </span>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                name='document'
                />
                </label>
                <ImagePreview />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex-1 mt-4 min-w-[250px]"> {/* No longer full width */}
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </div> {/* End of flex container */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </motion.form>
      </div>
    </motion.div>
  );
});

export default ProcessForm;