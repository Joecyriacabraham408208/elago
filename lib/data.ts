export type PropertyType = 'Flat' | 'Villa' | 'Commercial' | 'Plot'
export type PropertyStatus = 'New Launch' | 'Under Construction' | 'Ready' | 'Resale'

export interface Property {
  id: string
  name: string
  builder: string
  type: PropertyType
  status: PropertyStatus
  priceFrom: number
  priceTo: number
  area: string
  bedrooms?: string
  possession: string
  lat: number
  lng: number
  address: string
  phone: string
  email: string
  image: string
  description: string
  highlight?: string
  featured?: boolean
}

export const PROPERTY_COLORS: Record<PropertyType, string> = {
  Flat: '#3B82F6',
  Villa: '#10B981',
  Commercial: '#EF4444',
  Plot: '#F59E0B',
}

export const PROPERTY_ICONS: Record<PropertyType, string> = {
  Flat: '🏢',
  Villa: '🏡',
  Commercial: '🏬',
  Plot: '🌳',
}

// Sample data — replace with your backend
export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Prestige Lakeside Habitat',
    builder: 'Prestige Group',
    type: 'Villa',
    status: 'Under Construction',
    priceFrom: 8500000,
    priceTo: 14500000,
    area: '1100-1650 sqft',
    bedrooms: '2,3 BHK',
    possession: 'Mar 2026',
    lat: 40.716,
    lng: -73.832,
    address: 'Forest Hills, Queens',
    phone: '9999999999',
    email: 'sales@prestige.com',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    description: 'Prestige Lakeside Habitat offers world-class lakeside living with premium villas nestled in lush greenery. Features modern architecture with smart home technology.',
    highlight: 'Lakeside Views',
    featured: true,
  },
  {
    id: '2',
    name: 'Skyline Residences',
    builder: 'Godrej Properties',
    type: 'Flat',
    status: 'New Launch',
    priceFrom: 6500000,
    priceTo: 12000000,
    area: '800-1400 sqft',
    bedrooms: '2,3 BHK',
    possession: 'Dec 2026',
    lat: 40.726,
    lng: -73.852,
    address: 'Elmhurst, Queens',
    phone: '8888888888',
    email: 'sales@godrej.com',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    description: 'Premium high-rise apartments with panoramic city views. Contemporary design with state-of-the-art amenities.',
    highlight: 'Smart Home Ready',
    featured: true,
  },
  {
    id: '3',
    name: 'Heritage Business Park',
    builder: 'DLF Limited',
    type: 'Commercial',
    status: 'Ready',
    priceFrom: 15000000,
    priceTo: 40000000,
    area: '500-5000 sqft',
    possession: 'Ready to Move',
    lat: 40.708,
    lng: -73.814,
    address: 'Rego Park, Queens',
    phone: '7777777777',
    email: 'leasing@dlf.com',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    description: 'Grade A commercial office spaces in a prime business district. Perfect for corporates, startups, and retail brands.',
    highlight: 'Grade A Office',
  },
  {
    id: '4',
    name: 'Green Valley Estates',
    builder: 'Sobha Developers',
    type: 'Plot',
    status: 'New Launch',
    priceFrom: 4000000,
    priceTo: 9000000,
    area: '1200-3000 sqft',
    possession: 'Immediate',
    lat: 40.698,
    lng: -73.844,
    address: 'Glendale, Queens',
    phone: '6666666666',
    email: 'sales@sobha.com',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    description: 'Curated residential plots in a gated community with wide roads, underground utilities, and lush landscaping.',
    highlight: 'Gated Community',
  },
  {
    id: '5',
    name: 'Meridian Heights',
    builder: 'Brigade Group',
    type: 'Flat',
    status: 'Under Construction',
    priceFrom: 7200000,
    priceTo: 13500000,
    area: '950-1800 sqft',
    bedrooms: '2,3,4 BHK',
    possession: 'Jun 2027',
    lat: 40.732,
    lng: -73.825,
    address: 'Jackson Heights, Queens',
    phone: '5555555555',
    email: 'sales@brigade.com',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    description: 'Luxury sky residences offering breathtaking vistas and curated concierge services. Live above the ordinary.',
    highlight: 'Concierge Service',
    featured: true,
  },
  {
    id: '6',
    name: 'Willow Creek Villas',
    builder: 'Mahindra Lifespaces',
    type: 'Villa',
    status: 'Ready',
    priceFrom: 18000000,
    priceTo: 28000000,
    area: '2800-4200 sqft',
    bedrooms: '4,5 BHK',
    possession: 'Ready to Move',
    lat: 40.712,
    lng: -73.856,
    address: 'Forest Hills, Queens',
    phone: '4444444444',
    email: 'sales@mahindra.com',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
    description: 'Ultra-luxury independent villas with private pools, landscaped gardens, and smart automation. The pinnacle of residential living.',
    highlight: 'Private Pool',
  },
]

export function formatPrice(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
  if (val >= 100000)   return `₹${(val / 100000).toFixed(0)} L`
  return `₹${val.toLocaleString('en-IN')}`
}
