export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  parentCategory?: string;
  description: string;
  image: string;
  images?: string[];
  tag?: string;
  material?: string;
  color?: string;
  artisan?: string;
  rating?: number;
  inStock?: boolean;
  skinType?: string[];
  concern?: string[];
}

export interface Category {
  name: string;
  image: string;
  subcategories?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
