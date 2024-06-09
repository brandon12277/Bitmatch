"use client"

import {react,useState,useEffect} from "react"
import Navbar from "./navbar";
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Ruluko } from 'next/font/google'
import { Baskervville } from "next/font/google";
import About from "./about";

  const interthin = Inter({
    weight: '400',
    subsets: ['latin'],
  })

 
  

  const ruluko = Ruluko({
    weight: '400',
    subsets: ['latin'],
  })

const DefaultPage = () =>{
   

    return(
        <div className="overflow-hidden">
           
        <Navbar/>

         <div className ="w-full  flex flex-col ">
            
            <div className="w-full flex h-100 justify-center items-start  bck-main">
                <div className={` w-full mt-60 flex flex-col justify-center items-center intro-page text-center  gap-10`}>
                    <div >

                   
                      <h1 className={` text-trans`}>
                       
                               
                        Connect and Compile!!
                        </h1>
                        <br></br>
                        <h4 className={`text-center text-libre text-white text-xl`}>
                          Your pistop to meet your optimized
                          coders  
                        </h4>
                       
                    </div>

                    <div className={`flex justify-center items-center w-full gap-10`}>
                        <button className="ruluko bg-yellow-300 px-8 py-4 rounded-full font-[400] shadow">Get Started</button>
                        <button className="ruluko bg-yellow-300 px-8 py-4 rounded-full font-[400] shadow">Learn More</button>

                    </div>
                           


                      
                        
                </div> 
               

            </div>

            
        
             
         </div>
        

        
    
    </div>
    )



}

export default DefaultPage;