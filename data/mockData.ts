import { Product, HeroContent } from '../types';

export const mockHeroContent: HeroContent = {
  title: 'Welcome to Our Company',
  description: 'Wonder Door Industrial takes you to the doors of the future for modern and contemporary living, combined with international standard quality.',
  imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80'
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'WPC Door - Sky Blue Edition',
    description: 'Modern WPC door with sky blue design, perfect for contemporary homes. Features waterproof and termite-resistant properties.',
    imageUrl: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80'
    ],
    price: 299,
    features: [
      'Waterproof',
      'Termite-resistant',
      'Easy to clean',
      'Modern design',
      '5-year warranty'
    ],
    specifications: {
      'Material': 'WPC (Wood Plastic Composite)',
      'Dimensions': '2100mm x 900mm x 40mm',
      'Weight': '45kg',
      'Color': 'Sky Blue',
      'Installation': 'Professional installation recommended'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'WPC Door - Classic Black',
    description: 'Elegant black WPC door with premium finish. Ideal for modern interiors and offices.',
    imageUrl: 'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80'
    ],
    price: 349,
    features: [
      'Premium black finish',
      'Scratch-resistant',
      'Fire-retardant',
      'Sound insulation',
      'Eco-friendly'
    ],
    specifications: {
      'Material': 'WPC (Wood Plastic Composite)',
      'Dimensions': '2100mm x 900mm x 40mm',
      'Weight': '48kg',
      'Color': 'Classic Black',
      'Finish': 'Matte'
    },
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'WPC Door - Health Edition',
    description: 'Specialized WPC door with antibacterial coating, perfect for hospitals and clinics.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80',
      'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80'
    ],
    price: 279,
    features: [
      'Antibacterial coating',
      'Hygienic surface',
      'Easy maintenance',
      'Durable',
      'Health certified'
    ],
    specifications: {
      'Material': 'WPC with antibacterial coating',
      'Dimensions': '2100mm x 800mm x 40mm',
      'Weight': '42kg',
      'Color': 'Light Gray',
      'Certification': 'Health & Safety Approved'
    },
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '4',
    name: 'WPC Door - Premium Wood Texture',
    description: 'Luxurious WPC door with natural wood texture finish, combining beauty and durability.',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80'
    ],
    price: 399,
    features: [
      'Natural wood texture',
      'Premium finish',
      'Weather-resistant',
      'UV protection',
      'Lifetime warranty'
    ],
    specifications: {
      'Material': 'Premium WPC',
      'Dimensions': '2100mm x 950mm x 45mm',
      'Weight': '52kg',
      'Color': 'Natural Wood',
      'Texture': '3D Wood Grain'
    },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '5',
    name: 'WPC Door - Modern White',
    description: 'Clean and modern white WPC door, perfect for minimalist interior design.',
    imageUrl: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80'
    ],
    price: 259,
    features: [
      'Pure white finish',
      'Minimalist design',
      'Stain-resistant',
      'Low maintenance',
      '3-year warranty'
    ],
    specifications: {
      'Material': 'WPC',
      'Dimensions': '2100mm x 850mm x 40mm',
      'Weight': '40kg',
      'Color': 'Pure White',
      'Style': 'Contemporary'
    },
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '6',
    name: 'WPC Door - Sky Blue Classic',
    description: 'Another variant of our popular sky blue edition with enhanced features.',
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80'
    ],
    price: 319,
    features: [
      'Enhanced durability',
      'Weather-proof',
      'Modern aesthetics',
      'Easy installation',
      '5-year warranty'
    ],
    specifications: {
      'Material': 'Enhanced WPC',
      'Dimensions': '2100mm x 900mm x 42mm',
      'Weight': '46kg',
      'Color': 'Sky Blue',
      'Grade': 'Premium'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '7',
    name: 'WPC Door - Professional Black',
    description: 'Professional-grade black WPC door for commercial and residential use.',
    imageUrl: 'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&q=80'
    ],
    price: 369,
    features: [
      'Commercial grade',
      'High traffic resistant',
      'Professional finish',
      'Security enhanced',
      '10-year warranty'
    ],
    specifications: {
      'Material': 'Commercial WPC',
      'Dimensions': '2100mm x 950mm x 45mm',
      'Weight': '55kg',
      'Color': 'Professional Black',
      'Grade': 'Commercial'
    },
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '8',
    name: 'WPC Door - Health Pro',
    description: 'Advanced health edition with superior antibacterial properties.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1551122089-4e3e72477b48?w=600&q=80',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&q=80',
      'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80'
    ],
    price: 329,
    features: [
      'Advanced antibacterial',
      'Hospital grade',
      'Chemical resistant',
      'Easy to sanitize',
      '7-year warranty'
    ],
    specifications: {
      'Material': 'Medical-grade WPC',
      'Dimensions': '2100mm x 850mm x 40mm',
      'Weight': '44kg',
      'Color': 'Clinical White',
      'Certification': 'Medical Facility Approved'
    },
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  }
];
