import Users from "@/models/users";

import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import bcrypt from "bcrypt"

export async function POST(request){
    const { email,password} =await request.json();
    try{
        
        connectDb()
        console.log(email,password)
        const finduser = {
            email  : email
        }

        

        
        const user = await Users.findOne(finduser)
         
       
        
        console.log(user.password)
        if(user){
            
           const res = await bcrypt.compare(password, user.password);
            
          
            
      
            if(res)return NextResponse.json({user},{status:201});
            else
            return NextResponse.json({message:"Not Found"},{status:400});
           
        }
        else{
            return NextResponse.json({message:"Not Found"},{status:400});
        }
       }

       catch(err){
           console.log(err)
       }
        
        
       return NextResponse.json({message:"Not Found"},{status:400});
    
    
    

}