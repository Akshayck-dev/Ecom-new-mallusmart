import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-on-background text-white pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://storage.googleapis.com/m-infra.appspot.com/v0/b/m-infra.appspot.com/o/sy2tmvbaobb3t6eqwdcyqo%2Fmallu-s-mart-logo.jpg?alt=media&token=8609516c-9457-4566-a604-0010901e9765" 
                alt="Mallu's Mart Logo" 
                className="h-24 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Elevated curation for the discerning lifestyle. We believe in quality first, always. Crafting intentional living spaces, one piece at a time.
            </p>
            <div className="flex space-x-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-white/40">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-white/60 hover:text-white transition-colors">Artisans</Link></li>
              <li><Link to="/shop" className="text-white/60 hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-white/40">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-white/60 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/faq" className="text-white/60 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-white/40">Newsletter</h4>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">Subscribe to receive curation updates and artisan stories.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-2xl w-full px-6 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all group-hover:bg-white/10"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-4 rounded-xl transition-all hover:scale-105 active:scale-95">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © 2024 Mallu's Mart. Elevated Curation.
          </p>
          <div className="flex gap-8">
            <Link to="/faq" className="text-white/40 hover:text-white text-xs transition-colors">Privacy</Link>
            <Link to="/faq" className="text-white/40 hover:text-white text-xs transition-colors">Terms</Link>
            <Link to="/faq" className="text-white/40 hover:text-white text-xs transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
    </footer>
  );
}
