import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "@/backend/services/propertyService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 6;

    const properties = await propertyService.getFeaturedProperties(limit);

    return NextResponse.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured properties",
      },
      { status: 500 }
    );
  }
}
