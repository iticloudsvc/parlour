import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartDrawer = ({ onProceedToPayment }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalAmount
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#16162a] shadow-2xl flex flex-col border-l border-amber-200/50 dark:border-pink-500/20">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-pink-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Your Beauty Bag
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {totalCount} {totalCount === 1 ? 'luxury item' : 'luxury items'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-pink-50 dark:bg-slate-800 flex items-center justify-center text-pink-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-200">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Treat yourself to our clinical serums, salon hair masks, and artisan rose quartz rollers!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-bold text-slate-800 dark:text-slate-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 space-y-3">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Standard Delivery</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">FREE</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold text-slate-900 dark:text-white">
                <span>Estimated Total</span>
                <span className="text-xl text-pink-600 dark:text-pink-400">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Authentic Guaranteed Salon Products</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToPayment && onProceedToPayment({
                    type: 'order',
                    title: 'Beauty Boutique Order',
                    totalAmount,
                    items: cartItems
                  });
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-bold text-sm shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2 btn-3d-pink"
              >
                <Sparkles className="w-4 h-4" />
                <span>Proceed to Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
