import imageCompression from 'browser-image-compression';

// 변환에 필요한 옵션들의 타입을 정의합니다.
export interface ConversionOptions {
  quality: number;
  format: 'image/webp' | 'image/avif';
  maxWidthOrHeight: number;
  keepExif: boolean;
  onProgress?: (progress: number) => void; // 외부에서 진행률을 주입받기 위한 콜백
}

/**
 * 이미지 변환 로직을 처리하는 커스텀 훅입니다.
 * 이 훅은 변환 기능 자체에만 집중하며, 상태 관리는 호출하는 컴포넌트나 Zustand 스토어에 위임합니다.
 * @returns \{ convertImage \}
 */
export const useImageConverter = () => {
  const convertImage = async (file: File, options: ConversionOptions): Promise<File> => {
    const compressionOptions = {
      // maxSizeMB 옵션을 제거하여 파일 크기에 관계없이 항상 변환을 실행하도록 수정합니다.
      maxWidthOrHeight: options.maxWidthOrHeight,
      useWebWorker: true,
      initialQuality: options.quality,
      fileType: options.format,
      alwaysKeepExif: options.keepExif, // 호환성 테스트 코드를 원복하여 UI의 선택이 반영되도록 합니다.
      onProgress: options.onProgress, // 외부에서 전달받은 onProgress 콜백을 사용
    };

    try {
      console.log(`Starting conversion for ${file.name} with options:`, options);
      console.log(`Initial quality passed to browser-image-compression:`, compressionOptions.initialQuality); // <-- ADDED LINE
      const compressedFile = await imageCompression(file, compressionOptions);
      console.log(`Finished conversion for ${file.name}. Original size: ${file.size}, New size: ${compressedFile.size}`);

      // 파일 확장자를 올바르게 변경하는 로직 추가
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
      // 에러를 호출 측으로 다시 던져서 각 파일의 변환 실패를 개별적으로 처리할 수 있도록 합니다.
      throw new Error(`Failed to convert ${file.name}: ${err.message}`);
    }
  };

  return { convertImage };
};