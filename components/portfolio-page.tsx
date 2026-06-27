"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronDown,
  Cloud,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "About Us" },
  { href: "#pricing", label: "Services" },
  { href: "#testimonials", label: "Features" },
  { href: "#faq", label: "Help" }
];

const contactEmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=msadab2005@gmail.com";

const steps = [
  {
    number: "1",
    label: "Step 01",
    title: "Plan",
    copy: "Organize your vision, hook, audience, pacing, and script before a single frame is cut."
  },
  {
    number: "2",
    label: "Step 02",
    title: "Edit",
    copy: "I handle clean cuts, color grading, sound polish, captions, and motion graphics."
  },
  {
    number: "3",
    label: "Step 03",
    title: "Publish",
    copy: "Receive an attention-grabbing, viral-ready video formatted for the right platform."
  }
];

const testimonials = [
  {
    name: "Ariyan Rahman",
    handle: "@ariyanbuilds",
    review:
      "Mufid turned a rough talking-head clip into a launch video that actually held attention. The pacing was sharp, premium, and platform-ready.",
    avatar: "AR"
  },
  {
    name: "Nadia Chowdhury",
    handle: "@nadiastudio",
    review:
      "The captions, transitions, and color work made our brand feel bigger overnight. Turnaround was fast without losing the details.",
    avatar: "NC"
  },
  {
    name: "Evan Torres",
    handle: "@evancreates",
    review:
      "Every edit had a reason. Hooks landed faster, dead space disappeared, and our retention graph finally started moving the right way.",
    avatar: "ET"
  },
  {
    name: "Sadia Islam",
    handle: "@sadiafit",
    review:
      "He understands short-form rhythm. My reels started feeling less like posts and more like polished campaigns.",
    avatar: "SI"
  },
  {
    name: "Jon Miles",
    handle: "@jonmiles",
    review:
      "Clear communication, beautiful motion graphics, and a final delivery folder that was ready for every channel we needed.",
    avatar: "JM"
  },
  {
    name: "Maya Patel",
    handle: "@mayamakes",
    review:
      "The edit felt cinematic without becoming heavy. Exactly the balance we wanted for educational content that still sells.",
    avatar: "MP"
  }
];

const editingTimelineSteps = [
  {
    title: "Brief & Hook",
    copy: "We map the goal, audience, hook, pacing, and platform before the first cut.",
    time: "2 hours"
  },
  {
    title: "Rough Cut",
    copy: "I shape the story, select the strongest moments, and build the first clean structure.",
    time: "05 hours"
  },
  {
    title: "Design Polish",
    copy: "Color, sound, captions, motion graphics, and brand details bring the edit to life.",
    time: "1 hour"
  },
  {
    title: "Final Delivery",
    copy: "You receive platform-ready exports with thumbnails, captions, and launch guidance.",
    time: "05 hours"
  }
];

const editGalleryOrder = [10, 11, 12, 4, 5, 6, 7, 8, 9, 1, 2, 3];

const editGalleryVideos = editGalleryOrder.map((videoNumber, index) => ({
  title: `Edit ${String(index + 1).padStart(2, "0")}`,
  src: `/edit-gallery/edit-${String(videoNumber).padStart(2, "0")}.mp4`
}));

const pricingPlans = [
  {
    name: "Starter",
    subtitle: "Quick edit for simple content",
    price: "$80",
    timeline: "2 days",
    featured: false,
    resources: ["1 active project", "5GB cloud delivery"],
    features: [
      "Clean cuts and pacing",
      "Captions and basic sound polish",
      "1 revision included"
    ]
  },
  {
    name: "Growth",
    subtitle: "Most popular for creators",
    price: "$150",
    timeline: "5 days",
    featured: true,
    resources: ["3 active projects", "20GB cloud delivery"],
    features: [
      "Color grading and sound design",
      "Motion graphics and captions",
      "Platform-ready exports"
    ]
  },
  {
    name: "Pro",
    subtitle: "High-retention content system",
    price: "$300",
    timeline: "10 days",
    featured: false,
    resources: ["Priority production", "50GB cloud delivery"],
    features: [
      "YouTube or launch video edit",
      "Premium motion graphics",
      "2 revisions included"
    ]
  }
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sadab.motion/",
    path: "M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 8.98H3.7V20h3.24V8.98ZM5.32 4A1.88 1.88 0 1 0 5.3 7.76 1.88 1.88 0 0 0 5.32 4Zm5.43 4.98H7.64V20h3.11v-5.78c0-1.52.29-3 2.18-3 1.86 0 1.88 1.74 1.88 3.09V20h3.11v-6.42c0-3.15-.68-5.57-4.36-5.57-1.77 0-2.96.97-3.45 1.89h-.04V8.98Z"
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/198RWN9Pdv/",
    path: "M13.5 22v-8h2.68l.4-3.12H13.5V8.9c0-.9.25-1.52 1.55-1.52h1.65V4.6c-.29-.04-1.27-.12-2.42-.12-2.4 0-4.04 1.46-4.04 4.15v2.25H7.52V14h2.72v8h3.26Z"
  },
  {
    label: "Twitter",
    href: "#",
    path: "M18.9 2.5h3.07l-6.7 7.66L23.15 20.5h-6.17l-4.83-6.31-5.52 6.31H3.55l7.17-8.2L3.16 2.5h6.33l4.36 5.77L18.9 2.5Zm-1.08 16.18h1.7L8.56 4.22H6.73l11.09 14.46Z"
  }
];

const faqs = [
  {
    question: "Is my footage safe with you?",
    answer:
      "Yes. Your raw footage and project files are handled privately and used only for your edit. Nothing is shared or published without your approval."
  },
  {
    question: "What kind of revisions and support do you offer?",
    answer:
      "Every package includes revision support. I collect your feedback clearly, apply the agreed changes, and keep communication simple throughout the project."
  },
  {
    question: "How does the pricing for video editing work?",
    answer:
      "Pricing depends on video length, editing complexity, motion graphics, turnaround time, and the number of deliverables. The package cards provide clear starting points."
  },
  {
    question: "Can I cancel my ongoing editing plan at any time?",
    answer:
      "Yes. There is no forced long-term contract. You can start with one project or stop a recurring plan before the next billing period."
  },
  {
    question: "Can I upgrade or downgrade my editing package?",
    answer:
      "Yes. You can move between Starter, Growth, and Pro depending on your content schedule, video complexity, and current production needs."
  }
];

function AvatarImage({ initials }: { initials: string }) {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF6738"/>
          <stop offset="48%" stop-color="#2A1009"/>
          <stop offset="100%" stop-color="#F59E57"/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#g)"/>
      <circle cx="68" cy="25" r="18" fill="rgba(255,255,255,0.12)"/>
      <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial" font-size="30" font-weight="800" fill="white">${initials}</text>
    </svg>
  `);

  return (
    <Image
      src={`data:image/svg+xml,${svg}`}
      alt={`${initials} avatar`}
      width={48}
      height={48}
      unoptimized
      className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
    />
  );
}

function LogoImage({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-xl border border-fuchsia-200/25 bg-white/[0.06] shadow-[0_0_24px_rgba(217,70,239,0.18)] ${className}`}
    >
      <Image
        src="/mufidujjaman-logo.jpeg"
        alt="Mufidujjaman logo"
        fill
        sizes="44px"
        className="object-cover object-[50%_28%]"
        priority
      />
    </span>
  );
}

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d={path} />
    </svg>
  );
}

export default function PortfolioPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-ink text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,87,0.18),transparent_42rem)]" />

      <Header />
      <Hero />
      <VideoShowcase />
      <EditGallery />
      <HowItWorks />
      <Testimonials />
      <AudienceInsight />
      <EditingTimeline />
      <GrowthShowcase />
      <Pricing />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="ref-header">
      <nav className="ref-nav">
        <a href="#" className="ref-brand" aria-label="M Media home">
          <LogoImage className="h-9 w-9 rounded-full" />
          <span>
            Mufidujjaman
          </span>
        </a>

        <div className="ref-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ref-nav-actions">
          <a
            href="#contact"
            className="ref-contact-button"
          >
            Contact Us
          </a>
          <button
            className="ref-menu-button"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="ref-hero">
      <div className="ref-hero-ambient" />
      <div className="ref-orbit-outer" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="ref-arc" aria-hidden="true" />
      <div className="ref-inner-dome" aria-hidden="true" />
      <div className="ref-hero-bottom-fade" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="ref-hero-copy"
      >
        <h1 className="ref-hero-title">
          Create Winning Videos In Minutes
        </h1>
        <p className="ref-hero-subtitle">
          I automate the boring parts of editing so your content feels sharp,
          premium, and ready to publish with clean pacing, captions, and story.
        </p>
        <div className="ref-hero-action">
          <a
            href="#pricing"
            className="ref-hero-cta"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [88, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.45, 0.85, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <section
      ref={sectionRef}
      className="showreel-section"
      aria-labelledby="showreel-title"
    >
      <div className="showreel-copy">
        <span>Featured edit</span>
        <h2 id="showreel-title">See the pacing before we talk.</h2>
        <p>
          A compact look at the rhythm, color, captions, and story polish I
          bring into creator and brand videos.
        </p>
      </div>

      <motion.div
        className="showreel-frame"
        style={{ y, opacity, scale }}
      >
        <div className="showreel-screen">
          <video
            src="/mufidujjaman-showreel.mp4"
            poster="/video-poster.svg"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>
      </motion.div>
    </section>
  );
}

function EditGallery() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];

    if (!videos.length) {
      return;
    }

    const pauseAndMute = (video: HTMLVideoElement) => {
      video.pause();
      video.muted = true;
    };

    const playMuted = (video: HTMLVideoElement) => {
      video.muted = true;
      void video.play().catch(() => {
        // Browsers may block autoplay until the user interacts.
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const isPlayable = entry.isIntersecting && entry.intersectionRatio >= 0.35;

          if (isPlayable) {
            playMuted(video);
          } else {
            pauseAndMute(video);
          }
        });
      },
      {
        threshold: [0, 0.35, 0.65],
        rootMargin: "-8% 0px -8% 0px"
      }
    );

    videos.forEach((video) => {
      video.muted = true;
      observer.observe(video);
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videos.forEach(pauseAndMute);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleVolumeChange = (activeVideo: HTMLVideoElement | null) => {
    if (!activeVideo || activeVideo.muted || activeVideo.volume === 0) {
      return;
    }

    videoRefs.current.forEach((video) => {
      if (video && video !== activeVideo) {
        video.muted = true;
      }
    });
  };

  return (
    <section className="edit-gallery-section" aria-labelledby="edit-gallery-title">
      <div className="edit-gallery-heading">
        <span>Selected work</span>
        <h2 id="edit-gallery-title">12 edits built for attention.</h2>
        <p>
          A clean wall of vertical edits, built to autoplay silently so the
          pacing, hooks, captions, and polish can speak first.
        </p>
      </div>

      <div className="edit-gallery-grid">
        {editGalleryVideos.map((video, index) => (
          <motion.article
            key={`${video.title}-${index}`}
            className="edit-gallery-card"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: (index % 3) * 0.05 }}
          >
            <div className="edit-gallery-video-wrap">
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                src={video.src}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                onVolumeChange={(event) => handleVolumeChange(event.currentTarget)}
              />
            </div>
            <div className="edit-gallery-meta">
              <span>{video.title}</span>
              <small>Muted autoplay</small>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(255,103,56,0.12),transparent_30rem),radial-gradient(circle_at_12%_58%,rgba(255,79,35,0.06),transparent_26rem),linear-gradient(180deg,#0b0b0f_0%,#0d0706_45%,#0c0c0c_100%)] px-4 py-24 sm:px-6 lg:px-8"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b0b0f] to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6738]">
            Simple, sharp, repeatable
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-normal text-white sm:text-5xl">
            How It Works
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <motion.article
              key={step.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-[rgba(255,79,35,0.18)] bg-[radial-gradient(circle_at_10%_0%,rgba(255,103,56,0.24),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(255,79,35,0.16),transparent_42%),linear-gradient(135deg,rgba(46,15,8,0.72),rgba(18,12,10,0.96)_52%,rgba(8,8,12,0.99))] p-7 shadow-[0_0_42px_rgba(255,75,29,0.13),0_22px_70px_rgba(0,0,0,0.34)]"
            >
              <span className="pointer-events-none absolute -right-3 top-2 text-[12rem] font-black leading-none text-white/[0.065] md:text-[10rem] lg:text-[12rem]">
                {step.number}
              </span>
              <span className="pointer-events-none absolute -inset-px rounded-2xl bg-[linear-gradient(135deg,rgba(255,103,56,0.05),transparent_38%,rgba(255,79,35,0.07))] opacity-55" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6738]">
                    {step.label}
                  </span>
                  <h3 className="mt-4 text-3xl font-black tracking-normal text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-300">
                    {step.copy}
                  </p>
                </div>
                <div className="mt-8 grid h-12 w-12 place-items-center rounded-full border border-[rgba(255,103,56,0.26)] bg-[rgba(255,79,35,0.035)] text-[#ffb69a] shadow-[0_0_20px_rgba(255,75,29,0.16)]">
                  <Check className="h-5 w-5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const rows = [testimonials.slice(0, 3), testimonials.slice(3)];

  return (
    <section
      id="testimonials"
      className="testimonial-marquee-section"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-copper">
          Trusted by creators and brands
        </span>
        <h2 className="mt-3 text-4xl font-black tracking-normal text-white sm:text-5xl">
          What Our Users Are Saying
        </h2>
      </div>

      <div className="testimonial-marquee-wrap">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`testimonial-marquee-row ${
              rowIndex === 1 ? "testimonial-marquee-row-reverse" : ""
            }`}
          >
            {[...row, ...row, ...row].map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.handle}-${rowIndex}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className="testimonial-marquee-card">
      <div className="flex items-center gap-4">
        <div className="relative">
          <AvatarImage initials={testimonial.avatar} />
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-[#120906] bg-[linear-gradient(180deg,#ff8a5f,#ff4f23)] text-white shadow-[0_0_18px_rgba(255,75,29,0.38)]">
            <BadgeCheck className="h-3.5 w-3.5" />
          </span>
        </div>
        <div>
          <h3 className="font-bold text-white">{testimonial.name}</h3>
          <p className="text-sm text-zinc-500">{testimonial.handle}</p>
        </div>
      </div>
      <div className="mt-5 flex gap-1 text-copper">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-zinc-300">
        {testimonial.review}
      </p>
    </article>
  );
}

function AudienceInsight() {
  const orbitItems = [
    {
      className: "audience-orbit-top",
      title: "Brand Color Optimization",
      copy: "Keep the visual system consistent"
    },
    {
      className: "audience-orbit-left",
      title: "Stronger First Frame",
      copy: "Raise the opening hook"
    },
    {
      className: "audience-orbit-right",
      title: "Icon & Caption Polish",
      copy: "Improve instant recognition"
    },
    {
      className: "audience-orbit-bottom",
      title: "Delight Details",
      copy: "Add memorable emotional cues"
    }
  ];

  return (
    <section className="audience-ref-section" aria-labelledby="audience-title">
      <div className="audience-ref-inner">
        <div className="audience-ref-copy">
          <span className="audience-ref-badge">1.1 Audience Insight</span>
          <h2 id="audience-title">
            Viewer personas behind every high-retention edit
          </h2>
          <p>
            Before cutting a frame, I study who is watching, what makes them
            stop, and which visual cues help the message feel instantly clear.
            For creator content, <strong>audience behavior</strong> becomes the
            foundation for rhythm, captions, color, and story.
          </p>
        </div>

        <div className="audience-ref-visual" aria-label="Video editing optimization diagram">
          <div className="audience-diamond-large" aria-hidden="true" />
          <div className="audience-diamond-core">
            <strong>Higher Content Recall</strong>
            <span>Visual clarity upgrade</span>
          </div>
          {orbitItems.map((item) => (
            <div key={item.title} className={`audience-orbit-node ${item.className}`}>
              <strong>{item.title}</strong>
              <span>{item.copy}</span>
            </div>
          ))}
          <span className="audience-dot audience-dot-top" aria-hidden="true" />
          <span className="audience-dot audience-dot-left" aria-hidden="true" />
          <span className="audience-dot audience-dot-right" aria-hidden="true" />
          <span className="audience-dot audience-dot-bottom" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function EditingTimeline() {
  return (
    <section id="editing-timeline" className="timeline-ref-section" aria-labelledby="editing-timeline-title">
      <div className="timeline-ref-inner">
        <motion.h2
          id="editing-timeline-title"
          className="timeline-ref-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          Your Future Videos Start{" "}
          <span>
            <Rocket aria-hidden="true" />
            Here:
          </span>
          <br />
          Strategic, Sleek, and Effective
        </motion.h2>

        <div className="timeline-ref-stage">
          <div className="timeline-ref-track" aria-hidden="true" />
          <div className="timeline-ref-grid">
            {editingTimelineSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className={`timeline-ref-item timeline-ref-item-${index + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              >
                <div className="timeline-ref-copy">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
                <span className="timeline-ref-vertical" aria-hidden="true" />
                <div className="timeline-ref-chip">
                  <span>{step.time}</span>
                  <i aria-hidden="true" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GrowthShowcase() {
  const orbitItems = [
    { label: "Audience", icon: Users, position: "node-audience" },
    { label: "Reach", icon: Globe2, position: "node-reach" },
    { label: "Insights", icon: BarChart3, position: "node-insights" },
    { label: "Performance", icon: TrendingUp, position: "node-performance" },
    { label: "Focus", icon: Target, position: "node-focus" }
  ];

  return (
    <section className="showcase-ref-section" aria-labelledby="growth-title">
      <div className="showcase-ref-layout">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="showcase-ref-copy"
        >
          <span className="showcase-ref-kicker">A smarter content engine</span>
          <h2 id="growth-title">Turn every edit into measurable growth.</h2>
          <p>
            Great editing should do more than look polished. I build content
            systems around stronger hooks, clearer stories, and platform-ready
            delivery so every video has a job to do.
          </p>
          <div className="showcase-ref-points">
            <div><Check />Retention-focused storytelling</div>
            <div><Check />Consistent visual identity</div>
            <div><Check />Ready for every key platform</div>
          </div>
          <a href="#pricing" className="showcase-ref-copy-cta">
            Explore packages <ArrowUpRight />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="showcase-ref-visual"
        >
          <div className="showcase-ref-particle-field" aria-hidden="true" />
          <div className="showcase-ref-orange-glow" aria-hidden="true" />
          <div className="showcase-ref-glass">
            <h3>Grow</h3>
            <p>
              Maximize the value of every idea with strategic editing,
              consistent delivery, and performance-led creative decisions.
            </p>
            <div className="showcase-ref-orbit" aria-label="Growth system map">
              <span className="showcase-ref-ring ring-one" />
              <span className="showcase-ref-ring ring-two" />
              <span className="showcase-ref-ring ring-three" />
              <span className="showcase-ref-core"><Sparkles /></span>
              {orbitItems.map(({ label, icon: Icon, position }) => (
                <span
                  key={label}
                  className={`showcase-ref-node-track ${position}`}
                >
                  <span className="showcase-ref-node-motion">
                    <span className="showcase-ref-node" role="img" aria-label={label}>
                      <Icon />
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="pricing-ref-section">
      <div className="pricing-ref-ambient" aria-hidden="true" />
      <div className="pricing-ref-grid">
        {pricingPlans.map((plan) => (
          <motion.article
            key={plan.name}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`pricing-ref-card ${plan.featured ? "is-featured" : ""}`}
          >
            <div className="pricing-ref-decoration" aria-hidden="true" />
            <div className="pricing-ref-card-content">
              <div className="pricing-ref-card-top">
                <span className="pricing-ref-logo" aria-hidden="true">M</span>
                {plan.featured && (
                  <span className="pricing-ref-popular">Most popular</span>
                )}
              </div>

              <h3>{plan.name}</h3>
              <p className="pricing-ref-subtitle">{plan.subtitle}</p>

              <div className="pricing-ref-price">
                <strong>{plan.price}</strong>
                <span>/project</span>
              </div>

              <a href="#footer" className="pricing-ref-button">
                Choose this plan
              </a>

              <div className="pricing-ref-resources">
                <div><Users />{plan.resources[0]}</div>
                <div><Cloud />{plan.resources[1]}</div>
              </div>

              <div className="pricing-ref-divider">
                <span>{plan.featured ? "CREATOR ENGINE +" : "EDITING ESSENTIALS +"}</span>
              </div>

              <div className="pricing-ref-features">
                {plan.features.map((item, index) => (
                  <div key={item}>
                    <span><Check /></span>
                    {item}
                    {plan.featured && index === 0 && (
                      <small>AI-assisted</small>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      id="faq"
      className="faq-ref-section"
    >
      <div className="faq-ref-heading">
        <span className="faq-ref-badge">
          <span aria-hidden="true">?</span>
          FAQ
        </span>
        <h2>
          Some of the things you<br className="hidden sm:block" /> may want to know
        </h2>
        <p>We answered questions so you don&apos;t have to ask them.</p>
      </div>

      <div className="faq-ref-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className={`faq-ref-item ${isOpen ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="faq-ref-question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className="faq-ref-chevron" />
              </button>

              <div
                className={`faq-ref-answer ${isOpen ? "is-open" : ""}`}
              >
                <div className="overflow-hidden">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const contactMethods = [
    {
      label: "Email us",
      value: "msadab2005@gmail.com",
      href: contactEmailUrl,
      icon: Mail
    },
    {
      label: "Call us",
      value: "01617893050",
      href: "https://wa.me/8801617893050",
      icon: Phone
    },
    {
      label: "Our location",
      value: "Dhaka, Bangladesh",
      href: "https://www.google.com/maps/place/Dhaka,+Bangladesh",
      icon: MapPin
    }
  ];

  return (
    <section id="contact" className="contact-ref-section" aria-labelledby="contact-title">
      <span className="contact-ref-word" aria-hidden="true">Contact</span>
      <span className="contact-ref-line contact-ref-line-left" aria-hidden="true" />
      <span className="contact-ref-line contact-ref-line-right" aria-hidden="true" />

      <div className="contact-ref-inner">
        <div className="contact-ref-copy">
          <span className="contact-ref-pill">
            <Sparkles className="h-3.5 w-3.5" />
            Contact
          </span>
          <h2 id="contact-title">Get in touch</h2>
          <p>
            Have footage, a launch idea, or a content system you want to make
            sharper? Send the details and I will help shape the next edit.
          </p>

          <div className="contact-ref-methods">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  className="contact-ref-method"
                  target={method.href.startsWith("http") ? "_blank" : "_self"}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${method.label}: ${method.value}`}
                >
                  <span className="contact-ref-method-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <strong>{method.label}</strong>
                    <small>{method.value}</small>
                  </span>
                  <ArrowUpRight className="contact-ref-method-arrow h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <form className="contact-ref-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span>Name</span>
            <input type="text" name="name" placeholder="Name" autoComplete="name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="Email" autoComplete="email" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Message" rows={8} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" }
  ];
  const services = [
    "Short-form reels",
    "YouTube video editing",
    "Podcast clips",
    "Motion graphics",
    "Color grading"
  ];
  const legalLinks = ["Terms of Service", "Privacy Policy", "Cookie Policy", "Sitemap"];

  return (
    <footer id="footer" className="footer-ref-section px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="footer-ref-panel mx-auto w-full max-w-7xl rounded-[2rem] p-6 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <a href="#" className="flex items-center gap-3">
              <LogoImage className="h-11 w-11" />
              <span className="text-xl font-black">Mufidujjaman</span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-400">
              Premium video editing for creators, coaches, startups, and brands
              that want sharper storytelling and stronger retention.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="footer-ref-social grid h-10 w-10 place-items-center rounded-full text-zinc-300 transition hover:-translate-y-0.5 hover:text-white"
                >
                  <SocialIcon path={link.path} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-white">Quick Links</h3>
            <div className="mt-6 grid gap-4 text-sm font-semibold text-zinc-400">
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-white">Our Services</h3>
            <div className="mt-6 grid gap-4 text-sm font-semibold text-zinc-400">
              {services.map((service) => (
                <a key={service} href="#pricing" className="hover:text-white">
                  {service}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-white">Contact Us</h3>
            <div className="mt-6 grid gap-5 text-sm font-semibold leading-6 text-zinc-400">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                <span>Dhaka, Bangladesh<br />Available worldwide</span>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                <a
                  href={contactEmailUrl}
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email msadab2005@gmail.com"
                >
                  msadab2005@gmail.com
                </a>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                <a
                  href="https://wa.me/8801617893050"
                  className="hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open WhatsApp chat with 01617893050"
                >
                  01617893050
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-sm text-zinc-500 lg:flex lg:items-center lg:justify-between">
          <p>Copyright © {year} Mufidujjaman. All rights reserved.</p>
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 lg:mt-0">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
