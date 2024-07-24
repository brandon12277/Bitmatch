import Chat from "@/models/chatRoom";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import mongoose from "mongoose"





export async function POST(request){
    const { person1,person2} =await request.json();
    await connectDb()
    const data ={
       "person1":person1,
       "person2":person2
        }

   
         
    let check1 = await Chat.findOne(data)

    

    if(check1){
        
        

        const lastMessage = await Chat.findById(check1._id);

        if (lastMessage && lastMessage.messages && lastMessage.messages.length > 0) {
            const text = lastMessage.messages[lastMessage.messages.length-1].text;
            const type = lastMessage.messages[lastMessage.messages.length-1].type;
            console.log("Text of the last message:", text);
            return NextResponse.json({text : text,type  :type 
            },{status:201});

          } else {
            console.log("No messages found in the chat or messages block is empty");
            const text = "";
            const type =""
            console.log("Text of the last message:", text);
            return NextResponse.json({text : text,type : type },{status:201});
          }

         
        
    }
    else{

        const data2 ={
            "person1":person2,
            "person2":person1
             }

        let check2 = await Chat.findOne(data2)

        if(check2){

            const lastMessage = await Chat.findById(check2._id);

            if (lastMessage && lastMessage.messages && lastMessage.messages.length > 0) {
                
                const text = lastMessage.messages[lastMessage.messages.length-1].text;
                const type = lastMessage.messages[lastMessage.messages.length-1].type;
                console.log("Text of the last message:", text,type);
                return NextResponse.json({text : text,type  :type 
                },{status:201});
    
              } else {
                console.log("No messages found in the chat or messages block is empty");
                 const text = "";
                 const type =""
                console.log("Text of the last message:", text);
                return NextResponse.json({text : text,type  :type 
                },{status:201});
              }
        }
        else
        return NextResponse.json(false,{status:201});
    }


   
   
    
    
    
    

}