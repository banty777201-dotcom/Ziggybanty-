import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for persistent JSON storage
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Seed initial products if file doesn't exist
const DEFAULT_PRODUCTS = [
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

const DEFAULT_TESTIMONIALS = [
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

if (!fs.existsSync(PRODUCTS_FILE)) {
  writeJsonFile(PRODUCTS_FILE, DEFAULT_PRODUCTS);
}
if (!fs.existsSync(TESTIMONIALS_FILE)) {
  writeJsonFile(TESTIMONIALS_FILE, DEFAULT_TESTIMONIALS);
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  writeJsonFile(ENQUIRIES_FILE, []);
}
if (!fs.existsSync(ORDERS_FILE)) {
  writeJsonFile(ORDERS_FILE, []);
}

app.use(express.json({ limit: '10mb' }));

// --- API ROUTES ---

// Products API
app.get('/api/products', (_req: Request, res: Response) => {
  const products = readJsonFile(PRODUCTS_FILE, DEFAULT_PRODUCTS);
  res.json({ success: true, products });
});

app.post('/api/products', (req: Request, res: Response) => {
  const { name, category, price, description, image, inStock, stockCount, isFeatured, sizes, details } = req.body;
  if (!name || !category || !price) {
    res.status(400).json({ error: 'Name, category, and price are required' });
    return;
  }

  const products = readJsonFile<any[]>(PRODUCTS_FILE, DEFAULT_PRODUCTS);
  const newProduct = {
    id: 'zb-prod-' + Date.now(),
    name: String(name).trim(),
    category,
    price: Number(price),
    originalPrice: Number(req.body.originalPrice || Number(price) + 5000),
    description: String(description || '').trim(),
    image: image || '/src/assets/images/hero_fashion_footwear_1794482685766.jpg',
    inStock: inStock !== false,
    stockCount: Number(stockCount || 10),
    isFeatured: Boolean(isFeatured),
    sizes: Array.isArray(sizes) ? sizes : ['Standard'],
    details: Array.isArray(details) ? details : [],
    createdAt: new Date().toISOString()
  };

  products.unshift(newProduct);
  writeJsonFile(PRODUCTS_FILE, products);
  res.status(201).json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const products = readJsonFile<any[]>(PRODUCTS_FILE, DEFAULT_PRODUCTS);
  const index = products.findIndex((p: any) => p.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  const updatedProduct = {
    ...products[index],
    ...req.body,
    id // preserve id
  };

  products[index] = updatedProduct;
  writeJsonFile(PRODUCTS_FILE, products);
  res.json({ success: true, product: updatedProduct });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let products = readJsonFile<any[]>(PRODUCTS_FILE, DEFAULT_PRODUCTS);
  const initialLength = products.length;
  products = products.filter((p: any) => p.id !== id);

  if (products.length === initialLength) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  writeJsonFile(PRODUCTS_FILE, products);
  res.json({ success: true, message: 'Product deleted successfully' });
});

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xyewzjbq';

// Enquiries API
app.post('/api/enquiries', async (req: Request, res: Response) => {
  const { fullName, email, phone, subject, productInterest, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    res.status(400).json({ error: 'Full name, email, phone number, and message are required fields.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
  const newEnquiry = {
    id: 'ENQ-' + Date.now().toString().slice(-6),
    fullName: String(fullName).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    subject: String(subject || 'Product Enquiry').trim(),
    productInterest: String(productInterest || 'General Inquiry').trim(),
    message: String(message).trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
    forwardedTo: 'banty777201@gmail.com'
  };

  enquiries.unshift(newEnquiry);
  writeJsonFile(ENQUIRIES_FILE, enquiries);

  // Forward directly to Formspree endpoint
  try {
    const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[Ziggybanty Enquiry #${newEnquiry.id}] ${newEnquiry.subject} - from ${newEnquiry.fullName}`,
        fullName: newEnquiry.fullName,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        subject: newEnquiry.subject,
        productInterest: newEnquiry.productInterest,
        message: newEnquiry.message,
        enquiryId: newEnquiry.id,
        submittedAt: newEnquiry.createdAt,
        _replyto: newEnquiry.email
      })
    });
    console.log(`[FORMSPREE] Enquiry ${newEnquiry.id} forwarded successfully (Status: ${formspreeResponse.status})`);
  } catch (formspreeErr) {
    console.error(`[FORMSPREE] Could not forward enquiry to ${FORMSPREE_ENDPOINT}:`, formspreeErr);
  }

  // Log notification to official recipient
  console.log('====================================================');
  console.log(`[EMAIL NOTIFICATION DISPATCHED VIA FORMSPREE TO: banty777201@gmail.com]`);
  console.log(`Subject: [Ziggybanty Website Enquiry] ${newEnquiry.subject} - from ${newEnquiry.fullName}`);
  console.log(`Customer: ${newEnquiry.fullName} (${newEnquiry.phone} / ${newEnquiry.email})`);
  console.log(`Product of Interest: ${newEnquiry.productInterest}`);
  console.log(`Message: ${newEnquiry.message}`);
  console.log(`Timestamp: ${newEnquiry.createdAt}`);
  console.log('====================================================');

  res.status(201).json({
    success: true,
    enquiryId: newEnquiry.id,
    message: 'Your enquiry has been received and securely delivered to Ziggybanty email via Formspree.'
  });
});

app.get('/api/enquiries', (_req: Request, res: Response) => {
  const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
  res.json({ success: true, enquiries });
});

app.patch('/api/enquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
  const enquiry = enquiries.find((e: any) => e.id === id);

  if (!enquiry) {
    res.status(404).json({ error: 'Enquiry not found' });
    return;
  }

  enquiry.status = status || enquiry.status;
  writeJsonFile(ENQUIRIES_FILE, enquiries);
  res.json({ success: true, enquiry });
});

// Orders API
app.post('/api/orders', async (req: Request, res: Response) => {
  const { customerName, email, phone, deliveryAddress, city, state, notes, items, subtotal, deliveryFee, total } = req.body;

  if (!customerName || !phone || !deliveryAddress || !items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Customer name, phone, delivery address, and at least one item are required.' });
    return;
  }

  const orders = readJsonFile<any[]>(ORDERS_FILE, []);
  const orderId = 'ZB-' + Math.floor(10000 + Math.random() * 90000);

  const newOrder = {
    id: orderId,
    customerName: String(customerName).trim(),
    email: String(email || '').trim().toLowerCase(),
    phone: String(phone).trim(),
    deliveryAddress: String(deliveryAddress).trim(),
    city: String(city || 'Lagos').trim(),
    state: String(state || 'Lagos').trim(),
    notes: String(notes || '').trim(),
    items,
    subtotal: Number(subtotal || 0),
    deliveryFee: Number(deliveryFee || 0),
    total: Number(total || 0),
    status: 'pending',
    createdAt: new Date().toISOString(),
    paymentMethod: 'WhatsApp Confirmation & Bank Transfer / Cash on Delivery'
  };

  orders.unshift(newOrder);
  writeJsonFile(ORDERS_FILE, orders);

  // Forward Order Notification to Formspree
  try {
    const itemsFormatted = newOrder.items
      .map((it: any) => `• ${it.quantity}x ${it.productName} (${it.selectedSize || 'Standard'}) - ₦${(it.price * it.quantity).toLocaleString()}`)
      .join('\n');

    const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[New Order - Ziggybanty #${newOrder.id}] ${newOrder.customerName} - ₦${newOrder.total.toLocaleString()}`,
        formType: 'Customer Order Checkout',
        orderId: newOrder.id,
        customerName: newOrder.customerName,
        phone: newOrder.phone,
        email: newOrder.email || 'N/A',
        deliveryAddress: `${newOrder.deliveryAddress}, ${newOrder.city}, ${newOrder.state}`,
        orderNotes: newOrder.notes || 'None',
        orderedItems: itemsFormatted,
        subtotal: `₦${newOrder.subtotal.toLocaleString()}`,
        deliveryFee: `₦${newOrder.deliveryFee.toLocaleString()}`,
        totalPayable: `₦${newOrder.total.toLocaleString()}`,
        orderDate: newOrder.createdAt,
        _replyto: newOrder.email || undefined
      })
    });
    console.log(`[FORMSPREE] Order ${newOrder.id} forwarded successfully (Status: ${formspreeResponse.status})`);
  } catch (formspreeErr) {
    console.error(`[FORMSPREE] Could not forward order to ${FORMSPREE_ENDPOINT}:`, formspreeErr);
  }

  console.log(`[NEW ORDER REGISTERED: ${orderId}] by ${newOrder.customerName} - Total: ₦${newOrder.total.toLocaleString()}`);

  res.status(201).json({
    success: true,
    order: newOrder
  });
});

app.get('/api/orders', (_req: Request, res: Response) => {
  const orders = readJsonFile<any[]>(ORDERS_FILE, []);
  res.json({ success: true, orders });
});

app.patch('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const orders = readJsonFile<any[]>(ORDERS_FILE, []);
  const order = orders.find((o: any) => o.id === id);

  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }

  order.status = status || order.status;
  writeJsonFile(ORDERS_FILE, orders);
  res.json({ success: true, order });
});

// Testimonials API
app.get('/api/testimonials', (_req: Request, res: Response) => {
  const testimonials = readJsonFile(TESTIMONIALS_FILE, DEFAULT_TESTIMONIALS);
  res.json({ success: true, testimonials });
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const { name, location, rating, comment, productPurchased } = req.body;
  if (!name || !comment) {
    res.status(400).json({ error: 'Name and comment are required' });
    return;
  }

  const testimonials = readJsonFile(TESTIMONIALS_FILE, DEFAULT_TESTIMONIALS);
  const newTestimonial = {
    id: 'test-' + Date.now(),
    name: String(name).trim(),
    location: String(location || 'Lagos, Nigeria').trim(),
    rating: Number(rating || 5),
    comment: String(comment).trim(),
    productPurchased: String(productPurchased || 'Ziggybanty Collection').trim(),
    date: 'Recent',
    verifiedBuyer: true
  };

  testimonials.unshift(newTestimonial);
  writeJsonFile(TESTIMONIALS_FILE, testimonials);
  res.status(201).json({ success: true, testimonial: newTestimonial });
});

app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let testimonials = readJsonFile(TESTIMONIALS_FILE, DEFAULT_TESTIMONIALS);
  testimonials = testimonials.filter((t: any) => t.id !== id);
  writeJsonFile(TESTIMONIALS_FILE, testimonials);
  res.json({ success: true, message: 'Testimonial removed' });
});

// Admin Auth API (simple secure PIN check: ziggy2026)
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'ziggy2026';

  if (password === ADMIN_PASS) {
    res.json({
      success: true,
      token: 'zb-auth-' + Buffer.from('ziggybanty-admin-' + Date.now()).toString('base64'),
      user: {
        role: 'admin',
        businessName: 'ZIGGYBANTY',
        email: 'banty777201@gmail.com',
        phone: '07049224098'
      }
    });
  } else {
    res.status(401).json({ success: false, error: 'Incorrect administrator password.' });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 ZIGGYBANTY Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
