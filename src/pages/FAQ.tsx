import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <main className="pt-8 pb-20 px-6 md:px-12 max-w-4xl mx-auto bg-brand-offwhite min-h-screen">
      <header className="text-center mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand-green font-bold tracking-[0.3em] uppercase text-[10px] mb-6"
        >
          Concierge Support
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-brand-gray"
        >
          How can we <span className="text-brand-green italic font-serif">assist you?</span>
        </motion.h1>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-green/40" size={18} />
          <input 
            type="text" 
            placeholder="Search our heritage knowledge base..." 
            className="w-full bg-white border border-brand-green-100/20 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-brand-green/5 shadow-premium transition-all"
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
              className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-brand-offwhite transition-colors group"
            >
              <span className={`font-bold transition-colors ${openIndex === i ? 'text-brand-green' : 'text-brand-gray'}`}>{faq.question}</span>
              <div className={`transition-all duration-300 ${openIndex === i ? 'rotate-180 text-brand-gold' : 'text-brand-green'}`}>
                <ChevronDown size={20} />
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
                  <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed border-t border-brand-green-100/10 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <section className="mt-32 bg-brand-green-deep p-12 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/30" />
        <h3 className="text-2xl font-bold mb-4 text-white">Still have questions?</h3>
        <p className="text-white/60 mb-10 max-w-md mx-auto text-sm">Our world-class curation team is available 24/7 to assist with your heritage inquiries.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-brand-green text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-brand-green-light hover:-translate-y-1 transition-all uppercase text-[10px] tracking-widest">
            Contact Support
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all uppercase text-[10px] tracking-widest">
            Live Chat
          </button>
        </div>
      </section>
    </main>
  );
}
