import { supabase } from "@/lib/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;

    const {data, error} = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();
    
        if(error){
            return NextResponse.json({error}, {status: 500});
        }

        return NextResponse.json(data, {status: 200});
}