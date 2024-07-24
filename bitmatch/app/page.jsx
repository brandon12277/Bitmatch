"use client"

import '@/styles/globals.css';
import {useState,useEffect} from "react"


import Navbar from '@/components/navbar';
import MainUserPage from '@/components/MainPage';
import DefaultPage from '@/components/landingPage';
import Loader from '@/components/loader';


 


const Home = () =>{

  const [user,setUser] = useState(null)
  let auth =  localStorage ? localStorage.getItem("auth") : null;
  
  
  
  useEffect(()=>{

      let userdata = localStorage.getItem("user")
      
     
      console.log(userdata)
      setUser(JSON.parse(userdata))

      

     
      
       
  },[])

  

  const redirectToLink = (url) => {
    window.location.href = url;
  };

 
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