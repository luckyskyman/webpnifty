import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ImageComparatorProps {
  originalSrc: string;
  convertedSrc: string;
}

/**
 * Renders a slider to compare two images.
 * @param originalSrc - URL of the original image.
 * @param convertedSrc - URL of the converted image.
 */
export const ImageComparator = ({ originalSrc, convertedSrc }: ImageComparatorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border shadow-md">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={originalSrc} alt="Original Image" />}
        itemTwo={<ReactCompareSliderImage src={convertedSrc} alt="Converted Image" />}
        style={{ height: 'auto', width: '100%' }}
      />
    </div>
  );
};
