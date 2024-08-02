// ProfileCard.js
import React from 'react';
import '../styles/globals.css';

const ProfileCard = (props) => {


 


  return (
    <>
    <div className=" mt-7 card-bck  shadow-t-lg relative overflow-y-auto card-90  w-[60vh] bg-white shadow-top  rounded-t-lg  overflow-hidden">
      
        <div className=" relative bg-white w-full relative overflow-y-auto  ">
          <div className=' flex flex-col items-center'>
          <div className='overflow-y-auto h-80'>
          {
            props.user.img.map((mg)=>(
              <div className='relative'>
<img src={mg}  className="w-full h-[500px] " />
<div class="absolute inset-0 bg-black opacity-40"></div>
              </div>
              
            ))
          }
         </div>
          </div>
         
          
        <div className='absolute bottom-0 m-10'>
          <h4 className='card-txt text-white font-bold text-4xl capitalize font-poppins'>{props.user.name}</h4>
          <p className="text-white font-semibold text-md">{ props.user.gender == 'male' ? 'M' : 'F' },{props.user.age}</p>
        </div>
        

        </div>
       
      <div className="px-10 py-6">

      <div className="mt-6 mb-20">
        <h4 className='text-grey-800  font-bold text-lg capitalize mb-6'>Tech Stack</h4>
          <div className="w-full flex flex-wrap gap-2">
            {props.user.techStack.map((tech, index) => (
              <div key={index} className="bg-yellow-500 shadow-lg text-black px-4 py-2 rounded">
                {tech}
              </div>
            ))}
          </div>
        </div>

    
        <div>
          <h4 className='card-txt  text-grey-800 font-bold text-lg capitalize'>About</h4>
          <p className="text-black text-sm">{props.user.about}</p>
        </div>
       
      </div>

    


    </div>

    <div className=" shadow-b-lg bg-transparent card-bck w-[60vh] rounded-b-lg  px-4 py-2 flex justify-between items-center gap-40">
        <button onClick={props.like} className="color-main  text-white py-2 px-4 rounded ">
           &lt;/&gt;
        </button>
        <button onClick={props.dislike} className="  text-white font-bold py-2 px-4 rounded ">
        &#x274c;
        </button>
    </div>

    </>
  );
};

export default ProfileCard;
