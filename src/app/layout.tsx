import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Import the Script component
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebPnifty | Fast & Easy Image Converter to WebP & AVIF",
  description: "Convert your images (JPG, PNG, GIF) to next-gen formats like WebP and AVIF for free. Optimize your website images for faster loading times with our simple online tool.",
  keywords: ["image converter", "webp converter", "avif converter", "jpg to webp", "png to webp", "image optimization", "next-gen images", "free tool"],
  openGraph: {
    title: "WebPnifty | Fast & Easy Image Converter to WebP & AVIF",
    description: "The simplest way to convert and optimize your images for the modern web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" // TODO: Replace with your AdSense client ID
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
