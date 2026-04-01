import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, ArrowRight, Sparkles, MapPin, Globe, Shield } from 'lucide-react';
import Logo from './Logo';

const WA_HELP_NUMBER = '919562854999';
const WA_HELP_URL = `https://wa.me/${WA_HELP_NUMBER}?text=Hi%2C%20I%20need%20help%20with%20my%20order%20on%20Mallu%20Smart.`;

export default function Footer() {
  return (
    <footer className="relative bg-brand-gray text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105">
              <Logo size={58} variant="invert" className="opacity-90 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-gold">Kerala HomePreneurs United</p>
              <p className="text-xs font-medium text-gray-400 leading-relaxed max-w-xs italic">
                "Curating the finest handcrafted heritage of Kerala, delivered with institutional trust and artisan pride."
              </p>
            </div>
            <div className="flex items-center gap-5">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: MessageCircle, label: 'WhatsApp', href: WA_HELP_URL }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:border-brand-green hover:text-white transition-all duration-500 hover:-translate-y-1 shadow-2xl"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Catalog Column */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-gold mb-10">Marketplace</h4>
            <ul className="space-y-5">
              {['All Treasures', 'Healthy Kitchen', 'Fashion Street', 'Natural Care', 'Kids Zone'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/shop" 
                    className="text-[10px] font-black text-gray-400 hover:text-brand-gold transition-all flex items-center gap-3 group uppercase tracking-widest"
                  >
                    <ArrowRight size={10} className="text-brand-gold/0 group-hover:text-brand-gold transition-all group-hover:translate-x-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Column */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-gold mb-10">Institutional</h4>
            <ul className="space-y-5">
              {['Our Story', 'The Artisans', 'Contact Support', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Our Story' ? '/about' : item === 'Contact Support' ? '/contact' : '/shop'} 
                    className="text-[10px] font-black text-gray-400 hover:text-brand-gold transition-all flex items-center gap-3 group uppercase tracking-widest"
                  >
                    <ArrowRight size={10} className="text-brand-gold/0 group-hover:text-brand-gold transition-all group-hover:translate-x-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artisan Support Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10 space-y-8 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={40} className="text-brand-gold" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">Direct Support</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
                  Consult with our heritage experts today for custom artisan orders.
                </p>
              </div>

              <a 
                href={WA_HELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-brand-green py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-green-900/40 hover:bg-brand-green-deep transition-all group active:scale-95"
              >
                <MessageCircle size={18} />
                Artisan Hotline
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                {[
                  { icon: Globe, label: 'Global' },
                  { icon: MapPin, label: 'Local' },
                  { icon: Shield, label: 'Trusted' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                    <item.icon size={12} className="text-brand-gold" />
                    <span className="text-[7px] font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em]">
            © 2026 Mallu Smart • Authentically Crafted in Kerala
          </p>
          <div className="flex items-center gap-8 text-[8px] font-bold uppercase tracking-widest text-gray-600">
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
