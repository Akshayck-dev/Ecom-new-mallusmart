import React from 'react';
import { Heart, Globe, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

export default function About() {
  return (
    <main className="pt-8 pb-20 bg-brand-offwhite min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-10"
          >
            <Logo size="80px" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-green font-bold tracking-[0.3em] uppercase text-[10px] mb-6"
          >
            The Mallu Smart Story
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-lg mb-8 text-brand-gray"
          >
            Artisanship as a <span className="italic font-serif text-brand-gold">Fine Art.</span>
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
      <section className="section-spacing bg-white px-6 md:px-12 border-y border-brand-green-100/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white p-12">
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Logo size="64px" />
            </motion.div>
          </div>
          <div className="space-y-10">
            <h2 className="text-display-md text-brand-gray">Our Philosophy</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-green shadow-premium flex-shrink-0 border border-brand-green-100/20">
                  <Heart size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-gray mb-2">Kerala Heritage</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Every item is sourced directly from homepreneurs who preserve the ancient traditions of Kerala in every creation.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-green shadow-premium flex-shrink-0 border border-brand-green-100/20">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-gray mb-2">Zero Middlemen</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Our model empowers local creators by removing standard retail hurdles, ensuring fair value for both artisan and customer.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-green shadow-premium flex-shrink-0 border border-brand-green-100/20">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-gray mb-2">Institutional Quality</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Quality is our standard. We personally verify the origin and craftsmanship of every single piece in our collection.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-12 rounded-[2.5rem] text-center shadow-premium border border-brand-green-100/10">
            <div className="text-5xl font-bold text-brand-green mb-4 tracking-tighter">150+</div>
            <p className="font-bold text-[10px] text-brand-gold uppercase tracking-[0.2em]">Homepreneurs Supported</p>
          </div>
          <div className="bg-white p-12 rounded-[2.5rem] text-center shadow-premium border border-brand-green-100/10">
            <div className="text-5xl font-bold text-brand-green mb-4 tracking-tighter">24</div>
            <p className="font-bold text-[10px] text-brand-gold uppercase tracking-[0.2em]">Districts Reached</p>
          </div>
          <div className="bg-white p-12 rounded-[2.5rem] text-center shadow-premium border border-brand-green-100/10">
            <div className="text-5xl font-bold text-brand-green mb-4 tracking-tighter">10k+</div>
            <p className="font-bold text-[10px] text-brand-gold uppercase tracking-[0.2em]">Authentic Deliveries</p>
          </div>
        </div>
      </section>
    </main>
  );
}
