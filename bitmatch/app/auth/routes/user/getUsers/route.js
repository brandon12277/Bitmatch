

import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextRequest, NextResponse } from "next/server"
import Likes from "@/models/likes";



export async function GET(request){
  const searchparams = request.nextUrl.searchParams
  const id = searchparams.get("id")



  console.log(id)
   
    

    try {
        await connectDb()
        const users = await Users.aggregate([{ $sample: { size: 10 } }]);
        
        const data = {
          "liked_by" : id
         }
           
        const likes = await Likes.find(data)
        console.log(likes)
          
       return NextResponse.json({"data":users,"likes":likes},{status:201})
      } catch (error) {
        
        console.error('Error fetching random users:', error);
        return NextResponse.json({"data":"Not Found"},{status:400})
      }

}