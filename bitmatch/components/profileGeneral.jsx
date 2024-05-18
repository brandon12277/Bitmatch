

"use client"


import {useEffect,useState,useRef} from 'react';
import '@/styles/globals.css';


const General = ({ formData, setFormData,name,about,gender,age }) =>{

  const [page,setPage] = useState(1)   
  const [OldData,setOldData] = useState(null)
 

  const handleChange = (e) => {
      const { name, value } = e.target;
     setFormData({
      ...formData,
      [name]: value
    });

    setOldData({
      ...formData,
      [name]: value
    });
  };

  useEffect(()=>{

    const setD = {
      first:name.split(' ')[0],
      last:name.split(' ')[1],
      about:about,
      gender:gender,
      age:age
    }
    setOldData(setD)
        
    setFormData(setD);
     
   
      
  },[])

   

    return(
     
      <>
       {
      OldData?
      <>
      <h2 className='mt-20 text-large card-txt text-black-900 font-bold text-lg capitalize'>General Information</h2>
      <p className="text-grey-800 text-sm">Give your personal details to highlight yourself</p>
    <div className="w-90 flex flex-col justify-center  gap-10 roboto">
       
    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">First Name</label>
       <input  value = {OldData.first} type="text" name="first" onChange={handleChange}   className="in-f border-b-2  b-input px-4 py-2 focus:outline-none focus:border-blue-500"></input>
      </div>
      <div>
      <label className="block text-gray-700 font-bold mt-5 mb-5">Last Name</label>
      <input value ={OldData.last} type="text" name="last" onChange={handleChange}  className="in-f border-b-2  b-input  px-4 py-2 focus:outline-none focus:border-blue-500"></input>

      </div>
      
    
    
    </div>
    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Age</label>
       <input  value = {OldData.age} type="number" name="age" onChange={handleChange}   className="in-f border-b-2  b-input px-4 py-2 focus:outline-none focus:border-blue-500"></input>
      </div>
      
    
    
    </div>

    <div className="w-90 flex flex-col  ">
    
      <label className="block text-gray-700 font-bold mt-5 mb-5">Gender</label>
      <div className=''>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={OldData.gender === 'male'}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={OldData.gender === 'female'}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2">Female</span>
        </label>
       
        </div>
      
    </div>
    <label className="block text-gray-700 font-bold mt-5 mb-5">About</label>
    <div className="w-90 flex  items-center ">
      
   
      <textarea  value={OldData.about} type="text" name="about" onChange={handleChange} rows="5" cols="8"   className="in-f border-b-2 b-input py-2 focus:outline-none focus:border-blue-500"></textarea>
      
    
    
    </div>

    </div>
    </>
    :
    <></>
      }
    </>
    )
}

export default General;