import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Bell, Search, User } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-surface-container-low selection:bg-vibrant-orange/10 selection:text-vibrant-orange">
      {/* Sidebar - Desktop Only for now */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-forest/5 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-white/90">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-forest">System Overview</h2>
            <div className="h-4 w-px bg-forest/10" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-forest/5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-vibrant-orange animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest/60">Live Analytics</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Quick Search */}
            <div className="relative group hidden sm:block">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/30 group-focus-within:text-vibrant-orange transition-colors" />
              <input 
                type="text" 
                placeholder="PROXIMITY SEARCH..." 
                className="bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-xl pl-12 pr-6 py-2.5 text-[10px] uppercase font-bold tracking-widest focus:outline-none transition-all w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-10 h-10 flex items-center justify-center text-forest/40 hover:text-vibrant-orange transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-vibrant-orange rounded-full border-2 border-white" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-forest/10 cursor-pointer group">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-forest">Administrator</p>
                <p className="text-[9px] font-bold text-forest/40 uppercase tracking-tighter">Manage Account</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                 <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
