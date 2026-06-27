import PortfolioPage from "@/components/portfolio-page";
import { getSiteUrl, siteConfig } from "./site-config";

const siteUrl = getSiteUrl();

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  logo: `${siteUrl}/profile-picture.jpg`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD"
  },
  founder: {
    "@type": "Person",
    name: "Mufidujjaman",
    jobTitle: "Freelance Video Editor and Motion Designer",
    image: `${siteUrl}/profile-picture.jpg`,
    sameAs: [
      siteConfig.instagram,
      siteConfig.facebook
    ]
  },
  serviceType: [
    "Short-form reels editing",
    "YouTube video editing",
    "Podcast clips",
    "Motion graphics",
    "Color grading",
    "Caption editing"
  ],
  sameAs: [
    siteConfig.instagram,
    siteConfig.facebook
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioPage />
    </>
  );
}
