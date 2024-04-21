

"use client"


import {useEffect,useState,useRef} from 'react';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google'

const poppinsthick = Poppins({
    weight: '400',
    subsets: ['latin'],
  })
const Tech = ({ techData, setTechData,tech}) =>{

  const [OldData,setOldData] = useState([
      ...tech]
  )
    
    
    
  const isChecked = (value) => {
    
    return OldData.includes(value);
  };

    const handleChange = (e) => {
        const { value, checked } = e.target;
    
        
        if (checked) {
            setTechData([...techData, value]);
        } else {
          setTechData(techData.filter(item => item !== value));
        }

        if (checked) {
          setOldData([...OldData, value]);
      } else {
        setOldData(OldData.filter(item => item !== value));
      }
   };
   
    

    const stack = ['ReactJs','Vue','Angular','MongoDB','Nodejs','MERN','MEAN','Cyber Security','ASP.NET','JAVA','PYTHON','JAVASCRIPT','NextJS','TypeScript']
    

    return(
      <>
       <h2 className='mt-20 text-large card-txt text-black-900 font-bold text-lg capitalize'>Select your tech stack</h2>
          <p className="text-grey-800 text-sm"> Choose the top 5 tech to highlight your skills </p>
    <div className="w-90 flex flex-col justify-center gap-10 roboto">
          
         
          <div className=  "mt-10 grid grid-cols-3 gap-10 justify-center items-center">
            
               {
                stack.map((item,ind)=>(
                    <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      name={item}
                      value={item}
                      checked={isChecked(item)}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">{item}</span>
                  </label>
                ))
               }
               
          </div>
          
    </div>
    </>
    )
}

export default Tech;