// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

  // Only add mobile menu functionality if we're on mobile
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link (but not dropdown toggles)
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      if (this.classList.contains("dropdown-toggle")) return;

      // Only run on mobile (when mobile menu is visible)
      if (window.innerWidth <= 767) {
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove("active");
        }
        navLinks.classList.remove("active");
      }
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 20px rgba(61, 37, 6, 0.5)";
    } else {
      header.style.boxShadow = "0 4px 20px rgba(61, 37, 6, 0.4)";
    }
  });

  // Add subtle animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Expose function to initialize animations dynamically
  window.initCardAnimations = function () {
    document
      .querySelectorAll(
        ".seller-card, .category-card, .product-card, .value-card, .why-item, .info-item",
      )
      .forEach((card) => {
        // Only target card if it's not already visible
        if (card.style.opacity !== "1") {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          observer.observe(card);
        }
      });
  };

  // Run card animations initially
  window.initCardAnimations();

  // Navbar Search functionality
  const navSearchInput = document.querySelector(".nav-search-input");
  if (navSearchInput) {
    navSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = this.value.trim();
        if (query) {
          window.location.href = `rings.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // Handle mobile menu accordions
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 767) {
        e.preventDefault();
        const parentLi = this.parentElement;
        const isActive = parentLi.classList.contains("active");

        // Close all other dropdowns
        document.querySelectorAll(".dropdown").forEach((el) => {
          el.classList.remove("active");
          const a = el.querySelector(".dropdown-toggle");
          if (a) a.setAttribute("aria-expanded", "false");
        });

        // Toggle this dropdown
        if (!isActive) {
          parentLi.classList.add("active");
          this.setAttribute("aria-expanded", "true");
        } else {
          parentLi.classList.remove("active");
          this.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Google Maps link enhancement
  const mapLinks = document.querySelectorAll(
    'a[href*="maps.google.com"], a.maps-btn',
  );
  mapLinks.forEach((mapLink) => {
    mapLink.addEventListener("click", function (e) {
      // Open Google Maps with the exact location
      const address =
        "UG+2,3+Royal+Diamond+Building+Yeshwant+Niwas+Road+opposite+SBI+BANK+Sanghi+Colony+Yeshwant+Colony+Indore+Madhya+Pradesh+452002";
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${address}`,
        "_blank",
      );
    });
  });

  // Phone click tracking
  document.querySelectorAll('a[href^="tel:"]').forEach((phoneLink) => {
    phoneLink.addEventListener("click", function () {
      console.log("Phone number clicked: " + this.getAttribute("href"));
    });
  });

  // Smooth scrolling for anchor links on homepage
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !phone || !message) {
        alert("Please fill in all required fields (Name, Phone, and Message)");
        return;
      }

      // Phone number validation (Indian format)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit Indian mobile number");
        return;
      }

      // If validation passes
      alert("Thank you for your message! We will contact you shortly.");
      this.reset();

      // Here you would typically send the form data to a server
      // For now, we'll just redirect to WhatsApp as an alternative
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918224998809&text=Hello%20Roshan%20Jewels%2C%20My%20name%20is%20${encodeURIComponent(name)}.%20${encodeURIComponent(message)}.%20My%20phone%20number%20is%20${encodeURIComponent(phone)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // Set active link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  // Clear active classes initially
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
  });

  // Apply active class to matching link and its parent dropdown toggle
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage && linkPage === currentPage && currentPage !== "#") {
      link.classList.add("active");
      
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector(".dropdown-toggle");
        if (toggle) toggle.classList.add("active");
      }
    }
  });
});
