import { IMenu } from '../models/Menu';

const categories = ['Starters', 'Mains', 'Biryani', 'Breads', 'Desserts', 'Beverages'];

const namePool: Record<string, string[]> = {
  'Starters': ['Paneer Tikka', 'Chicken Tikka', 'Seekh Kebab', 'Samosa', 'Pakora', 'Gobi Manchurian', 'Chilli Chicken', 'Fish Fry', 'Prawns Fry', 'Veg Manchurian', 'Hara Bhara Kabab', 'Tandoori Mushrooms', 'Malai Kabab', 'Corn Salt and Pepper', 'Crispy Corn', 'Spring Rolls', 'Vada Pav', 'Dahi Vada', 'Aloo Chat', 'Chicken 65'],
  'Mains': ['Butter Chicken', 'Paneer Butter Masala', 'Dal Makhani', 'Palak Paneer', 'Mutton Curry', 'Fish Curry', 'Mix Veg', 'Dum Aloo', 'Bhindi Masala', 'Chana Masala', 'Kadhai Paneer', 'Rogan Josh', 'Methi Matar Malai', 'Malai Kofta', 'Egg Curry', 'Chicken Masala', 'Aloo Gobi', 'Baingan Bharta', 'Navratan Korma', 'Chicken Korma'],
  'Biryani': ['Hyderabadi Biryani', 'Lucknowi Biryani', 'Egg Biryani', 'Veg Biryani', 'Prawns Biryani', 'Fish Biryani', 'Jeera Rice', 'Steamed Rice', 'Kashmiri Pulao', 'Chicken Dum Biryani', 'Mutton Dum Biryani', 'Keema Biryani', 'Lemon Rice', 'Curd Rice', 'Tamarind Rice', 'Ghee Rice', 'Peas Pulao', 'Mushroom Biryani', 'Paneer Pulao', 'Schezwan Fried Rice'],
  'Breads': ['Roti', 'Naan', 'Butter Naan', 'Garlic Naan', 'Tandoori Roti', 'Missi Roti', 'Laccha Paratha', 'Stuffed Kulcha', 'Rumali Roti', 'Plain Paratha', 'Aloo Paratha', 'Paneer Paratha', 'Onion Kulcha', 'Amritsari Kulcha', 'Cheese Naan', 'Keema Naan', 'Peshawari Naan', 'Puri', 'Bhatura', 'Tawa Roti'],
  'Desserts': ['Gulab Jamun', 'Rasmalai', 'Gajar Ka Halwa', 'Kheer', 'Kulfi', 'Ice Cream', 'Brownie with Ice Cream', 'Fruit Salad', 'Moong Dal Halwa', 'Jalebi', 'Rabri', 'Phirni', 'Mishti Doi', 'Rasgulla', 'Kaju Katli', 'Ladoo', 'Basundi', 'Puran Poli', 'Shahi Tukda', 'Chocolate Lava Cake'],
  'Beverages': ['Masala Chai', 'Lassi', 'Mango Lassi', 'Fresh Lime Soda', 'Cold Coffee', 'Soft Drinks', 'Mineral Water', 'Iced Tea', 'Lemonade', 'Buttermilk', 'Badam Milk', 'Thandai', 'Jaljeera', 'Fruit Juice', 'Milkshake', 'Hot Chocolate', 'Green Tea', 'Ginger Tea', 'Cold Drink', 'Soda']
};

const descriptors = ['Special', 'Classic', 'Royal', 'Spicy', 'Chef\'s Choice', 'Authentic', 'Homemade', 'Signature', 'Premium', 'Delicious', 'Tasty', 'Gourmet', 'Grand', 'Elite', 'Exquisite', 'Traditional', 'Modern', 'Fusion', 'Zesty', 'Flavorful'];

const descriptionTemplates = [
  "A perfect blend of spices and fresh ingredients, cooked to perfection.",
  "Our signature recipe passed down through generations.",
  "Freshly prepared with authentic flavors that will tantalize your taste buds.",
  "A dish that defines our commitment to quality and taste.",
  "Delicious and satisfying, a must-try for everyone.",
  "Experience the true taste of tradition in every bite.",
  "Carefully crafted by our expert chefs using premium ingredients.",
  "A flavorful journey that you wouldn't want to miss."
];

const images: Record<string, string[]> = {
  'Starters': [
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589647363535-882ffc1aa3d1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
  ],
  'Mains': [
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1545243191-240acc07f282?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626777552726-4a6b52c67ebf?auto=format&fit=crop&w=800&q=80'
  ],
  'Biryani': [
    'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'
  ],
  'Breads': [
    'https://images.unsplash.com/photo-1601303516536-225654037bt5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80'
  ],
  'Desserts': [
    'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80'
  ],
  'Beverages': [
    'https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  ]
};

export function generateSeedItems(countPerCategory: number = 20): any[] {
  const items: any[] = [];
  
  categories.forEach(category => {
    const names = namePool[category];
    for (let i = 0; i < countPerCategory; i++) {
        const baseName = names[i % names.length];
        const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
        const name = `${descriptor} ${baseName} ${Math.floor(i / names.length) > 0 ? (Math.floor(i/names.length) + 1) : ''}`.trim();
        
        const description = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
        
        let price = 0;
        switch(category) {
            case 'Starters': price = 250 + Math.floor(Math.random() * 200); break;
            case 'Mains': price = 350 + Math.floor(Math.random() * 400); break;
            case 'Biryani': price = 400 + Math.floor(Math.random() * 300); break;
            case 'Breads': price = 40 + Math.floor(Math.random() * 80); break;
            case 'Desserts': price = 150 + Math.floor(Math.random() * 150); break;
            case 'Beverages': price = 80 + Math.floor(Math.random() * 120); break;
        }
        
        const dietary = (category === 'Beverages' || category === 'Desserts' || category === 'Breads' || baseName.includes('Paneer') || baseName.includes('Veg') || baseName.includes('Dal') || baseName.includes('Aloo')) ? 'Veg' : 'Non-Veg';
        
        const categoryImages = images[category] || images['Starters'];
        const image = categoryImages[Math.floor(Math.random() * categoryImages.length)];
        
        items.push({
            name,
            description,
            price,
            category,
            dietary,
            image,
            isPopular: Math.random() > 0.7,
            isAvailable: true
        });
    }
  });
  
  return items;
}
