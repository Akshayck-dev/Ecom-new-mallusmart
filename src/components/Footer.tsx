import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.png';

const WA_NUMBER = '919400000000';
const WA_HELP_URL = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%20need%20help%20with%20my%20order%20on%20Mallu%27s%20Mart.`;
const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-on-background text-white pt-14 pb-8 relative overflow-hidden">

      {/* Subtle top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-10"
        style={{ background: 'linear-gradient(90deg, transparent, #25D366, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10">

          {/* Brand column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logo}
                alt="Mallu Smart Logo"
                className="h-10 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity"
                style={{ filter: 'invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.25))' }}
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-bold text-white leading-none">Mallu Smart</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.25em] mt-0.5">Kerala Homepreneurs United</p>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Authentic handmade products from Kerala's best homepreneurs — delivered with trust.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
              <a
                href={WA_HELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
              >
                {WA_ICON}
              </a>
            </div>
          </div>

          {/* Company links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-[10px] tracking-[0.25em] uppercase mb-5 text-white/35">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/55 text-sm hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/55 text-sm hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-[10px] tracking-[0.25em] uppercase mb-5 text-white/35">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-white/55 text-sm hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/55 text-sm hover:text-white transition-colors duration-200">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp quick contact */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-[10px] tracking-[0.25em] uppercase mb-5 text-white/35">
              Quick Help
            </h4>
            <a
              href={WA_HELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-3 group"
            >
              <span className="mt-0.5 shrink-0 text-[#25D366] group-hover:scale-110 transition-transform duration-200">
                {WA_ICON}
              </span>
              <span className="text-white/55 text-sm leading-snug group-hover:text-white transition-colors duration-200">
                Need help? Chat with us on WhatsApp
              </span>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2026 Mallu Smart. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/faq" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/faq" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
