import React from 'react';
import { motion } from 'motion/react';
import { Send, ChevronDown } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-40 pb-20 bg-white min-h-screen">
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Side */}
          <div className="space-y-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-6 tracking-tight"
              >
                Contact us
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-on-surface-variant text-lg leading-relaxed max-w-md"
              >
                Feel free to reach out by filling out the form below, or you can email us directly at <span className="font-bold text-on-background">hello@mallusmart.com</span>. Our team is available to help with any inquiries and guide you through anything you need.
              </motion.p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant z-10">First Name</label>
                  <input 
                    type="text" 
                    placeholder="SAMANTHA" 
                    className="w-full border border-outline-variant rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-on-background transition-all placeholder:text-on-surface-variant/30" 
                  />
                </div>
                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant z-10">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="SMITH" 
                    className="w-full border border-outline-variant rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-on-background transition-all placeholder:text-on-surface-variant/30" 
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant z-10">Email</label>
                <input 
                  type="email" 
                  placeholder="SAMANTHASMITH@EMAIL.COM" 
                  className="w-full border border-outline-variant rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-on-background transition-all placeholder:text-on-surface-variant/30" 
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant z-10">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="YOUR PHONE NUMBER" 
                  className="w-full border border-outline-variant rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-on-background transition-all placeholder:text-on-surface-variant/30" 
                />
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant z-10">What are you getting in touch about?</label>
                <div className="relative">
                  <select className="w-full border border-outline-variant rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-on-background transition-all appearance-none bg-transparent">
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Brand Partnership</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
              </div>

              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant z-10">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="YOUR MESSAGE" 
                  className="w-full border border-outline-variant rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-on-background transition-all placeholder:text-on-surface-variant/30 resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-on-background text-white py-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all active:scale-[0.98] shadow-xl shadow-black/10 group">
                SEND MESSAGE <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform" />
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
