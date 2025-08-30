import { useState, useEffect } from 'react';
import { useFileStore, FileState } from '@/store/useFileStore';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileImage, RefreshCw, Eye } from 'lucide-react';
import { ImageComparator } from './ImageComparator';

// A utility to format bytes into a readable string
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const ResultStep = () => {
  const { files, clearFiles } = useFileStore();
  const [selectedFile, setSelectedFile] = useState<FileState | null>(null);
  const [imageSrcs, setImageSrcs] = useState<{ original: string, converted: string } | null>(null);

  useEffect(() => {
    if (selectedFile?.convertedFile) {
      const originalUrl = URL.createObjectURL(selectedFile.originalFile);
      const convertedUrl = URL.createObjectURL(selectedFile.convertedFile);
      setImageSrcs({ original: originalUrl, converted: convertedUrl });

      return () => {
        URL.revokeObjectURL(originalUrl);
        URL.revokeObjectURL(convertedUrl);
      };
    }
  }, [selectedFile]);

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    files.forEach(fileState => {
      if (fileState.convertedFile) {
        zip.file(fileState.convertedFile.name, fileState.convertedFile);
      }
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'WebPnifty_images.zip');
  };

  const handleDownload = (file: File) => {
    saveAs(file, file.name);
  }

  const convertedFiles = files.filter(f => f.convertedFile);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Conversion Complete!</h2>
        <p className="text-muted-foreground">You converted {convertedFiles.length} images.</p>
      </div>

      {imageSrcs && selectedFile && (
        <div className="space-y-2">
            <h3 className="text-xl font-semibold text-center">Compare: {selectedFile.originalFile.name}</h3>
            <ImageComparator originalSrc={imageSrcs.original} convertedSrc={imageSrcs.converted} />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {convertedFiles.map(fileState => {
            const originalSize = fileState.originalFile.size;
            const newSize = fileState.convertedFile!.size;
            const saved = originalSize - newSize;
            const savedPercent = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0;

            return (
              <div key={fileState.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileImage className="w-6 h-6 text-primary" />
                  <div className="min-w-0">
                    <p className="font-semibold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={fileState.convertedFile!.name}>{fileState.convertedFile!.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatBytes(originalSize)} → {formatBytes(newSize)} 
                      <span className="font-bold text-green-600 ml-2">({savedPercent}% saved)</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedFile(fileState)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Compare
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(fileState.convertedFile!)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button size="lg" onClick={handleDownloadAll} disabled={convertedFiles.length === 0}>
          <Download className="mr-2" />
          Download All (.zip)
        </Button>
        <Button size="lg" variant="secondary" onClick={clearFiles}>
          <RefreshCw className="mr-2" />
          Convert More
        </Button>
      </div>
    </div>
  );
};