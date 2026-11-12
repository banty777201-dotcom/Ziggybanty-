import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Package,
  ShoppingBag,
  Inbox,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  DollarSign,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { Product, Order, Enquiry, Testimonial, ProductCategory } from '../types';
import { BUSINESS_INFO } from '../data/initialData';

interface AdminDashboardProps {
  products: Product[];
  onRefreshProducts: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onRefreshProducts,
  onExitAdmin
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('zb_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'enquiries' | 'testimonials'>('products');

  // Backend state
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  // Product modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sneakers' as ProductCategory,
    price: 50000,
    originalPrice: 60000,
    stockCount: 10,
    inStock: true,
    description: '',
    image: '/src/assets/images/product_camo_sneakers_1794482685363.jpg',
    sizesText: 'EU 40, EU 41, EU 42, EU 43, EU 44',
    isFeatured: false
  });

  // Selected enquiry for detail view
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Fetch admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, enquiriesRes, testimonialsRes] = await Promise.all([
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/enquiries').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json())
      ]);

      if (ordersRes.orders) setOrders(ordersRes.orders);
      if (enquiriesRes.enquiries) setEnquiries(enquiriesRes.enquiries);
      if (testimonialsRes.testimonials) setTestimonials(testimonialsRes.testimonials);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('zb_admin_auth', 'true');
        setPasswordInput('');
      } else {
        setAuthError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setAuthError('Connection error. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('zb_admin_auth');
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Sneakers',
      price: 50000,
      originalPrice: 60000,
      stockCount: 10,
      inStock: true,
      description: '',
      image: '/src/assets/images/product_camo_sneakers_1794482685363.jpg',
      sizesText: 'EU 40, EU 41, EU 42, EU 43, EU 44',
      isFeatured: false
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price + 5000,
      stockCount: prod.stockCount,
      inStock: prod.inStock,
      description: prod.description,
      image: prod.image,
      sizesText: prod.sizes ? prod.sizes.join(', ') : '',
      isFeatured: Boolean(prod.isFeatured)
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const sizesArray = productForm.sizesText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice || 0),
      stockCount: Number(productForm.stockCount),
      inStock: Boolean(productForm.inStock),
      description: productForm.description,
      image: productForm.image,
      sizes: sizesArray,
      isFeatured: Boolean(productForm.isFeatured)
    };

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      setIsProductModalOpen(false);
      onRefreshProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      onRefreshProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus as any } : o)));
    } catch (err) {
      alert('Error updating order');
    }
  };

  // Update enquiry status
  const handleUpdateEnquiryStatus = async (enquiryId: string, newStatus: string) => {
    try {
      await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setEnquiries(prev => prev.map(e => (e.id === enquiryId ? { ...e, status: newStatus as any } : e)));
    } catch (err) {
      alert('Error updating enquiry');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-black border-2 border-[#70DC32] text-[#70DC32] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-black text-white">
              ZIGGYBANTY PORTAL
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Authorized Business Owner Access Only
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Administrator Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#70DC32]"
                autoFocus
              />
              <p className="text-[11px] text-zinc-500 mt-1.5">
                Default Access Password: <code className="text-[#70DC32] font-mono">ziggy2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Log In to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onExitAdmin}
              className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              ← Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      
      {/* Top Admin Header */}
      <header className="bg-black border-b border-zinc-800 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-[#70DC32] flex items-center justify-center font-bold text-[#70DC32]">
            ZB
          </div>
          <div>
            <h1 className="font-display font-black text-lg text-white leading-tight">
              ZIGGYBANTY MANAGEMENT
            </h1>
            <p className="text-[11px] text-zinc-400">
              Official Hub · Destination: {BUSINESS_INFO.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-[#70DC32] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onExitAdmin}
            className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold hover:border-zinc-700 text-zinc-200 transition-colors"
          >
            View Live Store
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/80 border border-red-800 hover:bg-red-900 text-red-200 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Metric Strips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Total Products</span>
                <h3 className="font-display text-2xl font-black text-white mt-1 font-mono tabular-nums">
                  {products.length}
                </h3>
              </div>
              <Package className="w-6 h-6 text-[#70DC32]" />
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Customer Orders</span>
                <h3 className="font-display text-2xl font-black text-white mt-1 font-mono tabular-nums">
                  {orders.length}
                </h3>
              </div>
              <ShoppingBag className="w-6 h-6 text-[#70DC32]" />
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Customer Enquiries</span>
                <h3 className="font-display text-2xl font-black text-white mt-1 font-mono tabular-nums">
                  {enquiries.length}
                </h3>
              </div>
              <Inbox className="w-6 h-6 text-[#70DC32]" />
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Inventory Value</span>
                <h3 className="font-display text-2xl font-black text-white mt-1 font-mono tabular-nums">
                  ₦{products.reduce((s, p) => s + p.price * p.stockCount, 0).toLocaleString()}
                </h3>
              </div>
              <DollarSign className="w-6 h-6 text-[#70DC32]" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'products' ? 'bg-[#70DC32] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'orders' ? 'bg-[#70DC32] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'enquiries' ? 'bg-[#70DC32] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Customer Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === 'testimonials' ? 'bg-[#70DC32] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials ({testimonials.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Product Catalog Management</h2>
                <p className="text-xs text-zinc-400">Add, edit prices, descriptions, images and stock levels.</p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (₦)</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-md bg-zinc-800"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-white text-xs">{product.name}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{product.id}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-zinc-300">{product.category}</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                          ₦{product.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums">
                          {product.stockCount} units
                        </td>
                        <td className="py-3 px-4">
                          {product.inStock ? (
                            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> In Stock
                            </span>
                          ) : (
                            <span className="text-[11px] text-red-400 font-semibold">Out of Stock</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(product)}
                            className="p-1.5 rounded hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 rounded hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Customer Orders</h2>
              <p className="text-xs text-zinc-400">Review received orders, confirm delivery on WhatsApp and update status.</p>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No customer orders placed yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 space-y-4 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div>
                        <span className="font-mono font-bold text-[#70DC32] text-sm">
                          {order.id}
                        </span>
                        <span className="text-xs text-zinc-400 ml-3">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status Selector */}
                        <select
                          value={order.status}
                          onChange={e => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-black border border-zinc-700 text-xs rounded-lg px-2.5 py-1 text-white font-medium focus:ring-1 focus:ring-[#70DC32]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {/* Direct WhatsApp Customer Action */}
                        <a
                          href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${order.customerName}, this is Ziggybanty regarding your Order Ref: ${order.id}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1 bg-[#25D366] text-black text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp Customer</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-300">
                      <div>
                        <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Customer</span>
                        <div className="font-bold text-white mt-0.5">{order.customerName}</div>
                        <div>Phone: {order.phone}</div>
                        <div>Email: {order.email || 'N/A'}</div>
                      </div>

                      <div>
                        <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Delivery Address</span>
                        <div className="mt-0.5 leading-relaxed">
                          {order.deliveryAddress}, {order.city}, {order.state}
                        </div>
                        {order.notes && <div className="text-zinc-400 italic mt-1">Note: {order.notes}</div>}
                      </div>

                      <div>
                        <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Financials</span>
                        <div className="mt-0.5">Subtotal: ₦{order.subtotal?.toLocaleString()}</div>
                        <div>Delivery Fee: ₦{order.deliveryFee?.toLocaleString()}</div>
                        <div className="font-bold text-[#70DC32] text-sm mt-1">
                          Total: ₦{order.total?.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Ordered Items summary */}
                    <div className="bg-black/50 p-3 rounded-lg border border-zinc-800/80 text-xs space-y-1">
                      <div className="text-zinc-400 font-semibold uppercase text-[10px] mb-1">
                        Ordered Items ({order.items.length})
                      </div>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-zinc-300">
                          <span>{it.quantity}x {it.productName} {it.selectedSize ? `(${it.selectedSize})` : ''}</span>
                          <span className="font-mono text-zinc-400">₦{(it.price * it.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMER ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Customer Enquiries</h2>
              <p className="text-xs text-zinc-400">
                All messages sent via the contact form and delivered to <strong>{BUSINESS_INFO.email}</strong>.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500">
                <Inbox className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No customer enquiries recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map(enquiry => (
                  <div
                    key={enquiry.id}
                    className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[#70DC32] text-xs">
                          {enquiry.id}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {enquiry.fullName}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          {new Date(enquiry.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={enquiry.status}
                          onChange={e => handleUpdateEnquiryStatus(enquiry.id, e.target.value)}
                          className="bg-black border border-zinc-700 text-xs rounded-lg px-2.5 py-1 text-white font-medium"
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="responded">Responded</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                          title="View Full Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-300">
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase block">Contact Info</span>
                        <div>Phone: {enquiry.phone}</div>
                        <div>Email: {enquiry.email}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase block">Subject / Interest</span>
                        <div className="font-medium text-white">{enquiry.subject}</div>
                        <div className="text-zinc-400">Product: {enquiry.productInterest}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase block">Direct Reply</span>
                        <div className="flex gap-2 mt-1">
                          <a
                            href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${enquiry.fullName}, thank you for contacting Ziggybanty regarding your inquiry: ${enquiry.subject}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#25D366] text-black text-[11px] font-bold"
                          >
                            WhatsApp
                          </a>
                          <a
                            href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(enquiry.subject)}`}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-medium"
                          >
                            Email
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 bg-black/40 p-3 rounded-lg border border-zinc-800">
                      "{enquiry.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Testimonial Reviews</h2>
              <p className="text-xs text-zinc-400">View customer reviews showcased on the homepage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map(item => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-xs text-zinc-400">{item.location}</div>
                    </div>
                    <span className="text-xs text-[#70DC32] font-mono">★ {item.rating}.0</span>
                  </div>
                  <p className="text-xs text-zinc-300 italic">"{item.comment}"</p>
                  <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                    Product: {item.productPurchased}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-zinc-900 text-white rounded-2xl max-w-xl w-full border border-zinc-700 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold mb-5">
              {editingProduct ? 'Edit Product' : 'Add New Product to Ziggybanty'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white focus:ring-1 focus:ring-[#70DC32]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white focus:ring-1 focus:ring-[#70DC32]"
                  >
                    <option value="Sneakers">Sneakers</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Fashion Wears">Fashion Wears</option>
                    <option value="Bags">Bags</option>
                    <option value="Perfumes">Perfumes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">Price in Naira (₦)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white font-mono focus:ring-1 focus:ring-[#70DC32]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stockCount}
                    onChange={e => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold uppercase mb-1">Stock Status</label>
                  <select
                    value={productForm.inStock ? 'yes' : 'no'}
                    onChange={e => setProductForm({ ...productForm, inStock: e.target.value === 'yes' })}
                    className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white"
                  >
                    <option value="yes">In Stock</option>
                    <option value="no">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white font-mono text-[11px]"
                />
                <div className="mt-2 flex gap-2 overflow-x-auto text-[10px] text-zinc-400">
                  <span>Presets:</span>
                  <button
                    type="button"
                    onClick={() => setProductForm({ ...productForm, image: '/src/assets/images/product_camo_sneakers_1794482685363.jpg' })}
                    className="text-[#70DC32] hover:underline"
                  >
                    Sneakers
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductForm({ ...productForm, image: '/src/assets/images/product_brown_shoes_1794482686193.jpg' })}
                    className="text-[#70DC32] hover:underline"
                  >
                    Brown Shoes
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductForm({ ...productForm, image: '/src/assets/images/product_fashion_wear_1794482687120.jpg' })}
                    className="text-[#70DC32] hover:underline"
                  >
                    Fashion Wear
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductForm({ ...productForm, image: '/src/assets/images/product_bag_perfume_1794482686882.jpg' })}
                    className="text-[#70DC32] hover:underline"
                  >
                    Bag & Perfume
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1">Available Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={productForm.sizesText}
                  onChange={e => setProductForm({ ...productForm, sizesText: e.target.value })}
                  placeholder="e.g. EU 40, EU 41, EU 42 or S, M, L, XL"
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={productForm.isFeatured}
                  onChange={e => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                  className="rounded text-[#70DC32]"
                />
                <label htmlFor="featured" className="text-zinc-300">Show in Featured Showcase on Homepage</label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-[#70DC32] hover:bg-[#62c928] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 text-white rounded-2xl max-w-lg w-full border border-zinc-700 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-display font-bold text-lg">Enquiry {selectedEnquiry.id}</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2 text-zinc-300">
              <div><strong className="text-zinc-400">Customer:</strong> {selectedEnquiry.fullName}</div>
              <div><strong className="text-zinc-400">Email:</strong> {selectedEnquiry.email}</div>
              <div><strong className="text-zinc-400">Phone:</strong> {selectedEnquiry.phone}</div>
              <div><strong className="text-zinc-400">Subject:</strong> {selectedEnquiry.subject}</div>
              <div><strong className="text-zinc-400">Product of Interest:</strong> {selectedEnquiry.productInterest}</div>
              <div><strong className="text-zinc-400">Forwarded To:</strong> {selectedEnquiry.forwardedTo}</div>
              <div className="pt-2">
                <strong className="text-zinc-400 block mb-1">Message Content:</strong>
                <p className="bg-black/60 p-3 rounded border border-zinc-800 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${selectedEnquiry.fullName}, Ziggybanty replying to your inquiry: ${selectedEnquiry.subject}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded bg-[#25D366] text-black text-xs font-bold text-center"
              >
                Reply on WhatsApp
              </a>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 rounded bg-zinc-800 text-xs text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
