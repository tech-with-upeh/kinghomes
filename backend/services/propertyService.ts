import { Property, mockProperties } from "../data/properties";

export interface PropertyFilters {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
  featured?: boolean;
  status?: "available" | "pending" | "sold";
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
}

class PropertyService {
  private properties: Property[] = mockProperties;

  /**
   * Get all properties with optional filtering and pagination
   */
  async getProperties(
    filters?: PropertyFilters,
    pagination?: PaginationOptions
  ): Promise<PropertySearchResult> {
    let filteredProperties = [...this.properties];

    // Apply filters
    if (filters) {
      if (filters.propertyType && filters.propertyType !== "All") {
        filteredProperties = filteredProperties.filter(
          (p) => p.propertyType.toLowerCase() === filters.propertyType?.toLowerCase()
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProperties = filteredProperties.filter(
          (p) => p.price >= filters.minPrice!
        );
      }

      if (filters.maxPrice !== undefined) {
        filteredProperties = filteredProperties.filter(
          (p) => p.price <= filters.maxPrice!
        );
      }

      if (filters.bedrooms !== undefined) {
        filteredProperties = filteredProperties.filter(
          (p) => p.features.bedrooms >= filters.bedrooms!
        );
      }

      if (filters.bathrooms !== undefined) {
        filteredProperties = filteredProperties.filter(
          (p) => p.features.bathrooms >= filters.bathrooms!
        );
      }

      if (filters.city) {
        filteredProperties = filteredProperties.filter(
          (p) => p.location.city.toLowerCase() === filters.city?.toLowerCase()
        );
      }

      if (filters.state) {
        filteredProperties = filteredProperties.filter(
          (p) => p.location.state.toLowerCase() === filters.state?.toLowerCase()
        );
      }

      if (filters.featured !== undefined) {
        filteredProperties = filteredProperties.filter(
          (p) => p.featured === filters.featured
        );
      }

      if (filters.status) {
        filteredProperties = filteredProperties.filter(
          (p) => p.status === filters.status
        );
      }
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProperties.length / limit);

    return {
      properties: paginatedProperties,
      total: filteredProperties.length,
      page,
      totalPages,
    };
  }

  /**
   * Get a single property by ID
   */
  async getPropertyById(id: string): Promise<Property | null> {
    const property = this.properties.find((p) => p.id === id);
    return property || null;
  }

  /**
   * Get featured properties
   */
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    return this.properties
      .filter((p) => p.featured && p.status === "available")
      .slice(0, limit);
  }

  /**
   * Search properties by keyword
   */
  async searchProperties(
    keyword: string,
    pagination?: PaginationOptions
  ): Promise<PropertySearchResult> {
    const searchTerm = keyword.toLowerCase();
    
    const filteredProperties = this.properties.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.state.toLowerCase().includes(searchTerm) ||
        p.location.address.toLowerCase().includes(searchTerm) ||
        p.propertyType.toLowerCase().includes(searchTerm)
    );

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProperties.length / limit);

    return {
      properties: paginatedProperties,
      total: filteredProperties.length,
      page,
      totalPages,
    };
  }

  /**
   * Get similar properties based on property type and price range
   */
  async getSimilarProperties(
    propertyId: string,
    limit: number = 4
  ): Promise<Property[]> {
    const property = await this.getPropertyById(propertyId);
    if (!property) return [];

    const priceRange = property.price * 0.2; // 20% price range

    return this.properties
      .filter(
        (p) =>
          p.id !== propertyId &&
          p.propertyType === property.propertyType &&
          p.price >= property.price - priceRange &&
          p.price <= property.price + priceRange &&
          p.status === "available"
      )
      .slice(0, limit);
  }

  /**
   * Get properties by location
   */
  async getPropertiesByLocation(
    city: string,
    state?: string,
    limit?: number
  ): Promise<Property[]> {
    let filtered = this.properties.filter(
      (p) => p.location.city.toLowerCase() === city.toLowerCase()
    );

    if (state) {
      filtered = filtered.filter(
        (p) => p.location.state.toLowerCase() === state.toLowerCase()
      );
    }

    if (limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }

  /**
   * Get unique cities from all properties
   */
  async getCities(): Promise<string[]> {
    const cities = [...new Set(this.properties.map((p) => p.location.city))];
    return cities.sort();
  }

  /**
   * Get unique states from all properties
   */
  async getStates(): Promise<string[]> {
    const states = [...new Set(this.properties.map((p) => p.location.state))];
    return states.sort();
  }

  /**
   * Get property statistics
   */
  async getStatistics() {
    return {
      totalProperties: this.properties.length,
      availableProperties: this.properties.filter((p) => p.status === "available").length,
      featuredProperties: this.properties.filter((p) => p.featured).length,
      averagePrice: Math.round(
        this.properties.reduce((sum, p) => sum + p.price, 0) / this.properties.length
      ),
      propertyTypes: [...new Set(this.properties.map((p) => p.propertyType))],
    };
  }
}

// Export singleton instance
export const propertyService = new PropertyService();
