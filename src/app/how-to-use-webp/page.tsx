'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HowToUseWebpPage() {
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
                <h1 className="text-4xl font-bold">How to Use WebP: It&apos;s Easy!</h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            WebP is an excellent format for optimizing web images, but integrating it into your website 
            requires a slightly different approach than traditional JPEG or PNG files, especially for 
            browser compatibility. Here's how to effectively use WebP in your HTML and CSS.
          </p>

          <h2 className="text-2xl font-semibold mt-8">1. Using the &lt;picture&gt; Element for HTML</h2>
          <p>
            The <code>&lt;picture&gt;</code> element is the most robust way to serve WebP images. It allows 
            you to provide multiple image sources, and the browser will automatically choose the best 
            supported format. This ensures backward compatibility for browsers that don't support WebP.
          </p>
          <pre><code className="language-html">{
`&lt;picture&gt;
  &lt;source srcset="your-image.webp" type="image/webp"&gt;
  &lt;img src="your-image.jpg" alt="Description of your image"&gt;
&lt;/picture&gt;`
}</code></pre>
          <p>
            In this example, browsers that support WebP will load <code>your-image.webp</code>. 
            Older browsers will fall back to <code>your-image.jpg</code> (or .png).
          </p>

          <h2 className="text-2xl font-semibold mt-8">2. Using WebP in CSS (with Fallback)</h2>
          <p>
            Using WebP as a CSS background image requires a bit more care for compatibility. 
            You can use feature queries (<code>@supports</code>) or simply list fallback images.
          </p>
          <h3 className="text-xl font-semibold mt-4">Using @supports:</h3>
          <pre><code className="language-css">{
`/* Default fallback */
.my-element {
  background-image: url('your-image.jpg');
}

@supports (background-image: url('your-image.webp')) {
  .my-element {
    background-image: url('your-image.webp');
  }
}`
}</code></pre>
          <h3 className="text-xl font-semibold mt-4">Simple Fallback (order matters):</h3>
          <pre><code className="language-css">{
`/* Fallback first, then WebP */
.my-element {
  background-image: url('your-image.jpg'); /* Fallback */
  background-image: url('your-image.webp'); /* WebP (if supported, overrides previous) */
}`
}</code></pre>
          <p>
            The browser will load the first supported background image. Ensure the WebP declaration comes after the fallback.
          </p>

          <h2 className="text-2xl font-semibold mt-8">3. Server-Side Detection (Advanced)</h2>
          <p>
            For more advanced scenarios, you can use server-side detection (e.g., checking the <code>Accept</code> header) 
            to serve WebP or fallback formats dynamically. This is beyond the scope of client-side HTML/CSS but 
            offers the most robust solution for large-scale applications.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="font-semibold">Ready to optimize your website's images?</p>
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
