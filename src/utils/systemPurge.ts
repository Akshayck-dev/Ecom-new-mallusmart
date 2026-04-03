/**
 * Mallu's Mart: Institutional System Purge Protocol
 * This utility clears all persistent localStorage registries to provide a "Fresh Setup".
 */

const PERSISTENT_KEYS = [
  'mallu-mart-products',
  'mallu-mart-admin-analytics',
  'mallu-mart-cart',
  'mallu-mart-wishlist',
  'mallu-mart-history',
  'mallu-mart-orders-registry'
];

export const purgeSystemData = () => {
  try {
    PERSISTENT_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Perform a hard reload to re-initialize all stores with institutional defaults
    window.location.href = '/admin';
  } catch (error) {
    console.error('PROTOCOL ERROR: Failed to purge administrative registries.', error);
  }
};
