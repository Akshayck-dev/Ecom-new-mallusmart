import React from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import Logo from '../components/Logo';

export default function Contact() {
  return (
    <main className="pt-16 sm:pt-24 pb-16 bg-white min-h-screen">
      <section className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Form Side */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-6 sm:space-y-8">
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <Logo size="48px" />
              </motion.div>
              <div className="space-y-4 sm:space-y-5">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-primary"
                >
                  Let's <span className="text-secondary italic font-serif">Connect.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-md font-medium"
                >
                  Have a question about our heritage products? Reach out via the form below or email us at <span className="font-bold text-secondary">support@mallusmart.com</span>.
                </motion.p>
              </div>
            </div>

            <form className="space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-secondary z-10 transition-colors group-focus-within:text-primary">First Name</label>
                  <input 
                    type="text" 
                    placeholder="E.G. RAHUL" 
                    className="input-luxury" 
                  />
                </div>
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-secondary z-10 transition-colors group-focus-within:text-primary">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="E.G. NAIR" 
                    className="input-luxury" 
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-secondary z-10 transition-colors group-focus-within:text-primary">Email</label>
                <input 
                  type="email" 
                  placeholder="NAME@EMAIL.COM" 
                  className="input-luxury" 
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-secondary z-10 transition-colors group-focus-within:text-primary">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  className="input-luxury" 
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-secondary z-10 transition-colors group-focus-within:text-primary">Inquiry Type</label>
                <div className="relative">
                  <select className="input-luxury appearance-none bg-transparent">
                    <option>Order Inquiry</option>
                    <option>Bulk Order / Partner</option>
                    <option>Artisan Spotlight</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-secondary z-10 transition-colors group-focus-within:text-primary">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="TELL US MORE..." 
                  className="input-luxury resize-none"
                ></textarea>
              </div>

              <button className="btn-luxury w-full group flex items-center justify-center gap-4">
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
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-premium border border-primary/5">
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
