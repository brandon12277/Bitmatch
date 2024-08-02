import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"

import mongoose from "mongoose"


import bcrypt from "bcrypt"


export async function POST(request){
    const { email,name,password} =await request.json();
    await connectDb()
    
    console.log(email,name,password)
    

    try{

        const data ={
            "name":name,
            "email" : email,
            "password" : password,
            "userProfileSet": false,
            "userDetails":{
                "img":[],
                "about":"",
                "location":"",
                 "age" : 0, 
                "stack":[],
                "gender":"male",
                "education":[{ index: 1, university: '', branch: '' }],
                "ImpLinks" :[{ index: 1, linkType: '', url: '' }],
                "workExp" :0,
                "currentJob":"",
                "currentTitle":"",
        
            }
    
            }
    
        let user = "";
        if(password === ''){
           console.log("HI")
           user = await Users.create(data);
           return NextResponse.json({user},{status:201});

        }
        else
        {
    bcrypt.genSalt(3, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            data["password"] = hash

                
           
             user =  await Users.create(data);
             return NextResponse.json({user},{status:201});
            
        });
    });
     
    console.log(user)
    return NextResponse.json({user},{status:201});
     }



    
    }
    catch(err){
        console.log(err)

        return NextResponse.json(false,{status:400});

    }
   
    
    
    
    

}