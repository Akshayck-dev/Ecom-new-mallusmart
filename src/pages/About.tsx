import React from 'react';
import { Heart, Globe, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

export default function About() {
  return (
    <main className="pt-16 sm:pt-24 pb-16 bg-white min-h-screen">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto mb-20 sm:mb-24">
        <div className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <Logo size="64px" />
          </motion.div>
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px]"
            >
              The Mallu's Mart Story
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-primary"
            >
              Artisanship as a <span className="italic font-serif text-secondary">Fine Art.</span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-base sm:text-lg leading-relaxed font-medium"
          >
            Mallu's Mart was born from a simple observation: in a world of infinite choice, the most valuable thing we can offer is a deliberate selection. We don't just sell products; we curate experiences that honor quality and artisan integrity.
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-spacing bg-surface-container-low px-4 sm:px-6 lg:px-8 border-y border-primary/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-square bg-white rounded-3xl p-10 sm:p-14 flex items-center justify-center shadow-premium border border-primary/5">
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Logo size="80px" />
            </motion.div>
          </div>
          <div className="space-y-8 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-primary">Our Philosophy</h2>
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  icon: <Heart size={22} />,
                  title: "Artisan Heritage",
                  desc: "Every item is sourced directly from homepreneurs who preserve ancient traditions in every creation."
                },
                {
                  icon: <Globe size={22} />,
                  title: "Direct Connection",
                  desc: "Our model empowers local creators by removing standard retail hurdles, ensuring fair value for both artisan and customer."
                },
                {
                  icon: <Award size={22} />,
                  title: "Institutional Quality",
                  desc: "Quality is our standard. We personally verify the origin and craftsmanship of every single piece in our collection."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 sm:gap-8 group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-premium flex-shrink-0 border border-primary/5 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-primary">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Artisan Network */}
      <section className="section-spacing px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter mb-4 sm:mb-6">The Artisan Network</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-sm sm:text-lg">
            We are proud to support over 150 independent creators and small-scale manufacturers who share our vision for a more thoughtful world.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { value: "150+", label: "Creators Supported" },
            { value: "24", label: "Regions Reached" },
            { value: "10k+", label: "Authentic Deliveries" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 sm:p-10 rounded-2xl sm:rounded-3xl text-center shadow-premium border border-primary/5 hover:border-secondary/20 transition-all duration-500 group">
              <div className="text-5xl sm:text-6xl font-bold text-primary mb-3 sm:mb-4 tracking-tighter group-hover:text-secondary transition-colors">{stat.value}</div>
              <p className="font-bold text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
