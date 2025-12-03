import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    
    try {
        const body = await request.json();
        const { email, password } = body;
        
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }
        
        return NextResponse.json({ user: authData.user, message: "Login successful" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
