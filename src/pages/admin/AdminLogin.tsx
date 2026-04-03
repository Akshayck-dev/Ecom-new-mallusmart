import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShieldCheck, ArrowRight, Lock, User } from 'lucide-react';
import Logo from '../../components/Logo';
import { purgeSystemData } from '../../utils/systemPurge';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      toast.success('ACCESS GRANTED: Administrative session initiated');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 800);
    } else {
      toast.error('ACCESS DENIED: Invalid administrative credentials');
    }
  };

  const handleSystemReset = () => {
    if (window.confirm('PROTOCOL: Total System Initialization? This will purge all products, analytics, and session data to restore the factory Mallu\'s Mart state.')) {
      const toastId = toast.loading('Initializing administrative registries...');
      setTimeout(() => {
        purgeSystemData();
        toast.dismiss(toastId);
      }, 1000);
    }
  };

  return (
    <div className="h-screen fixed inset-0 bg-forest relative flex items-center justify-center p-6 sm:p-10 selection:bg-vibrant-orange/10 selection:text-vibrant-orange overflow-hidden">
      {/* Background Graphic Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square border border-white/5 rounded-full blur-[100px]" />
      <div className="absolute top-0 right-0 w-1/3 aspect-square bg-vibrant-orange/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-1/3 aspect-square bg-white/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative w-full max-w-md">
        {/* Branding Container */}
        <div className="text-center mb-10">
          <Logo variant="invert" className="mx-auto" size={120} />
          <div className="h-0.5 w-12 bg-vibrant-orange/40 mx-auto mt-6 rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mt-4 leading-loose">
            Administrative Credential Protocol • Mallu's Mart
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-4xl shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-vibrant-orange flex items-center justify-center text-white shadow-lg shadow-vibrant-orange/20">
               <ShieldCheck size={24} />
            </div>
            <div>
               <h1 className="text-xl font-black uppercase tracking-[0.2em] text-white">System Access</h1>
               <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Operational Environment Sec. v4</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-5">
              <div className="space-y-3 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Registry Identity</label>
                  <User size={12} className="text-vibrant-orange/40" />
                </div>
                <input 
                  type="text" 
                  placeholder="USERNAME..." 
                  required
                  className="w-full bg-white/5 border border-white/5 focus:border-vibrant-orange/20 focus:bg-white/10 rounded-2xl px-6 py-5 text-sm font-bold text-white focus:outline-none transition-all placeholder:text-white/10"
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>

              <div className="space-y-3 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Verification Protocol</label>
                  <Lock size={12} className="text-vibrant-orange/40" />
                </div>
                <input 
                  type="password" 
                  placeholder="ENCRYPTED KEY..." 
                  required
                  className="w-full bg-white/5 border border-white/5 focus:border-vibrant-orange/20 focus:bg-white/10 rounded-2xl px-6 py-5 text-sm font-bold text-white focus:outline-none transition-all placeholder:text-white/10"
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-white text-forest rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-vibrant-orange hover:text-white transition-all transform active:scale-[0.98] shadow-xl group border-2 border-white"
            >
              Initiate Login
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          {/* Footer Card Accents */}
          <div className="mt-12 flex justify-between items-center opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="h-px flex-1 bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white mx-4" />
            <div className="h-px flex-1 bg-white" />
          </div>
        </div>

        {/* System Status Indicator */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-vibrant-orange animate-pulse" />
            <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">System Operational Port: 3000</p>
          </div>
          
          <button 
            onClick={handleSystemReset}
            className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 hover:text-vibrant-orange transition-colors"
          >
            Reset System Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
