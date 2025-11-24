import { NextRequest, NextResponse } from "next/server";
import { propertyService } from "@/backend/services/propertyService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("q") || "";

    if (!keyword) {
      return NextResponse.json(
        {
          success: false,
          error: "Search keyword is required",
        },
        { status: 400 }
      );
    }

    const pagination = {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
    };

    const result = await propertyService.searchProperties(keyword, pagination);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error searching properties:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search properties",
      },
      { status: 500 }
    );
  }
}
