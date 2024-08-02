"use client"

import {react,useEffect,useState} from "react"
import BottomNavbar from "./userNavbar"
import ProfileCard from "./bitCard"
import axios from "axios"
import Loader from "./loader"


const MainUserPage = () =>{

    const [swipeComponent,setSwipe] = useState(null)
    const [userD,setUser] = useState(null)
    const[ filter,setFilter ] = useState(null)
    const[filterData,setFilterData] = useState({
        location : "",
        workExp : 0,
        techStack:[],

       
    })

    const stack = ['ReactJs','Vue','Angular','MongoDB','Nodejs','Cyber Security','ASP.NET','JAVA','PYTHON','JAVASCRIPT','NextJS']
   

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFilterData({
      ...filterData,
      [name]: value
    });
  }

    const handleStack = (e) => {
      const { name, value } = e.target;
      setFilterData(prevData => {
        if(prevData.techStack.includes(value))return {...prevData,['techStack'] : prevData.techStack.filter(tech=>tech!=value)}
        else{
        prevData.techStack.push(value)
        return prevData  
      
      }
      });

   
  };


  const handleFilteration = async (e) =>{

    const form_data = {
       id : userD._id,
       location : filterData.location,
       workExp : filterData.workExp,
       techStack : filterData.techStack,
    }
        
    const user_data = await axios.post("/auth/routes/user/filterUser",form_data);

    const data = user_data.data.data 
    const likes = user_data.data.likes
    let liked = []
    Object.values(likes).map(item=>{
      liked.push(item.liked)
    })

    console.log(data)
    console.log(likes)


    let idx = 1;
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
     
   if(user._id === userD._id){
     localStorage.setItem("user",JSON.stringify(user))
     
   }
   if( user._id !=userD._id  && !liked.includes(user._id)){
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

<div className={` flex flex-col justify-center items-center `}>

<div className="  flex justify-center items-center relative overflow-y-auto card-90  max-w-md  shadow-top  rounded-lg overflow-hidden">
      <div className="text-center flex flex-col justify-center items-center">
         <img  style={{width:"300px",height:"auto"}} src="/images/end2.png"></img>
        <p className="end-page">Out of swipes for today. Rest and swipe again tomorrow!</p>

      </div>
</div>

</div>

)

swiper.unshift(endPage)

setSwipe(swiper)
setFilter(null)
 }





 
  
  useEffect(()=>{

      let userdata = localStorage.getItem("user")
      
      const user_d = JSON.parse(userdata)
      
     
      setUser(user_d)
      

     
      
       
  },[])
    useEffect(()=>{

        const fetchData = async () => {
            try {
            const user_d = JSON.parse(localStorage.getItem("user"))
            console.log(user_d)
         
          
              const user_data = await axios.get("/auth/routes/user/getUsers?id="+user_d._id);
              const data = user_data.data.data 
              const likes = user_data.data.likes

              console.log(data)
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
             
                <div className={` flex flex-col justify-center items-center `}>
               
                <div className="  flex justify-center items-center relative overflow-y-auto card-90  max-w-md  shadow-top  rounded-lg overflow-hidden">
                       <div className="text-center flex flex-col justify-center items-center">
                          <img  style={{width:"300px",height:"auto"}} src="/images/end2.png"></img>
                         <p className="end-page">Out of swipes for today. Rest and swipe again tomorrow!</p>

                       </div>
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
            "liked_by":user_d._id,
            "like" : "true"
        }
         
        const like = await axios.post('/auth/routes/likes/addLike',data)

        if(like){
            console.log("Liked")
        }
      }
      
      async function dislike(idx,id) {
        console.log(idx)
        const user_d = JSON.parse(localStorage.getItem("user"))
        const data = {
          "liked":id,
          "liked_by":user_d._id,
          "like" : "false"
      }
       
      const dislike = await axios.post('/auth/routes/likes/addLike',data)
        const card = document.querySelector('.'+idx);
        card.style.transition = 'transform 0.8s ease-in-out'
        card.style.transform = 'translateX(-200vh) rotate(-45deg)';
      }

    

return (
  <> 

   {

    !userD?

    <Loader/>
    :
   
    userD && 
    userD.userProfileSet === false?
    <>
       <BottomNavbar/>
       <div className="w-full flex justify-center items-center main-bck">
    <div className="relative w-full flex  justify-center items-center h-100 relative top-0 uni-border ">
       <div className="mt-7 w-70  flex flex-col justify-center items-center relative overflow-y-auto card-90  max-w-md bg-white shadow-top  rounded-lg overflow-hidden">
                       <div className=" w-full flex flex-col justify-center items-center">
                          <img  style={{width:"300px",height:"auto"}} src="/images/end2.png"></img>
                         <p className="end-page">Profile isnt created yet..go and create your profile to start swiping</p>

                       </div>
        </div>
    </div>
        </div>
  
     
    </>
    :

    swipeComponent?
  
    <>

   
    <BottomNavbar/>
  <div className="w-full flex justify-center items-center main-bck">


  {
      filter?
      <div className="bg-black bg-opacity-50 absolute top-0 w-full h-100 flex items-center justify-center">
        <div className="p-10 z-10">

          <div className="h-[80vh] overflow-scroll w-full px-16 z-10 bg-white flex flex-col gap-6 rounded-xl shadow-lg">
                    <div className="w-full p-4">
                        <h1 className="font-semibold text-xl">Location</h1>
                        <input onChange={handleChange} type="text" name="location"  className="w-full shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
                    </div>
                    <div className="w-full p-4">
                        <h1 className="font-semibold text-xl">Work Experience</h1>
                        <input onChange={handleChange} value={filterData.workExp} type="range" className="w-full bg-yellow" name="workExp" min="0" max="40" step="1"></input>
                    </div>
                    {
                stack.map((item,ind)=>(
                    <label className={`inline-flex gap-5 items-center mr-4 cursor-pointer ` }>
                     
                   
                    <input
                      type="checkbox"
                      name={item}
                      value={item}
                      onClick={(e)=>{handleStack(e)}}
                      className={`form-radio  `}
                    />
                     <h1 className="">{item}</h1>
                   
                  </label>
                ))
               }
                  

              <button onClick={handleFilteration} className="p-4 bg-yellow-600 rounded-lg shadow-lg">Filter</button>    
              

          </div>
          </div>

      </div>
      :
      <></>
   }


    <div className="relative w-full flex  justify-center items-center h-100 relative top-0 uni-border ">
    <div className="absolute top-0 right-0 m-4 w-full flex justify-end items-center"> 
        <h1 className='ml-10 poppins text-lg font-bold'>BitMatch</h1>
    <div className="w-full">
      </div> 
      <button onClick={()=>{
        setFilter(1)
      }} className="outline-none border-none ">
     <img style={{ width:"20px",height:"auto" }} src="/images/filter.png"></img> 
     </button>
   
    

    </div>
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