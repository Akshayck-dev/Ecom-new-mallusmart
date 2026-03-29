import React from 'react';
import { motion } from 'motion/react';
import { Heart, Globe, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center max-w-3xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-lg mb-8"
          >
            Beauty as a <span className="italic font-serif">Fine Art.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-lg leading-relaxed"
          >
            Mallu's Mart was born from a simple observation: in a world of infinite choice, the most valuable thing we can offer is a deliberate selection. We don't just sell products; we curate experiences that honor quality and artisan integrity.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-spacing bg-surface-container-low px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200" 
              alt="Our beauty studio" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-display-md">Our Philosophy</h2>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Clean Ingredients</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Every item in our collection is chosen with purpose. We look for formulations that are safe, effective, and kind to your skin.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Ethical Sourcing</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">We partner with labs and artisans who share our commitment to sustainability and ethical practices.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Uncompromising Quality</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Quality isn't a luxury; it's a standard. We verify every material and every stitch before it reaches your hands.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Artisan Network */}
      <section className="section-spacing px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-display-md mb-6">The Artisan Network</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            We are proud to support over 150 independent creators and small-scale manufacturers who share our vision for a more thoughtful world.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-surface-container-low p-10 rounded-2xl text-center">
            <div className="text-4xl font-black text-primary mb-4">150+</div>
            <p className="font-bold text-sm uppercase tracking-widest">Artisans Supported</p>
          </div>
          <div className="bg-surface-container-low p-10 rounded-2xl text-center">
            <div className="text-4xl font-black text-primary mb-4">24</div>
            <p className="font-bold text-sm uppercase tracking-widest">Countries Reached</p>
          </div>
          <div className="bg-surface-container-low p-10 rounded-2xl text-center">
            <div className="text-4xl font-black text-primary mb-4">10k+</div>
            <p className="font-bold text-sm uppercase tracking-widest">Curated Deliveries</p>
          </div>
        </div>
      </section>
    </main>
  );
}
