import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabase";

export async function GET() {
    const { data, error } = await supabase.from("items").select("*");
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 200 });
}
