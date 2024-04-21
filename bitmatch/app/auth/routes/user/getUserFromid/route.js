

import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextRequest, NextResponse } from "next/server"




export async function GET(request){
  const searchparams = request.nextUrl.searchParams
  const id = searchparams.get("id")




    

    try {
        
        const data = {
          "_id" : id
         }
           
        const user= await Users.find(data)
          
       return NextResponse.json(user,{status:201})
      } catch (error) {
        
        console.error('Error fetching random users:', error);
        return NextResponse.json(false,{status:400})
      }

}