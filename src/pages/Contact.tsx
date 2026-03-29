import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-32 pb-20">
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6"
            >
              Get in Touch
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-md mb-8"
            >
              Connect with <span className="text-primary">The Curators.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-lg leading-relaxed mb-12"
            >
              Whether you have a question about a specific piece, need assistance with an order, or simply want to share your thoughts on our curation, we're here to listen.
            </motion.p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Direct Inquiries</h3>
                  <p className="text-on-surface-variant text-sm">hello@mallusmart.com</p>
                  <p className="text-on-surface-variant text-sm">support@mallusmart.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Voice Support</h3>
                  <p className="text-on-surface-variant text-sm">+91 98765 43210</p>
                  <p className="text-on-surface-variant text-sm">Mon - Fri, 9am - 6pm IST</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Visit Our Studio</h3>
                  <p className="text-on-surface-variant text-sm">123 Artisan Way, Fort Kochi</p>
                  <p className="text-on-surface-variant text-sm">Kerala, India 682001</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <MessageCircle size={20} className="text-primary" />
                Instant Assistance
              </h3>
              <p className="text-on-surface-variant text-sm mb-6">Connect with a curator instantly via WhatsApp for personalized recommendations or order updates.</p>
              <button className="bg-primary text-white px-8 py-3 rounded-md font-bold shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl shadow-on-background/5 border border-outline-variant/10"
          >
            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 text-sm focus:ring-1 focus:ring-primary/20" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 text-sm focus:ring-1 focus:ring-primary/20" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Subject</label>
                <select className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 text-sm focus:ring-1 focus:ring-primary/20 appearance-none">
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Artisan Partnership</option>
                  <option>Press & Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Your Message</label>
                <textarea rows={5} placeholder="How can we help you?" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 text-sm focus:ring-1 focus:ring-primary/20 resize-none"></textarea>
              </div>
              <button className="w-full bg-on-background text-white py-5 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all active:scale-[0.98] shadow-lg">
                <Send size={18} /> Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] bg-surface-container-highest relative overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1920" 
            alt="Map background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <p className="font-bold">Mallu's Mart Studio</p>
              <p className="text-xs text-on-surface-variant">Fort Kochi, Kerala</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
