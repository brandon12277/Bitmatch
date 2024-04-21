
"use client"
import BottomNavbar from "@/components/userNavbar"
import axios from "axios"
import {react,useState,useEffect} from "react"
import Loader from "@/components/loader"
import "./chat.css"

import io from 'socket.io-client';



const Chat_Room = () =>{
     
    const[roomId,setRoom] = useState(null)
     const [user,setUser] = useState(null);
     const[reciever,setRecieve] = useState(null);
     const [usermsg,setusermsg] = useState(null);
     const[recievermsg,setrecievermsg] = useState(null);

     const[userMsgArr,setuserMsgArr] = useState([])

    
     const socket = io('http://localhost:5000');
     socket.on('connect', () => {
        console.log('Connected to server');
        
    });


    const addChat = (msg)=>{

        const now = new Date();
       

        const hours = now.getHours(); 
        const minutes = now.getMinutes(); 

        let formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

          

           
           
           document.getElementById("msg").value = ""
           

       
        return `
        <div class="w-full flex justify-end items-center">
            <div class="mr-5 bg-black flex flex-col chat-block-add">

                      <p>${msg}</p>
                      <p class="time-text"> ${formattedTime}</p>

            </div>

        </div>
        `
    }
    

    const sendChat = (msg)=>{

        const now = new Date();
      

        const hours = now.getHours(); 
        const minutes = now.getMinutes(); 

        let formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
        
        // let data = {
        //     "sender":
        // }



    //    const sendText = await axios.post("/auth/routes/chat/addChat",data)
       
        return `
        <div class="w-full flex justify-start items-center">
            <div class="ml-5 bg-black flex flex-col chat-block-send">

                      <p>${msg}</p>
                      <p class="time-text"> ${formattedTime}</p>

            </div>

        </div>
        `
    }


     useEffect(()=>{

      
        
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
        
         
        const user_d = JSON.parse(localStorage.getItem("user"))
        setUser(user_d)

       

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        console.log(id);

     
        async function CheckandCreateRoom(){
            
            const user_d = JSON.parse(localStorage.getItem("user"))
            const reciever_user = await axios.get("/auth/routes/user/getUserFromid/?id="+id)
            console.log(reciever_user.data[0])

            setRecieve(reciever_user.data[0])


            let data = {
                "person1":user_d._id,
                "person2":id,
                "messages":[]
            }
    
            const check_room_exist = await axios.post("/auth/routes/chat/CheckRoom",data)
            let chat_block = document.getElementById("chat-block")
           
            if(check_room_exist.data){
                console.log(check_room_exist.data)
                
                let msgs = check_room_exist.data.messages
                console.log()
                console.log(user)
                msgs.map((msg_block)=>{
                    if(msg_block.sender === user_d._id)
                      chat_block.innerHTML+=addChat(msg_block.text)
                    else
                      chat_block.innerHTML+=sendChat(msg_block.text)
                }) 
                setRoom(check_room_exist.data._id)
                
                

                socket.emit('joinRoom', check_room_exist.data._id); 
               
               
            }
            else{

                const createRoom = await axios.post("/auth/routes/chat/CreateRoom",data)
                if(createRoom.data){

                    console.log(createRoom.data)
                   
                        socket.emit('joinRoom', createRoom.data._id); 
                   

                }

            }

           
        }

        CheckandCreateRoom()
    
         
        socket.on('sendMsg',({message,userid}) =>{
            const user_d = JSON.parse(localStorage.getItem("user"))
    
    
               
            if(userid !== user_d._id)
            {
               let chat = document.getElementById("chat-block")
               chat.innerHTML+=sendChat(message)
            }
         })
        
        
       
       


     },[])

    

     const handleChange = (e) =>{
        const { name, value } = e.target;
        setusermsg({
            ...usermsg,
            value
          });
         
     }

     const sendMessage = async (e) =>{

        console.log(usermsg)

        let data = {
            "person1":user._id,
            "person2":reciever._id,
            "text":usermsg.value
           }

           console.log(data)

           const text = await axios.post("/auth/routes/chat/addChat",data)
       
        let chat = document.getElementById("chat-block")
        chat.innerHTML+=addChat(usermsg.value)
         
        socket.emit('recieveMsg', { room: roomId, message: usermsg.value , userid:user._id }); 
         
     }
  
     return (
        <>
        {
         user && reciever?
        
            
       
      
            <>
           <BottomNavbar/>
          <div className="flex justify-center items-center w-full">
            <div className="uni-border  flex flex-col  items-center">

            <div className="w-full ml-5 mt-5 flex  items-center gap-5">
                <img className="round-img" src={reciever.userDetails.img[0]}></img>
                <div>

                <h4>{reciever.name}</h4>
                   <p className="text-gray-600 text-sm ">Tap to see profile</p>
                </div>
                  

            </div>


            <div id="chat-block" className="mt-5 w-full flex flex-col gap-5 chat-block card-90 overflow-scroll">
                 
            </div>

            <div className="w-full p-5 flex justify-center items-center gap-5">

                <input  id="msg" onChange={handleChange} className="w-full chat-bar" placeholder="type your text here"></input>
                <button onClick={sendMessage} className="send_msg"><img style={{width:"20px",height:"auto"}}  src="/images/paper-p.png"></img></button>

            </div>

           
                  
          
               
            
      
            </div>
         </div>
        </>
                
     
    

     :

     <></>
    }
     </>
           
     )


}

export default Chat_Room