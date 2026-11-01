import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Star,
  Search,
  Filter,
  Check,
  Eye,
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';
import CardTilt3D from '../components/3d/CardTilt3D';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const categories = ['All', 'Skincare', 'Haircare', 'Makeup', 'Tools'];

const ProductsPage = ({ onCheckoutTrigger }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.getProducts(category, search, sort);
        if (res.success && res.products) {
          setProducts(res.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search, sort]);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Salon-Exclusive Formulas</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            The 3D Beauty & Skincare Boutique
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Bring the luxury salon experience home with clinical peptides, 24K gold nano serums, and artisan rose quartz sculptors.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search serums, masks, lipstick..."
                className="w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  category === cat
                    ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product) => (
            <CardTilt3D key={product.id} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-3xl overflow-hidden glass-card shadow-xl border border-white/60 dark:border-pink-500/20 group hover:border-pink-400 transition-all duration-300">
                {/* 3D Rotating Product Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center p-6 perspective-1000">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-2xl group-hover:[transform:rotateY(16deg)_rotateX(-8deg)_scale(1.08)] transition-transform duration-500 ease-out drop-shadow-xl"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-pink-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-pink-600"
                    title="Quick Look"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
                        <span>({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-xl text-slate-900 dark:text-white">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-slate-400">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-xs shadow-md hover:shadow-pink-500/20 active:scale-95 transition-all flex items-center gap-1.5 btn-3d-pink"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>

        {/* Quick Look Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-white dark:bg-[#16162a] rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30">
              <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-pink-600 hover:text-white"
                >
                  ✕
                </button>

                <div className="w-full sm:w-1/2 aspect-square rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 border border-slate-200 dark:border-slate-800">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                <div className="w-full sm:w-1/2 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                      {quickViewProduct.category} • {quickViewProduct.badge}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mt-1">
                      {quickViewProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{quickViewProduct.rating}</span>
                      <span className="text-slate-400">({quickViewProduct.reviews} customer reviews)</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {quickViewProduct.description}
                    </p>

                    {quickViewProduct.ingredients && (
                      <div className="mt-3 p-3 rounded-xl bg-pink-50/50 dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-400">
                        <strong className="block text-slate-800 dark:text-slate-200 mb-0.5">Key Actives:</strong>
                        {quickViewProduct.ingredients}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-black text-2xl text-slate-900 dark:text-white">
                      ₹{quickViewProduct.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, 1);
                        setQuickViewProduct(null);
                      }}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-xs shadow-md btn-3d-pink flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
