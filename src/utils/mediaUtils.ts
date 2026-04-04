/**
 * Media Utility Service
 * Centralized resolver for Mallu's Mart brand assets.
 * Ensures consistent image loading across Web and Native (Capacitor) environments.
 * Uses Vite's statically analyzable import.meta.glob for maximum stability.
 */

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560393464-513689404285?auto=format&fit=crop&q=80&w=1000";

// Index all product assets at build time
const PRODUCT_ASSETS = import.meta.glob<{ default: string }>('../assets/products/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// Index all brand and category murals at build time
const BRAND_ASSETS = import.meta.glob<{ default: string }>('../assets/*.{png,jpg,jpeg,svg,webp}', { eager: true });

/**
 * Resolves a media path to a usable URL.
 * Prioritizes local assets, then public folder, then fallbacks.
 */
export const resolveMedia = (path: string | undefined): string => {
  if (!path) return FALLBACK_IMAGE;

  // 1. If it's already an absolute URL, return it
  if (path.startsWith('http')) return path;

  // 2. Resolve via pre-indexed asset map
  const assetKey = `../assets/products/${path}`;
  const asset = PRODUCT_ASSETS[assetKey];

  if (asset) {
    return asset.default;
  }

  // Fallback to absolute assets directory if not in products
  const globalKey = `../assets/${path}`;
  const globalAsset = BRAND_ASSETS[globalKey];
  if (globalAsset) {
    return globalAsset.default;
  }

  return FALLBACK_IMAGE;
};

/**
 * Specifically resolves category murals or brand identity assets.
 */
export const resolveBrandAsset = (path: string | undefined): string => {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http')) return path;

  const assetKey = `../assets/${path}`;
  const asset = BRAND_ASSETS[assetKey];

  if (asset) {
    return asset.default;
  }

  return FALLBACK_IMAGE;
};
