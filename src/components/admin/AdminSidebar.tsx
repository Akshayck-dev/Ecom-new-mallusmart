import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Tags, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import Logo from '../Logo';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Manage Products', path: '/admin/products', icon: ShoppingBag },
  { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
  { name: 'Categories', path: '/admin/categories', icon: Tags },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-forest text-white h-screen sticky top-0 flex flex-col shadow-2xl z-50">
      {/* Sidebar Header */}
      <div className="p-8 border-b border-white/10">
        <Logo variant="invert" size={60} className="mb-2" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-vibrant-orange mt-4">
          Admin Control Protocol
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-vibrant-orange text-white shadow-lg shadow-vibrant-orange/20' 
                : 'hover:bg-white/5 text-white/70 hover:text-white'}
            `}
          >
            <div className="flex items-center gap-4">
              <item.icon size={20} className="shrink-0" />
              <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
          </NavLink>
        ))}
      </nav>

      {/* User Session / Logout */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-vibrant-orange flex items-center justify-center font-black text-sm">
              AD
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">Admin User</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Super Admin</p>
            </div>
          </div>
          <button 
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            onClick={() => window.location.href = '/'}
          >
            <LogOut size={14} />
            Exit System
          </button>
        </div>
      </div>
    </aside>
  );
}
