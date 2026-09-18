/**
 * Roshan Jewel Centralized Product Database
 * Contains all categories and subcategories from the STOCK CATEGORIES Excel file.
 */

const PRODUCTS_DATA = [
  // ==========================================
  // DIAMOND COLLECTION (17 subcategories)
  // ==========================================
  {
    id: "dia-01",
    name: "Classic Diamond Engagement Ring",
    collection: "Diamond Collection",
    type: "Rings",
    subcategory: "DIMOND RING ",
    description: "An exquisite diamond engagement ring set in 18K gold with a brilliant center stone.",
    tooltip: "A stunning engagement ring featuring a GIA-certified 1-carat round brilliant-cut diamond. Set in 18K white gold with a pavé band of 20 accent diamonds.",
    image: "public/rings/diamond.jpg",
    badge: "BEST SELLER"
  },
  {
    id: "dia-02",
    name: "Royal Solitaire Ring",
    collection: "Diamond Collection",
    type: "Rings",
    subcategory: "SOLITER RING",
    description: "A timeless masterpiece featuring a single, brilliant-cut solitaire diamond set in platinum.",
    tooltip: "Crafted in 950 platinum, this ring showcases a single 2.5-carat round brilliant-cut solitaire. Excellent cut, VVS1 clarity, and D color for maximum fire and sparkle.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-03",
    name: "Empress Cocktail Ring",
    collection: "Diamond Collection",
    type: "Rings",
    subcategory: "COKTAIL RING",
    description: "A showstopping cocktail ring adorned with clusters of brilliant diamonds.",
    tooltip: "An elaborate design featuring a central cushion-cut yellow diamond surrounded by concentric halos of brilliant round and marquise-cut white diamonds.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-04",
    name: "Brilliant Diamond Tops",
    collection: "Diamond Collection",
    type: "Earrings",
    subcategory: "DIMONAD TOPS",
    description: "Minimalist and elegant diamond tops, perfect for adding everyday sparkle.",
    tooltip: "Dainty diamond tops crafted in 18K rose gold, featuring a cluster of micro-paved diamonds that form a floral silhouette. Light weight with secure push-back fittings.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-05",
    name: "Luxury Diamond Studs",
    collection: "Diamond Collection",
    type: "Earrings",
    subcategory: "DIMONAD STUDDES ",
    description: "Stunning diamond studs set in 18K yellow gold for timeless elegance.",
    tooltip: "Premium round-cut diamonds set in a classic four-prong setting of 18K yellow gold. Total carat weight of 1.5ctw, certified conflict-free.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-06",
    name: "Solitaire Diamond Studs",
    collection: "Diamond Collection",
    type: "Earrings",
    subcategory: "SOLITER STUDDES",
    description: "Pure and breathtaking solitaire diamond studs in a white gold crown setting.",
    tooltip: "Matched pair of VVS2 clarity, F color round solitaire diamonds, total weight 2.0ct. Set in elegant six-prong 18K white gold crown settings.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-07",
    name: "Diamond & Sapphire Cluster Set",
    collection: "Diamond Collection",
    type: "Necklaces",
    subcategory: "DIMONAD & COLOR STONE SET",
    description: "Exquisite diamond and color stone necklace set with matching drop earrings.",
    tooltip: "A breathtaking necklace featuring natural royal blue oval sapphires set within intricate floral clusters of brilliant-cut diamonds. Includes matching cluster drop earrings.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-08",
    name: "CZ Diamond Choker Set",
    collection: "Diamond Collection",
    type: "Necklaces",
    subcategory: "NECKLES SET",
    description: "Stunning Cubic Zirconia necklace set offering the brilliance of diamonds with a modern design.",
    tooltip: "A modern, cascading bridal necklace featuring high-grade cubic zirconia diamonds set in white-rhodium plated gold. Includes a matching pair of chandelier earrings.",
    image: "public/necklace/n2.webp"
  },
  {
    id: "dia-09",
    name: "Elegant Diamond Liner Set",
    collection: "Diamond Collection",
    type: "Necklaces",
    subcategory: "LINER SET",
    description: "A refined single-line diamond necklace that drapes gracefully along the collarbone.",
    tooltip: "A tennis-style single line necklace featuring a continuous row of carefully matched round brilliant diamonds. Total weight 5.5 carats, set in 18K white gold.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-10",
    name: "Diamond Patli Bangles",
    collection: "Diamond Collection",
    type: "Bangles",
    subcategory: "DIMONAD PATLI",
    description: "Intricately crafted diamond patli bangles, showcasing traditional craftsmanship.",
    tooltip: "Pair of traditional patli bangles featuring a row of flat-cut diamonds accented by fine gold wirework. Perfect for stacking and ethnic wear.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-11",
    name: "Exquisite Diamond Kada",
    collection: "Diamond Collection",
    type: "Bangles",
    subcategory: "DIMONAD KADA",
    description: "A statement diamond kada featuring detailed carvings and brilliant clusters.",
    tooltip: "A single openable diamond kada crafted in 18K gold. Adorned with 3.2 carats of diamonds in a wavy geometric layout. Features a secure screw lock mechanism.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-12",
    name: "Delicate Diamond Nose Pin",
    collection: "Diamond Collection",
    type: "Earrings",
    subcategory: "DIMOND NOSE PIN",
    description: "A subtle, sparkling diamond nose pin set in 18K yellow gold.",
    tooltip: "A classic single-stone nose pin featuring a 0.05-carat sparkling diamond. Available in screw-back and wire-pin variants for maximum comfort.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-13",
    name: "Ornate Diamond Nose Ring",
    collection: "Diamond Collection",
    type: "Earrings",
    subcategory: "DIMOAND NOSE RING",
    description: "Traditional diamond nose ring (Nath) with delicate gold wirework.",
    tooltip: "A premium bridal nose ring featuring a gold hoop studded with small brilliant diamonds and pearl drops. Perfect for weddings and festive wear.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-14",
    name: "Luxurious Diamond Bracelet",
    collection: "Diamond Collection",
    type: "Bracelets",
    subcategory: "DIMONAD BRACLETE",
    description: "A premium tennis bracelet featuring a seamless row of brilliant-cut diamonds.",
    tooltip: "An elegant 7-inch tennis bracelet studded with 58 round brilliant-cut diamonds (total 4.0ctw) set in 18K rose gold with a double-safety clasp.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-15",
    name: "Brilliant Diamond Pendant Set",
    collection: "Diamond Collection",
    type: "Pendants",
    subcategory: "DIMONAD PENDENT SET",
    description: "An elegant diamond pendant with matching earrings, featuring a floral design.",
    tooltip: "Crafted in 18K yellow and white gold, this set includes a delicate floral pendant with a central solitaire and a pair of matching floral stud earrings.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-16",
    name: "Solitaire Diamond Pendant",
    collection: "Diamond Collection",
    type: "Pendants",
    subcategory: "DIMONAD PENDENT   ",
    description: "A classic single solitaire diamond pendant on a delicate white gold chain.",
    tooltip: "A minimalist 0.5-carat solitaire diamond pendant in a four-prong setting of 18K white gold. Includes a matching 16-inch Italian box chain.",
    image: "public/placeholder.png"
  },
  {
    id: "dia-17",
    name: "Sacred Diamond Mangalsutra",
    collection: "Diamond Collection",
    type: "Necklaces",
    subcategory: "DIMONAD MANGALSUTRA",
    description: "A contemporary mangalsutra featuring a modern diamond pendant with traditional beads.",
    tooltip: "A beautiful fusion of heritage and modern style. Features double-strand black beads chain connected to a sleek, curved V-shaped diamond pendant in 18K gold.",
    image: "public/placeholder.png"
  },

  // ==========================================
  // GOLD COLLECTION (26 subcategories)
  // ==========================================
  {
    id: "gld-01",
    name: "Traditional Gold Ladies Ring",
    collection: "Gold Collection",
    type: "Rings",
    subcategory: "GOLD LADIES RING ",
    description: "Intricately designed traditional gold ring with classic floral motifs.",
    tooltip: "Crafted in 22K hallmarked gold, this ladies ring features delicate filigree work and a polished finish. A heritage design perfect for festive styling.",
    image: "public/rings/gold.jpg",
    badge: "BEST SELLER"
  },
  {
    id: "gld-02",
    name: "Classic Gold Gents Ring",
    collection: "Gold Collection",
    type: "Rings",
    subcategory: "GOLD GENTS RING",
    description: "A solid, signet-style gents ring crafted in 22K hallmarked gold.",
    tooltip: "A premium, heavyweight 22K gold gents ring with a matte-finish signet face and polished diamond-cut edges. Highly durable for daily wear.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-03",
    name: "Traditional Gold Tops",
    collection: "Gold Collection",
    type: "Earrings",
    subcategory: "GOLD TOPS",
    description: "Classic gold tops featuring delicate filigree and umbrella drops.",
    tooltip: "Elegant 22K gold tops featuring a traditional dome shape (Jhumki top) with granular gold work and polished drop accents. Secure screw-back fitting.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-04",
    name: "Classic Gold Studs",
    collection: "Gold Collection",
    type: "Earrings",
    subcategory: "GOLD STUDDES ",
    description: "Elegant gold stud earrings, simple yet sophisticated for daily wear.",
    tooltip: "Lightweight and beautifully polished gold studs in 22K gold, featuring a geometric starburst pattern. Highly comfortable for everyday use.",
    image: "public/earrings/gold stud.jpg"
  },
  {
    id: "gld-05",
    name: "Intricate Gold Latkan",
    collection: "Gold Collection",
    type: "Earrings",
    subcategory: "GOLD LATKAN",
    description: "Vibrant gold hanging earrings (Latkan) featuring intricate chain loops.",
    tooltip: "Hanging style earrings in 22K gold. Features a floral stud base connected to multiple gold chains that cascade elegantly, finished with tiny gold beads.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-06",
    name: "Traditional Gold Bali",
    collection: "Gold Collection",
    type: "Earrings",
    subcategory: "GOLD BALI",
    description: "Timeless gold hoop earrings (Bali) with textured, diamond-cut carvings.",
    tooltip: "Classic hoop design in 22K gold, embellished with a combination of high-polish and frosted finishes. Lightweight with a hinge-lock closure.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-07",
    name: "Royal Gold Antique Set",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD ANTIQUE SET",
    description: "Grand antique-finish gold necklace with detailed temple motifs.",
    tooltip: "A masterpiece in 22K gold, featuring an antique reddish-gold patina with detailed carvings of heritage patterns. Includes matching chandelier earrings.",
    image: "public/best-seller/gold necklace.jpg",
    badge: "BEST SELLER"
  },
  {
    id: "gld-08",
    name: "Heritage Gold Choker",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD CHOKAR",
    description: "A wide, form-fitting gold choker featuring delicate mesh and gemstone accents.",
    tooltip: "A stunning 22K gold choker designed with intricate mesh wirework and studded with red and green color stones. Has an adjustable thread/dori back.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-09",
    name: "Majestic Gold Rani Har",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD RANI HAR",
    description: "A long, royal multi-layer gold necklace featuring a grand central pendant.",
    tooltip: "A spectacular bridal Rani Har featuring five rows of gold beads connected to a massive, hand-carved heritage pendant. Crafted in 22K hallmarked gold.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-10",
    name: "Traditional Gold Patli",
    collection: "Gold Collection",
    type: "Bangles",
    subcategory: "GOLD PATLI",
    description: "Pair of sleek gold patli bangles decorated with floral stampings.",
    tooltip: "Elegant bangles in 22K gold, featuring half-cut frosted styling and half-cut polished floral stamping. Ideal for weddings and festivals.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-11",
    name: "Classic Gold Kade",
    collection: "Gold Collection",
    type: "Bangles",
    subcategory: "GOLD KADE",
    description: "Broad, openable gold kadas featuring traditional nakshi engravings.",
    tooltip: "A set of two broad gold kadas crafted in 22K gold. Features hand-carved traditional patterns with a hidden hinge and side-screw safety clasp.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-12",
    name: "Gold Antique Gajre",
    collection: "Gold Collection",
    type: "Bangles",
    subcategory: "GOLD ANTIQUE GAJRE",
    description: "Bangles with an antique finish, designed with clustered gold spheres.",
    tooltip: "Known for their signature beaded structure, these 22K gold gajre bangles feature a row of golden bead-clusters with a vintage, matte finish.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-13",
    name: "Gold Traditional Gajre",
    collection: "Gold Collection",
    type: "Bangles",
    subcategory: "GOLD TRADITINOL GAJRE",
    description: "Classic high-polish gold gajre bangles with intricate filigree loops.",
    tooltip: "Crafted in bright 22K yellow gold, these traditional gajre bangles feature floral filigree panels separated by polished screw rivets.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-14",
    name: "Elegant Gold Bracelet",
    collection: "Gold Collection",
    type: "Bracelets",
    subcategory: "GOLD BRACLETE",
    description: "A sleek, chain-link gold bracelet featuring floral design links.",
    tooltip: "An elegant bracelet in 22K gold, composed of interlinked floral motifs and finished with a reliable lobster claw clasp. Perfect for daily wear.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-15",
    name: "Gold Antique Bracelet",
    collection: "Gold Collection",
    type: "Bracelets",
    subcategory: "GOLD ANTIQUE BRACLETE",
    description: "Vintage-styled gold bracelet featuring a textured medallion center.",
    tooltip: "Crafted in 22K gold with a rustic, antique look. The bracelet features a large, detailed central floral medallion on a textured rope chain.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-16",
    name: "Gold Traditional Bracelet",
    collection: "Gold Collection",
    type: "Bracelets",
    subcategory: "GOLD TRADITIONAL BRACLETE",
    description: "Traditional broad gold bracelet with ruby and emerald accents.",
    tooltip: "A stunning cuff-style bracelet in 22K gold, decorated with ruby and emerald cabochons and intricate gold granules. Classic bridal accessory.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-17",
    name: "Gold Light Weight Bracelet",
    collection: "Gold Collection",
    type: "Bracelets",
    subcategory: "GOLD LIGHT WAIT BRACLETE",
    description: "A delicate, lightweight gold chain bracelet for modern wear.",
    tooltip: "A minimalist daily wear bracelet crafted in 22K gold. Features a slim link chain dotted with tiny polished gold hearts and stars.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-18",
    name: "Classic Gold Pendant",
    collection: "Gold Collection",
    type: "Pendants",
    subcategory: "GOLD PENDENT ",
    description: "A beautiful, hand-polished gold pendant with a floral silhouette.",
    tooltip: "A lightweight 22K gold pendant featuring a delicate teardrop shape with filigree work inside. Ideal for styling with simple gold chains.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-19",
    name: "Elegant Gold Pendant Set",
    collection: "Gold Collection",
    type: "Pendants",
    subcategory: "GOLD PENDENT SET",
    description: "Gold pendant featuring contemporary design with matching stud earrings.",
    tooltip: "A premium set in 22K gold consisting of a stylized leaf pendant and a matching pair of leaf-shaped stud earrings. Polished to a brilliant shine.",
    image: "public/best-seller/pendant.jpg",
    badge: "NEW"
  },
  {
    id: "gld-20",
    name: "Classic Gold Chain",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD CHAIN",
    description: "A timeless, simple gold link chain crafted in 22K gold.",
    tooltip: "A classic 18-inch curb link chain in 22K gold. Sturdy enough for daily use and designed to slide smoothly through most pendant bails.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-21",
    name: "Gold Box Chain",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD BOX CHAIN",
    description: "A strong, geometric box-weave chain in 22K gold.",
    tooltip: "A premium 20-inch box chain featuring square links woven tightly. Provides a sleek, smooth texture and superior strength.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-22",
    name: "Gold Machine Chain",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD MACHINE CHAIN",
    description: "A highly durable, machine-linked rope chain in 22K gold.",
    tooltip: "A dense, rope-style chain crafted with state-of-the-art machine linking for absolute durability. Features a secure spring clasp.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-23",
    name: "Italian Gold Link Chain",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD ITALICE CHAIN",
    description: "Exquisite Italian design gold chain with dynamic faceted cuts.",
    tooltip: "Imported Italian design chain in 18K/22K gold, featuring flat, laser-cut links that catch and reflect light with every movement.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-24",
    name: "Premium Gold Chain Set",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD CHAIN SET",
    description: "A coordinated multi-strand gold chain with a central connector.",
    tooltip: "A layered neck accessory in 22K gold, consisting of three parallel chains of different textures held together by decorated side bars.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-25",
    name: "Gold Pendant Chain Set",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD PENDENT CHAIN SET",
    description: "Traditional pendant fixed on a heavy rope chain in 22K gold.",
    tooltip: "A complete set featuring a beautifully detailed peacock pendant permanently integrated into an 18-inch thick double-rope gold chain.",
    image: "public/placeholder.png"
  },
  {
    id: "gld-26",
    name: "Sacred Gold Mangalsutra",
    collection: "Gold Collection",
    type: "Necklaces",
    subcategory: "GOLD MANGALSUTRA",
    description: "A traditional mangalsutra with black beads and a hallmarked gold pendant.",
    tooltip: "Features strings of sacred black onyx beads interspaced with gold wire, complete with a traditional central circular gold pendant.",
    image: "public/placeholder.png"
  },

  // ==========================================
  // SILVER COLLECTION (20 subcategories)
  // ==========================================
  {
    id: "slv-01",
    name: "Contemporary Silver Ladies Ring",
    collection: "Silver Collection",
    type: "Rings",
    subcategory: "SILVER LADIES RING",
    description: "Elegant silver ring with a high-polish contemporary finish.",
    tooltip: "Crafted in 925 sterling silver, this ring features clean lines and a brilliant polish. Ideal for stacking or as a simple everyday band.",
    image: "public/rings/silver.webp"
  },
  {
    id: "slv-02",
    name: "Rugged Silver Gents Ring",
    collection: "Silver Collection",
    type: "Rings",
    subcategory: "SILVER GENTS RING",
    description: "A masculine, textured silver band in sterling silver.",
    tooltip: "A broad sterling silver ring featuring a hammered center texture with polished borders. Comfort fit interior design.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-03",
    name: "Sterling Silver Studs",
    collection: "Silver Collection",
    type: "Earrings",
    subcategory: "SILVER STUDDES",
    description: "Sparkling silver studs with a central round-cut cubic zirconia.",
    tooltip: "Premium 925 sterling silver stud earrings, featuring a 6mm basket-set cubic zirconia stone. Rhodium plated to prevent tarnishing.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-04",
    name: "Elegant Silver Tops",
    collection: "Silver Collection",
    type: "Earrings",
    subcategory: "SILVER TOPS",
    description: "Ornate silver tops featuring drop pearls and filigree loops.",
    tooltip: "氧化银 (Oxidized finish) sterling silver tops featuring traditional floral patterns and natural white seed pearl drops.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-05",
    name: "Silver Chandelier Necklace Set",
    collection: "Silver Collection",
    type: "Necklaces",
    subcategory: "SILVER NECKLES SET",
    description: "A magnificent sterling silver necklace set with drop pearls.",
    tooltip: "A grand necklace in pure silver featuring cascading floral links and pearl drop details. Includes a pair of matching drop earrings.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-06",
    name: "Silver Gold Polish Choker Set",
    collection: "Silver Collection",
    type: "Necklaces",
    subcategory: "SILVER GOLD POLISH SET",
    description: "Silver necklace with high-grade gold plating for a luxury look.",
    tooltip: "Made in 925 sterling silver and plated with 24K yellow gold. Replicates the look of heavy antique gold jewelry at a fraction of the cost.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-07",
    name: "Silver Patli Bangles",
    collection: "Silver Collection",
    type: "Bangles",
    subcategory: "SILVER PATLI ",
    description: "Pair of sterling silver patli bangles with diamond-cut patterns.",
    tooltip: "A set of two slim sterling silver bangles decorated with diagonal diamond cuts that reflect light like small crystals.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-08",
    name: "Solid Silver Kade",
    collection: "Silver Collection",
    type: "Bangles",
    subcategory: "SILVER KADE",
    description: "Heavy, handcrafted silver kadas with traditional lion-head terminals.",
    tooltip: "A heavy-weight pair of silver kadas featuring detailed carving and traditional lion-head (Sher-Mukhi) ends. Made in pure 99% silver.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-09",
    name: "Silver Gold-Plated Bangles",
    collection: "Silver Collection",
    type: "Bangles",
    subcategory: "SILVER GOLD POLISH BANGLES",
    description: "Pure silver bangles with premium 22K gold micron plating.",
    tooltip: "Sterling silver base bangles finished with a thick coating of 22K yellow gold. Intricately carved with traditional temple motifs.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-10",
    name: "Silver Gents Kada Bracelet",
    collection: "Silver Collection",
    type: "Bracelets",
    subcategory: "SILVER GENTS BRACLETE",
    description: "A thick, chunky silver curb link chain bracelet for men.",
    tooltip: "Heavyweight gents bracelet crafted in solid sterling silver. Features classic flat curb links with a secure box clasp lock.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-11",
    name: "Silver Ladies Charm Bracelet",
    collection: "Silver Collection",
    type: "Bracelets",
    subcategory: "SILVER LADIES BRACLETE ",
    description: "A delicate silver chain bracelet with hanging heart charms.",
    tooltip: "A playful and feminine bracelet in 925 silver, featuring a cable chain adorned with five small hanging polished silver hearts.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-12",
    name: "Silver Pendant & Earrings Set",
    collection: "Silver Collection",
    type: "Pendants",
    subcategory: "SILVER PENDENT SET ",
    description: "Elegant silver pendant set crafted in pure silver, with matching chain.",
    tooltip: "Includes a teardrop pendant set with sparkling cubic zirconia, matching drop earrings, and an 18-inch silver cable chain.",
    image: "public/necklace/silver.webp"
  },
  {
    id: "slv-13",
    name: "Classic Silver Pendant",
    collection: "Silver Collection",
    type: "Pendants",
    subcategory: "SILVER PENDENT   ",
    description: "A minimalist sterling silver pendant featuring a small infinity loop.",
    tooltip: "A delicate daily wear pendant in pure silver, depicting an infinity symbol. Rhodium plated for long-lasting shine and scratch resistance.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-14",
    name: "Silver Ghungroo Payal",
    collection: "Silver Collection",
    type: "Gifts",
    subcategory: "SILVER PAYAL",
    description: "Traditional silver anklets (Payal) with musical ghungroo beads.",
    tooltip: "Pair of classic anklets crafted in pure silver. Features a flexible mesh chain adorned with small jingling ghungroo beads and a secure hook clasp.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-15",
    name: "Pure Silver Bowl",
    collection: "Silver Collection",
    type: "Gifts",
    subcategory: "SILVER BOWL ",
    description: "A hallmarked pure silver bowl, perfect for baby naming ceremonies and puja.",
    tooltip: "Crafted in 999 fine silver, this bowl has a polished interior and a beautiful chased floral pattern on the outer surface.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-16",
    name: "Pure Silver Glass",
    collection: "Silver Collection",
    type: "Gifts",
    subcategory: "SILVER GLASS",
    description: "A traditional silver glass crafted in fine 99.9% silver.",
    tooltip: "An elegant utility item for rituals or gifting. Made of heavy gauge 999 silver with a smooth, high-luster finish.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-17",
    name: "Pure Silver Thali Set",
    collection: "Silver Collection",
    type: "Gifts",
    subcategory: "SILVER THALI",
    description: "A premium puja thali set made entirely of hallmarked silver.",
    tooltip: "Includes a 9-inch silver thali, a small bowl, a glass, a spoon, and a diya container. Handcrafted in 92.5% sterling silver.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-18",
    name: "Pure Silver Dipak",
    collection: "Silver Collection",
    type: "Gifts",
    subcategory: "SILVER DIPAK",
    description: "A beautiful silver oil lamp (Diya) with an adjustable base.",
    tooltip: "Traditional single-wick oil lamp crafted in 999 fine silver. Embellished with a carved peacock stem support.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-19",
    name: "Silver Bhagwan Murti",
    collection: "Silver Collection",
    type: "Gifts",
    subcategory: "SILVER BHAGWAN MURTI",
    description: "Exquisitely detailed silver idol of Lord Ganesha in pure silver.",
    tooltip: "A heavy-cast silver idol of Lord Ganesha, seated on a pedestal. Fine carving details on features and ornaments, made in 999 silver.",
    image: "public/placeholder.png"
  },
  {
    id: "slv-20",
    name: "Silver Gents Kada",
    collection: "Silver Collection",
    type: "Bangles",
    subcategory: "SILVER GENTS KADA",
    description: "A thick, heavy, solid silver kada for men with a polished finish.",
    tooltip: "Crafted in 99% pure silver, this solid kada is non-allergic and features a classic circular shape with rounded smooth ends.",
    image: "public/placeholder.png"
  },

  // ==========================================
  // BEADS COLLECTION (4 subcategories)
  // ==========================================
  {
    id: "bds-01",
    name: "Natural Emerald Beads Mala",
    collection: "Beads Collection",
    type: "Necklaces",
    subcategory: "BEEDES MALA ",
    description: "A three-row string of natural green emerald beads with a gold clasp.",
    tooltip: "A stunning statement necklace made of premium faceted emerald beads strung with fine silk thread, featuring a 22K gold filigree box clasp.",
    image: "public/placeholder.png"
  },
  {
    id: "bds-02",
    name: "Italian Silver Charm Set",
    collection: "Beads Collection",
    type: "Bracelets",
    subcategory: "ITALIAN CHARM SET",
    description: "A modern charm set with customizable glass and silver beads.",
    tooltip: "Features a sterling silver snake chain bracelet and 5 modular Italian glass charms in pink and gold tones. Easily adjustable.",
    image: "public/placeholder.png"
  },
  {
    id: "bds-03",
    name: "Beads Jhumkies & Latkan",
    collection: "Beads Collection",
    type: "Earrings",
    subcategory: "JHUMKIES & LATKAN",
    description: "Traditional earrings featuring colorful bead strings and latkans.",
    tooltip: "Traditional jhumkas crafted with a gold plated base and finished with long cascading strings of red coral and white pearl seed beads.",
    image: "public/earrings/silver.jpg"
  },
  {
    id: "bds-04",
    name: "Elegant Beads Bracelet",
    collection: "Beads Collection",
    type: "Bracelets",
    subcategory: "BEEDES BRACLEAT",
    description: "A flexible stretch bracelet made of black onyx beads and gold accents.",
    tooltip: "Features 8mm smooth matte black onyx beads held together on a high-strength elastic cord, accented by three faceted 18K yellow gold spacer beads.",
    image: "public/placeholder.png"
  },

  // ==========================================
  // KUNDAN COLLECTION (2 subcategories)
  // ==========================================
  {
    id: "knd-01",
    name: "Royal Kundan Necklace Set",
    collection: "Kundan Collection",
    type: "Necklaces",
    subcategory: "KUNDAN NECKLESS",
    description: "Exquisite kundan stone necklace set in 22K gold, with matching earrings.",
    tooltip: "Features hand-set glass stones in high-purity gold foil (Kundan technique), backed with detailed Meenakari (enameling) work. Includes heavy matching jhumkas.",
    image: "public/necklace/n1.webp",
    badge: "TRENDING"
  },
  {
    id: "knd-02",
    name: "Kundan Pendant Set",
    collection: "Kundan Collection",
    type: "Pendants",
    subcategory: "KUNDAN PENDENT SET",
    description: "An elegant, lightweight Kundan pendant featuring a peacock silhouette.",
    tooltip: "A stunning circular Kundan pendant displaying double peacock motifs in red and green enamel, complete with matching small stud earrings.",
    image: "public/placeholder.png"
  },

  // ==========================================
  // BULLION (4 subcategories)
  // ==========================================
  {
    id: "bul-01",
    name: "999 Pure Gold Coin",
    collection: "Bullion",
    type: "Coins",
    subcategory: "GOLD COIN",
    description: "24K (999 purity) gold coin featuring the Goddess Lakshmi motif.",
    tooltip: "Ideal for investment and gifting during Diwali or weddings. Certified Lakshmi gold coin, packaged in a tamper-proof blister pack. Available in 1g to 50g.",
    image: "public/placeholder.png"
  },
  {
    id: "bul-02",
    name: "Pure Gold Raw Bar",
    collection: "Bullion",
    type: "Coins",
    subcategory: "GOLD RAW MATERIAL",
    description: "24K (999.9 purity) fine gold raw material for manufacturing.",
    tooltip: "Standard certified gold bars and grains, direct from Swiss refineries. Intended for jewellers and institutional investors.",
    image: "public/placeholder.png"
  },
  {
    id: "bul-03",
    name: "999 Pure Silver Coin",
    collection: "Bullion",
    type: "Coins",
    subcategory: "SILVER COIN ",
    description: "99.9% fine silver coin featuring Lord Ganesha embossed detail.",
    tooltip: "Indore's trusted 999 fine silver coin, featuring a double-sided high-relief coin design. Comes with a certificate of purity.",
    image: "public/placeholder.png"
  },
  {
    id: "bul-04",
    name: "Pure Silver Raw Grains",
    collection: "Bullion",
    type: "Coins",
    subcategory: "SILVER RAW MATERIAL ",
    description: "99.9% fine silver raw material grains for alloy casting.",
    tooltip: "Bulk silver casting grains, featuring consistent sizing and high purity. Perfect for metal casting, soldering, and jewelry production.",
    image: "public/placeholder.png"
  },

  // ==========================================
  // GIFTS (2 subcategories)
  // ==========================================
  {
    id: "gft-01",
    name: "Gold & Silver Lakshmi Photo Frame",
    collection: "Gifts",
    type: "Gifts",
    subcategory: "GOLD & SILVER PHOTO FRAME ",
    description: "A beautiful, premium table photo frame featuring gold and silver foil details.",
    tooltip: "Features highly detailed, gold and silver plated reliefs of Goddess Lakshmi and Lord Ganesha set in an acrylic wooden frame. Perfect for housewarmings.",
    image: "public/placeholder.png"
  },
  {
    id: "gft-02",
    name: "Fine Gold Art Rose",
    collection: "Gifts",
    type: "Gifts",
    subcategory: "GOLD FINE ",
    description: "A delicate artificial rose flower plated in 24K pure gold.",
    tooltip: "An eternal gift of love. A real rose preserved in resin and electroplated in pure 24K gold, capturing every delicate petal contour. Includes a wooden gift stand.",
    image: "public/placeholder.png"
  }
];

// Helper to get products by collection
function getProductsByCollection(collectionName) {
  return PRODUCTS_DATA.filter(p => p.collection.toLowerCase() === collectionName.toLowerCase());
}

// Helper to get products by product type filter
function getProductsByType(typeName) {
  return PRODUCTS_DATA.filter(p => p.type.toLowerCase() === typeName.toLowerCase());
}

// Export module for browser usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS_DATA, getProductsByCollection, getProductsByType };
}
