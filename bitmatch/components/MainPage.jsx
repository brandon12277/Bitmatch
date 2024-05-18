"use client"

import {react,useEffect,useState} from "react"
import BottomNavbar from "./userNavbar"
import ProfileCard from "./bitCard"
import axios from "axios"
import Loader from "./loader"


const MainUserPage = () =>{

    const [swipeComponent,setSwipe] = useState(null)
    const [userD,setUser] = useState(null)
   
  
  useEffect(()=>{

      let userdata = localStorage.getItem("user")
      
      const user_d = JSON.parse(userdata)
      
      setUser(user_d)

      if(user_d.userProfileSet === false){

      }

      

     
      
       
  },[])
    useEffect(()=>{

        const fetchData = async () => {
            try {
            const user_d = JSON.parse(localStorage.getItem("user"))
            console.log(user_d)
            const url = "/auth/routes/user/getUsers?id="+user_d._id
            console.log(url)
              const user_data = await axios.get("/auth/routes/user/getUsers?id="+user_d._id);
              const data = user_data.data.data 
              const likes = user_data.data.likes

              
              let liked = []
              Object.values(likes).map(item=>{
                liked.push(item.liked)
              })

              console.log(liked)
              let idx = 1;
              console.log(data)
              const swiper = data.map((user)=>{

                       let classN = "user"+idx
                       let user_block = {
                        "name": user.name,
                        "about": user.userDetails.about,
                        "gender":user.userDetails.gender
                      }
                      
                      user_block["img"] = user.userDetails.img
                      user_block["age"] = user.userDetails.age
                      user_block["techStack"] = user.userDetails.stack
                    if(user._id === user_d._id){
                      localStorage.setItem("user",JSON.stringify(user))
                      
                    }
                    if( user._id !=user_d._id  && !liked.includes(user._id)){
                     const swipe = (
                      
                        <div className={`${classN} flex flex-col absolute justify-center items-center user1`}>
                           <ProfileCard
                          like={()=>{like(classN,user._id)}}
                          dislike={()=>{dislike(classN,user._id)}}
                          user = {user_block}
                           />
                         </div>
                     )
                     idx++;

                     return swipe
                     }
                     
                     else
                     return <></>


                     

              })
              const endPage = (
             
                <div className={`flex justify-center items-center `}>
               
                <div className="  flex justify-center items-center relative overflow-y-auto card-90  max-w-md  shadow-top  rounded-lg overflow-hidden">
                       <div className=" flex flex-col justify-center items-center">
                          <img  style={{width:"300px",height:"auto"}} src="/images/end2.png"></img>
                         <p className="end-page">No more matches available</p>

                       </div>
                </div>
                <div className=" bg-white bitcard-nav px-4 py-2 flex justify-center items-center">
        <button style={{visibility:"hidden"}} className="color-main  text-white font-bold py-2 px-4 rounded ">
             &#9829;
        </button>
        <button style={{visibility:"hidden"}}  className="  text-white font-bold py-2 px-4 rounded">
        &#x274c;
        </button>
    </div>
                </div>
              
              )

              swiper.unshift(endPage)

              setSwipe(swiper)
               


             
            } catch (err) {
              console.error('Error fetching user data:', err);
            }
          };
      
          fetchData();
    },[])

    async function like(idx,id) {
        const user_d = JSON.parse(localStorage.getItem("user"))
        console.log(idx,id)

        const card = document.querySelector('.'+idx);
        card.style.transition = 'transform 0.8s ease-in-out'
        card.style.transform = 'translateX(200vh) rotate(45deg)';

        const data = {
            "liked":id,
            "liked_by":user_d._id
        }
         
        const like = await axios.post('/auth/routes/likes/addLike',data)

        if(like){
            console.log("Liked")
        }
      }
      
      function dislike(idx,id) {
        console.log(idx)
        const card = document.querySelector('.'+idx);
        card.style.transition = 'transform 0.8s ease-in-out'
        card.style.transform = 'translateX(-200vh) rotate(-45deg)';
      }

    

return (
  <> 

   {
   
    userD && 
    userD.userProfileSet === false?
    <>
       <BottomNavbar/>
       <div className="mt-7 w-70  flex flex-col justify-center items-center relative overflow-y-auto card-90  max-w-md bg-white shadow-top  rounded-lg overflow-hidden">
                       <div className=" w-full flex flex-col justify-center items-center">
                          <img  style={{width:"300px",height:"auto"}} src="/images/end2.png"></img>
                         <p className="end-page">Profile isnt created yet..go and create your profile to start swiping</p>

                       </div>
        </div>
     
    </>
    :

    swipeComponent?
  
    <>

   
    <BottomNavbar/>
  <div className="w-full flex justify-center items-center main-bck">
    <div className="relative w-full flex justify-center items-center h-100 relative top-0 uni-border ">
     
         {swipeComponent}
             
    </div>
  </div>
    </>
    :
    <Loader/>
  

   }
   
  </>
)

}

export default MainUserPage