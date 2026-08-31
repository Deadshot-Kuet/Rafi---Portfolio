const phrases = ["CSE @ KUET", "C / C++ Developer", "Web Builder", "Problem Solver", "Nature Photographer"];
    const typewriter = document.getElementById("typewriter");
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      typewriter.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex += 1;
        setTimeout(typeLoop, 78);
        return;
      }

      if (!deleting && charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1250);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(typeLoop, 42);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 240);
    }

    function createParticles() {
      const field = document.getElementById("particleField");
      const total = window.matchMedia("(max-width: 620px)").matches ? 28 : 46;
      field.innerHTML = "";

      for (let i = 0; i < total; i += 1) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${8 + Math.random() * 14}s`;
        particle.style.animationDelay = `${Math.random() * -16}s`;
        particle.style.opacity = `${0.28 + Math.random() * 0.58}`;
        particle.style.transform = `translate3d(0, ${Math.random() * 100}vh, 0)`;
        field.appendChild(particle);
      }
    }

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.getElementById("progressBar").style.width = `${progress}%`;
      document.getElementById("navbar").classList.toggle("scrolled", scrollTop > 18);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.16 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    const navLinks = [...document.querySelectorAll(".nav-links a")];
    const sectionIds = navLinks.map((link) => link.getAttribute("href")).filter((href) => href && href.startsWith("#"));
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sectionIds.forEach((id) => {
      const section = document.querySelector(id);
      if (section) navObserver.observe(section);
    });

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    function openLightbox(src, caption) {
      lightboxImage.src = src;
      lightboxImage.alt = caption || "Expanded portfolio image";
      lightboxCaption.textContent = caption || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightboxImage.src = "";
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        openLightbox(trigger.dataset.full, trigger.dataset.caption);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", createParticles);

    typeLoop();
    createParticles();
    updateProgress();