import Chat from "@/models/chatRoom";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"






export async function POST(request){
    const { person1,person2} =await request.json();
    await connectDb()
    const data ={
       "person1":person1,
       "person2":person2,
       "messages":[]
        }
    let get_room = await Chat.findOne(data)

    if(!get_room){
   
         
    let create_room = await Chat.create(data)
    let get_room = await Chat.findOne(data)

    if(get_room){
        return NextResponse.json(get_room,{status:201});
    }
    else{
        return NextResponse.json(false,{status:201});
    }
}


   
   
    
    
    
    

}