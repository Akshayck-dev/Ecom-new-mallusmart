import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';

export default function Home() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 z-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6"
            >
              Summer Collection 2024
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-lg mb-8"
            >
              The Art of <br />
              <span className="bg-gradient-to-r from-primary to-primary-dim bg-clip-text text-transparent">Intentional Living</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              <Link to="/shop" className="bg-primary text-white px-8 py-4 rounded-md font-bold hover:shadow-lg transition-all active:scale-95">
                Explore Now
              </Link>
              <Link to="/about" className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-md font-bold hover:bg-white transition-all active:scale-95">
                Lookbook
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="md:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" 
              alt="Interior design" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Curated Verticals */}
      <section className="section-spacing bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-md mb-12">Curated Verticals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-white shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-bold text-center group-hover:text-primary transition-colors">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-display-md">New Arrivals</h2>
            <p className="text-on-surface-variant mt-2">Hand-picked pieces to complement your selection.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center gap-2 group">
            View Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.slice(4, 7).map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-surface-container-low relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Premium Product
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{product.description}</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-primary text-white py-3 rounded-md text-sm font-bold active:scale-95 transition-all">Explore Now</button>
                <button className="flex-1 bg-surface-container-highest text-on-surface py-3 rounded-md text-sm font-bold active:scale-95 transition-all">Lookbook</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hall of Classics */}
      <section className="section-spacing bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-md mb-12">Hall of Classics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-bold mb-1">{product.name}</h3>
                <p className="text-primary font-bold mb-6">${product.price.toFixed(2)}</p>
                <button className="w-full bg-primary text-white py-3 rounded-md text-sm font-bold active:scale-95 transition-all">Explore Now</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-6">
              <Star size={24} />
            </div>
            <h3 className="font-bold mb-2">Local Sellers</h3>
            <p className="text-on-surface-variant text-sm">Supporting artisan communities across the globe.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-6">
              <Shield size={24} />
            </div>
            <h3 className="font-bold mb-2">Handmade Quality</h3>
            <p className="text-on-surface-variant text-sm">Every piece is verified for superior craftsmanship.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-6">
              <Truck size={24} />
            </div>
            <h3 className="font-bold mb-2">Fast Delivery</h3>
            <p className="text-on-surface-variant text-sm">Carbon-neutral shipping to over 45 countries.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
