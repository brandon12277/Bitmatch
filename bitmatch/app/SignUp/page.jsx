"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import toast, { Toaster } from "react-hot-toast";
import '@/styles/globals.css';
import "../Login/log.css"
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import axios from "axios"
 
const poppinsthick = Poppins({
    weight: '800',
    subsets: ['latin'],
  })

  const interthin = Inter({
    weight: '400',
    subsets: ['latin'],
  })

  const notify = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

const SignUp = () =>{
     
   const[on,setOn] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
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

      const handleForm = async () =>{
         setOn(1)
         try{
        const createUser = await axios.post("/auth/routes/user/createUser",formData)

        if(createUser){
            console.log(createUser.data)
            notifySuccess("Congratulation!! Your account is created")
            
            window.location.href= "/Login"
        }
         }
         catch(err){
            setOn(null)
            console.log(err)
         }

        
          
      }
 
     return(
       <>
       
         <div className="w-full h-100 flex justify-center items-center flex-col bck-main ">
         <div className="w-full flex items-center justify-center p-5">
         <img src="/images/bitm.png" style={{width:"150px",height:"auto"}}></img> 
      </div>
          <div className="w-[65vh] m-2 rounded-lg shadow-lg bg-white px-8 py-10 gap-6 flex justify-center items-center flex-col">

                      <div className="flex justify-center items-center flex-col">
         
                       <h2 className="font-bold text-grey">Sign Up</h2>
                       <p>Already have an account? <span><a style={{color:"#635848"}} href="/Login">Login</a></span></p>
                       </div>
                       
        
                        <div className="w-full m-5 flex flex-col justify-center items-center gap-2">
                             
                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Email Address</label>
                                 <input onChange={handleChange} type="text" name="email" placeholder="Email" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2"> <img style={{width:"20px",height:"auto"}} src="/images/email.png"></img> Name</label>
                                 <input onChange={handleChange} type="text" name="name" placeholder="Email" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img> Password</label>
                                 <input onChange={handleChange} type="password" name="password" placeholder="Password" class="w-full log-input"></input>

                              </div>

                              <div className="form">
                                 
                                 <label className="font-bold flex items-center gap-2 p-2"> <img style={{width:"20px",height:"auto"}} src="/images/pass.png"></img>Confirm Password</label>
                                 <input onChange={handleChange} type="password" name="confirm_password" placeholder="Password" class="w-full log-input"></input>

                              </div>

                              {

!on?
<button onClick={handleForm} className="bg-yellow-500 px-10 py-2 rounded-full shadow">Sign Up</button>
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

export default SignUp