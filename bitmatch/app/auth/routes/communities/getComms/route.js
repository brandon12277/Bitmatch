
import Comms from "@/models/communities";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"



export async function GET(req) {
    try {
         await connectDb()
  
      
     
  
      
      const randomDocs = await Comms.aggregate( [
        { $sample: { size: 10 } }
      ] )
  
      return NextResponse.json(randomDocs, { status: 201 });

    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'Unable to fetch documents' }, { status: 500 });
    }
  }