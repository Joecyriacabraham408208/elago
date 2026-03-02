export type PropertyType = 'Flat' | 'Villa' | 'Commercial' | 'Plot';
export type PropertyStatus = 'New Launch' | 'Under Construction' | 'Ready' | 'Resale';

export interface Property {
  id: string;
  name: string;
  builder: string;
  address: string;
  lat: number;
  lng: number;
  type: PropertyType;
  status: PropertyStatus;
  priceFrom: number;
  priceTo: number;
  area: string;
  bedrooms?: string;
  possession: string;
  phone: string;
  email: string;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Prestige Lakeside Habitat',
    builder: 'Prestige Group',
    address: 'Whitefield, Bangalore',
    lat: 12.9698,
    lng: 77.7499,
    type: 'Villa',
    status: 'New Launch',
    priceFrom: 8500000,
    priceTo: 14500000,
    area: '1100–1650 sqft',
    bedrooms: '2, 3 BHK',
    possession: 'Mar 2026',
    phone: '9999999999',
    email: 'sales@prestige.com',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    description: 'A landmark address offering villa residences with lake views and world-class amenities.',
    highlights: ['Lake facing units', 'Private pool villas available', 'RERA approved', '24/7 security', 'Proximity to IT corridor'],
    amenities: ['Clubhouse', 'Swimming Pool', 'Gym', 'Tennis Court', 'Children Play Area'],
  },
  {
    id: '2',
    name: 'Sobha Dream Acres',
    builder: 'Sobha Developers',
    address: 'Panathur Road, Bangalore',
    lat: 12.9489,
    lng: 77.6930,
    type: 'Flat',
    status: 'Ready',
    priceFrom: 5500000,
    priceTo: 9200000,
    area: '650–1350 sqft',
    bedrooms: '1, 2, 3 BHK',
    possession: 'Ready to Move',
    phone: '8888888888',
    email: 'info@sobha.com',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    description: 'Thoughtfully designed apartments in a prime location with excellent connectivity.',
    highlights: ['Ready to move', 'Metro nearby', 'Premium fittings', 'Vastu compliant'],
    amenities: ['Rooftop Garden', 'Co-working Space', 'EV Charging', 'Yoga Deck'],
  },
  {
    id: '3',
    name: 'Embassy Edge',
    builder: 'Embassy Group',
    address: 'Hebbal, Bangalore',
    lat: 13.0456,
    lng: 77.5978,
    type: 'Commercial',
    status: 'Under Construction',
    priceFrom: 12000000,
    priceTo: 35000000,
    area: '2000–8500 sqft',
    possession: 'Dec 2025',
    phone: '7777777777',
    email: 'commercial@embassy.com',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    description: 'Grade-A commercial spaces with LEED Platinum certification in a rapidly developing micro-market.',
    highlights: ['LEED Platinum', 'Highway access', 'Large floor plates', '100% power backup'],
    amenities: ['Food Court', 'Conference Centre', 'Banking Zone', 'Concierge'],
  },
  {
    id: '4',
    name: 'Brigade Utopia',
    builder: 'Brigade Group',
    address: 'Varthur, Bangalore',
    lat: 12.9430,
    lng: 77.7398,
    type: 'Flat',
    status: 'New Launch',
    priceFrom: 7200000,
    priceTo: 12800000,
    area: '950–1800 sqft',
    bedrooms: '2, 3 BHK',
    possession: 'Jun 2027',
    phone: '6666666666',
    email: 'utopia@brigade.com',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    description: 'An integrated township with homes, retail, and green corridors.',
    highlights: ['Township project', '40 acres of greenery', 'High rental yield zone', 'School within campus'],
    amenities: ['Mini Theatre', 'Indoor Sports', 'Spa', 'Jogging Track', 'Amphitheatre'],
  },
  {
    id: '5',
    name: 'Adarsh Palm Retreat',
    builder: 'Adarsh Developers',
    address: 'Sarjapur Road, Bangalore',
    lat: 12.9068,
    lng: 77.6890,
    type: 'Villa',
    status: 'Resale',
    priceFrom: 18000000,
    priceTo: 32000000,
    area: '3200–5400 sqft',
    bedrooms: '4, 5 BHK',
    possession: 'Ready to Move',
    phone: '5555555555',
    email: 'villas@adarsh.com',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    description: 'Ultra-luxury standalone villas with private gardens and premium lifestyle amenities.',
    highlights: ['Standalone villa', 'Private garden', 'Smart home automation', 'Corner units'],
    amenities: ['Private Pool', 'Home Theatre', 'Servant Quarter', 'Garage', 'Landscaped Garden'],
  },
  {
    id: '6',
    name: 'Mahindra Windchimes',
    builder: 'Mahindra Lifespace',
    address: 'Bannerghatta Road, Bangalore',
    lat: 12.8731,
    lng: 77.5993,
    type: 'Plot',
    status: 'New Launch',
    priceFrom: 4500000,
    priceTo: 8900000,
    area: '1200–2400 sqft',
    possession: 'Mar 2025',
    phone: '4444444444',
    email: 'plots@mahindra.com',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    description: 'Gated plotted development with internal roads, utilities, and community facilities.',
    highlights: ['Gated community', 'Clear titles', 'Bank loan approved', 'BDA sanctioned layout'],
    amenities: ['Club House', 'Park', 'Avenue Plantation', 'Underground Drainage'],
  },
];

export const TYPE_COLORS: Record<PropertyType, string> = {
  Flat: '#3B82F6',
  Villa: '#2ECC9A',
  Commercial: '#EF4444',
  Plot: '#F0B429',
};

export const STATUS_COLORS: Record<PropertyStatus, string> = {
  'New Launch': '#2ECC9A',
  'Under Construction': '#F0B429',
  'Ready': '#3B82F6',
  'Resale': '#9B59B6',
};

export function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`;
  return `₹${price.toLocaleString()}`;
}
