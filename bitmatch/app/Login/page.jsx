
"use client"

import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";

import '@/styles/globals.css';
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import firebase_app from "@/utils/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import CryptoJS from 'crypto-js';
import "./log.css"
import Navbar from "@/components/navbar";
 
const poppinsthick = Poppins({
    weight: '800',
    subsets: ['latin'],
  })

  const interthin = Inter({
    weight: '400',
    subsets: ['latin'],
  })





const Login = () =>{

  const[on,SetOn] = useState(null)

  const [formData, setFormData] = useState({
    password: '',
    email:''
  });
  const handleChange = (e) => {
      const { name, value } = e.target;
     setFormData({
      ...formData,
      [name]: value
    });
  };

  const notify = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);


  const handleForm = async () =>{
    SetOn(1);
     try{
    const login = await axios.post("/auth/routes/user/loginUser",formData)
   

    if(login){
        console.log(login.data.user)
        localStorage.setItem("user",JSON.stringify(login.data.user))
        localStorage.setItem("auth",true)
        notifySuccess("Congratulation!! You logged in")
        window.location.href= "/"
    }
     }
     catch(err){
      SetOn(null)
        console.log(err)
     }
  
   
    
      
  }

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(firebase_app);

  async function googleSignIn() {
   let result = null,
     error = null;
   try {
     result = await signInWithPopup(auth, googleProvider);
       if (result.user) {
           const userData = {
               uid: result.user.uid,
               name: result.user.displayName,
               img: result.user.photoURL,
               email: result.user.email,
             };

           console.log(userData)
           const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userData), 'secret key 123').toString();
           localStorage.setItem('user', ciphertext);
           localStorage.setItem('auth', "true");

           return true;
       } else {
         throw new Error("Access denied. Your email does not match xyz@gmail.com.");
       }
   } catch (e) {
     error = e;
   }
 
   return { result: false, error };
 }


 const googleClick = async (e) => {
   e.preventDefault();
   try {
     const { result, error } = await googleSignIn();
     if (error) {
       notify("Login failed, Please try again");
       return;
     } else {
       notifySuccess("Congratulations! 🎉 Your login was successful");
       window.location.href = '/';
       return;
       
     }
   } catch (error) {
     notify("Login failed, Please try again");
     return;
   }
 };
 
     return(
      <>
     
         <div className="w-full h-100 m-0 flex justify-center items-center flex-col bck-main ">
         <div className="w-full flex items-center justify-center  p-5">
         <img src="/images/bitm.png" style={{width:"150px",height:"auto"}}></img> 
      </div>
          <div className=" w-[60vh] shadow-lg rounded-lg px-8 py-10 gap-10 flex justify-center items-center flex-col bg-white">

                      <div className="flex justify-center items-center flex-col">
         
                       <h2 className="font-bold text-2xl text-gray-600">Login</h2>
                       <p>Dont have an account yet? <span><a style={{color:"#635848"}} href="/SignUp">Sign up</a></span></p>
                       </div>
        
                        <div className="w-full m-5 flex flex-col justify-center items-center gap-5">
                             
                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Email Address</label>
                                 <input onChange={handleChange} type="text" name="email" placeholder="Email" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex  gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img> Password</label>
                                 <input onChange={handleChange} type="password" name="password" placeholder="Password" class="w-full log-input"></input>

                              </div>

                              {

                                  !on?
                              <button onClick={handleForm} className="bg-yellow-500 px-10 py-2 rounded-full shadow">Login</button>
                              :
                              <>
                                 <ClipLoader
        color={"yellow"}
       
        size={50}
       
      />
                              </>
                               
                                 }

                        </div>
         
            

             


          </div>

         </div>
         

      </>
     )

}

export default Login