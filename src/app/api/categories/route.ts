import { supabase } from "@/lib/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const {data, error} = await supabase
        .from('category')
        .select('*')
        .order('id', { ascending: true });
    
        if(error){
            return NextResponse.json({error}, {status: 500});
        }

        return NextResponse.json(data, {status: 200});
}