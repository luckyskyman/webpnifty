import { useCallback } from 'react';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react'; // Removed FileImage

import { useFileStore } from '@/store/useFileStore';
import { Card, CardContent } from '@/components/ui/card';

const acceptedFiles: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
};

export const UploadStep = () => {
  const setFiles = useFileStore((state) => state.setFiles);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      // TODO: Show a toast notification for rejected files
      console.error('Rejected files:', fileRejections);
    }
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
    }
  }, [setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFiles,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ease-in-out
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'}`}
        >
          <motion.div
            animate={{ scale: isDragActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center pt-5 pb-6"
          >
            <UploadCloud className={`w-10 h-10 mb-4 ${isDragActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`} />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
          </motion.div>
          <input {...getInputProps()} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
};
