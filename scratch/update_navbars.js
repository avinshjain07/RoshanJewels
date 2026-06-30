const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

const replacements = [
  // Diamond
  { from: 'diamond-ring.html', to: 'diamond.html?filter=Rings' },
  { from: 'diamond-earring.html', to: 'diamond.html?filter=Earrings' },
  { from: 'diamond-set.html', to: 'diamond.html?filter=Pendant Set' },
  { from: 'diamond-bangles.html', to: 'diamond.html?filter=Bangles' },
  { from: 'diamond-nose-pin.html', to: 'diamond.html?filter=Nose Pin' },
  { from: 'diamond-bracelet.html', to: 'diamond.html?filter=Bracelets' },
  { from: 'diamond-pendant-set.html', to: 'diamond.html?filter=Pendant Set' },
  { from: 'diamond-mangalsutra.html', to: 'diamond.html?filter=Mangalsutra' },

  // Gold
  { from: 'gold-ring.html', to: 'gold.html?filter=Rings' },
  { from: 'gold-earring.html', to: 'gold.html?filter=Earrings' },
  { from: 'gold-necklace-set.html', to: 'gold.html?filter=Necklace' },
  { from: 'gold-bangles.html', to: 'gold.html?filter=Bangle' },
  { from: 'gold-bracelet.html', to: 'gold.html?filter=Bracelets' },
  { from: 'gold-pendant.html', to: 'gold.html?filter=Pendant' },
  { from: 'gold-chain.html', to: 'gold.html?filter=Chain' },
  { from: 'gold-mangalsutra.html', to: 'gold.html?filter=Mangalsutra' },

  // Silver
  { from: 'silver-ring.html', to: 'silver.html?filter=Rings' },
  { from: 'silver-earring.html', to: 'silver.html?filter=Earrings' },
  { from: 'silver-set.html', to: 'silver.html?filter=Set' },
  { from: 'silver-bangles.html', to: 'silver.html?filter=Bangles' },
  { from: 'silver-bracelet.html', to: 'silver.html?filter=Bracelet' },
  { from: 'silver-pendant.html', to: 'silver.html?filter=Pendant' },
  { from: 'silver-payal.html', to: 'silver.html?filter=Payal' },
  { from: 'silver-product.html', to: 'silver.html?filter=Silver Product' },
  { from: 'silver-kada.html', to: 'silver.html?filter=Kada' }
];

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  replacements.forEach(rep => {
    if (content.includes(rep.from)) {
      content = content.split(rep.from).join(rep.to);
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated navbar links in: ${file}`);
  }
});
console.log('Navbar links update complete!');
