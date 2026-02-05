import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LightningBackground from "@/components/LightningBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : new URL('http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: "kuburin - R.I.P Long URLs",
  description: "Bury your links. Let them rest in peace.",
  openGraph: {
    title: "kuburin - R.I.P Long URLs",
    description: "The spookiest URL shortener. Bury your links and let them rest in peace.",
    url: baseUrl.toString(),
    siteName: "kuburin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kuburin - R.I.P Long URLs",
    description: "Bury your links. Let them rest in peace.",
    images: ["/og-image.png"],
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
        <LightningBackground />
        {children}
      </body>
    </html>
  );
}
