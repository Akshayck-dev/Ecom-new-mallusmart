import { Leaf } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number | string;
  variant?: 'default' | 'invert' | 'black';
}

export default function Logo({ className = '', size = 48, variant = 'default' }: LogoProps) {
  const isDark = variant === 'invert' || variant === 'black';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} style={{ height: size }}>
      {/* Brand Icon */}
      <div className="h-full aspect-square bg-vibrant-orange rounded-xl flex items-center justify-center shadow-lg shadow-vibrant-orange/10 transition-transform duration-500 hover:scale-110">
        <Leaf 
          size={typeof size === 'number' ? size * 0.5 : 24} 
          className="text-white" 
          strokeWidth={2.5} 
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span className={`text-[11px] font-black uppercase tracking-[0.3em] leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Mallu's Mart
        </span>
        <span className={`text-[6px] font-bold uppercase tracking-[0.4em] mt-1.5 opacity-40 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Kerala Origins
        </span>
      </div>
    </div>
  );
}
