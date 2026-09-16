// All navigation links and dropdown structure for the Navbar
// This replaces the hardcoded HTML nav structure and enables active link detection via React Router

export const NAV_LINKS = [
  {
    label: 'Home',
    to: '/',
    exact: true,
  },
  {
    label: 'Collections',
    dropdown: [
      { label: 'Diamond', to: '/diamond' },
      { label: 'Gold', to: '/gold' },
      { label: 'Silver', to: '/silver' },
      { label: 'Kundan & Polki', to: '/kundan' },
      { label: 'Beads Collection', to: '/beads' },
      { label: 'Bullion & Coins', to: '/bullion' },
      { label: 'Gifts & Articles', to: '/gifts' },
    ],
  },
  {
    label: 'Jewellery',
    dropdown: [
      { label: 'Rings', to: '/rings' },
      { label: 'Earrings', to: '/earrings' },
      { label: 'Necklaces', to: '/necklaces' },
    ],
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
];
