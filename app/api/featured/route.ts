import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 6;

    // Query Supabase table
    const { data, error } = await createClient()
      .from("listings")
      .select("*")
      .eq("featured", true)
      .limit(limit);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Error fetching featured properties:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured properties" },
      { status: 500 }
    );
  }
}
