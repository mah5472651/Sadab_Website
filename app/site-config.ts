const fallbackSiteUrl = "https://sadab-website.vercel.app";

export const siteConfig = {
  name: "Mufidujjaman Video Editing",
  alternateName: "Sadab Motion",
  creator: "Mufidujjaman",
  email: "msadab2005@gmail.com",
  phone: "+8801617893050",
  instagram: "https://www.instagram.com/sadab.motion/",
  facebook: "https://www.facebook.com/share/198RWN9Pdv/",
  description:
    "Hire Mufidujjaman, a freelance video editor and motion designer with 5+ years of experience creating viral-ready reels, YouTube edits, podcast clips, captions, color grading, and motion graphics."
};

export function getSiteUrl() {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const siteUrl = envSiteUrl || vercelUrl || fallbackSiteUrl;

  return siteUrl.replace(/\/$/, "");
}
