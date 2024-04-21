"use client"

import {react,useState,useEffect} from "react"
import Navbar from "./navbar";
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Ruluko } from 'next/font/google'
import { Baskervville } from "next/font/google";

  const interthin = Inter({
    weight: '400',
    subsets: ['latin'],
  })

 
  

  const ruluko = Ruluko({
    weight: '400',
    subsets: ['latin'],
  })

const About = () =>{
   

    return(
        <div className="relative flex justify-center items-center">
       

         <div className ="w-full  flex flex-col mt-20 p-20 about-b">
            <h4 className={` flex  items-center gap-10 mt-10 mb-10 text-platform`}> 
                 <hr className=" text-white">
                </hr>What to expect from our platform ?
            </h4>
                <h1 className={` flex  items-center gap-10 text-head`}>

                    <hr className=" text-white"></hr> Meet your very own hacker buddy!!
                </h1>
                <div className={`${ruluko.className} flex items-center gap-10 mt-10 w-full text-descp p-10`}>
                <p className="w-full">
                    
                    Artificial Intelligence (AI) is a rapidly advancing field of computer science that focuses on creating intelligent machines capable of performing tasks that typically require human intelligence. AI systems are designed to learn from data, recognize patterns, and make decisions with minimal human intervention. From virtual assistants like Siri and Alexa to self-driving cars and advanced medical diagnosis systems, AI technologies are revolutionizing various industries and changing the way we live and work. With ongoing research and development, AI holds the potential to address complex challenges and drive innovation in areas such as healthcare, transportation, finance, and more.
 
                    Artificial Intelligence (AI) is a rapidly advancing field of computer science that focuses on creating intelligent machines capable of performing tasks that typically require human intelligence. AI systems are designed to learn from data, recognize patterns, and make decisions with minimal human intervention. From virtual assistants like Siri and Alexa to self-driving cars and advanced medical diagnosis systems, AI technologies are revolutionizing various industries and changing the way we live and work. With ongoing research and development, AI holds the potential to address complex challenges and drive innovation in areas such as healthcare, transportation, finance, and more.
 
                    
                  </p>
                  <img style={{width:"auto",height:"400px"}} src="/images/gifcode.gif"></img>
                 
                </div>

              
            
            

            
        
             
         </div>
         
    
    </div>
    )



}

export default About;