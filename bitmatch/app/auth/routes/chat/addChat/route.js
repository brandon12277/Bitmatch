import Chat from "@/models/chatRoom";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import mongoose from "mongoose"





export async function POST(request){
    const { person1,person2,text,date,type} =await request.json();
    await connectDb()
    const data ={
       "person1":person1,
       "person2":person2
        }

   
         
    let check1 = await Chat.findOne(data)

    

    if(check1){
        
        

         await Chat.findByIdAndUpdate(
            check1._id, 
            { $push: { 
                messages: {
                    sender: person1, 
                    receiver: person2, 
                    text: text ,
                    date : date,
                    type : type
                } 
            }},
            { new: true }
          );

         
        return NextResponse.json(check1._id,{status:201});
    }
    else{

        const data2 ={
            "person1":person2,
            "person2":person1
             }

        let check2 = await Chat.findOne(data2)

        if(check2){

            await Chat.findByIdAndUpdate(
                check2._id, 
                { $push: { 
                    messages: {
                        sender: person1, 
                        receiver: person2, 
                        text: text ,
                        date : date,
                        type : type
                    } 
                }},
                { new: true }
              );
            return NextResponse.json(check2._id,{status:201});
        }
        else
        return NextResponse.json(false,{status:201});
    }


   
   
    
    
    
    

}