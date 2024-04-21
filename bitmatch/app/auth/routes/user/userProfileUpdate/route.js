
import { NextResponse } from "next/server"
import { jsonParser, urlEncodedParser } from '@/utils/body-parser'
import ShortUniqueId from 'short-unique-id';
import mongoose from "mongoose"
import bcrypt from "bcrypt"

import { getStorage, ref,getDownloadURL, uploadBytes,uploadString,uploadBytesResumable } from "firebase/storage"

import firebaseApp from "@/utils/firebase";
import connectDb from "@/utils/mongodb"
import Users from "@/models/users"



function getCurrentDateTimeString() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Combine date and time
  const dateTimeString = `${dateString} ${timeString}`;

  return dateTimeString;
}


async function file_url(type,buff){

const storage = getStorage(firebaseApp);
const { randomUUID } = new ShortUniqueId({ length: 10 });
console.log(randomUUID)
const storageRef = ref(storage, "profile/"+randomUUID()+getCurrentDateTimeString());




await uploadString(storageRef, buff, 'data_url');
const downloadURL = await getDownloadURL(storageRef);

return downloadURL
}


  export async function POST(req,res){
       
      const { name,about,gender,buff,types,techData,email } = await req.json()
      await connectDb()
      const imgs = []
      console.log(about)

      const urls =  buff.map(async (buffer,idx)=>{

        const url = await file_url(types[idx],buffer)
        return url
          
          
      })

      const url_imgs = await Promise.all(urls);

      console.log(url_imgs)

      const userDetails = {
        
           "img" : url_imgs,
            "stack": techData,
            "gender" : gender,
            "about":about
            
     }

      const filter = {email: email }; 
      const update = { $set: { "name":name,"userProfileSet":true,"userDetails": userDetails}}; 

      try{
           const result = await Users.updateOne(filter, update);
           console.log('Document updated successfully:', result);
      }
      catch(err){
               
      }
       
     

      
      

      return NextResponse.json({"data":"done"},{status:201})
}

   
    
    
    
    

