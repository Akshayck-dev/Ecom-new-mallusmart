import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { toast } from 'sonner';

const CATEGORIES = [
  'Fashion Street',
  'Healthy Kitchen',
  'Natural Care Zone',
  'Gift Corner',
  'Kids Zone',
  'Service Zone',
  'Pack Corner'
];

export default function AdminProducts() {
  const { products, addProduct, deleteProduct } = useProductStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    maker: '',
    gallery: [] as string[]
  });
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error('All essential metrics must be transmitted.');
      return;
    }

    addProduct({
      id: `p${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      parentCategory: newProduct.category,
      price: Number(newProduct.price),
      description: newProduct.description,
      image: newProduct.image || newProduct.gallery[0] || 'https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000',
      gallery: newProduct.gallery,
      maker: newProduct.maker,
      stock: Number(newProduct.stock) || 0,
      status: 'Active'
    } as any);

    toast.success(`${newProduct.name.toUpperCase()} committed to heritage catalog.`);
    setShowAddForm(false);
    setNewProduct({ name: '', category: '', price: '', stock: '', description: '', image: '', maker: '', gallery: [] });
    setCurrentImageUrl('');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`PROTOCOL: Permanently erase ${name.toUpperCase()}?`)) {
      deleteProduct(id);
      toast.success('Asset purged from archive.');
    }
  };

  return (
    <div className="space-y-10 selection:bg-vibrant-orange/10 selection:text-vibrant-orange">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-forest font-headline">Manage Products</h1>
          <p className="text-xs font-bold text-forest/40 uppercase tracking-[0.2em] mt-2">Inventory Protocol & Catalog Management</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-3 px-8 py-4 bg-vibrant-orange text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-vibrant-orange/20 transition-all active:scale-95 group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Add New Product
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-forest/5 p-6 rounded-2xl border border-forest/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-forest/40 mb-1">Total SKU</p>
          <h3 className="text-xl font-black text-forest">1,240</h3>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-green-700/40 mb-1">In Stock</p>
          <h3 className="text-xl font-black text-green-700">1,192</h3>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-red-700/40 mb-1">Stock Alerts</p>
          <h3 className="text-xl font-black text-red-700">48</h3>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-forest/5 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-8 border-b border-forest/5 flex flex-wrap items-center justify-between gap-6">
          <div className="relative group max-w-md w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/20 group-focus-within:text-vibrant-orange transition-colors" />
            <input 
              type="text" 
              placeholder="FILTER BY PRODUCT ID OR NAME..." 
              className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-xl pl-12 pr-6 py-4 text-[10px] uppercase font-black tracking-widest focus:outline-none transition-all placeholder:text-forest/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-forest/10 text-forest/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-forest/5 transition-all">
              <Filter size={16} />
              Refine Filter
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-forest/[0.02]">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Product identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Category Zone</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Master Craftsman</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Price (INR)</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40">Stock Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-forest/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-forest/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest/30 border border-forest/10 overflow-hidden">
                        <ImageIcon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-forest">{product.name}</p>
                        <p className="text-[9px] font-bold text-forest/30 uppercase tracking-tighter mt-1">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-vibrant-orange bg-vibrant-orange/5 px-3 py-1.5 rounded-full border border-vibrant-orange/10">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-bold text-forest uppercase tracking-widest truncate max-w-[120px]">{product.maker || 'Artisan Collective'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-forest">₹{product.price}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${
                         product.status === 'Active' ? 'bg-green-500' : 
                         product.status === 'Low Stock' ? 'bg-orange-400' : 'bg-red-500'
                       }`} />
                       <p className={`text-[10px] font-black uppercase tracking-widest ${
                         product.status === 'Active' ? 'text-green-700' : 
                         product.status === 'Low Stock' ? 'text-orange-600' : 'text-red-700'
                       }`}>
                         {product.status} ({product.stock})
                       </p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 flex items-center justify-center bg-forest/5 text-forest/60 hover:bg-forest hover:text-white rounded-xl transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-forest/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-4xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-8 border-b border-forest/5 flex items-center justify-between bg-forest/[0.02]">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-vibrant-orange flex items-center justify-center text-white shadow-lg">
                    <Plus size={24} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-forest font-headline">Register Archetype</h2>
                    <p className="text-[10px] font-bold text-forest/40 uppercase tracking-[0.2em] mt-1">Catalog Expansion Protocol</p>
                 </div>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="w-12 h-12 flex items-center justify-center text-forest/20 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="flex-1 overflow-y-auto p-10 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-forest/40">Product Nomenclature</label>
                      <input 
                        type="text" 
                        placeholder="ENTER BRANDED NAME..." 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-2xl px-6 py-5 text-sm font-bold text-forest focus:outline-none transition-all placeholder:text-forest/10" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-forest/40">Designated Heritage Zone</label>
                      <select 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-2xl px-6 py-5 text-sm font-bold text-forest focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">SELECT SEGMENT...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-forest/40">Seller Identity (Maker Name)</label>
                      <input 
                        type="text" 
                        placeholder="ENTER ARTISAN OR BRAND NAME..." 
                        value={newProduct.maker}
                        onChange={(e) => setNewProduct({ ...newProduct, maker: e.target.value })}
                        className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-2xl px-6 py-5 text-sm font-bold text-forest focus:outline-none transition-all placeholder:text-forest/10" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/40">Valuation (INR)</label>
                        <input 
                          type="number" 
                          placeholder="450.00" 
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-2xl px-6 py-5 text-sm font-bold text-forest focus:outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/40">Inventory Reserve</label>
                        <input 
                          type="number" 
                          placeholder="100" 
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-2xl px-6 py-5 text-sm font-bold text-forest focus:outline-none transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                        <Plus size={10} />
                        Heritage Narrative (Detailed Story)
                      </label>
                      <div className="relative group">
                        <textarea 
                          rows={8} 
                          placeholder="TRANSMIT THE ARTISAN STORY, JOURNEY, AND TRADITION..." 
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          className="w-full bg-forest/5 border border-transparent focus:border-vibrant-orange/20 focus:bg-white rounded-3xl px-8 py-7 text-sm font-bold text-forest focus:outline-none transition-all resize-none placeholder:text-forest/10 leading-relaxed shadow-inner" 
                        />
                        <div className="absolute bottom-4 right-6 text-[8px] font-black text-forest/20 uppercase tracking-widest">
                          {newProduct.description.length} Units Transmitted
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-forest/40">Asset Gallery (Multiple Images)</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          placeholder="PASTE IMAGE URL..." 
                          value={currentImageUrl}
                          onChange={(e) => setCurrentImageUrl(e.target.value)}
                          className="flex-1 bg-forest/5 border border-transparent focus:border-vibrant-orange/10 focus:bg-white rounded-2xl px-6 py-5 text-xs font-bold text-forest focus:outline-none transition-all" 
                        />
                        <button 
                          onClick={() => {
                            if (currentImageUrl) {
                              setNewProduct({ ...newProduct, gallery: [...newProduct.gallery, currentImageUrl] });
                              setCurrentImageUrl('');
                            }
                          }}
                          className="px-6 bg-forest text-white rounded-2xl hover:bg-vibrant-orange transition-colors"
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      {/* Thumbnail Grid */}
                      <div className="grid grid-cols-4 gap-4 pt-2">
                        {newProduct.gallery.map((url, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-forest/10 group">
                            <img src={url} alt="Gallery" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000')} />
                            <button 
                              onClick={() => setNewProduct({ ...newProduct, gallery: newProduct.gallery.filter((_, i) => i !== idx) })}
                              className="absolute inset-0 bg-red-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                            >
                              <X size={16} />
                            </button>
                            {idx === 0 && (
                              <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-[6px] text-white text-center py-1 font-black uppercase tracking-widest">
                                Primary
                              </div>
                            )}
                          </div>
                        ))}
                        {newProduct.gallery.length < 8 && (
                          <div className="aspect-square border-2 border-dashed border-forest/5 rounded-xl flex items-center justify-center text-forest/10 bg-forest/[0.01]">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-forest/5 flex items-center justify-end gap-4 bg-forest/[0.02]">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-8 py-5 border border-forest/10 text-forest/40 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-forest/5 transition-all"
              >
                Abort Protocol
              </button>
              <button 
                onClick={handleAddProduct}
                className="flex items-center gap-3 px-12 py-5 bg-forest text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-forest/20 transition-all active:scale-95"
              >
                Commit to Catalog
                <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
