"use client"

import '@/styles/globals.css';
import {useState,useEffect} from "react"


import Navbar from '@/components/navbar';
import MainUserPage from '@/components/MainPage';
import DefaultPage from '@/components/landingPage';
import Loader from '@/components/loader';


 


const Home = () =>{

  const [user,setUser] = useState(null)
  const [auth,setAuth] = useState(null)
  
  
  
  
  useEffect(()=>{

      if(typeof window !=undefined){

      let userdata = localStorage.getItem("user")
      
     
      console.log(userdata)
      setUser(JSON.parse(userdata))
      setAuth(localStorage.getItem("auth"))
      }

      

     
      
       
  },[])

  

 

 
     return(
      <>

{
 auth && !user?
    <Loader/>
 :
    user ?
    <MainUserPage/>
    :
    <DefaultPage/>
}
   

      </>

     )

}

export default Home