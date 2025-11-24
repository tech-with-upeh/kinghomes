# KingHomes Backend API

Professional mock API service for the KingHomes real estate platform. This backend provides realistic property data without requiring external API keys or payment.

## 📁 Directory Structure

```
backend/
├── data/
│   └── properties.ts          # Property data models and mock data
├── services/
│   └── propertyService.ts     # Business logic and data operations
```

## 🚀 API Endpoints

All endpoints are available at `/api/properties/*`

### 1. Get All Properties
```
GET /api/properties
```

**Query Parameters:**
- `propertyType` - Filter by type (apartment, villa, studio, bungalow, duplex, flat, house)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Minimum bedrooms
- `bathrooms` - Minimum bathrooms
- `city` - Filter by city
- `state` - Filter by state
- `featured` - true/false
- `status` - available, pending, sold
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```javascript
fetch('/api/properties?propertyType=apartment&city=New York&page=1&limit=10')
```

**Response:**
```json
{
  "success": true,
  "data": {
    "properties": [...],
    "total": 8,
    "page": 1,
    "totalPages": 1
  }
}
```

---

### 2. Get Featured Properties
```
GET /api/properties/featured
```

**Query Parameters:**
- `limit` - Number of properties to return (default: 6)

**Example:**
```javascript
fetch('/api/properties/featured?limit=6')
```

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

---

### 3. Get Property by ID
```
GET /api/properties/[id]
```

**Example:**
```javascript
fetch('/api/properties/prop-001')
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prop-001",
    "title": "Modern Luxury Apartment",
    ...
  }
}
```

---

### 4. Search Properties
```
GET /api/properties/search
```

**Query Parameters:**
- `q` - Search keyword (required)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```javascript
fetch('/api/properties/search?q=luxury&page=1')
```

**Response:**
```json
{
  "success": true,
  "data": {
    "properties": [...],
    "total": 3,
    "page": 1,
    "totalPages": 1
  }
}
```

---

### 5. Get Statistics
```
GET /api/properties/stats
```

**Example:**
```javascript
fetch('/api/properties/stats')
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProperties": 8,
    "availableProperties": 8,
    "featuredProperties": 6,
    "averagePrice": 2738,
    "propertyTypes": ["apartment", "house", "villa", ...]
  }
}
```

---

## 📊 Property Data Model

```typescript
interface Property {
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
```

---

## 🎯 Usage Examples

### Fetch Featured Properties (Homepage)
```typescript
const fetchFeaturedProperties = async () => {
  const response = await fetch("/api/properties/featured?limit=6");
  const data = await response.json();
  
  if (data.success) {
    setProperties(data.data);
  }
};
```

### Search with Filters
```typescript
const searchProperties = async () => {
  const params = new URLSearchParams({
    propertyType: "apartment",
    city: "New York",
    minPrice: "1000",
    maxPrice: "3000",
    bedrooms: "2",
    page: "1",
    limit: "10"
  });
  
  const response = await fetch(`/api/properties?${params}`);
  const data = await response.json();
  
  if (data.success) {
    setProperties(data.data.properties);
  }
};
```

### Get Single Property Details
```typescript
const getPropertyDetails = async (id: string) => {
  const response = await fetch(`/api/properties/${id}`);
  const data = await response.json();
  
  if (data.success) {
    setProperty(data.data);
  }
};
```

---

## 🔄 Replacing with Real API

When you're ready to use a real API:

1. **Keep the same interface** - The Property type matches most real estate APIs
2. **Update the service** - Replace `propertyService.ts` methods with real API calls
3. **Add API key** - Store in `.env.local`:
   ```
   NEXT_PUBLIC_REAL_ESTATE_API_KEY=your_key_here
   ```
4. **Update endpoints** - Change fetch URLs to external API

Example replacement:
```typescript
// Before (Mock)
const response = await fetch("/api/properties/featured");

// After (Real API)
const response = await fetch(
  `https://api.realestateapi.com/properties?featured=true`,
  {
    headers: {
      'X-API-Key': process.env.NEXT_PUBLIC_REAL_ESTATE_API_KEY
    }
  }
);
```

---

## ✨ Features

- ✅ **8 Realistic Properties** - Diverse property types and locations
- ✅ **Real Images** - High-quality property photos from Unsplash
- ✅ **Full CRUD Support** - Ready for expansion
- ✅ **Filtering & Pagination** - Production-ready features
- ✅ **Search Functionality** - Keyword-based search
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **No External Dependencies** - Works offline
- ✅ **Easy to Extend** - Add more properties in `properties.ts`

---

## 📝 Adding More Properties

To add more properties, edit `backend/data/properties.ts`:

```typescript
export const mockProperties: Property[] = [
  // ... existing properties
  {
    id: "prop-009",
    title: "Your New Property",
    description: "...",
    price: 2000,
    priceType: "rent",
    // ... rest of the property data
  }
];
```

---

## 🎨 Image Sources

All property images are from [Unsplash](https://unsplash.com) - free to use with no attribution required.

To get more property images:
1. Visit https://unsplash.com
2. Search for "modern house", "apartment interior", etc.
3. Copy the image URL (format: `https://images.unsplash.com/photo-xxxxx?w=800`)

---

## 📄 License

This mock API is part of the KingHomes project and is free to use and modify.
