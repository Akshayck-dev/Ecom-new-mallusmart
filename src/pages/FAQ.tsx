import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do you select your products?",
      answer: "Our curation process is rigorous. We evaluate every potential addition based on three pillars: material integrity, artisan heritage, and timeless design utility. We personally visit our artisan partners to ensure ethical practices and superior craftsmanship."
    },
    {
      question: "What is your shipping policy?",
      answer: "We offer free standard shipping on all orders worldwide. Delivery times vary by region: typically 3-5 business days for domestic orders and 7-12 business days for international shipments. All packages are carbon-neutral and fully insured."
    },
    {
      question: "Can I return a curated item?",
      answer: "Yes, we offer an effortless 30-day return policy. If a piece doesn't perfectly complement your lifestyle, you can return it in its original condition for a full refund or exchange. We provide pre-paid return labels for your convenience."
    },
    {
      question: "How can I track my order?",
      answer: "Once your selection has been prepared and dispatched, you will receive a confirmation email with a unique tracking link. You can also monitor your order status directly through your Mallu's Mart account dashboard."
    },
    {
      question: "Do you offer wholesale opportunities?",
      answer: "We occasionally partner with boutique retailers and interior design studios who share our aesthetic values. Please reach out to our curation team via the Contact page for professional inquiries."
    }
  ];

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
      <header className="text-center mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6"
        >
          Support Center
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display-md mb-8"
        >
          How can we <span className="text-primary">assist you</span> today?
        </motion.h1>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder="Search for topics, shipping, returns..." 
            className="w-full bg-surface-container-low border-none rounded-full py-4 pl-12 pr-6 text-sm focus:ring-1 focus:ring-primary/20 shadow-sm"
          />
        </div>
      </header>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-outline-variant/10 overflow-hidden"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-surface-container-lowest transition-colors"
            >
              <span className="font-bold text-on-surface">{faq.question}</span>
              <div className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-primary" />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-8 pb-8 text-on-surface-variant text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <section className="mt-32 bg-primary-container p-12 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-on-primary-container mb-8">Our curation team is available 24/7 to assist with your inquiries.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-white px-8 py-3 rounded-md font-bold shadow-lg hover:shadow-primary/20 transition-all">
            Contact Support
          </button>
          <button className="bg-white text-primary px-8 py-3 rounded-md font-bold shadow-sm hover:bg-surface-container transition-all">
            Live Chat
          </button>
        </div>
      </section>
    </main>
  );
}
