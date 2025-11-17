import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "TrustMRR - The database of verified startup revenues",
  description: "Browse verified startup revenues and MRR. All revenue is verified through Stripe API keys. Data is updated hourly.",
  keywords: ["startup", "revenue", "MRR", "SaaS", "verified", "Stripe"],
  authors: [{ name: "Marc Lou" }],
  openGraph: {
    title: "TrustMRR - The database of verified startup revenues",
    description: "Browse verified startup revenues and MRR. All revenue is verified through Stripe API keys.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustMRR - The database of verified startup revenues",
    description: "Browse verified startup revenues and MRR. All revenue is verified through Stripe API keys.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
