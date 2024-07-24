

import Comms from "@/models/communities";
import connectDb from "@/utils/mongodb"
import { NextRequest, NextResponse } from "next/server"




export async function GET(request){

  const searchparams = request.nextUrl.searchParams
  const id = searchparams.get("id")



console.log(id)

    

    try {
        
        const data = {
          "_id" : id
         }
           
        const comms= await Comms.find(data)
        console.log(comms)
          
       return NextResponse.json(comms[0],{status:201})
      } 
      catch (error) {
        
        console.error('Error fetching random users:', error);
        return NextResponse.json(false,{status:400})
      }

}