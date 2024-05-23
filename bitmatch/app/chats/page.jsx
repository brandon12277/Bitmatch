
"use client"
import BottomNavbar from "@/components/userNavbar"
import axios from "axios"
import {react,useState,useEffect} from "react"
import Loader from "@/components/loader"
import "./chat.css"

import io from 'socket.io-client';
import Picker from "emoji-picker-react";



const Chat_Room = () =>{
     
    const[roomId,setRoom] = useState(null)
     const [user,setUser] = useState(null);
     const[reciever,setRecieve] = useState(null);
     const [usermsg,setusermsg] = useState(null);
     const[recievermsg,setrecievermsg] = useState(null);

     const[userMsgArr,setuserMsgArr] = useState([])
     const [emoji,setEmoji] = useState(null);
     const [doc,setDoc] = useState(null);
     
     
     const scrollToBottom =(elementId)=> {
        var element = document.getElementById(elementId);
        if (element) {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
     const onEmojiClick = (event, emojiObject) => {
          
          document.getElementById("msg").innerHTML+=`<img style="width:20px;height:auto" src=${ emojiObject.target.src }></img>`

       

         

     };

    
     const socket = io('http://localhost:5000');
     socket.on('connect', () => {
        console.log('Connected to server');
        
    });


    const addChat = (msg,time)=>{

        const now = new Date();
       

        const hours = now.getHours(); 
        const minutes = now.getMinutes(); 

       

          

           
           
           document.getElementById("msg").value = ""
           

       
        return `
        <div class="w-full flex justify-end items-center">
            <div class="mr-5 bg-black flex flex-col  chat-block-add">

                      <p class="flex items-center">${msg}</p>
                      <p class="time-text"> ${time}</p>

            </div>

        </div>
        `
    }
    

    const sendChat = (msg,time)=>{

       

       
        
        // let data = {
        //     "sender":
        // }



    //    const sendText = await axios.post("/auth/routes/chat/addChat",data)
       
        return `
        <div class="w-full flex justify-start items-center">
            <div class="ml-5 bg-black flex flex-col chat-block-send">

                      <p class="flex  items-center">${msg}</p>
                      <p class="time-text"> ${time}</p>

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
                      chat_block.innerHTML+=addChat(msg_block.text,msg_block.date)
                    else
                      chat_block.innerHTML+=sendChat(msg_block.text,msg_block.date)
                }) 
                scrollToBottom("chat-block")
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
                const now = new Date();
      

                const hours = now.getHours(); 
                const minutes = now.getMinutes(); 
               let chat = document.getElementById("chat-block")
               let formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
               chat.innerHTML+=sendChat(message,formattedTime)
            }
         })
        
        
       
       


     },[])

    

     const handleChange = (e) =>{
        const text = e.target.innerText;
       
        setusermsg({
            ...usermsg,
            text
          });
         
     }

     const sendMessage = async (e) =>{

        console.log(usermsg)
        const textSend = document.getElementById("msg").innerHTML
        document.getElementById("msg").innerHTML = ""
        console.log(textSend)
        const now = new Date();
      

        const hours = now.getHours(); 
        const minutes = now.getMinutes(); 
        let formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
        let data = {
            "person1":user._id,
            "person2":reciever._id,
            "text":textSend,
            "date":formattedTime
           }

           console.log(data)
           
           const text = await axios.post("/auth/routes/chat/addChat",data)
       
        let chat = document.getElementById("chat-block")
        chat.innerHTML+=addChat(textSend,formattedTime)
        scrollToBottom("chat-block")
         
        socket.emit('recieveMsg', { room: roomId, message: textSend , userid:user._id }); 
         
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
                <button className="outline-none flex flex-col ">

                <h4>{reciever.name}</h4>
                   <p className="text-gray-600 text-sm ">Tap to see profile</p>
                </button>
                  

            </div>


            <div id="chat-block" className="mt-5 w-full flex flex-col gap-5 chat-block card-90 overflow-scroll">
                 
            </div>

            <div className="w-full p-5 flex justify-center items-end gap-5">
                 {
                    emoji?
                    <div className="">
                        <button onClick={()=>{setEmoji(null)}}className="border-none bg-none outline-none">

                            <i class="fa-solid fa-xmark"></i>
                        </button>
                         
                    <Picker onEmojiClick={onEmojiClick} />
                    </div>
                    :
                    <></>
                 }
                 {
                    doc?
                    <div className="">
                          <button onClick={()=>{setDoc(null)}}className="border-none bg-none outline-none">

                                    <i class="fa-solid fa-xmark"></i>
                            </button>
                        <div className="rounded shadow p-10 flex flex-col gap-5">

                            <button className="w-full flex gap-2"><i style={{color:"#5b5b5b"}} class="fa-solid fa-image"></i> Photo</button>
                            <button className="w-full flex gap-2"><i style={{color:"#5b5b5b"}} class="fa-solid fa-file"></i> Text file</button>
                            <button className="w-full flex gap-2"><i class="fa-brands fa-codepen"></i> <span style={{color:"#aa4848"}}>CodeBlock</span></button>
                            

                         </div>


                  
                   
                    </div>
                    :
                    <></>
                 }
                <div className="flex w-full gap-2 chat-bar">
                <div className="flex justify-center items-center p-4">
                   
                     
                    <button onClick={()=>{setEmoji(1)}}className="border-none bg-none outline-none">

                                <i style={{color:"#5b5b5b"}} className=" text-2xl fa-regular fa-face-smile"></i>

                    </button>
                  

                </div>
                <div className="flex justify-center items-center p-4">
                  
                     
                    <button onClick={()=>{setDoc(1)}}className="border-none bg-none outline-none">

                                <i style={{color:"#5b5b5b"}} className=" text-2xl fa-solid fa-paperclip"></i>
                                
                               

                    </button>
                    
                   
                    

                </div>

                <p contentEditable id="msg" onInput={handleChange} className="w-full  flex items-center " placeholder="type your text here"></p>
                <button style={{color:"#5b5b5b"}} onClick={sendMessage} className="send_msg p-4 text-xl"><i class="fa-solid fa-paper-plane"></i></button>

                </div>
                
                

            </div>
            <div>
           
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