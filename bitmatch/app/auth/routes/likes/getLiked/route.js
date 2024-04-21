import Likes from "@/models/likes";
import Users from "@/models/users";
import connectDb from "@/utils/mongodb"
import { NextResponse } from "next/server"



export async function POST(request){

    const { id } =await request.json();
    try{

        await connectDb()
       console.log(id)
        const data = {
            "liked": id
        }

        const likes = await Likes.find(data)

        console.log(" LIKES : ",likes)

        const likedUser = await Promise.all(Object.values(likes).map((async like=>{

            const liked_use = {
             "_id" : like.liked_by
            }

            const user = await Users.findOne(liked_use)
           
            return user
        }
        
        )))
       
       
        const matched = await Promise.all(Object.values(likes).map((async like=>{

            let dat = {
                "liked_by" : id,
                "liked" : like.liked_by
               
                
                
            }

          
            const match = await Likes.findOne(dat)
            
          
            return match
               
       }
        
        )))


        
     
         const matchedUser  = await Promise.all(Object.values(matched).map((async user_like=>{
           
            if(user_like){
            const liked_use = {
                "_id" : user_like.liked
               }

               const user = await Users.findOne(liked_use)
               return user
            }
                          

         })))
         
         let likeData = likedUser.filter(value => value);
         const matchData = matchedUser.filter(value => value);

         const EmailLiked = matchedUser.map(item=>{
            if(item)
             return item.email
            
         })

         likeData = likeData.filter(value=> !EmailLiked.includes(value.email))


         console.log(likeData)
         console.log(matchData)
       
         
         

        return NextResponse.json({likes:likeData,matched:matchData},{status:201});
       }

       catch(err){
           console.log(err)
       }
        
        
       return NextResponse.json({data:null},{status:400});
    
   
    

}