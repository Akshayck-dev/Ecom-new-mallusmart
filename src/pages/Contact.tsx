import React from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Contact() {
  return (
    <main className="pt-8 pb-20 bg-brand-offwhite min-h-screen">
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Side */}
          <div className="space-y-12">
            <div>
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <img 
                  src={logo} 
                  alt="Mallu's Mart Logo" 
                  className="h-20 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter text-brand-gray"
              >
                Let's <span className="text-brand-green italic font-serif">Connect.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-lg leading-relaxed max-w-md"
              >
                Have a question about our heritage products? Reach out via the form below or email us at <span className="font-bold text-brand-green">support@mallusmart.com</span>.
              </motion.p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-brand-offwhite px-2 text-[10px] font-bold uppercase tracking-widest text-brand-green z-10 transition-colors group-focus-within:text-brand-gold">First Name</label>
                  <input 
                    type="text" 
                    placeholder="E.G. RAHUL" 
                    className="input-luxury" 
                  />
                </div>
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-brand-offwhite px-2 text-[10px] font-bold uppercase tracking-widest text-brand-green z-10 transition-colors group-focus-within:text-brand-gold">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="E.G. NAIR" 
                    className="input-luxury" 
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-brand-offwhite px-2 text-[10px] font-bold uppercase tracking-widest text-brand-green z-10 transition-colors group-focus-within:text-brand-gold">Email</label>
                <input 
                  type="email" 
                  placeholder="NAME@EMAIL.COM" 
                  className="input-luxury" 
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-brand-offwhite px-2 text-[10px] font-bold uppercase tracking-widest text-brand-green z-10 transition-colors group-focus-within:text-brand-gold">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  className="input-luxury" 
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-brand-offwhite px-2 text-[10px] font-bold uppercase tracking-widest text-brand-green z-10 transition-colors group-focus-within:text-brand-gold">Inquiry Type</label>
                <div className="relative">
                  <select className="input-luxury appearance-none bg-transparent">
                    <option>Order Inquiry</option>
                    <option>Bulk Order / Partner</option>
                    <option>Artisan Spotlight</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-green pointer-events-none" />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-brand-offwhite px-2 text-[10px] font-bold uppercase tracking-widest text-brand-green z-10 transition-colors group-focus-within:text-brand-gold">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="TELL US MORE..." 
                  className="input-luxury resize-none"
                ></textarea>
              </div>

              <button className="btn-luxury w-full group">
                SEND MESSAGE <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hidden lg:block sticky top-40"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10">
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200" 
                alt="Beauty products" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
