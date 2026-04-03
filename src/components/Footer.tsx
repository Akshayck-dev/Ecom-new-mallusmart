import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Globe, 
  Shield,
  Send
} from 'lucide-react';
import Logo from './Logo';

const WA_HELP_NUMBER = '919562854999';
const WA_HELP_URL = `https://wa.me/${WA_HELP_NUMBER}?text=Hi%2C%20I%20need%20help%20with%20my%20order%20on%20Mallu's%20Mart!`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-container pt-12 sm:pt-16 pb-6 overflow-hidden font-sans border-t border-surface-container-high">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-10 mb-12 sm:mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105">
              <Logo size={40} className="opacity-90 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Kerala Heritage United</p>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed max-w-xs">
                Empowering Kerala’s homepreneurs by bringing authentic, handmade treasures directly to your home. Curated with care, delivered with trust.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: MessageCircle, label: 'WhatsApp', href: WA_HELP_URL }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-surface border border-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-sm hover:shadow-lg"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid - Rearranged for Mobile */}
          <div className="grid grid-cols-2 lg:contents gap-10 sm:gap-12 lg:gap-10">
            {/* Quick Links */}
            <div className="sm:pt-1">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 sm:mb-6 text-primary">Discover</h4>
              <ul className="grid grid-cols-1 gap-3">
                {['New Arrivals', 'Best Sellers', 'Artisan Stories', 'Heritage Collection'].map((item) => (
                  <li key={item}>
                    <Link 
                      to="/shop" 
                      className="text-[11px] font-bold text-on-surface-variant hover:text-secondary transition-all flex items-center gap-2 group uppercase tracking-widest text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform flex-shrink-0" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutional */}
            <div className="sm:pt-1">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4 sm:mb-6 text-primary">Community</h4>
              <ul className="grid grid-cols-1 gap-3">
                {['Our Philosophy', 'Shipping Policy', 'Returns', 'Privacy Protocol'].map((item) => (
                  <li key={item}>
                    <Link 
                      to="/shop" 
                      className="text-[11px] font-bold text-on-surface-variant hover:text-secondary transition-all flex items-center gap-2 group uppercase tracking-widest text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform flex-shrink-0" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Artisan Support Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl p-6 border border-surface-container-high space-y-5 sm:space-y-6 relative overflow-hidden group shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative z-10 space-y-1.5">
                <h3 className="text-base font-bold text-primary uppercase tracking-tight">Direct Support</h3>
                <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest leading-loose">
                  Consult with heritage experts for custom orders.
                </p>
              </div>

              <a 
                href={WA_HELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-primary py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:opacity-90 active:scale-95 transition-all shadow-sm"
              >
                <MessageCircle size={16} />
                Artisan Hotline
                <ArrowRight size={12} />
              </a>

              <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
                {[
                  { icon: Globe, label: 'Global' },
                  { icon: MapPin, label: 'Local' },
                  { icon: Shield, label: 'Trusted' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                    <item.icon size={11} className="text-secondary" />
                    <span className="text-[7px] font-bold uppercase tracking-widest text-primary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-[0.4em] text-center sm:text-left">
            © {currentYear} Mallu's Mart • Authentic Heritage Retail
          </p>
          <div className="flex items-center gap-6 sm:gap-8 text-[8px] font-bold uppercase tracking-widest text-on-surface-variant/40">
            <span className="hover:text-secondary transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-secondary transition-colors cursor-pointer">Privacy</span>
            <Link to="/admin" className="hover:text-secondary transition-colors cursor-pointer">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
