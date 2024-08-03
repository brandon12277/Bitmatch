// ProfileCard.js
import React, { useEffect } from 'react';
import '../styles/globals.css';

const ProfileCard = (props) => {


   useEffect(()=>{
    console.log(props.user)
   })


  return (
    <>
    <div className=" mt-7 card-bck  shadow-lg relative overflow-y-auto   w-[60vh] h-[500px] bg-white shadow-top  rounded-t-xl  overflow-hidden">
      
        {
             props.user.img[0]?
              <div className='relative'>
             <img src={props.user.img[0]}  className="w-full h-[500px] " />
             <div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              :
              <></>
              
            

        }
         

        <div className='absolute bottom-0 m-10'>
          <h4 className='card-txt text-white font-semibold text-4xl capitalize font-poppins'>{props.user.name}</h4>
          <p className="text-white font-semibold text-md">{ props.user.gender == 'male' ? 'M' : 'F' },{props.user.age}</p>
          { 
           props.user.location?
            <p className="mt-4 text-black flex items-center gap-2"><svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="location"><path d="M12,2a8.009,8.009,0,0,0-8,8c0,3.255,2.363,5.958,4.866,8.819,0.792,0.906,1.612,1.843,2.342,2.791a1,1,0,0,0,1.584,0c0.73-.948,1.55-1.885,2.342-2.791C17.637,15.958,20,13.255,20,10A8.009,8.009,0,0,0,12,2Zm0,11a3,3,0,1,1,3-3A3,3,0,0,1,12,13Z"></path></svg>{props.user.location}</p>
           :
           <></>
          
          }
        </div>
       
      <div className="px-10 py-6">

        <div>
          <h4 className='card-txt  font-semibold text-lg capitalize'>About</h4>
          <p className="text-black text-sm">{props.user.about}</p>
        </div>
        </div>
       
        {
             props.user.img[1]?
              <div className='relative'>
             <img src={props.user.img[1]}  className="w-full h-[500px] " />
             <div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              :
              <></>
              
            

        }
      <div className="px-10 py-6">
      <div className="mt-6 mb-20">
      <h4 className='  font-semibold text-lg capitalize mb-6'>Personal Profiles/Projects</h4>
          <div className="w-full flex flex-wrap gap-2">
            { props.user.links && props.user.links.map((link, index) => (
              <div key={index} className=" text-gray-400 flex gap-2 items-center px-2 py-1 text-sm justify-center border border-gray-400 text-black px-4 py-2 rounded-full ">
           <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="link"><rect width="256" height="256" fill="none"></rect><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" d="M130.49413,63.28047l11.648-11.648a44,44,0,1,1,62.22539,62.22539l-28.28427,28.28428a44,44,0,0,1-62.2254,0"></path><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" d="M125.50407,192.72133l-11.64621,11.6462a44,44,0,1,1-62.22539-62.22539l28.28427-28.28428a44,44,0,0,1,62.2254,0"></path></svg><p className=' text-black font-semibold capitalize'><a href={link.url}>{link.linkType}</a></p> 

              </div>
            ))}
          </div>

        </div>

    
       
       
      </div>

      {
             props.user.img[2]?
              <div className='relative'>
             <img src={props.user.img[2]}  className="w-full h-[500px] " />
             <div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              :
              <></>
              
            

        }


      <div className="px-10 py-6">
      <div className="mt-6 mb-20">
        <h4 className=' font-semibold text-lg capitalize mb-6'>Tech Stack</h4>
          <div className="w-full flex flex-wrap gap-2">
            {props.user.techStack && props.user.techStack.map((tech, index) => (
              <div key={index} className="bg-yellow-500 shadow-lg text-black px-4 py-2 rounded-full ">
                {tech}
              </div>
            ))}
          </div>
        </div>

    
       
       
      </div>

      {
             props.user.img[3]?
              <div className='relative'>
             <img src={props.user.img[3]}  className="w-full h-[500px] " />
             <div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              :
              <></>
              
            

        }

<div className='px-10 py-6'>
<div className="mt-6 mb-20">
<h4 className='  font-semibold text-lg capitalize mb-6'>Education</h4>
{
  props.user.education && props.user.education.map(edu=>(
    <div  className=" mb-4 text-gray-400 flex gap-2 items-center px-2 py-1 text-sm justify-center border border-gray-400 text-black px-4 py-2 rounded-full ">
         
         <p className='text-black font-semibold capitalize  p-1 flex gap-2 justify-center items-center'><svg  className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="education"><path d="M12 14c-.1 0-.2 0-.3-.1l-11-4C.3 9.8 0 9.4 0 9s.3-.8.7-.9l11-4c.2-.1.5-.1.7 0l11 4c.3.1.6.5.6.9s-.3.8-.7.9l-11 4c-.1.1-.2.1-.3.1zM3.9 9l8.1 2.9L20.1 9 12 6.1 3.9 9z"></path><path d="M19 20h-7c-.6 0-1-.4-1-1s.4-1 1-1h6c-.1-2.6-.7-4.8-1.7-6.4-.3-.5-.1-1.1.3-1.4.5-.3 1.1-.1 1.4.3 1.3 2.1 2 5 2 8.4 0 .7-.4 1.1-1 1.1z"></path><path d="M12 20H5c-.6 0-1-.4-1-1 0-3.4.7-6.3 2-8.4.3-.5.9-.6 1.4-.3.5.3.6.9.3 1.4-1 1.6-1.6 3.8-1.7 6.4h6c.6 0 1 .4 1 1s-.4.9-1 .9zm10 0c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v10c0 .6-.4 1-1 1z"></path></svg>{edu.branch} from {edu.university}</p>

     </div>
  ))
}

</div>
</div>

{
             props.user.img[4]?
              <div className='relative'>
             <img src={props.user.img[4]}  className="w-full h-[500px] " />
             <div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              :
              <></>
              
            

        }

{
             props.user.img[5]?
              <div className='relative'>
             <img src={props.user.img[5]}  className="w-full h-[500px] " />
             <div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              :
              <></>
              
            

        }

    


    </div>

    {
      !props.display?
      <div className=" shadow-lg border-b-2 border-r-2 border-l-2 border-yellow-500 w-[60vh] rounded-b-lg  px-4 py-2 flex justify-between items-center gap-40">
      <button onClick={props.like} className="color-main  text-white py-2 px-4 rounded ">
         &lt;/&gt;
      </button>
      <button onClick={props.dislike} className="  text-white font-bold py-2 px-4 rounded ">
      &#x274c;
      </button>
    </div>
  :
  <></>
    }
   

    </>
  );
};

export default ProfileCard;
