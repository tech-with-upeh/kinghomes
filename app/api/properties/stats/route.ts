import { NextResponse } from "next/server";
import { propertyService } from "@/backend/services/propertyService";

export async function GET() {
  try {
    const stats = await propertyService.getStatistics();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch statistics",
      },
      { status: 500 }
    );
  }
}
