import Likes from "@/models/likes";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"



export async function POST(request){

    const { liked,liked_by,like } =await request.json();
    try{

        await connectDb()
        
        let likeData = false;
        if(like === "true")likeData = true;
         
        const data = {
            "liked_by":liked_by,
            "liked":liked,
            "like" : likeData
        }

        await Likes.create(data)
        return NextResponse.json({message:"Added"},{status:201});
       }

       catch(err){
           console.log(err)
       }
        
        
       return NextResponse.json({message:"Not Found"},{status:400});
    
    
    

}