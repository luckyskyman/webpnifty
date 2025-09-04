import imageCompression from 'browser-image-compression';

export interface ConversionOptions {
  quality: number;
  format: 'image/webp' | 'image/avif';
  maxWidthOrHeight: number;
  onProgress?: (progress: number) => void;
}

/**
 * Image conversion hook using browser-image-compression.
 * @returns \{ convertImage \}
 */
export const useImageConverter = () => {
  const convertImage = async (file: File, options: ConversionOptions): Promise<File> => {
    // The AVIF format is currently disabled in the UI due to library instability.
    // This code block is kept for future reference but won't be executed.
    if (options.format === 'image/avif') {
      throw new Error('AVIF conversion is temporarily disabled.');
    }

    const compressionOptions: imageCompression.Options = {
      maxWidthOrHeight: options.maxWidthOrHeight,
      useWebWorker: true,
      initialQuality: options.quality,
      fileType: options.format,
      onProgress: options.onProgress,
    };

    try {
      const compressedFile = await imageCompression(file, compressionOptions);

      const newExtension = options.format.split('/')[1];
      const oldName = file.name.substring(0, file.name.lastIndexOf('.'));
      const newName = `${oldName}.${newExtension}`;

      const newFile = new File([compressedFile], newName, {
        type: options.format,
        lastModified: file.lastModified,
      });

      return newFile;
    } catch (e) {
      const err = e as Error;
      console.error('Image conversion error:', err);
      throw new Error(`Failed to convert ${file.name}: ${err.message}`);
    }
  };

  return { convertImage };
};