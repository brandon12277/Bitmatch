// ProfileCard.js
import React from 'react';

const ProfileCard = (props) => {


 


  return (
    <>
    <div className=" mt-7 card-bck shadow-lg relative overflow-y-auto card-90  max-w-md bg-white shadow-top  rounded-lg overflow-hidden">
      
        <div className="bg-white w-full relative overflow-y-auto h-60 ">
          {
            props.user.img.map((mg)=>(
              <img src={mg}  className="w-full mb-2 rounded-lg" />
            ))
          }
      
         
        </div>
        <div className="px-10 py-6 bottom-0 flex items-center mb-2">
          <div>
            <h2 className="text-black-800 font-bold text-lg font-size-150 capitalize">{props.user.name}</h2>
            <h4 lassName="text-black-900 font-semibold text-lg capitalize">{props.user.gender === "male" ? "M" : "F"},21</h4>
          </div>
        </div>
      <div className="px-10 py-6">
    
        <div>
          <h4 className='card-txt text-black-900 font-bold text-lg capitalize'>About</h4>
          <p className="text-grey-800 text-sm">{props.user.about}</p>
        </div>
        <div className="mt-10">
        <h4 className='text-black-900 font-bold text-lg capitalize'>Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {props.user.techStack.map((tech, index) => (
              <div key={index} className="bg-black text-white px-2 py-1 rounded">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

    


    </div>

    <div className=" bg-white bitcard-nav px-4 py-2 flex justify-between items-center">
        <button onClick={props.like} className="color-main  text-white font-bold py-2 px-4 rounded ">
             &#9829;
        </button>
        <button onClick={props.dislike} className="  text-white font-bold py-2 px-4 rounded">
        &#x274c;
        </button>
    </div>

    </>
  );
};

export default ProfileCard;
