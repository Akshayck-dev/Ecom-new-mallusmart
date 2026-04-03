import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do you select your products?",
      answer: "Our curation process is rigorous. We evaluate every potential addition based on three pillars: quality, artisan integrity, and ethical sourcing. We personally vet our partners to ensure they meet our high standards."
    },
    {
      question: "What is your shipping policy?",
      answer: "We offer free standard shipping on all orders worldwide. Delivery times vary by region: typically 3-5 business days for domestic orders and 7-12 business days for international shipments. All packages are eco-friendly and fully insured."
    },
    {
      question: "Can I return a product?",
      answer: "Yes, we offer an effortless 30-day return policy for unused items. If a product doesn't meet your expectations, you can return it in its original condition for a full refund or exchange. We provide pre-paid return labels for your convenience."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been prepared and dispatched, you will receive a confirmation email with a unique tracking link. You can also monitor your order status directly through your Mallu's Mart account dashboard."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Absolutely. We only partner with brands that are 100% cruelty-free and do not test on animals. Many of our selections are also vegan-friendly."
    }
  ];

  return (
    <main className="pt-20 sm:pt-28 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto bg-white min-h-screen">
      <header className="text-center mb-12 sm:mb-16 space-y-5 sm:space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          <span className="text-secondary font-bold tracking-[0.5em] uppercase text-[9px] sm:text-[10px]">Concierge Support</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-primary uppercase leading-tight">
            How can we <br className="sm:hidden" /> <span className="text-secondary italic font-serif lowercase">assist you?</span>
          </h1>
        </motion.div>
        
        <div className="relative max-w-xl mx-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary" size={16} />
          <input 
            type="text" 
            placeholder="Search our knowledge base..." 
            className="w-full bg-surface border border-primary/5 rounded-xl sm:rounded-2xl py-4 sm:py-5 pl-14 sm:pl-16 pr-8 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-secondary/5 shadow-premium transition-all font-medium italic"
          />
        </div>
      </header>

      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-primary/5 overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-5 sm:px-7 sm:py-7 flex justify-between items-center text-left hover:bg-surface transition-colors group"
            >
              <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors uppercase ${openIndex === i ? 'text-secondary' : 'text-primary'}`}>{faq.question}</span>
              <div className={`transition-all duration-500 ${openIndex === i ? 'rotate-180 text-secondary' : 'text-primary'}`}>
                <ChevronDown size={18} className="sm:w-5 sm:h-5" />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 sm:px-7 sm:pb-7 text-on-surface-variant text-sm sm:text-base leading-relaxed border-t border-primary/5 pt-4 sm:pt-5 font-medium italic">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <section className="mt-16 sm:mt-24 bg-primary p-8 sm:p-14 rounded-2xl sm:rounded-[3rem] text-center shadow-premium relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-50" />
        <div className="relative z-10 space-y-5 sm:space-y-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tighter uppercase leading-tight">Still have <br className="sm:hidden" /> questions?</h3>
          <p className="text-white/60 mb-6 sm:mb-8 max-w-sm mx-auto text-sm sm:text-base font-medium italic font-serif">Our world-class curation team is available 24/7 to assist with your heritage inquiries.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-luxury px-10 py-4 bg-secondary text-white border-none hover:bg-white hover:text-primary transition-all rounded-full w-full sm:w-auto">
              Contact Support
            </button>
            <button className="btn-luxury px-10 py-4 bg-white/10 text-white border-white/20 hover:bg-white hover:text-primary transition-all rounded-full w-full sm:w-auto">
              Live Chat
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
