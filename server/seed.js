const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const menuItems = [
  // STARTERS (Indian Style)
  {
    name: 'Paneer Tikka Angare',
    category: 'Starters',
    dietary: 'Veg',
    price: 350,
    description: 'Succulent cubes of cottage cheese marinated in spiced yogurt and grilled in a traditional clay oven (Tandoor).',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Crispy Vegetable Samosas',
    category: 'Starters',
    dietary: 'Veg',
    price: 180,
    description: 'Hand-crafted flaky pastry stuffed with seasonal spiced potatoes and peas, served with mint & tamarind chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb47045?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chicken 65',
    category: 'Starters',
    dietary: 'Non-Veg',
    price: 420,
    description: 'A spicy, deep-fried chicken dish originating from Chennai, tempered with curry leaves and green chilies.',
    image: 'https://images.unsplash.com/photo-1626132646529-500334846074?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: ' Hara Bhara Kebab',
    category: 'Starters',
    dietary: 'Veg',
    price: 320,
    description: 'Vegetarian delight made with spinach, green peas, and potatoes, flavored with aromatic Indian spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },

  // MAIN COURSE (Indian Style)
  {
    name: 'Butter Chicken (Murgh Makhani)',
    category: 'Main Course',
    dietary: 'Non-Veg',
    price: 550,
    description: 'Tandoori grilled chicken simmered in a smooth, silky tomato and butter-based gravy with a touch of fenugreek.',
    image: 'https://images.unsplash.com/photo-1603894584202-933259a4a760?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dal Makhani (Slow Cooked)',
    category: 'Main Course',
    dietary: 'Veg',
    price: 380,
    description: 'Whole black lentils and kidney beans slow-cooked overnight on charcoal with butter and cream.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Hyderabadi Dum Biryani',
    category: 'Main Course',
    dietary: 'Non-Veg',
    price: 480,
    description: 'Fragrant Basmati rice cooked with marinated chicken/veg, saffron, and whole spices in typical "Dum" style.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Palak Paneer',
    category: 'Main Course',
    dietary: 'Veg',
    price: 390,
    description: 'Fresh spinach purée cooked with cubes of paneer and hint of garlic, topped with fresh cream.',
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Assorted Tandoori Basket',
    category: 'Main Course',
    dietary: 'Veg',
    price: 250,
    description: 'A mix of Butter Naan, Garlic Naan, and Laccha Paratha straight from the hot Tandoor.',
    image: 'https://images.unsplash.com/photo-1601050690097-400f9abb4e42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },

  // DRINKS & DESSERTS
  {
    name: 'Royal Mango Lassi',
    category: 'Drinks',
    dietary: 'None',
    price: 150,
    description: 'Thick yogurt-based drink blended with Alphonso mango pulp and garnished with almond flakes.',
    image: 'https://images.unsplash.com/photo-1571006682855-3fc3557ac653?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Gulab Jamun (2 Pcs)',
    category: 'Drinks',
    dietary: 'Veg',
    price: 120,
    description: 'Deep-fried milk solids dumplings soaked in rose-scented cardamom sugar syrup.',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Masala Chai',
    category: 'Drinks',
    dietary: 'None',
    price: 80,
    description: 'Authentic Indian milk tea brewed with crushed ginger, cardamom, and clove.',
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kesari Rasmalai',
    category: 'Drinks',
    dietary: 'Veg',
    price: 160,
    description: 'Soft cottage cheese patties immersed in thickened saffron milk, garnished with pistachios.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await MenuItem.deleteMany();
    await MenuItem.insertMany(menuItems);
    console.log('Database Seeded Successfully with Veg/Non-Veg Indian Menu!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
