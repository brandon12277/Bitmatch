"use client"

import BottomNavbar from "@/components/userNavbar";

import { useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
const Comms =()=>{
   
    const [search,setSearch] = useState(null)
   const [comms,setComms] = useState(null)
   const [searchRes,setRes] = useState(null)
   const [msgs,setMsgs] = useState([])
   const [curr_msg,setCurrMsg] = useState("")
   const [user,setUser] = useState("")
   const router = useRouter();
   const socket = io('https://bitmatch.onrender.com');
   socket.on('connect', () => {
      console.log('Connected to server');
      
  });


   useEffect(()=>{
     
    const user_d = JSON.parse(localStorage.getItem("user"))
    if(!user_d){
        router.push("/")
    }
    setUser(user_d)
    const FormData = async () =>{
           
       
        

        const response = await axios.get('/auth/routes/communities/getComms')
         
        setComms(
        response.data.map(item=>(
            <div className="w-full p-8 shadow-lg rounded-lg">
                <div className=" flex items-center justify-start gap-10 mb-10">

                    <img className="rounded-full border-black border-2 w-24 h-24" src={item.img} ></img>
                    <div className="text-left">
                        <h1 className="text-3xl font-bold mb-6">
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
                    <button onClick={()=>{
                        window.location.href="/communities/"+item._id
                    }} className=" bg-yellow-400 px-8 py-2 rounded-lg shadow-lg "> View Community</button>

                </div>

            </div>
        ))
    )

    socket.emit('joinForum',comms.commChatId); 

    }

    FormData()

   
       
   },[])

   const getNames = async () =>{ 
     
       const names = await axios.get('/auth/routes/communities/getCommsByName/?name='+search)

       if(names.data){

        console.log(names.data[0].img)
              
        setRes(
            <div className="p-6 w-80 shadow-lg">

             {
                names.data.map(item=>(
                  <>
                    <button onClick={()=>{
                        window.location.href="/communities/"+item._id
                    }} className="p-2 w-full flex items-center gap-6">
                         <img className="rounded-full border-black border-2 w-16 h-16" src={item.img}></img>
                         <h1 className="font-semibold text-xl ">{item.name}</h1>
                    </button>
                  </>
                ))
            }
             </div>
        )
       }

   }

   

   const addMessage = (msg,u_name,u_img) =>{
          
      
      
     
       let msgArr = msgs
       msgArr.push(
           <div className="m-2 py-2 px-4  w-[60vh] ">
           <div className="p-6 flex gap-4">
               <img className="w-12 h-12" src={u_img}></img>
               <div>
               <h2 className="font-semibold">{u_name}</h2>
               <h3>{msg}</h3>
               </div>
             
           </div>
          

       </div> 
       )

       setMsgs(msgs => [...msgs, msgArr]);
         
   }
   

  

   const sendMessage = async (e) =>{

       console.log(curr_msg)
      
       const now = new Date();
     

       const hours = now.getHours(); 
       const minutes = now.getMinutes(); 
       let formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
       let data = {
           "sender":user_id,
           "senderImg":user_img,
           "text":curr_msg,
          
          
          }

          console.log(data)
          
       // const text = await axios.post("/auth/routes/chat/addChat",data)
      
      let msgArr = []
       msgArr.push(
           <div className="m-2 py-2 px-4  w-[60vh] ">
               <div className="p-6 flex gap-4">
                   <img className="w-12 h-12" src={user_img}></img>
                   <div>
                   <h2 className="font-semibold">{username}</h2>
                   <h3>{curr_msg}</h3>
                   </div>
                 
               </div>
              

           </div> 
       )

       setMsgs(msgs => [...msgs, msgArr]);

       console.log(msgArr)
       let ChatId = comms.commChatId
        
       socket.emit('recieveForumMsg', { ChatId, curr_msg , username ,user_img }); 
        
    }
    socket.on('sendForumMsg',(msg) => {
       console.log(msg)

       addMessage(msg.curr_msg,msg.username,msg.user_img)
        
     })

    return (
    <div className="w-full h-screen flex items-center justify-center">
    COMING SOON
    </div>
    )
//         <>
//         {
//             !user && !comms?
//             <Loader/>
//             :

//     <>
        
//         <BottomNavbar/>

// <div className="w-full flex justify-center items-center relative">
//         <div className="uni-border relative flex">

//            <div className=" px-2  py-6 w-[35vh] flex items-start justify-center border">

//                <button className=" px-8 py-2 poppins  inline-flex items-center rounded-lg shadow-lg font-semibold text-black-500  bg-yellow-500  " onClick={()=>{ window.location.href= "/communities/new"}}>+ New Community</button>

//            </div>
           
//            <div className="w-full flex items-center justify-start flex-col">


//             <div className="w-full flex items-center gap-4 justify-center p-4">

//             <div className="w-full flex flex-col gap-6 items-center justify-center">
//                 <div className="w-full flex items-center justify-center">

               
//               <input   type="text" name="age" onChange={(e)=>{setSearch(e.target.value) }}   className=" w-80 border-l border-t border-b border-gray-800 border-r-0 rounded-l-lg p-2 focus:outline-none focus:border-blue-500"></input>
//               <button onClick={getNames} class="bg-gray-800 shadow rounded-r-full p-2 border-r border-t border-b border-gray-800 border-l-0  text-white">
//                         Search
//             </button>
//             </div>
//             <>
//             {searchRes}
//             </>
//             </div>

//             <button className="outline-none border-none ">
//      <img style={{ width:"20px",height:"auto" }} src="/images/filter.png"></img> 
//      </button>

           
//             </div>


//             <div className="w-full p-4 overflow-scroll h-[80vh] flex flex-col gap-8">

//                     {
//                         comms?
//                         <>
//                         {comms}
//                         </>
//                         :
//                         <>
//                         </>
//                     }

//             </div>

//             </div>

          
               

 
//         </div>
       

// </div>

// </>
// }
//         </>
   
    // )
}

export default Comms;