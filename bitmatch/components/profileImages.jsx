
"use client"

import {useEffect,useState,useRef} from 'react';
import Cropper from 'react-easy-crop';



const ImagesSelect = ({ imageData, setImageData,fileData, setFileData ,imgs}) =>{

   

   
  
   const[image,setImage] = useState(null)
   const[checkInd,setIndex] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


  useEffect(()=>{
     
   
    setImageData(prevImageData => {


         let ind = 1
         while(ind<=6){
         prevImageData[ind] = !imgs[ind-1]?'':imgs[ind-1]
         ind++;
         }

         return prevImageData

     })
    console.log(imageData,imgs)
  },[])

   
  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
   

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


       const getCroppedImg = (imageSrc, croppedAreaPixels) => {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const image = new Image();
      
          image.onload = () => {
            const { x, y, width, height } = croppedAreaPixels;
      
            canvas.width = width;
            canvas.height = height;
      
            ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
            const base64Image = canvas.toDataURL('image/jpeg');
      
            resolve(base64Image);
          };
      
          image.onerror = (error) => {
            reject(error);
          };
      
          image.src = imageSrc;
        });
      };
    

      const handleCropImage = async (ind) => {
        console.log("HII")
        try {
          const croppedImg = await getCroppedImg(image, croppedAreaPixels); 
          console.log(croppedImg)
          setImageData({
            ...imageData,
            [ind+1]: croppedImg,
          });
          setImage(null)
          
        } catch (error) {
          console.error('Failed to crop image:', error);
        }
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
            
             
           
              setImage(reader.result)
              setIndex(ind+1)
              
            
          };
          reader.readAsDataURL(selectedFile);
        }
      };


    return(
        <div  className="">

            <div className="mt-10 grid grid-cols-3 gap-4 justify-center ">
                

                  {   
                     fileInputRef.map((ref,ind)=>(
                        <div data-key={ind} onClick={handleButtonClick} className="z-1  w-40 h-40 rounded-[0.45em] shadow-xl flex items-center justify-center cursor-pointer bg-center bg-cover" htmlFor="upload" style={{ backgroundImage: `url(${ imageData[ind+1] })` }}>

{image && checkInd == ind+1 && (
        <div className='z-10 absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center gap-4'>
          <div className='z-10 ' style={{ width: '500px', height: '500px' }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropperProps={{ cropSize: { width:"500px", height: "500px" } }}
            />
            
          </div>
          <button className='z-10 p-4 flex gap-2 bg-yellow-400 rounded-xl shadow-lg' onClick={()=>{handleCropImage(ind)}}><img className='w-4 h-4' src="/images/crop.png"></img>Crop Image</button>
          
        </div>
)}



                        <input data-key={ind}  ref={ref} style={{display:"none"}}  type="file" name="file" onChange={(e)=>{handleImageChange(e,ind)}}  id="upload" accept="image/png, image/jpg, image/jpeg"></input>
                            <div data-key={ind} id="image_button">


                            { 
                             imageData[ind+1] === '' ?<span data-key={ind} className=" text-4xl" onChange={handleButtonClick}>+</span> :<></>
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