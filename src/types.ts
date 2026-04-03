export interface Product {
  id: string;
  name: string;
  price: number;
  category: string; // This will map to specific zones (e.g., Healthy Kitchen)
  parentCategory?: string;
  description: string;
  image: string;
  images?: string[];
  gallery?: string[]; // New field from catalog data
  tag?: string;
  material?: string;
  color?: string;
  artisan?: string; // Legacy field, will sync with maker
  maker?: string; // New field from catalog data
  rating?: number;
  oldPrice?: number;
  inStock?: boolean;
  skinType?: string[];
  concern?: string[];
  technicalSpecs?: string[]; // New field from catalog data
  status?: 'Active' | 'Low Stock' | 'Out of Stock' | string;
  stock?: number;
}

export interface Category {
  name: string;
  image: string;
  subcategories?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
