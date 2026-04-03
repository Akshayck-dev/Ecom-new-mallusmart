import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  MoreHorizontal,
  Printer,
  ChevronRight
} from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD-8291', date: '2026-04-03 14:22', customer: 'Arun Kumar', email: 'arun.k@example.com', total: 4250, status: 'Processing' },
  { id: 'ORD-8290', date: '2026-04-03 09:15', customer: 'Meera Nair', email: 'meera.nair@example.com', total: 1280, status: 'Shipped' },
  { id: 'ORD-8289', date: '2026-04-02 18:40', customer: 'Rahul Das', email: 'rahul.das@example.com', total: 6400, status: 'Delivered' },
  { id: 'ORD-8288', date: '2026-04-02 16:12', customer: 'Anjali Menon', email: 'anjali@example.com', total: 2950, status: 'Pending' },
  { id: 'ORD-8287', date: '2026-04-02 11:30', customer: 'Suresh V', email: 'suresh.v@example.com', total: 850, status: 'Processing' },
];

const statusStyles = {
  Pending: 'bg-orange-100 text-orange-700 border-orange-200',
  Processing: 'bg-blue-100 text-blue-700 border-blue-200',
  Shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  Delivered: 'bg-green-100 text-green-700 border-green-200',
};

const statusIcons = {
  Pending: Clock,
  Processing: ExternalLink,
  Shipped: Truck,
  Delivered: CheckCircle,
};

export default function AdminOrders() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="space-y-10 selection:bg-vibrant-orange/10 selection:text-vibrant-orange">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-forest font-headline">Order Management</h1>
          <p className="text-xs font-bold text-forest/40 uppercase tracking-[0.2em] mt-2">Logistics Protocol & Revenue Tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-forest/10 text-forest/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-forest/5 transition-all">
            <Printer size={16} />
            Export Protocol
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-forest/5 rounded-2xl w-fit">
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeFilter === filter 
                ? 'bg-white text-forest shadow-md' 
                : 'text-forest/40 hover:text-forest'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="bg-white rounded-3xl border border-forest/5 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-8 border-b border-forest/5 flex flex-wrap items-center justify-between gap-6">
          <div className="relative group max-w-md w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/20 group-focus-within:text-vibrant-orange transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH BY ORDER ID OR CUSTOMER..." 
              className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-xl pl-12 pr-6 py-4 text-[10px] uppercase font-black tracking-widest focus:outline-none transition-all placeholder:text-forest/20"
            />
          </div>
          <div className="flex items-center gap-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-forest/30">Displaying {MOCK_ORDERS.length} Active Records</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-forest/[0.02]">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Order Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Temporal Data</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Artisan Client</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Financial total</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40 text-center">Logistic State</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {MOCK_ORDERS.map((order) => {
                const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                return (
                  <tr key={order.id} className="hover:bg-forest/[0.01] transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-forest font-mono">{order.id}</p>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[10px] font-black uppercase tracking-widest text-forest/40">{order.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest/5 flex items-center justify-center text-forest font-black text-[10px]">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-forest">{order.customer}</p>
                          <p className="text-[9px] font-bold text-forest/30 uppercase tracking-tighter">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-sm font-black text-vibrant-orange">₹{order.total.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex justify-center">
                         <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${statusStyles[order.status as keyof typeof statusStyles]}`}>
                            <StatusIcon size={12} />
                            {order.status}
                         </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-10 h-10 flex items-center justify-center bg-forest/5 text-forest/60 hover:bg-forest hover:text-white rounded-xl transition-all">
                          <Eye size={16} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-forest/5 text-forest/60 hover:bg-vibrant-orange hover:text-white rounded-xl transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 border-t border-forest/5 flex items-center justify-between">
           <p className="text-[10px] font-bold text-forest/30 uppercase tracking-widest italic">Encrypted Secure Database Access</p>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-forest/20 cursor-not-allowed">Previous Chunk</button>
              <div className="h-4 w-px bg-forest/10 mx-2" />
              <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-forest hover:text-vibrant-orange flex items-center gap-2 transition-colors">
                Next Chunk
                <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
