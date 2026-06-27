import PortfolioPage from "@/components/portfolio-page";

const siteUrl = "https://mah5472651.github.io/Sadab_Website";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mufidujjaman Video Editing",
  alternateName: "Sadab Motion",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  logo: `${siteUrl}/profile-picture.jpg`,
  email: "msadab2005@gmail.com",
  telephone: "+8801617893050",
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
      "https://www.instagram.com/sadab.motion/",
      "https://www.facebook.com/share/198RWN9Pdv/"
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
    "https://www.instagram.com/sadab.motion/",
    "https://www.facebook.com/share/198RWN9Pdv/"
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
