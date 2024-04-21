import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import mongoose from "mongoose"


import bcrypt from "bcrypt"


export async function POST(request){
    const { email,name,password,gender} =await request.json();
    await connectDb()
    const data ={
        "name":name,
        "email" : email,
        "password" : '',
        "userProfileSet": false,
        "userDetails":{
            "img":[],
            "about":"",
            "stack":[],
            "gender":"male"
        }

        }
    bcrypt.genSalt(3, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            data["password"] = hash

                
           
            await Users.create(data);
            return NextResponse.json({data},{status:201});
            
        });
    });



    return NextResponse.json({data},{status:201});
   
    
    
    
    

}