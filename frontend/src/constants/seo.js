// SEO metadata for every page
// Used by the <SEO> component via react-helmet-async

const BASE_URL = 'https://roshanjewels.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo (2).png`;

export const SEO_DEFAULTS = {
  siteName: 'Roshan Jewel',
  twitterHandle: '@roshanjewel',
  themeColor: '#d44c66',
};

export const PAGE_SEO = {
  home: {
    title: 'Roshan Jewel | Crafting Stories in Gold Since 1965 | Indore',
    description:
      'Roshan Jewel - A name born in 1965, carried forward with the quiet brilliance of three generations. Discover poetry cast in gold at our Indore showroom.',
    canonical: BASE_URL,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'roshan jewel, roshan jewel indore, gold jewellery MP, Excellence in Jewellery Indore, gold rings, gold earrings, gold necklaces, jewellery shop Indore',
  },
  about: {
    title: 'Our Story | Roshan Jewel - Three Generations of Quiet Brilliance',
    description:
      "Learn about Roshan Jewel's rich heritage since 1965. Discover our commitment to craftsmanship, quality, and customer satisfaction in Indore's gold jewellery market.",
    canonical: `${BASE_URL}/about`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'about Roshan Jewel, gold jewellery Indore history, jewellery craftsmanship Indore, family jewellers Indore',
  },
  contact: {
    title: 'Contact Us | Roshan Jewel - Three Generations of Quiet Brilliance',
    description:
      'Get in touch with Roshan Jewel Indore. Contact us for product enquiries, jewellery customization, price queries, and bulk orders.',
    canonical: `${BASE_URL}/contact`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'contact Roshan Jewel, jewellery enquiries Indore, custom jewellery Indore, gold price enquiry Indore',
  },
  diamond: {
    title: 'Diamond Collection | Roshan Jewel - Crafting Stories in Gold Since 1965',
    description:
      'Experience the ultimate luxury of our Diamond Collection at Roshan Jewel Indore. GIA-certified solitaire rings, diamond tops, necklace sets, kadas, and custom mangalsutras.',
    canonical: `${BASE_URL}/diamond`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'diamond jewellery Indore, diamond rings Indore, GIA certified diamonds, Roshan Jewel diamond',
  },
  gold: {
    title: 'Gold Collection | Roshan Jewel - 22K Hallmarked Gold Jewellery Indore',
    description:
      "Explore Indore's finest handcrafted gold jewellery. Royal antique sets, heavy rani hars, lightweight daily wear chains, kadas, and traditional gajres at Roshan Jewel.",
    canonical: `${BASE_URL}/gold`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      '22K gold jewellery Indore, gold necklace Indore, gold rings Indore, Roshan Jewel gold',
  },
  silver: {
    title: 'Silver Collection | Roshan Jewel - Sterling Silver Jewellery Indore',
    description:
      'Discover pure sterling silver rings, earrings, gold-polished sets, kadas, anklets, and premium 99.9% fine silver thali sets at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/silver`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'silver jewellery Indore, sterling silver rings, silver anklets Indore, Roshan Jewel silver',
  },
  rings: {
    title: 'Rings Collection | Roshan Jewel - Diamond, Gold & Silver Rings Indore',
    description:
      'From timeless engagement rings to traditional temple designs, discover our rings collection in 22K gold, diamonds, and sterling silver at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/rings`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'rings Indore, gold rings Indore, diamond rings Indore, engagement rings Indore, Roshan Jewel rings',
  },
  earrings: {
    title: 'Earrings Collection | Roshan Jewel - Jhumkas, Studs & Diamond Tops Indore',
    description:
      'Discover elegant earrings that frame your beauty — traditional jhumkas to contemporary studs in hallmarked gold, silver, and diamonds at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/earrings`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'earrings Indore, gold earrings Indore, diamond earrings, jhumka Indore, Roshan Jewel earrings',
  },
  necklaces: {
    title: 'Necklaces Collection | Roshan Jewel - Chokers, Rani Hars & Diamond Sets Indore',
    description:
      'Traditional and contemporary necklaces that add grace to your special moments. Chokers, rani hars, antique sets, chains, and mangalsutras at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/necklaces`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'necklaces Indore, gold necklace Indore, diamond necklace, mangalsutra Indore, Roshan Jewel necklace',
  },
  kundan: {
    title: 'Kundan & Polki Collection | Roshan Jewel - Jadau & Chased Gold Enamel',
    description:
      'Step into royalty with our Kundan & Polki Collection. Traditional Rajasthani and Mughal heritage Kundan necklaces and pendant sets with Meenakari details at Roshan Jewel.',
    canonical: `${BASE_URL}/kundan`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'kundan jewellery Indore, polki jewellery Indore, jadau jewellery, meenakari jewellery Indore',
  },
  beads: {
    title: 'Beads & Gemstone Collection | Roshan Jewel - Hand-strung Gemstone Malas Indore',
    description:
      'Discover the playful luxury of our Beads Collection. Hand-strung emerald and ruby malas, customized Italian sterling silver charm sets at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/beads`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'beads jewellery Indore, gemstone mala Indore, ruby mala, emerald mala, Roshan Jewel beads',
  },
  bullion: {
    title: 'Bullion & Raw Materials | Roshan Jewel - Certified Gold & Silver Coins Indore',
    description:
      'Secure your wealth with our Bullion Collection. Government-certified 24K (999.9) gold coins, 99.9% pure silver coins, and high-purity raw metals at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/bullion`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'gold coins Indore, silver coins Indore, bullion Indore, 24K gold coins, Roshan Jewel bullion',
  },
  gifts: {
    title: 'Gifting Collection | Roshan Jewel - Timeless Gifts of Devotion & Luxury Indore',
    description:
      'Find the perfect keepsake. Gold and silver plated divine photo frames, fine articles, and luxury items crafted to be cherished across generations at Roshan Jewel Indore.',
    canonical: `${BASE_URL}/gifts`,
    ogImage: DEFAULT_IMAGE,
    keywords:
      'gifts Indore, silver gifts Indore, gold gifts, photo frames silver Indore, Roshan Jewel gifts',
  },
};
