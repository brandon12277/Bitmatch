

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
   
    
   const stackImg = [(<i class="fa-brands fa-react"></i>),
   (<i class="fa-brands fa-vuejs"></i>),
   (<i class="fa-brands fa-angular"></i>),
   (<i class="fa-solid fa-leaf"></i>),
   (<i class="fa-brands fa-node"></i>),
   (<i class="fa-brands fa-hackerrank"></i>),
   (<i class="fa-brands fa-adn"></i>),
   (<i class="fa-brands fa-java"></i>),
   (<i class="fa-brands fa-python"></i>),
   (<i class="fa-brands fa-js"></i>),
   (<i class="fa-solid fa-n"></i>),
  
  ]

    const stack = ['ReactJs','Vue','Angular','MongoDB','Nodejs','Cyber Security','ASP.NET','JAVA','PYTHON','JAVASCRIPT','NextJS']
    

    return(
      <>
       <h2 className='mt-20 text-large card-txt text-black-900 font-bold text-lg capitalize mb-2'>Select your tech stack</h2>
          <p className="text-grey-800 text-sm"> Choose the top 5 tech to highlight your skills </p>
    <div className="w-90 flex flex-col justify-center gap-10 roboto">
          
         
          <div className=  "mt-10 grid grid-cols-3 gap-10 justify-center items-center">
            
               {
                stack.map((item,ind)=>(
                    <label className="inline-flex gap-5 items-center mr-4 cursor-pointer">
                       <span style={{color:"#393124",fontSize:"large"}} className="ml-2">{stackImg[ind]}</span>
                    <input
                      type="button"
                      name={item}
                      value={item}
                      checked={isChecked(item)}
                      onChange={handleChange}
                      className="form-radio"
                    />
                   
                  </label>
                ))
               }
               
          </div>
          
    </div>
    </>
    )
}

export default Tech;