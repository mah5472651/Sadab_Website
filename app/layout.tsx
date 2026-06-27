import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "./site-config";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mufidujjaman | Freelance Video Editor & Motion Designer",
    template: "%s | Mufidujjaman"
  },
  description:
    siteConfig.description,
  keywords: [
    "freelance video editor",
    "video editor portfolio",
    "motion graphics editor",
    "short form reels editor",
    "YouTube video editing",
    "podcast clips editor",
    "Instagram reels editor",
    "Bangladesh video editor",
    "Mufidujjaman",
    "Sadab Motion"
  ],
  authors: [{ name: siteConfig.creator, url: siteUrl }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  category: "Video Editing Portfolio",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/profile-picture.jpg", type: "image/jpeg", sizes: "512x512" }
    ],
    apple: [
      { url: "/profile-picture.jpg", type: "image/jpeg", sizes: "512x512" }
    ]
  },
  openGraph: {
    title: "Mufidujjaman | Freelance Video Editor & Motion Designer",
    description:
      "Premium video editing, short-form reels, YouTube edits, captions, color grading, and motion graphics for creators and brands.",
    url: siteUrl,
    siteName: `${siteConfig.creator} Video Editing Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mufidujjaman freelance video editor profile"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mufidujjaman | Freelance Video Editor & Motion Designer",
    description:
      "Viral-ready reels, YouTube edits, captions, color grading, and motion graphics for creators and brands.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
