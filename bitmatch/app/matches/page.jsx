
"use client"
import BottomNavbar from "@/components/userNavbar"
import axios from "axios"
import {react,useState,useEffect} from "react"
import "./match.css"
import Loader from "@/components/loader"





const Matches = () =>{

    const [likes,setLikes] = useState(null)
    const [matches,setMatches] = useState(null)

    const myFunc=(id)=> {
        window.location.href="/chats/?id="+id
       
      }

    useEffect(()=>{

        const FetchData = async () =>{

            const user = JSON.parse(localStorage.getItem("user"))
            const id = user._id

            const data = {
              "id" : id
            }

            const likes = await axios.post("/auth/routes/likes/getLiked",data)
              

            console.log(likes.data.likes)
            console.log(likes.data.matched)

            const matchObj =await Promise.all( Object.values(likes.data.matched).map( async (item)=>{
                
                if(item){

                    let data = {
                        "person1":id,
                        "person2":item._id
                    }

                    const text = await axios.post("/auth/routes/chat/getLastMsg",data)
                    let textVal=""
                    if(!text.data || text.data==="")textVal="Start Chat with "+item.name
                    else
                    textVal =text.data
                return(
                    
                    <button onClick={()=>{myFunc(item._id)}} class="cursor" className="chat-block flex gap-5" >
                    <img className="round-img" src={item.userDetails.img[0]}></img>
                        <div className="text-left">
                          
                           <h4>{item.name}</h4>
                           <p className="text-gray-600  ">{textVal}</p>

                        </div>

                       
                        

                    </button>
                  
               
                )
                }
            }))

            setMatches(matchObj)

            const likesObj = Object.values(likes.data.likes).map((item)=>(
                <div>
                    <div className="card-like" >

                        <img className="round-img" src={item.userDetails.img[0]}></img>
                        <h3 className="text-black">{item.name}</h3>

                    </div>
                    
                </div>
            ))

            setLikes(likesObj)
            

        }
               

        FetchData()
             


          
    },[])

  
     return (
        <>
            
        {
            !likes && !matches?
            <Loader/>
            :
            <>
           <BottomNavbar/>
           <div className="flex justify-center items-center w-full">
            <div className="uni-border flex flex-col  items-center">

           

           <div className="w-90  p-3">

            <h3 className="chat-block text-black-700 text-lg capitalize">Hacker Queue ({ likes?likes.length:0 })</h3>
            <br></br>
            <div className="overflow-x-scroll flex gap-10">
                  {likes}
            </div>
            

           </div>
               
            
        <div className="w-90  p-3  ">

            <h3 className=" w-full chat-block text-black-700  text-lg capitalize">Matches Stack ({ matches?matches.length:0 }) </h3>
            <br></br>
            <div className=" overflow-y-scroll h-90 flex flex-col gap-5 p-2">
                 {matches}
            </div>


        </div>
          </div>
        </div>
        </>
                
     }
     </>
           
     )


}

export default Matches