import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  // This clears the session server-side and removes cookies
  const data = await supabase.auth.getClaims();
  console.log("got here")
  console.log(data);
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message, data: data }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: data });
}
