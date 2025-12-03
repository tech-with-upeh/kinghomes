import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { otp1, otp2, otp3, otp4, otp5, otp6, email } = body;

    // Convert each OTP digit to string safely and concatenate
    const otp = [otp1, otp2, otp3, otp4, otp5, otp6]
      .map((digit) => digit?.toString() ?? "")
      .join("");

    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "OTP verified successfully", otp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
