import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mufidujjaman | Freelance Video Editor",
  description:
    "A premium portfolio for Mufidujjaman, a freelance video editor creating viral-ready videos with 5+ years of experience."
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
