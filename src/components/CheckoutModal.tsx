import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ShoppingBag, 
  Download, 
  ArrowRight,
  Truck,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    total,
    formatPrice,
    clearCart
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'compliance' | 'complete'>('details');
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    sector: '450 Park Avenue, Fl 18, New York, NY 10022',
    email: 'eleanor.vance@studio-atelier.com',
    paymentMethod: 'card',
    complianceAccepted: true,
  });
  const [orderId, setOrderId] = useState<string>('');

  // Lock background scroll when checkout modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F2EAE0', '#B4D3D9', '#BDA6CE', '#9B8EC7']
    });
  };

  const handleSubmitOrder = () => {
    const generatedId = `ASV-ATELIER-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('complete');
    sound.playSuccess();
    triggerConfetti();
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-safe pb-safe bg-black/60 backdrop-blur-sm overflow-y-auto font-lato">
      <div className="relative w-full max-w-xl bg-[#FAF6F0] border border-[#D8CEBF] rounded-[4px] shadow-2xl overflow-hidden z-10 text-[#2A2438] my-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFFFFF] border-b border-[#E8DED1]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9B8EC7]" />
            <span className="font-bold font-lato text-base text-[#2A2438]">
              {step === 'complete' ? 'Order Confirmed' : 'Atelier Express Checkout'}
            </span>
          </div>

          {step !== 'complete' && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="text-gray-400 hover:text-[#2A2438] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Step Indicator */}
        {step !== 'complete' && (
          <div className="grid grid-cols-3 border-b border-[#E8DED1] text-center font-mono text-[11px] bg-[#FFFFFF]">
            <div className={`py-2 border-r border-[#E8DED1] ${step === 'details' ? 'bg-[#F2EAE0] text-[#625096] font-bold' : 'text-[#5D5470]'}`}>
              1. Delivery
            </div>
            <div className={`py-2 border-r border-[#E8DED1] ${step === 'payment' ? 'bg-[#F2EAE0] text-[#625096] font-bold' : 'text-[#5D5470]'}`}>
              2. Payment
            </div>
            <div className={`py-2 ${step === 'compliance' ? 'bg-[#F2EAE0] text-[#625096] font-bold' : 'text-[#5D5470]'}`}>
              3. Review & Guarantee
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#625096] uppercase tracking-wider font-bold">
                Shipping Address & Recipient
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5D5470] mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] px-3 py-2 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-mono shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5D5470] mb-1">Delivery Address</label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] px-3 py-2 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-mono shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5D5470] mb-1">Email for Courier Tracking</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] px-3 py-2 text-xs text-[#2A2438] focus:outline-none focus:border-[#9B8EC7] font-mono shadow-xs"
                />
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#E8DED1]">
                <span className="text-xs font-mono text-[#5D5470]">Total: {formatPrice(total)}</span>
                <button
                  onClick={() => setStep('payment')}
                  className="px-5 py-2.5 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-xs font-bold rounded-[3px] flex items-center gap-2 shadow-sm transition"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#625096] uppercase tracking-wider font-bold">
                Select Payment Method
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'card', label: 'Credit / Debit Card (Visa, Mastercard, Amex)', icon: CreditCard, desc: 'Secure 256-bit encrypted checkout with instant verification.' },
                  { id: 'express', label: 'Express Digital Checkout (Apple Pay / Google Pay)', icon: ShoppingBag, desc: 'One-touch checkout with your linked biometric wallet.' },
                  { id: 'cod', label: 'Complimentary Home Fitting & Courier Payment', icon: Truck, desc: 'Try on in the comfort of your home and pay upon receipt.' },
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                    className={`flex items-start gap-3 p-3.5 rounded-[3px] border cursor-pointer transition ${
                      formData.paymentMethod === m.id
                        ? 'bg-[#FFFFFF] border-[#9B8EC7] shadow-sm'
                        : 'bg-[#FFFFFF]/70 border-[#D8CEBF] hover:border-[#BDA6CE]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === m.id}
                      onChange={() => {}}
                      className="mt-1 text-[#9B8EC7]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2A2438] flex items-center gap-2">
                        <m.icon className="w-4 h-4 text-[#9B8EC7]" />
                        <span>{m.label}</span>
                      </div>
                      <p className="text-[11px] text-[#5D5470] mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#E8DED1]">
                <button
                  onClick={() => setStep('details')}
                  className="text-xs text-[#5D5470] hover:text-[#2A2438] underline font-mono"
                >
                  ← Back to Delivery
                </button>
                <button
                  onClick={() => setStep('compliance')}
                  className="px-5 py-2.5 bg-[#9B8EC7] hover:bg-[#8575b6] text-white text-xs font-bold rounded-[3px] flex items-center gap-2 shadow-sm"
                >
                  <span>Review & Guarantee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'compliance' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[3px] bg-[#FFFFFF] border border-[#D8CEBF] text-xs shadow-xs">
                <div className="flex items-center gap-2 text-[#625096] font-bold mb-2">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 text-[#9B8EC7]" />
                  <span className="font-mono">ATELIER CRAFT & QUALITY COVENANT</span>
                </div>
                <p className="text-[#5D5470] leading-relaxed text-[11px] mb-3">
                  Every garment ordered from Asimov Atelier is inspected for seam precision, tailored drape, and natural fiber purity. We include a complimentary prepaid return label for 30-day exchanges or complete refunds.
                </p>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.complianceAccepted}
                    onChange={(e) => setFormData({ ...formData, complianceAccepted: e.target.checked })}
                    className="rounded border-[#9B8EC7] text-[#9B8EC7] focus:ring-0"
                  />
                  <span className="font-mono text-xs text-[#2A2438] font-bold">
                    I agree to the atelier care terms & 30-day return policy.
                  </span>
                </label>
              </div>

              <div className="p-3 bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] text-xs font-mono space-y-1">
                <div className="flex justify-between text-[#5D5470]">
                  <span>Total Garments:</span>
                  <span className="text-[#2A2438] font-bold">{cart.reduce((s, i) => s + i.quantity, 0)} pieces</span>
                </div>
                <div className="flex justify-between text-[#5D5470]">
                  <span>Courier Service:</span>
                  <span className="text-[#625096] font-bold">Carbon-Neutral Express</span>
                </div>
                <div className="flex justify-between text-[#2A2438] font-bold pt-1 border-t border-[#E8DED1]">
                  <span>Total Amount:</span>
                  <span className="text-[#2A2438] text-sm">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#E8DED1]">
                <button
                  onClick={() => setStep('payment')}
                  className="text-xs text-[#5D5470] hover:text-[#2A2438] underline font-mono"
                >
                  ← Back to Payment
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={!formData.complianceAccepted}
                  className={`px-6 py-2.5 rounded-[3px] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition ${
                    formData.complianceAccepted
                      ? 'bg-[#9B8EC7] text-white hover:bg-[#8575b6] cursor-pointer shadow-sm'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Atelier Order</span>
                </button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#E8DED1] border border-[#9B8EC7] flex items-center justify-center text-[#625096] mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9 text-[#9B8EC7]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#2A2438] font-lato">Order Confirmed</h3>
                <p className="text-xs text-[#5D5470] font-mono mt-1">
                  Your curated wardrobe pieces are being hand-packaged at our atelier.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#D8CEBF] rounded-[3px] text-left font-mono text-xs space-y-2 shadow-xs">
                <div className="flex justify-between pb-2 border-b border-[#E8DED1]">
                  <span className="text-[#5D5470]">Order Number:</span>
                  <span className="text-[#625096] font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D5470]">Recipient:</span>
                  <span className="text-[#2A2438] font-bold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D5470]">Delivery Address:</span>
                  <span className="text-[#2A2438] truncate max-w-[200px]">{formData.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D5470]">Dispatch:</span>
                  <span className="text-[#625096] font-bold">24-Hour Carbon-Neutral Express</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8DED1] font-bold">
                  <span className="text-[#5D5470]">Total Paid:</span>
                  <span className="text-[#2A2438]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    const text = `ASIMOV ATELIER DISPATCH RECEIPT\nOrder: ${orderId}\nClient: ${formData.name}\nTotal: ${formatPrice(total)}\nReturns: 30-Day Complimentary`;
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Asimov_Atelier_Order_${orderId}.txt`;
                    a.click();
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#FFFFFF] hover:bg-[#F2EAE0] border border-[#D8CEBF] text-[#2A2438] rounded-[3px] text-xs font-mono flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4 text-[#9B8EC7]" />
                  <span>Download Invoice</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-[#9B8EC7] hover:bg-[#8575b6] text-white rounded-[3px] text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
