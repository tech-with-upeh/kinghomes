import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "@/backend/services/propertyService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract filters from query params
    const filters = {
      propertyType: searchParams.get("propertyType") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined,
      bathrooms: searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : undefined,
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
      featured: searchParams.get("featured") === "true" ? true : undefined,
      status: searchParams.get("status") as "available" | "pending" | "sold" | undefined,
    };

    // Extract pagination params
    const pagination = {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
    };

    // Get properties
    const result = await propertyService.getProperties(filters, pagination);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch properties",
      },
      { status: 500 }
    );
  }
}
