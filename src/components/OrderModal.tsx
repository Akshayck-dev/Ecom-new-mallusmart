import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, User, Phone, MapPin, Package, AlertCircle, ShoppingBag, ChevronDown } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '919562854999';

export const OrderModal = () => {
  const { isOpen, closeOrderModal, orderType, product, initialQuantity } = useOrderStore();
  const { items, totalPrice, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        quantity: initialQuantity || 1,
      }));
      setErrors({});
      setShowSummary(false);
    }
  }, [isOpen, initialQuantity]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit number required';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (orderType === 'single' && formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate WhatsApp Message
    let itemsText = '';
    let grandTotal = 0;

    if (orderType === 'single' && product) {
      itemsText = `1. *${product.name}*\nQty: ${formData.quantity}\nPrice: ₹${(product.price * formData.quantity).toLocaleString()}\n`;
      grandTotal = product.price * formData.quantity;
    } else {
      itemsText = items.map((item, index) => 
        `${index + 1}. *${item.name}*\nQty: ${item.quantity}\nPrice: ₹${(item.price * item.quantity).toLocaleString()}`
      ).join('\n\n');
      grandTotal = totalPrice();
    }

    const message = `Hi Mallu Smart, I want to order:\n\n${itemsText}\n\n*Total Amount:* ₹${grandTotal.toLocaleString()}\n\n*Delivery Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nPlease confirm my order.`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
    toast.success('Redirecting to WhatsApp...');
    
    // Clear cart and close modal
    if (orderType === 'basket') {
      clearCart();
    }
    
    setIsProcessing(false);
    closeOrderModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const totalItems = orderType === 'single' ? formData.quantity : items.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOrderModal}
            className="fixed inset-0 bg-brand-gray/60 backdrop-blur-xl z-[200]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[210] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-brand-offwhite/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-brand-gray tracking-tight uppercase">Checkout Details</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Direct from Kerala Artisans</p>
                  </div>
                </div>
                <button
                  onClick={closeOrderModal}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-brand-green border border-gray-100 shadow-sm transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Order Summary Toggle */}
                  <div className="bg-brand-green/5 rounded-3xl border border-brand-green/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowSummary(!showSummary)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Package size={18} className="text-brand-green" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-green/60">Order Summary</p>
                          <p className="text-sm font-black text-brand-gray">{totalItems} {totalItems === 1 ? 'Item' : 'Items'} • ₹{(orderType === 'single' ? (product?.price || 0) * formData.quantity : totalPrice()).toLocaleString()}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: showSummary ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className="text-brand-green" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showSummary && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 border-t border-brand-green/5"
                        >
                          <div className="pt-4 space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                            {orderType === 'single' && product ? (
                              <div className="flex items-center gap-4">
                                <img src={product.image} className="w-12 h-12 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-black text-brand-gray uppercase truncate">{product.name}</p>
                                  <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">₹{product.price.toLocaleString()} x {formData.quantity}</p>
                                </div>
                              </div>
                            ) : (
                              items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-brand-gray uppercase truncate">{item.name}</p>
                                    <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">₹{item.price.toLocaleString()} x {item.quantity}</p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-green/60 ml-4 block">Delivery Name</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-green/40" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`input-luxury pl-14 ${errors.name ? 'border-red-500/30 bg-red-50/10' : ''}`}
                        />
                      </div>
                      {errors.name && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-6">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-green/60 ml-4 block">WhatsApp Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-green/40" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          className={`input-luxury pl-14 ${errors.phone ? 'border-red-500/30 bg-red-50/10' : ''}`}
                        />
                      </div>
                      {errors.phone && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-6">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-green/60 ml-4 block">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-6 text-brand-green/40" size={18} />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Street, Landmark, City, Pincode"
                          className={`input-luxury pl-14 pt-5 resize-none !rounded-[2rem] ${errors.address ? 'border-red-500/30 bg-red-50/5' : ''}`}
                        />
                      </div>
                      {errors.address && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-6">{errors.address}</p>}
                    </div>

                    {/* Quantity (Single Only) */}
                    {orderType === 'single' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-green/60 ml-4 block">Order Quantity</label>
                        <div className="relative">
                          <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-green/40" size={18} />
                          <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="input-luxury pl-14"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-luxury w-full py-6 flex items-center justify-center gap-3 shadow-2xl shadow-green-900/10 disabled:opacity-50"
                  >
                    <MessageCircle size={20} className={isProcessing ? 'animate-spin' : ''} />
                    <span className="text-sm">{isProcessing ? 'Processing...' : 'Confirm Order on WhatsApp'}</span>
                  </button>
                </form>
              </div>

              {/* Trust Footer */}
              <div className="p-6 bg-brand-offwhite border-t border-gray-50 flex items-center justify-center gap-2">
                <AlertCircle size={14} className="text-brand-green/30" />
                <p className="text-[9px] font-black text-brand-green/30 uppercase tracking-[0.2em] text-center">
                  Direct artisan support • 100% Secure Checkout
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
