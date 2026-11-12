export type ProductCategory = 'Sneakers' | 'Shoes' | 'Fashion Wears' | 'Bags' | 'Perfumes';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in Nigerian Naira (₦)
  originalPrice?: number;
  description: string;
  details?: string[];
  image: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  sizes?: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  productInterest: string;
  message: string;
  status: 'new' | 'in-progress' | 'responded' | 'archived';
  createdAt: string;
  forwardedTo: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  selectedSize?: string;
  image: string;
}

export interface Order {
  id: string; // e.g. ZB-10842
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  state: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
  paymentMethod: 'WhatsApp Confirmation & Bank Transfer / Cash on Delivery';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  verifiedBuyer: boolean;
}
