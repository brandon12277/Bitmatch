// ProfileCard.js
import React from 'react';
import '../styles/globals.css';

const ProfileCard = (props) => {


 


  return (
    <>
    <div className=" mt-7 card-bck shadow-lg relative overflow-y-auto card-90  max-w-md bg-white shadow-top  rounded-lg overflow-hidden">
      
        <div className=" relative bg-white w-full relative overflow-y-auto  ">
          <div className=' flex flex-col items-center'>
          <div className='overflow-y-auto h-80'>
          {
            props.user.img.map((mg)=>(
              <img src={mg}  className="w-img" />
            ))
          }
         </div>
          </div>
         
          
        <div className='absolute bottom-0 m-10'>
          <h4 className='card-txt text-white font-bold text-2xl capitalize'>{props.user.name}</h4>
          <p className="text-white text-sm">{ props.user.gender == 'male' ? 'M' : 'F' },{props.user.age}</p>
        </div>
        

        </div>
       
      <div className="px-10 py-6">
    
        <div>
          <h4 className='card-txt text-black-900 font-bold text-lg capitalize'>About</h4>
          <p className="text-grey-800 text-sm">{props.user.about}</p>
        </div>
        <div className="mt-10">
        <h4 className='text-black-900 font-bold text-lg capitalize'>Tech Stack</h4>
          <div className="w-full flex flex-wrap gap-2">
            {props.user.techStack.map((tech, index) => (
              <div key={index} className="bg-black text-white px-2 py-1 rounded">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

    


    </div>

    <div className=" bg-transparent bitcard-nav px-4 py-2 flex justify-between items-center gap-40">
        <button onClick={props.like} className="color-main  text-white py-2 px-4 rounded  ">
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
