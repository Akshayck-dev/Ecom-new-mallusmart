import React from 'react';
import { 
  Tags, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  ArrowRight,
  ShoppingBag,
  Zap,
  Gift,
  ChefHat,
  Sparkles,
  Baby,
  Truck,
  Box
} from 'lucide-react';

const CATEGORY_STATS = [
  { name: 'Fashion Street', icon: ShoppingBag, count: 245, growth: '+12%', color: 'bg-blue-50 text-blue-600' },
  { name: 'Healthy Kitchen', icon: ChefHat, count: 182, growth: '+8%', color: 'bg-orange-50 text-orange-600' },
  { name: 'Natural Care Zone', icon: Sparkles, count: 124, growth: '+15%', color: 'bg-green-50 text-green-600' },
  { name: 'Gift Corner', icon: Gift, count: 96, growth: '+5%', color: 'bg-purple-50 text-purple-600' },
  { name: 'Kids Zone', icon: Baby, count: 68, growth: '+20%', color: 'bg-pink-50 text-pink-600' },
  { name: 'Service Zone', icon: Zap, count: 42, growth: '+2%', color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Pack Corner', icon: Box, count: 54, growth: '+10%', color: 'bg-slate-50 text-slate-600' },
];

export default function AdminCategories() {
  return (
    <div className="space-y-10 selection:bg-vibrant-orange/10 selection:text-vibrant-orange">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-forest font-headline">Heritage Zones</h1>
          <p className="text-xs font-bold text-forest/40 uppercase tracking-[0.2em] mt-2">Taxonomy Management & Collection Protocol</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-forest text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-forest/20 transition-all active:scale-95 group">
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Register New Zone
        </button>
      </div>

      {/* Analytics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-forest/5 shadow-sm">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-vibrant-orange/5 flex items-center justify-center text-vibrant-orange border border-vibrant-orange/10">
                 <Tags size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-forest/40">Total Active Zones</p>
           </div>
           <h3 className="text-3xl font-black text-forest tracking-tight">07</h3>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-forest/5 shadow-sm">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest border border-forest/10">
                 <ShoppingBag size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-forest/40">Global Product Clusters</p>
           </div>
           <h3 className="text-3xl font-black text-forest tracking-tight">811</h3>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-forest/5 shadow-sm">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-vibrant-orange/5 flex items-center justify-center text-vibrant-orange border border-vibrant-orange/10">
                 <ArrowRight size={20} className="rotate-[-45deg]" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-forest/40">Revenue Conversion Rate</p>
           </div>
           <h3 className="text-3xl font-black text-forest tracking-tight">18.4%</h3>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-2xl border border-forest/5 flex items-center justify-between gap-6">
         <div className="relative group max-w-md w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/20 group-focus-within:text-vibrant-orange transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH COLLECTION ARCHETYPE..." 
              className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-xl pl-12 pr-6 py-4 text-[10px] uppercase font-black tracking-widest focus:outline-none transition-all placeholder:text-forest/20"
            />
         </div>
         <div className="flex items-center gap-4 px-6 text-[10px] font-black uppercase tracking-widest text-forest/30 border-l border-forest/5">
            Operational Protocol v1.4
         </div>
      </div>

      {/* Category Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORY_STATS.map((category) => (
          <div key={category.name} className="bg-white rounded-3xl border border-forest/5 p-8 hover:shadow-xl hover:shadow-forest/5 transition-all group flex flex-col h-full overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity translate-x-12 -translate-y-12`}>
               <category.icon className="w-full h-full" />
            </div>

            <div className="flex items-center justify-between mb-8">
               <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center shadow-inner`}>
                  <category.icon size={28} />
               </div>
               <button className="w-10 h-10 flex items-center justify-center text-forest/20 hover:text-forest hover:bg-forest/5 rounded-xl transition-all">
                  <MoreVertical size={20} />
               </button>
            </div>

            <h3 className="text-lg font-black uppercase tracking-widest text-forest mb-2">{category.name}</h3>
            <p className="text-[10px] font-bold text-forest/40 uppercase tracking-[0.2em] mb-8">Heritage Segment</p>

            <div className="mt-auto space-y-4 pt-6 border-t border-forest/5">
               <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-forest/40">Stock Items</p>
                  <p className="text-sm font-black text-forest">{category.count}</p>
               </div>
               <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-forest/40">Growth Rate</p>
                  <p className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">{category.growth}</p>
               </div>
               <button className="w-full py-4 bg-forest/5 group-hover:bg-vibrant-orange group-hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 mt-4 text-forest/40">
                  Manage Collection
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        ))}

        {/* Add New Card Action */}
        <div className="border-2 border-dashed border-forest/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-vibrant-orange/40 transition-all hover:bg-vibrant-orange/[0.01]">
           <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center text-forest/20 group-hover:scale-110 group-hover:bg-vibrant-orange/10 group-hover:text-vibrant-orange transition-all mb-4">
              <Plus size={32} />
           </div>
           <h3 className="text-sm font-black uppercase tracking-widest text-forest/20 group-hover:text-vibrant-orange transition-colors">Expand Heritage</h3>
           <p className="text-[9px] font-bold text-forest/10 uppercase tracking-widest mt-1">Register New Taxonomy Zone</p>
        </div>
      </div>
    </div>
  );
}
