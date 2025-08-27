import { useState } from 'react';
import { useFileStore, FileState } from '@/store/useFileStore';
import { useImageConverter, ConversionOptions } from '@/hooks/useImageConverter';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileImage, Settings, Zap } from 'lucide-react';

const PRESETS = {
  default: { quality: 0.8, format: 'image/webp', maxWidthOrHeight: 1920, keepExif: false },
  max: { quality: 0.5, format: 'image/webp', maxWidthOrHeight: 1280, keepExif: false },
  hq: { quality: 0.95, format: 'image/webp', maxWidthOrHeight: 3840, keepExif: true },
};

export const EditStep = () => {
  const { files, setConvertedFile, setFileError, setStep, updateFileProgress } = useFileStore();
  const { convertImage } = useImageConverter();
  const [isConverting, setIsConverting] = useState(false);

  // Batch conversion progress calculation
  const progress = useFileStore(state => {
    if (state.files.length === 0) return 0;
    const totalProgress = state.files.reduce((acc, f) => acc + f.progress, 0);
    return Math.round(totalProgress / state.files.length);
  });

  const [options, setOptions] = useState<Omit<ConversionOptions, 'format'> & { format: string }>(PRESETS.default);

  const handleOptionsChange = (key: keyof typeof options, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: keyof typeof PRESETS) => {
    setOptions(PRESETS[preset]);
  };

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const conversionOptions: ConversionOptions = {
        ...options,
        format: options.format as 'image/webp' | 'image/avif',
      };

      const conversionPromises = files.map(fileState => {
        const optionsWithProgress: ConversionOptions = {
          ...conversionOptions,
          onProgress: (p: number) => updateFileProgress(fileState.id, p),
        };

        return convertImage(fileState.originalFile, optionsWithProgress)
          .then(convertedFile => {
            setConvertedFile(fileState.id, convertedFile);
          })
          .catch(err => {
            const error = err as Error;
            setFileError(fileState.id, error.message || 'An unknown error occurred');
          });
      });

      await Promise.all(conversionPromises);
      setStep('result');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Files List */}
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><FileImage className="mr-2" /> Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {files.map(file => (
              <div key={file.id} className="text-sm p-2 border rounded-md">{file.originalFile.name}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Conversion Options */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Settings className="mr-2" /> Conversion Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Presets */}
            <div className="space-y-2">
              <Label>Presets</Label>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => applyPreset('default')}>Default</Button>
                <Button variant="outline" onClick={() => applyPreset('max')}>Max Compression</Button>
                <Button variant="outline" onClick={() => applyPreset('hq')}>High Quality</Button>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="quality">Quality: {Math.round(options.quality * 100)}</Label>
                <Slider id="quality" value={[options.quality]} onValueChange={([v]) => handleOptionsChange('quality', v)} max={1} step={0.01} />
              </div>
              <div>
                <Label htmlFor="format">Format</Label>
                <Select value={options.format} onValueChange={(v) => handleOptionsChange('format', v)}>
                  <SelectTrigger id="format"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image/webp">WebP</SelectItem>
                    <SelectItem value="image/avif">AVIF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resolution">Max Resolution</Label>
                <Input id="resolution" type="number" value={options.maxWidthOrHeight} onChange={(e) => handleOptionsChange('maxWidthOrHeight', parseInt(e.target.value, 10))} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="exif" checked={options.keepExif} onCheckedChange={(v) => handleOptionsChange('keepExif', v)} />
                <Label htmlFor="exif">Keep EXIF data</Label>
              </div>
            </div>

            <Button onClick={handleConvert} disabled={isConverting} className="w-full">
              <Zap className="mr-2 h-4 w-4" />
              {isConverting ? `Converting... (${progress}%)` : `Convert ${files.length} image(s)`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
