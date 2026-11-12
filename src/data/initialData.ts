import { Product, Testimonial } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'zb-prod-001',
    name: 'Ziggybanty Camo Tactical Studded Runner',
    category: 'Sneakers',
    price: 58000,
    originalPrice: 65000,
    description: 'High-end designer streetwear runner featuring tactical camouflage paneling, matte black pyramid stud accents, cushioned contour midsole, and aggressive grip sole.',
    details: [
      'Tactical camouflage canvas & reinforced leather overlays',
      'Matte black geometric pyramid stud detailing',
      'Impact-absorbing athletic sole unit',
      'Padded ankle collar for all-day comfort'
    ],
    image: '/src/assets/images/product_camo_sneakers_1794482685363.jpg',
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'zb-prod-002',
    name: 'Handcrafted Cognac Brogue Oxford Shoes',
    category: 'Shoes',
    price: 78000,
    originalPrice: 88000,
    description: 'Handcrafted premium burnished cognac brown Italian-style Oxford dress shoes with intricate medallion wingtip brogue perforations, Blake stitched leather sole, and gentleman finish.',
    details: [
      '100% full-grain burnished calfskin leather',
      'Artisanal medallion wingtip brogue perforations',
      'Breathable leather lining and cushioned insole',
      'Stacked leather heel with non-slip rubber insert'
    ],
    image: '/src/assets/images/product_brown_shoes_1794482686193.jpg',
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    sizes: ['EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    createdAt: '2026-03-02T11:00:00Z'
  },
  {
    id: 'zb-prod-003',
    name: 'Ziggybanty Signature Black & Green Bomber',
    category: 'Fashion Wears',
    price: 45000,
    originalPrice: 52000,
    description: 'Exclusive luxury streetwear bomber jacket tailored in heavy-duty satin finish with subtle Ziggybanty lime-green geometric embroidery along the collar, hem, and cuffs.',
    details: [
      'Water-resistant matte satin shell',
      'Custom lime green geometric sleeve embroidery',
      'Two-way gunmetal YKK zipper with branded puller',
      'Tailored modern silhouette suitable for both casual and high-fashion looks'
    ],
    image: '/src/assets/images/product_fashion_wear_1794482687120.jpg',
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    createdAt: '2026-03-03T12:00:00Z'
  },
  {
    id: 'zb-prod-004',
    name: 'Ziggybanty Noir Pebble-Grain Leather Duffle',
    category: 'Bags',
    price: 64000,
    originalPrice: 75000,
    description: 'Executive weekend and travel duffle bag crafted from robust textured pebble-grain leather, solid brass hardware in gold finish, and detachable padded shoulder strap.',
    details: [
      'Pebble-grain waterproof premium vegan leather',
      'Reinforced dual top carry handles',
      'Spacious main compartment with zip pocket and shoe divider',
      'Branded gold tone hardware accents'
    ],
    image: '/src/assets/images/product_bag_perfume_1794482686882.jpg',
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    sizes: ['One Size (45L)'],
    createdAt: '2026-03-04T13:00:00Z'
  },
  {
    id: 'zb-prod-005',
    name: 'Aurélien Or Blanc Extrait De Parfum (100ml)',
    category: 'Perfumes',
    price: 52000,
    originalPrice: 60000,
    description: 'An alluring, long-lasting luxury fragrance characterized by warm amber, bergamot, sensual Madagascar vanilla, and smoky cedarwood. Designed for high presence and royal aura.',
    details: [
      '100ml Extrait de Parfum (30% oil concentration)',
      'Top Notes: Italian Bergamot, Cardamom, Pink Pepper',
      'Heart Notes: Golden Amber, Saffron, Jasmine Sambac',
      'Base Notes: Madagascar Vanilla, Cedarwood, White Musk',
      'Projection: 12+ hours intense longevity'
    ],
    image: '/src/assets/images/product_bag_perfume_1794482686882.jpg',
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    sizes: ['100ml Bottle'],
    createdAt: '2026-03-05T14:00:00Z'
  },
  {
    id: 'zb-prod-006',
    name: 'Ziggybanty Shadow Studded High-Top Sneaker',
    category: 'Sneakers',
    price: 62000,
    originalPrice: 70000,
    description: 'Stealth all-black high-top sneaker with reinforced toe cap, studded heel cup, padded collar, and luxury street couture aesthetics.',
    details: [
      'Full black matte leather with tactile pyramid studs',
      'High-top silhouette with support ankle straps',
      'Vulcanized anti-abrasion rubber cupsole',
      'Breathable textile lining'
    ],
    image: '/src/assets/images/product_camo_sneakers_1794482685363.jpg',
    inStock: true,
    stockCount: 8,
    isFeatured: false,
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    createdAt: '2026-03-06T15:00:00Z'
  },
  {
    id: 'zb-prod-007',
    name: 'Ziggybanty Heritage Calfskin Penny Loafer',
    category: 'Shoes',
    price: 72000,
    originalPrice: 80000,
    description: 'Timeless luxury slip-on loafer made from rich burnished leather with classic saddle slot, hand-sewn apron, and comfortable leather arch support.',
    details: [
      'Top-tier burnished Italian calf leather',
      'Hand-stitched apron toe construction',
      'Leather lining with memory foam arch padding',
      'Durable non-slip rubber sole insert'
    ],
    image: '/src/assets/images/product_brown_shoes_1794482686193.jpg',
    inStock: true,
    stockCount: 12,
    isFeatured: false,
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    createdAt: '2026-03-07T16:00:00Z'
  },
  {
    id: 'zb-prod-008',
    name: 'Ziggybanty Ardensa Eau De Parfum (100ml)',
    category: 'Perfumes',
    price: 48000,
    originalPrice: 55000,
    description: 'A bold, signature masculine and unisex scent presenting smoky agarwood, leather, rich black plum, and spiced tonka bean.',
    details: [
      '100ml Eau De Parfum spray',
      'Top Notes: Black Plum, Bergamot, Cinnamon Bark',
      'Heart Notes: Royal Agarwood (Oud), Tobacco Leaf, Iris',
      'Base Notes: Tonka Bean, Leather, Ambergris'
    ],
    image: '/src/assets/images/hero_fashion_footwear_1794482685766.jpg',
    inStock: true,
    stockCount: 16,
    isFeatured: false,
    sizes: ['100ml Bottle'],
    createdAt: '2026-03-08T17:00:00Z'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Chidi Okafor',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    comment: 'The quality of the burnished brown Oxford shoes is unbelievable. I wore them for my brother’s wedding and received non-stop compliments. Fast delivery to Lekki within 24 hours!',
    productPurchased: 'Handcrafted Cognac Brogue Oxford Shoes',
    date: 'March 2026',
    verifiedBuyer: true
  },
  {
    id: 'test-02',
    name: 'Folashade Adeyemi',
    location: 'Wuse II, Abuja',
    rating: 5,
    comment: 'I ordered the Aurélien Or Blanc perfume and the black duffle bag. Both smell and feel genuinely luxurious. Ziggybanty responded immediately on WhatsApp and gave me tracking updates throughout.',
    productPurchased: 'Aurélien Or Blanc Extrait & Leather Duffle',
    date: 'February 2026',
    verifiedBuyer: true
  },
  {
    id: 'test-03',
    name: 'Emeka Nwosu',
    location: 'Port Harcourt, Rivers State',
    rating: 5,
    comment: 'The camo tactical sneakers are even better in person. The stud detailing is clean and durable, not flimsy at all. Ziggybanty is easily my favorite fashion hub in Nigeria right now.',
    productPurchased: 'Ziggybanty Camo Tactical Studded Runner',
    date: 'February 2026',
    verifiedBuyer: true
  }
];

export const BUSINESS_INFO = {
  name: 'ZIGGYBANTY',
  tagline: 'Shop Easily With Ziggybanty',
  slogan: 'FASHION • STYLE • CLASS',
  phone: '07049224098',
  phoneFormatted: '0704 922 4098',
  whatsapp: '+2347049224098',
  whatsappNumberDigits: '2347049224098',
  whatsappLink: 'https://wa.me/2347049224098?text=Hello%20Ziggybanty,%20I%20visited%20your%20website%20and%20would%20like%20to%20make%20an%20enquiry%20about%20your%20products.',
  email: 'banty777201@gmail.com',
  instagram: '@ziggy_banty1',
  instagramUrl: 'https://instagram.com/ziggy_banty1',
  tiktok: '@ziggybanty',
  tiktokUrl: 'https://tiktok.com/@ziggybanty',
  heroImage: '/src/assets/images/hero_fashion_footwear_1794482685766.jpg',
  brandColors: {
    primary: '#70DC32', // Lime green
    secondary: '#080808', // Black
    supporting: '#FFFFFF', // White
    background: '#F5F5F5' // Light Grey
  },
  formspreeEndpoint: 'https://formspree.io/f/xyewzjbq'
};
