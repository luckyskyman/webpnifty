import { create } from 'zustand';

// 앱의 단계를 정의합니다.
export type AppStep = 'upload' | 'edit' | 'result';

// 개별 파일의 상태를 정의합니다.
export interface FileState {
  id: string; // 파일의 고유 ID (e.g., Date.now() + Math.random())
  originalFile: File;
  convertedFile: File | null;
  progress: number;
  error: string | null;
}

// 스토어의 전체 상태 타입을 정의합니다.
interface FileStoreState {
  step: AppStep;
  files: FileState[];
  setStep: (step: AppStep) => void;
  setFiles: (files: File[]) => void;
  updateFileProgress: (id: string, progress: number) => void;
  setConvertedFile: (id: string, convertedFile: File) => void;
  setFileError: (id: string, error: string) => void;
  clearFiles: () => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
  step: 'upload',
  files: [],

  setStep: (step) => set({ step }),

  setFiles: (newFiles) => {
    const fileStates: FileState[] = newFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      originalFile: file,
      convertedFile: null,
      progress: 0,
      error: null,
    }));
    set({ files: fileStates, step: 'edit' });
  },

  updateFileProgress: (id, progress) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, progress } : file
      ),
    }));
  },

  setConvertedFile: (id, convertedFile) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, convertedFile, progress: 100 } : file
      ),
    }));
  },

  setFileError: (id, error) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, error } : file
      ),
    }));
  },

  clearFiles: () => set({ files: [], step: 'upload' }),
}));
