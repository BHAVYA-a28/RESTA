import { IMenu } from '../models/Menu';

export const PREMIUM_SEED = [
  // STARTERS
  {
    name: 'Tandoori Malai Broccoli',
    description: 'Tender broccoli florets marinated in a creamy blend of cheese, yogurt, and cardamom, charred to perfection in our clay oven.',
    price: 399,
    category: 'Starters',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Zaffrani Paneer Tikka',
    description: 'Saffron-infused cottage cheese chunks marinated in aromatic spices and hung curd, served with a mint pesto.',
    price: 449,
    category: 'Starters',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Old Delhi Seekh Kebab',
    description: 'Minced lamb mixed with fresh herbs and spices, skewered and grilled. A classic recipe from the streets of Old Delhi.',
    price: 549,
    category: 'Starters',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  
  // MAINS
  {
    name: 'Butter Chicken Grand Trunk',
    description: 'Our signature pulled chicken cooked in a velvety tomato gravy enriched with butter and cream. Served with a touch of honey.',
    price: 599,
    category: 'Mains',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Dal TastyBites 24/7',
    description: 'Black lentils slow-cooked for 24 hours with spices, butter and cream for that authentic smoky, earthy flavor.',
    price: 349,
    category: 'Mains',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Nizami Mutton Rogan Josh',
    description: 'Slow-cooked lamb in a traditional Kashmiri style gravy with ratan jot and aromatic spices.',
    price: 649,
    category: 'Mains',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1545243191-240acc07f282?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    isAvailable: true
  },

  // BIRYANI
  {
    name: 'Awadhi Dum Biryani',
    description: 'Fragrant Basmati rice and tender meat slow-cooked in a sealed pot with exotic spices and saffron.',
    price: 589,
    category: 'Biryani',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Tarkari Subz Biryani',
    description: 'Seasonal vegetables layered with premium Basmati rice, slow-cooked in dums with fresh mint and fried onions.',
    price: 489,
    category: 'Biryani',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    isAvailable: true
  },

  // BREADS
  {
    name: 'Truffle Garlic Naan',
    description: 'Soft leavened bread brushed with truffle oil and topped with roasted garlic and fresh parsley.',
    price: 149,
    category: 'Breads',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Butter Laccha Paratha',
    description: 'Multi-layered whole wheat bread with generous helpings of butter, cooked in tandoor.',
    price: 99,
    category: 'Breads',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    isAvailable: true
  },

  // DESSERTS
  {
    name: 'Gulab Jamun Cheesecake',
    description: 'A fusion masterpiece combining the traditional Indian Gulab Jamun with a creamy, rich cheesecake base.',
    price: 349,
    category: 'Desserts',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    name: 'Baked Rasmalai',
    description: 'Classic Rasmalai soft patties flavored with saffron and baked with a thick rabri topping.',
    price: 299,
    category: 'Desserts',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    isAvailable: true
  }
];

export function generateSeedItems(countPerCategory: number = 5): any[] {
  // We return the premium seed first, then pad with generated ones if needed
  const items = [...PREMIUM_SEED];
  
  // Minimal padding to keep it professional
  return items;
}
