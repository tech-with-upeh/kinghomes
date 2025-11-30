import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

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

    const from = (pagination.page - 1) * pagination.limit;
    const to = from + pagination.limit - 1;

    // Build Supabase query
    let query = createClient()
      .from("listings")
      .select("*")
      .range(from, to);

    if (filters.propertyType === "all" || filters.propertyType === "All") {
      delete filters.propertyType;
    }

    if (filters.propertyType) query = query.eq("propertyType", filters.propertyType);

    if (filters.city) {
      query = query.eq("location->>city", filters.city);
    }
    if (filters.state) {
      query = query.eq("location->>state", filters.state);
    }
    //if (filters.city) query = query.eq("city", filters.city);
    if (filters.featured !== undefined) query = query.eq("featured", filters.featured);
    if (filters.status) query = query.eq("status", filters.status);

    if (filters.minPrice) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice) query = query.lte("price", filters.maxPrice);

    if (filters.bedrooms) query = query.gte("bedrooms", filters.bedrooms);
    if (filters.bathrooms) query = query.gte("bathrooms", filters.bathrooms);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching properties:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
