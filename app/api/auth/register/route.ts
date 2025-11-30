import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
 
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const { data: exist,  error: err } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

    if (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

    if (exist && exist.length > 0) {
        return NextResponse.json(
            { error: "Email already exists. Please log in." },
            { status: 400 }
        );
    }


    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const user =authData.user;
    

    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ error: "User not created" }, { status: 500 });
    }

    const { data , error } = await supabase
    .from("users")
    .insert([{name, userID:userId, email:email}])
    .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({  user:authData.user?.email,profile:data, message:"Please check your email to verify your account." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
}