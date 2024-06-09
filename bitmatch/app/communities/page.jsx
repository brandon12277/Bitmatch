"use client"

import BottomNavbar from "@/components/userNavbar";

import { useEffect, useState } from "react";

import axios from "axios";

const Comms =()=>{

    const [search,setSearch] = useState(null)
   const [comms,setComms] = useState(null)


   useEffect(()=>{

    const FormData = async () =>{

        const response = await axios.get('/auth/routes/communities/getComms')
         
        setComms(
        response.data.map(item=>(
            <div className="w-full p-8 shadow-lg rounded-lg">
                <div className=" flex items-center justify-start gap-10 mb-10">

                    <img className="rounded-full border-black border-2 w-24 h-24" src={item.img} ></img>
                    <div className="text-left">
                        <h1 className="text-xl font-bold mb-6">
                        {item.name}
                        </h1>
                        
                        <div className="flex gap-4">
                            {
                                item.stack.map(tech=>(
                                    <div className="text-center text-white px-8 py-2 bg-yellow-900 rounded-lg shadow-lg">
                                        {tech}
                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>
                <div className="text-left">
                  {item.descp}
                </div>
                <div className=" mt-8 ">
                    <button className=" bg-yellow-400 px-8 py-2 rounded-lg shadow-lg "> View Community</button>

                </div>

            </div>
        ))
    )

    }

    FormData()

   
       
   },[])

    return (
        <>
        <BottomNavbar/>

<div className="w-full flex justify-center items-center relative">
        <div className="uni-border relative flex">

           <div className=" px-2  py-6 w-[35vh] flex items-start justify-center border">

               <button className=" px-8 py-2 poppins  inline-flex items-center rounded-lg shadow-lg font-semibold text-black-500  bg-yellow-500  " onClick={()=>{ window.location.href= "/communities/new"}}>+ New Community</button>

           </div>
           
           <div className="w-full flex items-center justify-start flex-col">


            <div className="w-full flex items-center gap-4 justify-center p-4">

            <div className="w-full flex items-center justify-center gap-4">
              <input   type="text" name="age" onChange={(e)=>{setSearch(e.target.value) }}   className=" w-80 border-yellow-400 border rounded p-2 focus:outline-none focus:border-blue-500"></input>
              <button class="bg-yellow-500 shadow rounded p-2">
                        Search
            </button>
            </div>

            <button className="outline-none border-none ">
     <img style={{ width:"20px",height:"auto" }} src="/images/filter.png"></img> 
     </button>

           
            </div>


            <div className="w-full p-4 overflow-scroll h-[80vh]">

                    {
                        comms?
                        <>
                        {comms}
                        </>
                        :
                        <>
                        </>
                    }

            </div>

            </div>

          
               

 
        </div>
       

</div>


        </>
    )
}

export default Comms;