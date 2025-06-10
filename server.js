const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Dummy product data organized by categories and brands with seller descriptions, without imageUrl
const products = [
  // 🧴 BEAUTY & PERSONAL CARE
  {
    productName: 'Natural and toxin-free Skincare',
    price: 450,
    sellerName: 'Mamaearth',
    sellerDescription: 'Natural and toxin-free skincare products made with safe ingredients for all skin types.',
    category: 'Beauty & Personal Care',
    productLink: 'https://www.mamaearth.in'
  },
  {
    productName: 'Ayurvedic wellness products',
    price: 399,
    sellerName: 'Kapiva',
    sellerDescription: 'Ayurvedic wellness products including juices, supplements, and hair care for holistic health.',
    category: 'Beauty & Personal Care',
    productLink: 'https://www.kapiva.in'
  },
  {
    productName: 'Organic and natural skincare products',
    price: 799,
    sellerName: 'Neemli Naturals',
    sellerDescription: 'Organic and natural skincare products inspired by traditional Indian recipes and herbs.',
    category: 'Beauty & Personal Care',
    productLink: 'https://www.neemlinaturals.com'
  },
  {
    productName: 'Neemli Naturals',
    price: 850,
    sellerName: 'Neemli Naturals',
    sellerDescription: 'Clean, Indie Brands in Skincare & Beauty',
    category: 'Skincare & Beauty',
    productLink: 'https://neemlinaturals.com'
  },
  {
    productName: 'Daughter Earth',
    price: 700,
    sellerName: 'Daughter Earth',
    sellerDescription: 'Clean, Indie Brands in Skincare & Beauty',
    category: 'Skincare & Beauty',
    productLink: 'https://daughter.earth'
  },
  {
    productName: 'Suganda Skincare',
    price: 650,
    sellerName: 'Suganda Skincare',
    sellerDescription: 'Clean, Indie Brands in Skincare & Beauty',
    category: 'Skincare & Beauty',
    productLink: 'https://suganda.co'
  },
  {
    productName: 'RAS Luxury Oils',
    price: 900,
    sellerName: 'RAS Luxury Oils',
    sellerDescription: 'Clean, Indie Brands in Skincare & Beauty',
    category: 'Skincare & Beauty',
    productLink: 'https://rasluxuryoils.com'
  },
  {
    productName: 'The Switch Fix',
    price: 750,
    sellerName: 'The Switch Fix',
    sellerDescription: 'Clean, Indie Brands in Skincare & Beauty',
    category: 'Skincare & Beauty',
    productLink: 'https://theswitchfix.co'
  },
  // 🍪 FOOD & SNACKS
  {
    productName: 'Snackible',
    price: 300,
    sellerName: 'Snackible',
    sellerDescription: 'Food & Snacks',
    category: 'Food & Snacks',
    productLink: 'https://www.snackible.com'
  },
  {
    productName: 'Open Secret',
    price: 280,
    sellerName: 'Open Secret',
    sellerDescription: 'Food & Snacks',
    category: 'Food & Snacks',
    productLink: 'https://opensecret.in'
  },
  {
    productName: 'The Whole Truth',
    price: 350,
    sellerName: 'The Whole Truth',
    sellerDescription: 'Food & Snacks',
    category: 'Food & Snacks',
    productLink: 'https://thewholetruthfoods.com'
  },
  {
    productName: 'Yoga Bar',
    price: 320,
    sellerName: 'Yoga Bar',
    sellerDescription: 'Food & Snacks',
    category: 'Food & Snacks',
    productLink: 'https://yogabar.in'
  },
  {
    productName: 'Slurrp Farm',
    price: 310,
    sellerName: 'Slurrp Farm',
    sellerDescription: 'Food & Snacks',
    category: 'Food & Snacks',
    productLink: 'https://slurrpfarm.com'
  },
  // 🧶 CLOTHING & FASHION (Conscious / D2C)
  {
    productName: 'Okhai',
    price: 1200,
    sellerName: 'Okhai',
    sellerDescription: 'Conscious / D2C Clothing & Fashion',
    category: 'Clothing & Fashion',
    productLink: 'https://okhai.org'
  },
  {
    productName: 'Suta Bombay',
    price: 1100,
    sellerName: 'Suta Bombay',
    sellerDescription: 'Conscious / D2C Clothing & Fashion',
    category: 'Clothing & Fashion',
    productLink: 'https://suta.in'
  },
  {
    productName: 'The Loom',
    price: 1300,
    sellerName: 'The Loom',
    sellerDescription: 'Conscious / D2C Clothing & Fashion',
    category: 'Clothing & Fashion',
    productLink: 'https://theloom.in'
  },
  {
    productName: 'Rustorange',
    price: 1250,
    sellerName: 'Rustorange',
    sellerDescription: 'Conscious / D2C Clothing & Fashion',
    category: 'Clothing & Fashion',
    productLink: 'https://rustorange.com'
  },
  {
    productName: 'Fabnest',
    price: 1150,
    sellerName: 'Fabnest',
    sellerDescription: 'Conscious / D2C Clothing & Fashion',
    category: 'Clothing & Fashion',
    productLink: 'https://fabnest.com'
  },
  // 🏠 HOME & ORGANIC LIVING
  {
    productName: 'Bare Necessities',
    price: 900,
    sellerName: 'Bare Necessities',
    sellerDescription: 'Home & Organic Living',
    category: 'Home & Organic Living',
    productLink: 'https://barenecessities.in'
  },
  {
    productName: 'Beco',
    price: 850,
    sellerName: 'Beco',
    sellerDescription: 'Home & Organic Living',
    category: 'Home & Organic Living',
    productLink: 'https://beco.co.in'
  },
  {
    productName: 'Brown Living',
    price: 800,
    sellerName: 'Brown Living',
    sellerDescription: 'Home & Organic Living',
    category: 'Home & Organic Living',
    productLink: 'https://brownliving.in'
  },
  {
    productName: 'Coconut People',
    price: 950,
    sellerName: 'Coconut People',
    sellerDescription: 'Home & Organic Living',
    category: 'Home & Organic Living',
    productLink: 'https://thecoconutpeople.com'
  },
  {
    productName: 'The Better Home',
    price: 900,
    sellerName: 'The Better Home',
    sellerDescription: 'Home & Organic Living',
    category: 'Home & Organic Living',
    productLink: 'https://thebetterhome.com'
  },
  // 🎒 KIDS & BABY CARE
  {
    productName: 'SuperBottoms',
    price: 700,
    sellerName: 'SuperBottoms',
    sellerDescription: 'Kids & Baby Care',
    category: 'Kids & Baby Care',
    productLink: 'https://superbottoms.com'
  },
  {
    productName: 'Tiffy & Toffee',
    price: 650,
    sellerName: 'Tiffy & Toffee',
    sellerDescription: 'Kids & Baby Care',
    category: 'Kids & Baby Care',
    productLink: 'https://tiffyandtoffee.in'
  },
  {
    productName: 'Early Foods',
    price: 600,
    sellerName: 'Early Foods',
    sellerDescription: 'Kids & Baby Care',
    category: 'Kids & Baby Care',
    productLink: 'https://earlyfoods.com'
  },
  {
    productName: 'Mama Coco',
    price: 700,
    sellerName: 'Mama Coco',
    sellerDescription: 'Kids & Baby Care',
    category: 'Kids & Baby Care',
    productLink: 'https://mamacoco.in'
  },
  {
    productName: 'Littloo',
    price: 650,
    sellerName: 'Littloo',
    sellerDescription: 'Kids & Baby Care',
    category: 'Kids & Baby Care',
    productLink: 'https://littloo.in'
  },
  // 🎁 Gifting & Curated Hampers
  {
    productName: 'The Good Road',
    price: 1200,
    sellerName: 'The Good Road',
    sellerDescription: 'Sustainable, handcrafted gifting across occasions.',
    category: 'Gifting & Curated Hampers',
    productLink: 'https://thegoodroad.in'
  },
  {
    productName: 'The Messy Corner',
    price: 1100,
    sellerName: 'The Messy Corner',
    sellerDescription: 'Customized travel accessories, wallets, and gift boxes.',
    category: 'Gifting & Curated Hampers',
    productLink: 'https://themessycorner.in'
  },
  {
    productName: 'The June Shop',
    price: 1150,
    sellerName: 'The June Shop',
    sellerDescription: 'Trendy gifts, room decor, and lifestyle accessories.',
    category: 'Gifting & Curated Hampers',
    productLink: 'https://thejuneshop.com'
  },
  {
    productName: 'Confetti Gifts',
    price: 1000,
    sellerName: 'Confetti Gifts',
    sellerDescription: 'Pre-curated gift boxes for birthdays, weddings, etc.',
    category: 'Gifting & Curated Hampers',
    productLink: 'https://www.confettigifts.in'
  },
  {
    productName: 'Oye Happy',
    price: 900,
    sellerName: 'Oye Happy',
    sellerDescription: 'Funny, quirky gifts and personalized surprises.',
    category: 'Gifting & Curated Hampers',
    productLink: 'https://www.oyehappy.com'
  },
  // 💍 Jewelry & Accessories
  {
    productName: 'Pipa Bella',
    price: 700,
    sellerName: 'Pipa Bella',
    sellerDescription: 'Trendy and affordable fashion jewelry.',
    category: 'Jewelry & Accessories',
    productLink: 'https://pipabella.com'
  },
  {
    productName: 'Isharya',
    price: 800,
    sellerName: 'Isharya',
    sellerDescription: 'Modern Indian jewelry with a luxe twist.',
    category: 'Jewelry & Accessories',
    productLink: 'https://www.isharya.com'
  },
  {
    productName: 'Fierce Muse',
    price: 750,
    sellerName: 'Fierce Muse',
    sellerDescription: 'Bold, contemporary handcrafted accessories.',
    category: 'Jewelry & Accessories',
    productLink: 'https://www.fiercemuse.in'
  },
  {
    productName: 'Zariin',
    price: 850,
    sellerName: 'Zariin',
    sellerDescription: 'Everyday luxury jewelry — gold-plated pieces.',
    category: 'Jewelry & Accessories',
    productLink: 'https://www.zariin.com'
  },
  {
    productName: 'Arvino',
    price: 900,
    sellerName: 'Arvino',
    sellerDescription: 'Ethical, artisan-crafted, sustainable jewelry.',
    category: 'Jewelry & Accessories',
    productLink: 'https://www.arvino.in'
  },
  // 🖋️ Stationery, Journals & Art
  {
    productName: 'Origin One',
    price: 600,
    sellerName: 'Origin One',
    sellerDescription: 'Minimal, premium Indian-made stationery.',
    category: 'Stationery, Journals & Art',
    productLink: 'https://originone.in'
  },
  {
    productName: 'Factor Notes',
    price: 550,
    sellerName: 'Factor Notes',
    sellerDescription: 'Notebooks, planners, sketchbooks with creative prints.',
    category: 'Stationery, Journals & Art',
    productLink: 'https://factornotes.com'
  },
  {
    productName: 'The Ink Bucket',
    price: 650,
    sellerName: 'The Ink Bucket',
    sellerDescription: 'Beautiful art-inspired planners, journals, and wall art.',
    category: 'Stationery, Journals & Art',
    productLink: 'https://theinkbucket.in'
  },
  {
    productName: 'Art Loom',
    price: 600,
    sellerName: 'Art Loom',
    sellerDescription: 'Hand-drawn calendars, bookmarks, art pieces.',
    category: 'Stationery, Journals & Art',
    productLink: 'https://artloom.in'
  },
  {
    productName: 'MatrikaS',
    price: 550,
    sellerName: 'MatrikaS',
    sellerDescription: 'Stationery brand with journals, notebooks, and planners.',
    category: 'Stationery, Journals & Art',
    productLink: 'https://www.matrikas.co.in'
  },
  // 🏠 Home Decor & Craft
  {
    productName: 'Vaaree',
    price: 700,
    sellerName: 'Vaaree',
    sellerDescription: 'Affordable, curated home decor products.',
    category: 'Home Decor & Craft',
    productLink: 'https://vaaree.com'
  },
  {
    productName: 'Gulmohar Lane',
    price: 1200,
    sellerName: 'Gulmohar Lane',
    sellerDescription: 'Luxury furniture and handmade home pieces.',
    category: 'Home Decor & Craft',
    productLink: 'https://www.gulmoharlane.com'
  },
  {
    productName: 'Nicobar',
    price: 1100,
    sellerName: 'Nicobar',
    sellerDescription: 'Contemporary lifestyle decor and fashion.',
    category: 'Home Decor & Craft',
    productLink: 'https://www.nicobar.com'
  },
  {
    productName: 'Freedom Tree',
    price: 900,
    sellerName: 'Freedom Tree',
    sellerDescription: 'Colorful decor, furniture, and textiles.',
    category: 'Home Decor & Craft',
    productLink: 'https://freedomtree.in'
  },
  {
    productName: 'Knotty Rugs',
    price: 850,
    sellerName: 'Knotty Rugs',
    sellerDescription: 'Artisan-made rugs and carpets.',
    category: 'Home Decor & Craft',
    productLink: 'https://knottyrugs.com'
  },
  // 🌱 Eco-Friendly & Sustainable Lifestyle
  {
    productName: 'Green The Map',
    price: 700,
    sellerName: 'Green The Map',
    sellerDescription: 'Recycled and upcycled accessories.',
    category: 'Eco-Friendly & Sustainable Lifestyle',
    productLink: 'https://greenthemap.com'
  },
  {
    productName: 'Ksamah',
    price: 650,
    sellerName: 'Ksamah',
    sellerDescription: 'Eco kits, bamboo products, and zero waste essentials.',
    category: 'Eco-Friendly & Sustainable Lifestyle',
    productLink: 'https://ksamah.eco'
  },
  {
    productName: 'Climes',
    price: 600,
    sellerName: 'Climes',
    sellerDescription: 'Climate-positive gifting and carbon offsetting.',
    category: 'Eco-Friendly & Sustainable Lifestyle',
    productLink: 'https://climes.io'
  },
  {
    productName: 'Reuse Studio',
    price: 650,
    sellerName: 'Reuse Studio',
    sellerDescription: 'Handcrafted, upcycled bags and accessories.',
    category: 'Eco-Friendly & Sustainable Lifestyle',
    productLink: 'https://www.reusestudio.in'
  },
  {
    productName: 'Almitra Sustainables',
    price: 600,
    sellerName: 'Almitra Sustainables',
    sellerDescription: 'Plastic-free daily-use items and travel kits.',
    category: 'Eco-Friendly & Sustainable Lifestyle',
    productLink: 'https://www.almitrasustainables.com'
  }
];

// Mock DB query function to find products by name (case-insensitive)
function findProductsByName(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => p.productName.toLowerCase().includes(lowerQuery));
}

app.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.json({ reply: "Please provide a product name to search." });
  }

  let matchedProducts = [];

  // Check if message matches any category
  // Normalize by removing commas and extra spaces
  const normalize = str => str.toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ').trim();
  const normalizedMessage = normalize(message);
  const categories = [...new Set(products.map(p => normalize(p.category)))];
  if (categories.includes(normalizedMessage)) {
    matchedProducts = products.filter(p => normalize(p.category) === normalizedMessage);
  } else {
    matchedProducts = findProductsByName(message);
  }

  if (matchedProducts.length === 0) {
    return res.json({ reply: "Looks like that deal’s playing hide-and-seek! Let’s try a new search or explore these hot picks 🔥." });
  }

  // Format response
  let reply = `Here are the best prices I found for "${message}":\n`;
  matchedProducts.forEach((product, index) => {
    reply += `~ ${product.sellerName}: ₹${product.price} ${product.productLink}\n`;
  });

  res.json({ reply, products: matchedProducts });
});

app.listen(port, () => {
  console.log(`Server running on https://chatbot-pricepecharcha.onrender.com${port}`);
});
