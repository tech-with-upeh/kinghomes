import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Poppins } from "next/font/google";
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
  title: {
    default: "KingHomes - Premium Real Estate Platform",
    template: "%s | KingHomes"
  },
  description: "Discover your dream home with KingHomes. Browse luxury properties, apartments, villas, and houses for sale or rent. Smart real estate for modern living.",
  keywords: ["real estate", "property", "homes", "apartments", "villas", "houses", "buy", "rent", "sell"],
  authors: [{ name: "KingHomes" }],
  creator: "KingHomes",
  publisher: "KingHomes",
  metadataBase: new URL('https://kinghomes.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kinghomes.vercel.app",
    title: "KingHomes - Premium Real Estate Platform",
    description: "Discover your dream home with KingHomes. Browse luxury properties for sale or rent.",
    siteName: "KingHomes",
  },
  twitter: {
    card: "summary_large_image",
    title: "KingHomes - Premium Real Estate Platform",
    description: "Discover your dream home with KingHomes. Browse luxury properties for sale or rent.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}  antialiased`}>{children}</body>
    </html>
  );
}
