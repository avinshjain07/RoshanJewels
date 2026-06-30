/**
 * Roshan Jewel Dynamic Product and Category Renderer
 * Dynamically handles rendering, filtering, search, and SEO for all collection and category pages.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Identify current page context
  const path = window.location.pathname;
  let pageName = path.split("/").filter(Boolean).pop() || "index.html";
  if (!pageName.endsWith(".html")) {
    pageName += ".html";
  }

  let pageContext = {
    mode: "", // "collection" (e.g. gold.html) or "type" (e.g. rings.html) or "search"
    value: "", // e.g. "Gold Collection" or "Rings"
    title: "",
    subtitle: "",
    description: ""
  };

  // Map file names to contexts
  if (pageName === "rings.html") {
    pageContext = {
      mode: "type",
      value: "Rings",
      title: "Rings Collection",
      subtitle: "Discover our exquisite range of handcrafted rings for every occasion",
      description: "From timeless engagement rings to traditional temple designs, our rings collection showcases the finest craftsmanship. Each ring is meticulously crafted and available in various designs to suit your style and occasion."
    };
  } else if (pageName === "earrings.html") {
    pageContext = {
      mode: "type",
      value: "Earrings",
      title: "Earrings Collection",
      subtitle: "Discover elegant earrings that frame your beauty, from traditional jhumkas to contemporary studs",
      description: "Our earrings collection celebrates the diversity of Indian jewellery design. From the timeless appeal of traditional jhumkas to the modern elegance of studs, each pair is crafted to perfection in hallmarked gold, silver, and diamonds."
    };
  } else if (pageName === "necklaces.html") {
    pageContext = {
      mode: "type",
      value: "Necklaces",
      title: "Necklaces Collection",
      subtitle: "Traditional and contemporary necklaces that add grace and elegance to your special moments",
      description: "Our necklace collection represents the pinnacle of Indian jewellery craftsmanship. Each piece is designed to make you feel special, whether it's a grand kundan set, a sparkling diamond set, or a simple gold chain."
    };
  } else if (pageName === "diamond.html") {
    pageContext = {
      mode: "collection",
      value: "Diamond Collection",
      title: "Diamond Collection",
      subtitle: "Three Generations of Quiet Brilliance in Certified Diamonds",
      description: "Experience the ultimate luxury of our Diamond Collection. Featuring GIA-certified solitaire rings, exquisite diamond tops, necklace sets, kadas, and custom diamond mangalsutras set in 18K yellow, white, and rose gold."
    };
  } else if (pageName === "gold.html") {
    pageContext = {
      mode: "collection",
      value: "Gold Collection",
      title: "Gold Collection",
      subtitle: "Poetry Cast in 22K Hallmarked Gold Since 1965",
      description: "Explore Indore's finest handcrafted gold jewellery. From royal antique sets and heavy rani hars to lightweight daily wear chains, kadas, and traditional gajres, each masterpiece reflects our heritage of three generations of purity."
    };
  } else if (pageName === "silver.html") {
    pageContext = {
      mode: "collection",
      value: "Silver Collection",
      title: "Silver Collection",
      subtitle: "Contemporary and Traditional Silver Masterpieces",
      description: "Discover pure sterling silver rings, earrings, gold-polished sets, kadas, and anklets (payals). We also offer a premium range of 99.9% fine silver thali sets, bowls, glasses, dipaks, and Ganesha idols ideal for worship and gifting."
    };
  } else if (pageName === "kundan.html") {
    pageContext = {
      mode: "collection",
      value: "Kundan Collection",
      title: "Kundan & Polki Collection",
      subtitle: "Exquisite Jadau and Chased Gold Enamel Masterpieces",
      description: "Step into royalty with our Kundan & Polki Collection. Showcasing traditional Rajasthani and Mughal heritage, our Kundan necklaces and pendant sets feature hand-set stones backed by beautiful Meenakari (enameling) details."
    };
  } else if (pageName === "beads.html") {
    pageContext = {
      mode: "collection",
      value: "Beads Collection",
      title: "Beads & Gemstone Collection",
      subtitle: "Vibrant Hand-strung Gemstones and Italian Charms",
      description: "Discover the playful luxury of our Beads Collection. Hand-strung emerald and ruby malas, customized Italian sterling silver charm sets, and vibrant bead-laden jhumkas that add a striking pop of color and personality to any outfit."
    };
  } else if (pageName === "bullion.html") {
    pageContext = {
      mode: "collection",
      value: "Bullion Collection",
      title: "Bullion & Raw Materials",
      subtitle: "Trusted Purity in Certified Gold and Silver Investment Coins",
      description: "Secure your wealth with our Bullion Collection. We offer government-certified, 24K (999.9) gold coins, 99.9% pure silver coins with embossed motifs, and high-purity raw metals and grains for manufacturing and investment."
    };
  } else if (pageName === "gifts.html") {
    pageContext = {
      mode: "collection",
      value: "Gifts & Fine Articles",
      title: "Gifting Collection",
      subtitle: "Timeless Gifts of Devotion and Luxury",
      description: "Find the perfect keepsake for your loved ones. Our gifting collection features gold and silver plated divine photo frames, fine articles, and luxury items crafted to be cherished across generations."
    };
  } else {
    // Fallback or generic search page
    pageContext = {
      mode: "search",
      value: "Search Results",
      title: "Jewellery Collection",
      subtitle: "Explore Roshan Jewel's Full Inventory",
      description: "Browse our complete range of certified gold, diamond, silver, kundan, beads, and bullion collections."
    };
  }

  // 2. Read URL parameters (pre-populate search/filters)
  const urlParams = new URLSearchParams(window.location.search);
  let searchQuery = urlParams.get("search") || "";
  let activeFilter = urlParams.get("filter") || "All";

  // Catalog and Modal state
  let currentFilteredProducts = [];
  let currentIndex = 0;
  const BATCH_SIZE = 16;
  let sentinelObserver = null;
  let activeProductIndex = -1;

  // 3. Inject text and updates into DOM
  updatePageText();
  updateSEO();
  renderBreadcrumbs();
  renderSearchAndFilters();

  // Initialize product lightbox modal
  initProductModal();

  // 4. Render product cards
  renderProducts();

  // ==========================================
  // CORE FUNCTIONS
  // ==========================================

  // Update headers and descriptions
  function updatePageText() {
    const titleEl = document.querySelector(".page-header h1") || document.getElementById("category-title");
    const subtitleEl = document.querySelector(".page-header p") || document.getElementById("category-subtitle");
    const descEl = document.querySelector(".category-intro p") || document.getElementById("category-description");

    if (titleEl) titleEl.textContent = pageContext.title;
    if (subtitleEl) subtitleEl.textContent = pageContext.subtitle;
    if (descEl) descEl.textContent = pageContext.description;
  }

  // Update document title and meta descriptors for SEO
  function updateSEO() {
    document.title = `${pageContext.title} | Roshan Jewel - Stories Cast in Gold Since 1965 | Indore`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = `Explore the luxury ${pageContext.title} at Roshan Jewel Indore. Discover handcrafted ${pageContext.value} jewelry including rings, earrings, necklaces, bangles, and kadas since 1965.`;

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = `roshan jewel, roshan jewel indore, ${pageContext.title}, premium ${pageContext.value}, jewelry Indore, rings, earrings, necklaces, bangles, Indore jewellers`;
  }

  // Render breadcrumbs navigation
  function renderBreadcrumbs() {
    let container = document.getElementById("breadcrumbs-container");
    if (!container) {
      // Find where to insert breadcrumbs (above the intro or products grid)
      const introSec = document.querySelector(".category-intro") || document.querySelector(".category-products");
      if (introSec) {
        container = document.createElement("div");
        container.id = "breadcrumbs-container";
        container.className = "container";
        introSec.parentNode.insertBefore(container, introSec);
      }
    }

    if (container) {
      container.innerHTML = `
        <div class="breadcrumbs">
          <a href="index.html">Home</a> &gt; 
          <a href="${pageName}">${pageContext.title}</a>
          ${activeFilter !== "All" ? ` &gt; <span>${activeFilter}</span>` : ""}
          ${searchQuery ? ` &gt; <span>Search: "${searchQuery}"</span>` : ""}
        </div>
      `;
    }
  }

  // Render search box and filter tabs
  function renderSearchAndFilters() {
    let container = document.getElementById("filter-search-container");
    if (!container) {
      const grid = document.querySelector(".products-grid");
      if (grid) {
        container = document.createElement("div");
        container.id = "filter-search-container";
        container.className = "filter-search-section";
        grid.parentNode.insertBefore(container, grid);
      }
    }

    if (!container) return;

    // Define filter buttons depending on page context
    let filterOptions = [];
    if (pageContext.mode === "collection") {
      // Dynamic mapping for Collection pages
      const colVal = pageContext.value.toLowerCase();
      if (colVal.includes("diamond")) {
        filterOptions = ["All", "Earrings", "Rings", "Bracelets", "Bangles", "Necklace", "Nose Pin", "Pendant Set"];
      } else if (colVal.includes("gold")) {
        filterOptions = ["All", "Earrings", "Rings", "Necklace", "Mangalsutra", "Bangle", "Pendant", "Chain", "Bajuband"];
      } else if (colVal.includes("beads")) {
        filterOptions = ["All", "Beads Mala"];
      } else {
        filterOptions = ["All", "Rings", "Earrings", "Necklaces", "Bangles", "Bracelets", "Pendants", "Coins", "Gifts"];
      }
    } else {
      // For type pages (e.g. Rings), show collections as filters
      filterOptions = ["All", "Diamond Collection", "Gold Collection", "Silver Collection", "Kundan Collection", "Beads Collection", "Bullion", "Gifts"];
    }

    const filtersHtml = filterOptions.map(opt => {
      const displayOpt = opt.replace(" Collection", "");
      const isActive = activeFilter.toLowerCase() === opt.toLowerCase();
      return `<button class="filter-btn ${isActive ? 'active' : ''}" data-filter="${opt}">${displayOpt}</button>`;
    }).join("");

    container.innerHTML = `
      <div class="search-wrapper">
        <i class="fas fa-search"></i>
        <input type="text" id="product-search" placeholder="Search this collection..." value="${searchQuery}">
      </div>
      <div class="filter-container">
        ${filtersHtml}
      </div>
    `;

    // Bind event listeners
    const searchInput = document.getElementById("product-search");
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        searchQuery = e.target.value.trim();
        renderBreadcrumbs();
        renderProducts();
      });
    }

    const filterBtns = container.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        activeFilter = this.getAttribute("data-filter");
        renderBreadcrumbs();
        renderProducts();
      });
    });
  }

  // Render product cards based on active search and filter
  function renderProducts() {
    const grid = document.getElementById("products-grid") || document.querySelector(".products-grid");
    if (!grid) return;

    // 1. Get database
    if (typeof PRODUCTS_DATA === "undefined") {
      grid.innerHTML = `<div class="error-msg">Product database not loaded.</div>`;
      return;
    }

    // 2. Apply filtering
    let filtered = PRODUCTS_DATA;

    // Apply primary page constraint
    if (pageContext.mode === "collection") {
      filtered = filtered.filter(p => p.collection.toLowerCase() === pageContext.value.toLowerCase());

      // Apply secondary product type filter
      if (activeFilter !== "All") {
        filtered = filtered.filter(p => p.type.toLowerCase() === activeFilter.toLowerCase());
      }
    } else if (pageContext.mode === "type") {
      filtered = filtered.filter(p => p.type.toLowerCase() === pageContext.value.toLowerCase());

      // Apply secondary collection filter
      if (activeFilter !== "All") {
        filtered = filtered.filter(p => p.collection.toLowerCase() === activeFilter.toLowerCase());
      }
    }

    // Apply search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }

    // Save filtered list to global state for modal navigation
    currentFilteredProducts = filtered;
    currentIndex = 0;

    // 3. Clear Grid initially
    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-products">
          <i class="fas fa-search-minus"></i>
          <h3>No matching jewelry found</h3>
          <p>Try adjusting your search queries or category filters.</p>
        </div>
      `;
      return;
    }

    // Append Sentinel element for infinite scroll
    const sentinel = document.createElement("div");
    sentinel.id = "sentinel";
    sentinel.style.height = "30px";
    sentinel.style.width = "100%";
    sentinel.style.gridColumn = "1 / -1";
    grid.appendChild(sentinel);

    // Stop existing observer if any
    if (sentinelObserver) {
      sentinelObserver.disconnect();
    }

    // Progressive rendering and image lazy-loading
    function loadNextBatch() {
      const batch = currentFilteredProducts.slice(currentIndex, currentIndex + BATCH_SIZE);
      if (batch.length === 0) return;

      const batchHtml = batch.map(p => {
        const imagePath = p.image || "public/placeholder.png";
        const badgeHtml = p.badge ? `<div class="seller-badge">${p.badge}</div>` : "";

        return `
          <div class="product-card" id="product-${p.id}">
            ${badgeHtml}
            <div class="product-img">
              <img data-src="${imagePath}" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' fill='%23fbeaec'></svg>" alt="${p.name} - ${p.collection}" class="lazy-image">
            </div>
            <div class="product-info">
              <span class="product-card-category">${p.subcategory.trim()}</span>
              <h3>${p.name}</h3>
              <div class="description-wrapper">
                <p class="product-description">${p.description}</p>
                <div class="tooltip-text">
                  <strong>${p.name}</strong><br>
                  Collection: ${p.collection}<br>
                  Category: ${p.subcategory.trim()}<br><br>
                  ${p.tooltip || p.description}
                </div>
              </div>
              <button class="btn-view-product" data-product-id="${p.id}">View Product</button>
            </div>
          </div>
        `;
      }).join("");

      // Create dummy element to parse HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = batchHtml;

      // Bind events to new view product buttons and cards
      tempDiv.querySelectorAll(".btn-view-product, .product-img").forEach(el => {
        el.addEventListener("click", function (e) {
          e.stopPropagation();
          const card = this.closest(".product-card");
          const productId = card.id.replace("product-", "");
          showProductModal(productId);
        });
      });

      // Insert new cards before the sentinel
      while (tempDiv.firstChild) {
        grid.insertBefore(tempDiv.firstChild, sentinel);
      }

      // Initialize lazy image observer for the new cards
      const lazyImages = grid.querySelectorAll(".lazy-image:not(.observed)");
      const lazyObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const actualSrc = img.getAttribute("data-src");
            if (actualSrc) {
              img.src = actualSrc;
              img.onload = () => {
                img.classList.add("loaded");
              };
            }
            img.classList.add("observed");
            obs.unobserve(img);
          }
        });
      }, { rootMargin: "150px 0px" });

      lazyImages.forEach(img => {
        img.classList.add("observed");
        lazyObserver.observe(img);
      });

      currentIndex += BATCH_SIZE;

      // If all products rendered, remove sentinel and disconnect observer
      if (currentIndex >= currentFilteredProducts.length) {
        if (sentinel.parentNode) {
          sentinel.parentNode.removeChild(sentinel);
        }
        if (sentinelObserver) {
          sentinelObserver.disconnect();
        }
      }

      // Trigger animation triggers in main.js
      if (window.initCardAnimations) {
        window.initCardAnimations();
      }
    }

    // Set up observer for infinite scroll sentinel
    sentinelObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadNextBatch();
      }
    }, { rootMargin: "200px" });

    sentinelObserver.observe(sentinel);

    // Load the first batch initially
    loadNextBatch();
  }

  // ==========================================
  // LIGHTBOX MODAL FUNCTIONALITY
  // ==========================================

  function initProductModal() {
    if (document.getElementById("product-modal")) return;

    const modalHtml = `
      <div id="product-modal" class="product-modal">
        <div class="modal-overlay"></div>
        <button class="modal-prev" aria-label="Previous product"><i class="fas fa-chevron-left"></i></button>
        <button class="modal-next" aria-label="Next product"><i class="fas fa-chevron-right"></i></button>
        <div class="modal-content-wrapper">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <div class="modal-body">
            <div class="modal-img-container">
              <img id="modal-image" src="" alt="">
            </div>
            <div class="modal-details">
              <span id="modal-category" class="modal-category-badge"></span>
              <h2 id="modal-title"></h2>
              <p id="modal-description"></p>
              <div class="modal-actions">
                <a id="modal-whatsapp-btn" href="#" class="btn-gold" target="_blank">
                  <i class="fab fa-whatsapp"></i> Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = modalHtml;
    document.body.appendChild(tempDiv.firstElementChild);

    // Bind event listeners
    const modal = document.getElementById("product-modal");
    const closeBtn = modal.querySelector(".modal-close");
    const overlay = modal.querySelector(".modal-overlay");
    const prevBtn = modal.querySelector(".modal-prev");
    const nextBtn = modal.querySelector(".modal-next");

    closeBtn.addEventListener("click", hideModal);
    overlay.addEventListener("click", hideModal);
    prevBtn.addEventListener("click", showPrevProduct);
    nextBtn.addEventListener("click", showNextProduct);

    // Listeners for keyboard controls
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;

      if (e.key === "Escape") {
        hideModal();
      } else if (e.key === "ArrowLeft") {
        showPrevProduct();
      } else if (e.key === "ArrowRight") {
        showNextProduct();
      }
    });
  }

  function showProductModal(productId) {
    activeProductIndex = currentFilteredProducts.findIndex(p => p.id === productId);
    if (activeProductIndex === -1) return;

    updateModalContent();

    const modal = document.getElementById("product-modal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
  }

  function hideModal() {
    const modal = document.getElementById("product-modal");
    if (modal) {
      modal.classList.remove("active");
    }
    document.body.style.overflow = "";
  }

  function updateModalContent() {
    const p = currentFilteredProducts[activeProductIndex];
    if (!p) return;

    const modal = document.getElementById("product-modal");
    const modalImg = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalDesc = document.getElementById("modal-description");
    const whatsappBtn = document.getElementById("modal-whatsapp-btn");

    modalImg.src = p.image || "public/placeholder.png";
    modalImg.alt = `${p.name} - ${p.collection}`;
    modalTitle.textContent = p.name;
    modalCategory.textContent = p.subcategory.trim();
    modalDesc.textContent = p.tooltip || p.description;

    // Prefill WhatsApp text
    const whatsappText = `Hello Roshan Jewel, I would like to inquire about the "${p.name}" from your ${p.collection} (${p.subcategory.trim()}). Could you please share more details?`;
    whatsappBtn.href = `https://api.whatsapp.com/send?phone=918224998809&text=${encodeURIComponent(whatsappText)}`;
  }

  function showPrevProduct() {
    if (currentFilteredProducts.length <= 1) return;
    activeProductIndex = (activeProductIndex - 1 + currentFilteredProducts.length) % currentFilteredProducts.length;
    updateModalContent();
  }

  function showNextProduct() {
    if (currentFilteredProducts.length <= 1) return;
    activeProductIndex = (activeProductIndex + 1) % currentFilteredProducts.length;
    updateModalContent();
  }
});
