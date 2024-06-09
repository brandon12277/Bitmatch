
"use client"


import Navbar from "@/components/navbar"
import '@/styles/globals.css';
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import CryptoJS from 'crypto-js';
import {useEffect,useState,useRef} from 'react';
import General from "@/components/profileGeneral";
import ImagesSelect from "@/components/profileImages";
import Tech from "@/components/profileTechStack";

import { getStorage, ref,getDownloadURL, uploadBytes,uploadString,uploadBytesResumable } from "firebase/storage"

import firebaseApp from "@/utils/firebase";
import BottomNavbar from "@/components/userNavbar";
import Loader from "@/components/loader";



 
const poppinsthick = Poppins({
    weight: '400',
    subsets: ['latin'],
  })

  



const ProfileCreation = () =>{
    
    const [page,setPage] = useState(1)
    const [settings,setSettings] = useState(null)
    const [techData,setTechData] = useState([])
    const [profileStrength,setStrength] = useState(0)

    const[user,setUser] = useState(null)
    const[auth,setAuth] = useState(null)
    const [imageData, setImageData] = useState({
        
        1:'',
        2:'',
        3:'',
        4:'',
        5:'',
        6:''
        
    });

    const [fileData, setFileData] = useState({
       
       1:'',
       2:'',
       3:'',
       4:'',
       5:'',
       6:''
       
   });

   const [formData, setFormData] = useState({
    first: '',
    last: '',
    about:'',
    gender:'',
    age:''
  });
  

  useEffect(()=>{
    const user_d = JSON.parse(localStorage.getItem("user"))
    console.log(user_d)
    setUser(user_d)
    
    let len = user_d.userDetails.img.length + user_d.userDetails.stack.length + (user_d.userDetails.about === ''?0:1) + (user_d.name === ''?0:1) 
   console.log(len,user_d.userDetails.img.length,user_d.userDetails.stack.length)
    setStrength(Math.floor((len/13)*100))
    
     
     
  },[])

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




      

  const handleForm = async () =>{
   
    const files = []
    const buffer = []

    Object.values(fileData).map((file)=>{
           if(file && file !="")files.push(file.type)
    })
    console.log(imageData)
    Object.values(imageData).map((buff,ind)=>{
      if(buff && buff !=""){
      console.log(buff)
       buffer.push(buff)
        
      }
      else
      return 

})



let userdata = localStorage.getItem("user")
console.log(JSON.parse(userdata))
const user = JSON.parse(userdata)


    const data = {
      "name" : formData.first+' '+formData.last,
      "about" : formData.about,
      "gender" : formData.gender,
      "age" : formData.age,
      "buff" : buffer,
      "types" : files,
      "techData" : techData,
      "email" : user.email

    }

    
     
   console.log(data)
    
    const makeChanges = await axios.post('/auth/routes/user/userProfileUpdate',data)

    if(makeChanges.data){
      console.log(makeChanges.data)
      let user_d  = JSON.parse(localStorage.getItem("user"))
      user_d["userProfileSet"] = true;
      localStorage.setItem("user",JSON.stringify(user_d))
      window.location.href= "/"

    }


  }

 const Logout = () =>{
    localStorage.removeItem("user")
    localStorage.removeItem("auth")
    window.location.href="/"

  }

 
 
     return(

       <div className="w-full flex justify-center items-center relative">
        <div className="uni-border relative">

       
         { 
         user?
          <>
           <BottomNavbar/>
           {/* <button style={{margin:"1%"}} onClick={Logout} className="get-start">Logout</button> */}
           
           {/* <div className="flex justify-center items-center p-4">
              <img src="/images/bitlogowhite.png" style={{width:"auto",height:"40px"}}></img>
           </div> */}
           

           <div className="flex justify-center items-center gap-10 p-4 mb-10">
             
             <div className=" w-full rounded-full shadow-lg">
               
                <div style={{width:`${profileStrength}%`}} className="flex poppins justify-start items-center p-4 h-10 bg-yellow-400 rounded-full shadow-lg">
                        <h3  className="p-3 text-white">Profile {profileStrength}% Completed</h3>
                </div>
               

             </div>
             <div className="relative">
             <button onClick={()=>{if(settings)setSettings(null); else setSettings(1)}} className="outline-none border-none ">
                <i className=" text-2xl fa-solid fa-gear"></i>
             </button>
             {
               settings?
             <div className="z-20 flex flex-col gap-5 bg-white absolute right-0 p-10 shadow rounded">
             
             <button className="flex gap-2 items-center outline-none border-none w-full" onClick={()=>{}} ><i class="fa-regular fa-id-card"></i> Profile</button>
                  <button className="flex gap-2 items-center outline-none border-none w-full" onClick={Logout}><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
                  
                    
             </div>
             :
             <></>
              }
             </div>
             
            
                
           </div>
            <div  className ={`${poppinsthick.className} ml-5 w-full justify-center `}>
            

            <h2 className='card-txt text-large text-black-900 font-bold text-lg capitalize mb-2'>Profile Photos</h2>
            <p className="text-grey-800 text-sm">Select photos to highlight your profile in the best way possible</p>
             
            <ImagesSelect
                imageData = {imageData} 
                setImageData={setImageData}
                fileData={fileData}
                setFileData={setFileData}
                imgs = {user.userDetails.img}
            />
            <General
               formData={formData}
               setFormData={setFormData}
               name = {user.name}
               about = {user.userDetails.about}
               gender = {user.userDetails.gender}
               age = {user.userDetails.age}
            
            />
            <Tech
              techData={techData}
              setTechData = {setTechData}
              tech = {user.userDetails.stack}
            
            />
          <button onClick={handleForm} className={`bg-yellow-400 px-4 py-4 rounded-full shadow mb-10 mt-10`}>Update Profile</button>
            </div>
            </>
            :
            <Loader/>
        }
         </div>
       </div>
     )

}

export default ProfileCreation