import imageCompression from 'browser-image-compression';

// This interface now includes the optional 'effort' property for the AVIF logic
export interface ConversionOptions {
  quality: number;
  format: 'image/webp' | 'image/avif';
  maxWidthOrHeight: number;
  keepExif: boolean;
  effort?: number; // Kept for internal use, but won't be set from UI
  onProgress?: (progress: number) => void;
}

/**
 * Image conversion hook using the original browser-image-compression library.
 * @returns \{ convertImage \}
 */
export const useImageConverter = () => {
  const convertImage = async (file: File, options: ConversionOptions): Promise<File> => {
    let compressionOptions: imageCompression.Options;

    // Hardcode effort for simplicity as requested by user, even though AVIF is disabled for now.
    const effort = 5; 

    if (options.format === 'image/avif') {
      // This logic is known to be broken, but we restore it as part of the revert.
      // It will be unused since the AVIF option will be removed from the UI.
      const avifQuality = Math.round(63 * (1 - options.quality));
      compressionOptions = {
        maxWidthOrHeight: options.maxWidthOrHeight,
        useWebWorker: true,
        fileType: options.format,
        alwaysKeepExif: options.keepExif,
        onProgress: options.onProgress,
        avif: {
          quality: avifQuality,
          effort: effort,
        },
      };
    } else { // This is the WebP path, which should work.
      compressionOptions = {
        maxWidthOrHeight: options.maxWidthOrHeight,
        useWebWorker: true,
        initialQuality: options.quality,
        fileType: options.format,
        alwaysKeepExif: options.keepExif,
        onProgress: options.onProgress,
      };
    }

    try {
      console.log("Using browser-image-compression with options:", JSON.stringify(compressionOptions, null, 2));
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
