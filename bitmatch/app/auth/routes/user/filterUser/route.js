

import Users from "@/models/users";
import Likes from "@/models/likes";
import connectDb from "@/utils/mongodb"
import { NextRequest, NextResponse } from "next/server"




export async function POST(request){

  const {location,workExp,techStack,id} = await request.json(); 

  console.log(location,workExp,techStack,id)
   
    const matchData = {
      
      
      "userDetails.location" : location,
       "userDetails.workExp" : { $gte : workExp },
       "userDetails.stack" : { $in : techStack }    
      }

    

    try {
        await connectDb()
        console.log(matchData)
        const users = await Users.find(matchData)
        
        let userList = users.map((user,ind)=>{if(ind<10)return user})
        
        console.log(users,userList)
        const data = {
          "liked_by" : id
         }
           
        const likes = await Likes.find(data)
        console.log(likes)
        console.log("User filtered : ",users)
          
       return NextResponse.json({"data":users,"likes":likes},{status:201})
      } catch (error) {
        
        console.error('Error fetching random users:', error);
        return NextResponse.json({"data":"Not Found"},{status:400})
      }
    
   


  
  

}