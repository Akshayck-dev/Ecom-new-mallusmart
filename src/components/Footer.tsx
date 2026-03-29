import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link to="/" className="text-xl font-bold text-on-background">Mallu's Mart</Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Elevated curation for the discerning lifestyle. Quality first, always. Crafting lifestyles, one piece at a time.
            </p>
            <div className="flex space-x-4">
              <Instagram size={18} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <Twitter size={18} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
              <Facebook size={18} className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-on-background text-sm tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-on-surface-variant hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Artisans</Link></li>
              <li><Link to="/shop" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-on-background text-sm tracking-widest uppercase mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Shipping Info</Link></li>
              <li><Link to="/faq" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-on-surface-variant hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-on-background text-sm tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-on-surface-variant text-sm mb-6">Subscribe to receive curation updates and artisan stories.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white border-none rounded-l-md w-full px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20"
              />
              <button className="bg-on-background text-white px-4 py-3 rounded-r-md transition-colors hover:bg-primary">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-outline-variant/10 text-center">
          <p className="text-on-surface-variant text-xs">
            © 2024 Mallu's Mart. Elevated Curation.
          </p>
        </div>
      </div>
    </footer>
  );
}
