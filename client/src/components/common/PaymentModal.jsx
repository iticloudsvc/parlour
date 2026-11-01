import React, { useState } from 'react';
import { X, CreditCard, QrCode, ShieldCheck, CheckCircle2, Download, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const PaymentModal = ({ isOpen, onClose, details, onSuccess }) => {
  const [gateway, setGateway] = useState('razorpay'); // 'razorpay' | 'stripe' | 'upi'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const txn = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setTransactionRef(txn);
      setIsProcessing(false);
      setIsCompleted(true);

      // Launch victory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onSuccess) {
        onSuccess({ txnId: txn, gateway, date: new Date().toISOString() });
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#16162a] rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30">
        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-[#1e1e38] text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Secure Luxury Checkout</h3>
                  <p className="text-xs text-slate-400">256-Bit SSL Encrypted Payment</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order/Booking Summary */}
            <div className="p-5 bg-pink-50/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-pink-600 dark:text-pink-400">
                  {details?.type === 'booking' ? 'Appointment Booking' : 'Boutique Order'}
                </span>
                <h4 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100">
                  {details?.title || 'Glamour Salon Service'}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Payable Amount</span>
                <div className="text-xl font-extrabold text-pink-600 dark:text-pink-400">
                  ₹{(details?.totalAmount || 2999).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Gateway Selector Tabs */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setGateway('razorpay')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    gateway === 'razorpay'
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-amber-500" />
                  <span>Razorpay / UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('stripe')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    gateway === 'stripe'
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-indigo-500" />
                  <span>Stripe / Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    gateway === 'netbanking'
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-500" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Gateway Body simulation */}
              {gateway === 'razorpay' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <div className="inline-block p-3 rounded-xl bg-white shadow-md border border-slate-200">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=glamour@okaxis&pn=GlamourBeautyStudio"
                      alt="UPI QR Code"
                      className="w-32 h-32 mx-auto"
                    />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Scan with <span className="font-bold">GPay, PhonePe, Paytm</span> or enter your VPA:
                  </p>
                  <input
                    type="text"
                    defaultValue="user@okaxis"
                    className="w-full text-center px-4 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200"
                  />
                </div>
              )}

              {gateway === 'stripe' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        defaultValue="888"
                        className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {gateway === 'netbanking' && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((b, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-pink-50/50"
                    >
                      <input type="radio" name="bank" defaultChecked={i === 0} />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{b}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-bold text-sm shadow-xl hover:shadow-pink-500/30 active:scale-98 transition-all flex items-center justify-center gap-2 btn-3d-pink disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Authorizing Payment via {gateway.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Pay ₹{(details?.totalAmount || 2999).toLocaleString()} Securely</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Payment Success & Receipt */
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                Payment Authorized & Verified
              </span>
              <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mt-1">
                Transaction Successful!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Thank you! We have dispatched your digital receipt and SMS confirmation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-pink-600 dark:text-pink-400">
                  ₹{(details?.totalAmount || 2999).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Gateway:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{gateway}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Salon Location:</span>
                <span className="text-slate-800 dark:text-slate-200">123 Beauty St, MG Rd, Bangalore</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-xl bg-pink-600 text-white font-semibold text-xs hover:bg-pink-700 shadow-md"
              >
                Close & Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
