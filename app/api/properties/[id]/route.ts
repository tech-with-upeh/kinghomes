import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "@/backend/services/propertyService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await propertyService.getPropertyById(params.id);

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: "Property not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch property",
      },
      { status: 500 }
    );
  }
}
