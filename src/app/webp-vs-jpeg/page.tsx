'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WebpVsJpegPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="w-full max-w-4xl mx-auto py-4 px-4 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft size={16} />
          <span>Back to Converter</span>
        </Link>
      </header>
      <main className="max-w-4xl mx-auto p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <article className="prose prose-lg dark:prose-invert">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">WebP vs. JPEG: Which Image Format is Better?</h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choosing the right image format is crucial for website performance and user experience. 
            While JPEG has been the dominant format for photographic images for decades, 
            <strong>WebP</strong> has emerged as a powerful successor, offering superior compression and modern features.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Understanding JPEG</h2>
          <p>
            <strong>JPEG (Joint Photographic Experts Group)</strong> is a widely used lossy compression format 
            for digital images, particularly for photographs. It achieves smaller file sizes by discarding 
            some image data, which is generally imperceptible to the human eye at higher quality settings.
          </p>
          <ul>
            <li><strong>Pros:</strong> Excellent for photographs, widely supported by browsers and software, good balance of quality and file size at moderate compression.</li>
            <li><strong>Cons:</strong> Lossy compression means some data is permanently lost, does not support transparency or animation, can show artifacts at high compression.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Understanding WebP</h2>
          <p>
            <strong>WebP</strong>, developed by Google, is a modern image format that provides superior 
            <strong>lossless and lossy compression</strong> for images on the web. It aims to create smaller, 
            richer images that make the web faster.
          </p>
          <ul>
            <li><strong>Pros:</strong> Significantly smaller file sizes than JPEG (25-34% smaller at equivalent quality), supports both lossy and lossless compression, supports transparency (like PNG), supports animation (like GIF).</li>
            <li><strong>Cons:</strong> Older browsers might not support it (though support is now widespread), conversion tools might be needed for legacy systems.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Key Differences and When to Use Each</h2>
          <p>
            The primary advantage of WebP over JPEG is its superior compression efficiency, leading to smaller file sizes without sacrificing visual quality. This translates directly to faster website loading times and reduced bandwidth consumption.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JPEG</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WebP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">File Size</td>
                  <td className="px-6 py-4 whitespace-nowrap">Larger</td>
                  <td className="px-6 py-4 whitespace-nowrap">Smaller (25-34% less)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Lossy Compression</td>
                  <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Lossless Compression</td>
                  <td className="px-6 py-4 whitespace-nowrap">No</td>
                  <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Transparency</td>
                  <td className="px-6 py-4 whitespace-nowrap">No</td>
                  <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Animation</td>
                  <td className="px-6 py-4 whitespace-nowrap">No</td>
                  <td className="px-6 py-4 whitespace-nowrap">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Browser Support</td>
                  <td className="px-6 py-4 whitespace-nowrap">Universal</td>
                  <td className="px-6 py-4 whitespace-nowrap">Widespread (modern browsers)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            For most web use cases, <strong>WebP is the superior choice</strong> due to its efficiency and versatility. 
            While JPEG still has its place, especially for legacy systems or very specific photographic needs, 
            adopting WebP can significantly boost your website's performance and provide a better user experience.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="font-semibold">Ready to optimize your images?</p>
            <Link href="/" className="inline-block mt-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Convert Your Images to WebP Now
            </Link>
          </div>
        </article>
      </main>
      <footer className="w-full max-w-4xl mx-auto mt-8 py-4 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} WebPnifty. All rights reserved.</p>
      </footer>
    </div>
  );
}
