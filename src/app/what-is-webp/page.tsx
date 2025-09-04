'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WhatIsWebpPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">What is WebP?</h1>
          
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">You&apos;ve probably heard of JPEG and PNG, but what exactly is it, and why should you care? Let&apos;s dive in.</p>

          <h2 className="text-2xl font-semibold mt-8">Key Benefits of WebP</h2>
          <ul>
            <li>
              <strong>Smaller File Sizes:</strong> WebP lossless images are 26% smaller in size compared to PNGs. 
              WebP lossy images are 25-34% smaller than comparable JPEG images at equivalent SSIM quality index.
            </li>
            <li>
              <strong>Supports Transparency:</strong> WebP has an 8-bit transparency channel, which is useful for graphics and logos, much like PNGs.
            </li>
            <li>
              <strong>Supports Animation:</strong> WebP also supports animations, making it a potential replacement for the GIF format.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Why Use WebPnifty?</h2>
          <p>
            While modern browsers widely support WebP, many tools and applications still use older formats like JPEG and PNG. 
            <strong>WebPnifty</strong> provides a simple, fast, and free tool to convert your images into the highly optimized WebP format, 
            helping you improve your website's loading speed and user experience.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="font-semibold">Ready to speed up your website?</p>
            <Link href="/" className="inline-block mt-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Convert Your Images Now
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
