import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Radiance Vitamin C Serum",
    price: 48.0,
    category: "Skincare",
    parentCategory: "Skincare",
    description: "A potent blend of 15% Vitamin C and Ferulic Acid to brighten skin tone and reduce signs of aging.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    tag: "BESTSELLER",
    material: "Liquid",
    color: "Clear",
    artisan: "Glow Lab",
    rating: 4.9,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598440499115-246249042820?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "2",
    name: "Velvet Matte Lipstick",
    price: 24.0,
    category: "Makeup",
    parentCategory: "Makeup",
    description: "Long-lasting, high-pigment matte lipstick that feels weightless on the lips.",
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800",
    tag: "NEW",
    material: "Cream",
    color: "Crimson",
    artisan: "Velvet Muse",
    rating: 4.7,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591360236480-4ed861025a18?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "3",
    name: "Hydrating Rose Water Mist",
    price: 18.0,
    category: "Skincare",
    parentCategory: "Skincare",
    description: "Refresh and hydrate your skin throughout the day with pure Bulgarian rose water.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    tag: "ORGANIC",
    material: "Mist",
    color: "Clear",
    artisan: "Flora Botanica",
    rating: 4.6,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "4",
    name: "Silk Finish Foundation",
    price: 42.0,
    category: "Makeup",
    parentCategory: "Makeup",
    description: "Medium coverage foundation with a natural silk finish. Available in 40 shades.",
    image: "https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=800",
    tag: "TRENDING",
    material: "Liquid",
    color: "Beige",
    artisan: "Skin Studio",
    rating: 4.8,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1599733589046-10c005739ef0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "5",
    name: "Argan Oil Hair Mask",
    price: 32.0,
    category: "Haircare",
    parentCategory: "Haircare",
    description: "Deep conditioning treatment for dry, damaged hair. Enriched with pure Argan oil.",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800",
    tag: "REPAIR",
    material: "Cream",
    color: "White",
    artisan: "Silk & Shine",
    rating: 4.5,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "6",
    name: "Midnight Jasmine Perfume",
    price: 95.0,
    category: "Fragrance",
    parentCategory: "Fragrance",
    description: "A sophisticated evening scent with notes of blooming jasmine, vanilla, and musk.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    tag: "LUXURY",
    material: "Liquid",
    color: "Amber",
    artisan: "Essence de Paris",
    rating: 4.9,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "7",
    name: "Charcoal Detox Cleanser",
    price: 22.0,
    category: "Skincare",
    parentCategory: "Skincare",
    description: "Deeply cleanse pores and remove impurities with activated charcoal and tea tree oil.",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800",
    tag: "DETOX",
    material: "Gel",
    color: "Black",
    artisan: "Pure Skin",
    rating: 4.4,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "8",
    name: "Gold Shimmer Body Oil",
    price: 38.0,
    category: "Body Care",
    parentCategory: "Body Care",
    description: "Lightweight body oil that leaves a subtle golden shimmer and a tropical scent.",
    image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=800",
    tag: "GLOW",
    material: "Oil",
    color: "Gold",
    artisan: "Sun Kissed",
    rating: 4.7,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export const CATEGORIES = [
  { 
    name: "Skincare", 
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=400",
    subcategories: ["Cleansers", "Moisturizers", "Serums", "Sunscreen"]
  },
  { 
    name: "Makeup", 
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400",
    subcategories: ["Face", "Eyes", "Lips", "Brushes"]
  },
  { 
    name: "Haircare", 
    image: "https://images.unsplash.com/photo-1527799822340-304cf6595816?auto=format&fit=crop&q=80&w=400",
    subcategories: ["Shampoo", "Conditioner", "Treatments"]
  },
  { 
    name: "Fragrance", 
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    subcategories: ["Perfume", "Cologne", "Body Mist"]
  },
  { 
    name: "Body Care", 
    image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=400",
    subcategories: ["Lotions", "Scrubs", "Oils"]
  }
];
