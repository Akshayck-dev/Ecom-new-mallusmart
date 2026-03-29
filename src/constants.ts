import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Reference 01 Studio Headphones",
    price: 349.0,
    category: "AUDIO CURATION",
    description: "Precision-tuned drivers with hand-stitched leather cushions for an unparalleled acoustic experience.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    tag: "PREMIUM",
    material: "Leather",
    color: "Black",
    artisan: "AudioCraft Studio",
    rating: 4.8,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "2",
    name: "The Meridian Chronograph",
    price: 520.0,
    category: "TIMELESS SERIES",
    description: "Handcrafted movement housed in a surgical-grade steel casing. Water resistant up to 50m.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    material: "Steel",
    color: "Silver",
    artisan: "Swiss Precision",
    rating: 4.9,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "3",
    name: "Hygge Lounge Chair",
    price: 1200.0,
    category: "LIVING SPACE",
    description: "Scandinavian design principles meeting ultimate comfort. Solid ash wood frame with wool upholstery.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
    material: "Wood",
    color: "Natural",
    artisan: "Nordic Living",
    rating: 4.7,
    inStock: false,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "4",
    name: "The Ethereal Linen Shirt",
    price: 185.0,
    category: "SUMMER 2024 COLLECTION",
    description: "Crafted from the finest Belgian flax, this piece redefines effortless elegance. Features a relaxed silhouette.",
    image: "https://images.unsplash.com/photo-1594932224828-b4b059b6f6ee?auto=format&fit=crop&q=80&w=800",
    material: "Linen",
    color: "White",
    artisan: "Belgian Flax Co.",
    rating: 4.5,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1594932224828-b4b059b6f6ee?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "5",
    name: "Etheric Essence No. 4",
    price: 85.0,
    category: "NATURAL CARE",
    description: "A delicate blend of botanical extracts for a soothing sensory experience.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    material: "Botanical",
    color: "Clear",
    artisan: "Nature's Lab",
    rating: 4.6,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "6",
    name: "Vellum Structured Tote",
    price: 295.0,
    category: "ACCESSORIES",
    description: "Minimalist design meets functional elegance in this structured leather tote.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    material: "Leather",
    color: "Tan",
    artisan: "LeatherWorks",
    rating: 4.8,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "7",
    name: "Twilight Ceramic Candle",
    price: 45.0,
    category: "HOME DECOR",
    description: "Hand-poured soy wax in a custom ceramic vessel. Notes of sandalwood and amber.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    material: "Ceramic",
    color: "Grey",
    artisan: "Clay & Co.",
    rating: 4.4,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602872030219-3fd63803624a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602872029708-84d970d3382b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602872029796-f155f91b9b07?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "8",
    name: "Cloud-Walk Runners",
    price: 180.0,
    category: "FOOTWEAR",
    description: "Engineered for comfort and style. Lightweight materials with superior cushioning.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    material: "Synthetic",
    color: "Red",
    artisan: "Performance Gear",
    rating: 4.2,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800"
    ]
  },
];

export const CATEGORIES = [
  { name: "Fashion Street", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400" },
  { name: "Healthy Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400" },
  { name: "Natural Care Zone", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400" },
  { name: "Gift Corner", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400" },
  { name: "Kids Zone", image: "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&q=80&w=400" },
  { name: "Service Zone", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400" },
  { name: "Pack Corner", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400" },
  { name: "New Premium", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
];
