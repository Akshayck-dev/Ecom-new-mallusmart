import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

export default function AdminDashboard() {
  const { products } = useProductStore();
  
  const stats = [
    { name: 'Total Revenue', value: '₹45,231.00', change: '+12.5%', icon: DollarSign, trend: 'up' },
    { name: 'Active SKU', value: products.length.toString(), change: '+8.2%', icon: ShoppingCart, trend: 'up' },
    { name: 'Total Customers', value: '2,420', change: '+14.6%', icon: Users, trend: 'up' },
    { name: 'Avg. Order Growth', value: '18.4%', change: '-2.1%', icon: TrendingUp, trend: 'down' },
  ];
  return (
    <div className="space-y-10 selection:bg-vibrant-orange/10 selection:text-vibrant-orange">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-forest">Dashboard Overview</h1>
          <p className="text-xs font-bold text-forest/40 uppercase tracking-[0.2em] mt-2">Welcome back to the Mallu's Mart control center.</p>
        </div>
        <button className="px-6 py-3 bg-vibrant-orange text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-vibrant-orange/20 transition-all active:scale-95">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-2xl border border-forest/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black tracking-widest ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-forest/40 mb-1">{stat.name}</p>
            <h3 className="text-2xl font-black text-forest tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Sections - Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-forest/5 p-8 h-[400px] flex items-center justify-center">
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/20">Analytical Heatmap Loading...</p>
           </div>
        </div>
        <div className="bg-white rounded-2xl border border-forest/5 p-8 h-[400px] flex items-center justify-center">
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/20">Recent Activity Protocol...</p>
           </div>
        </div>
      </div>
    </div>
  );
}
