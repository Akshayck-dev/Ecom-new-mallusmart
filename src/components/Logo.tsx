import React from 'react';
import logo from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: number | string;
  variant?: 'default' | 'invert' | 'black';
}

export default function Logo({ className = '', size = 90, variant = 'default' }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`} style={{ height: size }}>
      <img
        src={logo}
        alt="Mallu's Mart – Kerala HomePreneurs United"
        className={`h-full w-auto object-contain ${variant === 'invert' ? 'brightness-0 invert' : ''}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
