export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "sale" | "rent";
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  propertyType: "apartment" | "villa" | "studio" | "bungalow" | "duplex" | "flat" | "house";
  features: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    parking: number;
    yearBuilt?: number;
  };
  amenities: string[];
  images: string[];
  status: "available" | "pending" | "sold";
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockProperties: Property[] = [
  {
    id: "prop-001",
    title: "Modern Luxury Apartment in Downtown",
    description: "Stunning modern apartment with floor-to-ceiling windows offering breathtaking city views. Features high-end finishes, smart home technology, and access to premium building amenities including rooftop pool and fitness center.",
    price: 2500,
    priceType: "rent",
    location: {
      address: "123 Park Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    propertyType: "apartment",
    features: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      parking: 1,
      yearBuilt: 2020
    },
    amenities: ["Pool", "Gym", "Concierge", "Rooftop Terrace", "Smart Home", "Pet Friendly"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    status: "available",
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
    },
    featured: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-20T14:30:00Z"
  },
  {
    id: "prop-002",
    title: "Cozy Lake House with Private Dock",
    description: "Charming lakefront cottage perfect for peaceful living. Wake up to stunning water views, enjoy your private dock, and relax on the spacious deck. Recently renovated with modern amenities while maintaining its rustic charm.",
    price: 1800,
    priceType: "rent",
    location: {
      address: "456 Lakeshore Drive",
      city: "Lake Tahoe",
      state: "CA",
      zipCode: "96150",
      country: "USA",
      coordinates: { lat: 39.0968, lng: -120.0324 }
    },
    propertyType: "house",
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      parking: 2,
      yearBuilt: 1995
    },
    amenities: ["Waterfront", "Private Dock", "Fireplace", "Deck", "Mountain Views", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    status: "available",
    agent: {
      name: "Michael Chen",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
    },
    featured: true,
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-18T16:45:00Z"
  },
  {
    id: "prop-003",
    title: "Oceanfront Villa with Infinity Pool",
    description: "Spectacular luxury villa offering unobstructed ocean views. This architectural masterpiece features an infinity pool, private beach access, gourmet kitchen, and expansive outdoor living spaces. Perfect for entertaining or peaceful retreat.",
    price: 5000,
    priceType: "rent",
    location: {
      address: "789 Ocean Boulevard",
      city: "Miami",
      state: "FL",
      zipCode: "33139",
      country: "USA",
      coordinates: { lat: 25.7907, lng: -80.1300 }
    },
    propertyType: "villa",
    features: {
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      parking: 3,
      yearBuilt: 2018
    },
    amenities: ["Ocean View", "Infinity Pool", "Private Beach", "Wine Cellar", "Home Theater", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    status: "available",
    agent: {
      name: "Emily Rodriguez",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
    },
    featured: true,
    createdAt: "2025-01-05T11:30:00Z",
    updatedAt: "2025-01-22T10:15:00Z"
  },
  {
    id: "prop-004",
    title: "Spacious Family Home in Quiet Suburb",
    description: "Beautiful single-family home in a family-friendly neighborhood. Features open floor plan, updated kitchen, large backyard perfect for kids and pets, and close to top-rated schools. Move-in ready!",
    price: 3200,
    priceType: "rent",
    location: {
      address: "321 Maple Street",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA",
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    propertyType: "house",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      parking: 2,
      yearBuilt: 2010
    },
    amenities: ["Backyard", "Garage", "Updated Kitchen", "Hardwood Floors", "Central AC", "Near Schools"],
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    status: "available",
    agent: {
      name: "David Thompson",
      phone: "+1 (555) 456-7890",
      email: "david.thompson@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
    },
    featured: true,
    createdAt: "2025-01-12T08:00:00Z",
    updatedAt: "2025-01-19T13:20:00Z"
  },
  {
    id: "prop-005",
    title: "Downtown Loft with Skyline Views",
    description: "Industrial-chic loft in the heart of downtown. Exposed brick walls, soaring ceilings, and massive windows with stunning city skyline views. Walking distance to restaurants, shops, and entertainment.",
    price: 2800,
    priceType: "rent",
    location: {
      address: "555 State Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60605",
      country: "USA",
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    propertyType: "apartment",
    features: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1500,
      parking: 1,
      yearBuilt: 2015
    },
    amenities: ["City Views", "Exposed Brick", "High Ceilings", "Gym", "Bike Storage", "Rooftop Deck"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    status: "available",
    agent: {
      name: "Jessica Martinez",
      phone: "+1 (555) 567-8901",
      email: "jessica.martinez@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
    },
    featured: true,
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-21T09:30:00Z"
  },
  {
    id: "prop-006",
    title: "Historic Bungalow with Modern Updates",
    description: "Charming 1920s bungalow lovingly restored with modern amenities. Original hardwood floors, crown molding, and built-ins preserved. Updated kitchen and bathrooms. Large front porch and mature landscaping.",
    price: 2200,
    priceType: "rent",
    location: {
      address: "678 Oak Avenue",
      city: "Savannah",
      state: "GA",
      zipCode: "31401",
      country: "USA",
      coordinates: { lat: 32.0809, lng: -81.0912 }
    },
    propertyType: "bungalow",
    features: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      parking: 1,
      yearBuilt: 1925
    },
    amenities: ["Historic District", "Hardwood Floors", "Front Porch", "Garden", "Updated Kitchen", "Crown Molding"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    status: "available",
    agent: {
      name: "Robert Williams",
      phone: "+1 (555) 678-9012",
      email: "robert.williams@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
    },
    featured: true,
    createdAt: "2025-01-14T10:30:00Z",
    updatedAt: "2025-01-20T15:00:00Z"
  },
  {
    id: "prop-007",
    title: "Contemporary Studio in Arts District",
    description: "Sleek studio apartment in the vibrant arts district. Perfect for young professionals. Features modern finishes, efficient layout, and building amenities. Steps from galleries, cafes, and nightlife.",
    price: 1400,
    priceType: "rent",
    location: {
      address: "234 Gallery Lane",
      city: "Portland",
      state: "OR",
      zipCode: "97209",
      country: "USA",
      coordinates: { lat: 45.5231, lng: -122.6765 }
    },
    propertyType: "studio",
    features: {
      bedrooms: 0,
      bathrooms: 1,
      sqft: 550,
      parking: 0,
      yearBuilt: 2019
    },
    amenities: ["Modern Kitchen", "Gym", "Bike Storage", "Package Room", "Pet Friendly", "High-Speed Internet"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"
    ],
    status: "available",
    agent: {
      name: "Amanda Lee",
      phone: "+1 (555) 789-0123",
      email: "amanda.lee@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200"
    },
    featured: false,
    createdAt: "2025-01-16T14:00:00Z",
    updatedAt: "2025-01-23T11:45:00Z"
  },
  {
    id: "prop-008",
    title: "Elegant Duplex with Private Entrance",
    description: "Sophisticated two-story duplex offering privacy and space. Separate entrances, private outdoor areas, and modern finishes throughout. Perfect for multi-generational living or rental income opportunity.",
    price: 3500,
    priceType: "rent",
    location: {
      address: "890 Elm Street",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "USA",
      coordinates: { lat: 42.3601, lng: -71.0589 }
    },
    propertyType: "duplex",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      parking: 2,
      yearBuilt: 2016
    },
    amenities: ["Private Entrance", "Backyard", "Garage", "Hardwood Floors", "Central AC", "Washer/Dryer"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
    ],
    status: "available",
    agent: {
      name: "Christopher Davis",
      phone: "+1 (555) 890-1234",
      email: "christopher.davis@kinghomes.com",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200"
    },
    featured: false,
    createdAt: "2025-01-11T09:30:00Z",
    updatedAt: "2025-01-24T10:00:00Z"
  }
];
