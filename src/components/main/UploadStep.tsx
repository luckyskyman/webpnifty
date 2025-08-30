import { useCallback, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, AlertCircle, Star, ArrowRight } from 'lucide-react';

import { useFileStore } from '@/store/useFileStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const acceptedFileTypes: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
};

const GUEST_LIMIT = 5;
const USER_LIMIT = 30;

export const UploadStep = () => {
  const files = useFileStore(state => state.files);
  const setFiles = useFileStore(state => state.setFiles);
  const setStep = useFileStore(state => state.setStep);
  const { status } = useSession();
  const [uploadMessages, setUploadMessages] = useState<string[]>([]);

  const isLoggedIn = useMemo(() => status === 'authenticated', [status]);
  const currentLimit = useMemo(() => isLoggedIn ? USER_LIMIT : GUEST_LIMIT, [isLoggedIn]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const messages: string[] = [];

    // Handle file type rejections
    if (fileRejections.length > 0) {
      const rejectedFileNames = fileRejections.map(rejection => `'${rejection.file.name}'`).join(', ');
      messages.push(`Invalid file type(s) ignored: ${rejectedFileNames}.`);
    }

    // Handle file limit enforcement
    let filesToProcess = acceptedFiles;
    if (acceptedFiles.length > currentLimit) {
      messages.push(`Your limit is ${currentLimit} files. The first ${currentLimit} valid files were added.`);
      filesToProcess = acceptedFiles.slice(0, currentLimit);
    }

    setUploadMessages(messages);

    if (filesToProcess.length > 0) {
      setFiles(filesToProcess);
    } else {
      setFiles([]);
    }
  }, [setFiles, currentLimit]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
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
        
        <div className="mt-4 text-center text-sm">
          {uploadMessages.length > 0 && (
            <div className="text-red-500 flex flex-col items-center justify-center mb-2 space-y-1">
              {uploadMessages.map((msg, i) => (
                <div key={i} className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{msg}</span>
                </div>
              ))}
            </div>
          )}
          <p className="text-muted-foreground">
            You can upload up to {currentLimit} files.
            {!isLoggedIn && (
              <span className="font-semibold flex items-center justify-center text-primary mt-1">
                <Star className="w-4 h-4 mr-1" />
                <Link href="/login">Sign in</Link> for up to {USER_LIMIT} files.
              </span>
            )}
          </p>
        </div>

        {/* Next Step Button */}
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setStep('edit')} disabled={files.length === 0}>
            Set Conversion Options
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};