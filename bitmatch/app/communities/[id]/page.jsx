"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import ChatForum from "./ChatForum";
import BottomNavbar from "@/components/userNavbar";


const Comm = ({ params }) =>{
    
    const socket = io('https://bitmatch.onrender.com');
    socket.on('connect', () => {
       console.log('Connected to server');
       
   });
    const { id } = params
    const [comm,setComm] = useState(null)
    const [user,setUser] = useState(null);
    const router = useRouter();
   
     
    useEffect(()=>{

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
          });
        console.log(id)

        let userdata = localStorage.getItem("user")
      
        const user_d = JSON.parse(userdata)

        
        if(!user_d){
            router.push("/")
        }
        
        setUser(user_d)

        const FetchData = async () =>{
            const data = await axios.get("/auth/routes/communities/getCommById/?id="+id);
            const res = data.data
           
            setComm(res)
    
        }
              
       
          FetchData()

        
      
       
         
    },[])

    

    return(
        <>
         <BottomNavbar/>
        {
            comm?
             
             <div className="w-full flex justify-center items-center relative">
             <div className="uni-border relative flex flex-col gap-4">

                <div className="w-full h-[30vh] shadow-lg" style={{ background : `url(${comm.img})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat" }}>
               </div>

   <div className="w-full text-left m-2 p-6 ">
    <div className="flex w-full items-center  justify-center ">
        <h2 className="text-6xl  font-bold font-poppins mb-10">{comm.name}</h2>
        <button className="flex w-full justify-end ">
             
             <img className="w-8 h-8" src="/images/settings.png"></img>
              
        </button>
    </div>
   
    <h2 className="text-lg   font-poppins">{comm.descp}</h2>

   </div>

   <div className="w-full text-left m-2 px-6">
     
      <button className="bg-yellow-300 shaow-lg rounded-lg px-8 py-2">+ Join Community</button>

   </div>
   <div className="w-full flex">
     
     <button className="w-full shadow-b p-6">Chat Forum</button>
     <button className="w-full shadow-b p-6">BitVids</button>
     <button className="w-full shadow-b p-6">Moderator Roles</button>

   </div>
   <div className="">

    <div className="chat-forum">

    <div className="chat-forum w-full ">

<div className="w-full h-[40vh] bg-red-500 overflow-scroll">

    {
       
      msgs.map(msgDiv=>(
         
        <>
          {msgDiv}
        </>

      ))
      
    }

</div>

<div className="p-2 flex w-full gap-6 ">
<input className="rounded border-grey-500 w-full" onChange={(e)=>{setCurrMsg(e.target.value)}}></input>
<button className="rounded py-2 px-6 shadow-lg" onClick={()=>{sendMessage()}}>Send Text</button>

</div>



</div>

    </div>

   </div>
                 </div>
            </div>
            :
            <></>
        }
        </>
    )
}

export default Comm;