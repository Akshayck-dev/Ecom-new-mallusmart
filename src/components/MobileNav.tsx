import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function MobileNav() {
  const location = useLocation();
  const cartItemsCount = useCartStore((state) => state.totalItems());
  const openCartDrawer = useCartStore((state) => state.openDrawer);
  const wishlistItemsCount = useWishlistStore((state) => state.items.length);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistItemsCount },
    { name: 'Cart', type: 'button', icon: ShoppingCart, badge: cartItemsCount, onClick: openCartDrawer },
    { name: 'Account', path: '/admin', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] md:hidden bg-white/80 backdrop-blur-xl border-t border-slate-100 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const active = item.path ? isActive(item.path) : false;
          
          const Content = (
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] relative ${
                active ? 'text-vibrant-orange' : 'text-slate-400'
              }`}
            >
              <div className="relative">
                <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-vibrant-orange text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in duration-300">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                active ? 'text-vibrant-orange' : 'text-slate-400'
              }`}>
                {item.name}
              </span>
              
              {active && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -top-2 w-1 h-1 bg-vibrant-orange rounded-full shadow-[0_0_8px_rgb(255,107,0,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.div>
          );

          if (item.type === 'button') {
            return (
              <button 
                key={item.name} 
                onClick={item.onClick}
                className="outline-none focus:outline-none"
              >
                {Content}
              </button>
            );
          }

          return (
            <Link key={item.name} to={item.path!}>
              {Content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
