const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const revealElements = document.querySelectorAll(".reveal");
const yearElement = document.querySelector("#year");
const faqItems = document.querySelectorAll(".faq-ref-item");
const galleryVideos = Array.from(document.querySelectorAll(".edit-gallery-video-wrap video"));
const contactForm = document.querySelector(".contact-ref-form");

const socialProfileLinks = {
  instagram: "https://www.instagram.com/sadab.motion/",
  linkedin: "#",
  facebook: "https://www.facebook.com/share/198RWN9Pdv/",
  twitter: "#"
};

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-social]").forEach((link) => {
  const platform = link.dataset.social;
  const href = socialProfileLinks[platform];

  if (href) {
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
});

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -80px 0px"
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (galleryVideos.length) {
  const pauseAndMute = (video) => {
    video.pause();
    video.muted = true;
  };

  const playMuted = (video) => {
    video.muted = true;
    video.play().catch(() => {
      // Autoplay can be blocked until the first user interaction.
    });
  };

  const galleryVideoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
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

  galleryVideos.forEach((video) => {
    video.muted = true;
    galleryVideoObserver.observe(video);

    video.addEventListener("volumechange", () => {
      if (video.muted || video.volume === 0) {
        return;
      }

      galleryVideos.forEach((otherVideo) => {
        if (otherVideo !== video) {
          otherVideo.muted = true;
        }
      });
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      galleryVideos.forEach(pauseAndMute);
    }
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-ref-question");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      faqItem.querySelector(".faq-ref-question")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if (contactForm) {
  const statusElement = contactForm.querySelector(".contact-ref-status");
  const submitButton = contactForm.querySelector("button[type='submit']");

  const showContactStatus = (status, message, fallbackUrl = "") => {
    if (!statusElement) {
      return;
    }

    statusElement.hidden = false;
    statusElement.className = `contact-ref-status is-${status}`;
    statusElement.textContent = message;

    if (fallbackUrl) {
      statusElement.append(" ");
      const link = document.createElement("a");
      link.href = fallbackUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Send by email";
      statusElement.append(link);
    }
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      showContactStatus("error", "Please fill in your name, email, and message.");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (statusElement) {
      statusElement.hidden = true;
      statusElement.textContent = "";
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const submitError = new Error(result.message || "Unable to submit right now.");
        submitError.fallbackUrl = result.fallbackUrl || "";
        throw submitError;
      }

      contactForm.reset();
      showContactStatus("success", "Message sent. I will get back to you soon.");
    } catch (error) {
      showContactStatus(
        "error",
        error instanceof Error ? error.message : "Unable to submit right now.",
        error && typeof error === "object" && "fallbackUrl" in error
          ? String(error.fallbackUrl)
          : ""
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }
    }
  });
}
