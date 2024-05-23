
"use client"

import {useEffect,useState,useRef} from 'react';

const ImagesSelect = ({ imageData, setImageData,fileData, setFileData ,imgs}) =>{

   

   
    

  useEffect(()=>{

    console.log(imgs)
  })

   

   

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);

    const fileInputRef = [ref1,ref2,ref3,ref4,ref5,ref6]


    const handleButtonClick = (e) => {
        
        const key = e.target.getAttribute('data-key');
        console.log(key)
        if(fileInputRef[key].current)
        fileInputRef[key].current.click();
      };
    
    const handleImageChange = (e,ind) => {
        const { name, value } = e.target;
        
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        console.log(ind+1)
        setFileData({
            ...fileData,
            [ind+1]: selectedFile,
          });
        
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            
             
            setImageData({
                ...imageData,
                [ind+1]: reader.result,
              });
            document.getElementById("image_button").style.display = "none"
          };
          reader.readAsDataURL(selectedFile);
        }
      };


    return(
        <div  className="">

            <div className="mt-10 grid grid-cols-3 gap-4 justify-center ">
                

                  {   
                     fileInputRef.map((ref,ind)=>(
                        <div data-key={ind} onClick={handleButtonClick} className="relative w-40 h-40 rounded-[0.45em] shadow-xl flex items-center justify-center cursor-pointer" htmlFor="upload" style={{ backgroundImage: imageData[ind+1] === ''?`url(${ imgs[ind] })` : `url(${ imageData[ind+1] })` }}>
                        <input data-key={ind}  ref={ref} style={{display:"none"}}  type="file" name="file" onChange={(e)=>{handleImageChange(e,ind)}}  id="upload" accept="image/png, image/jpg, image/jpeg"></input>
                            <div data-key={ind} id="image_button">


                            { 
                             imageData[ind+1] === '' && imgs[ind] === undefined ?<span data-key={ind} className=" text-4xl" onChange={handleButtonClick}>+</span> :<></>
                            }
                           
                            </div>
                        </div>

                     )) 
                        
                    } 
                
               
               

               
            </div>

             

            </div>
    )
     
}

export default ImagesSelect