export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images?: string[];
  tag?: string;
  material?: string;
  color?: string;
  artisan?: string;
  rating?: number;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
