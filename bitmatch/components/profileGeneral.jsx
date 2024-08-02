

"use client"


import {useEffect,useState,useRef} from 'react';
import '@/styles/globals.css';




const General = ({ formData, setFormData,name,about,gender,age,education,links,currentJob,currentTitle,workExp,location }) =>{


  

  



  
  


  // Link handling Functions

  const handleLinkInputChange = (index, fieldName, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      links: prevFormData.links.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item
      )
    }));
  };

  const addLinkInputGroup = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      links: [...prevFormData.links, { linkType: '', url: '' }]
    }));
  };

  const removeLinkInputGroup = (index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      links: prevFormData.links.filter((_, i) => i !== index)
    }));
  };
 

  // Education handling Functions

  const handleEdInputChange = (index, fieldName, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      education: prevFormData.education.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item
      )
    }));
  };

  const addEdInputGroup = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      education: [...prevFormData.education, { university: '', branch: '' }]
    }));
  };

  // Remove an input group
  const removeEdInputGroup = (index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      education: prevFormData.education.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
     setFormData({
      ...formData,
      [name]: value
    });

   
  };

  useEffect(()=>{

    const setD = {
      first:name.split(' ')[0],
      last:name.split(' ')[1],
      location : location,
      about:about,
      gender:gender,
      age:age,
      workExp : workExp,
      currentJob :currentJob,
      currentTitle :currentTitle,
      education : education,
      links : links,
    }
    

        
    setFormData(setD);
    
    console.log(setD)
   
      
  },[])
  

  const gatherInfo = () =>{
    console.log(formData)
  }
 

    return(
     
      <>
    
      <>
      <h2 className='mt-20 text-large card-txt text-black-900 font-bold text-lg capitalize mb-2'>General Information</h2>
      <p className="text-grey-800 text-sm">Give your personal details to highlight yourself</p>
    <div className="w-90 flex flex-col justify-center  gap-10 roboto">
       
    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">First Name</label>
       <input  value = {formData.first} type="text" name="first" onChange={handleChange}   className="shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
      </div>
      <div>
      <label className="block text-gray-700 font-bold mt-5 mb-5">Last Name</label>
      <input value ={formData.last} type="text" name="last" onChange={handleChange}  className=" shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>

      </div>
      
    
    
    </div>
    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Location</label>
       <input  value = {formData.location} type="text" name="location" onChange={handleChange}   className="shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
      </div>
     
      
    
    
    </div>
    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Age</label>
       <input  value = {formData.age} type="number" name="age" onChange={handleChange}   className="shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
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
            checked={formData.gender === 'male'}
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
            checked={formData.gender === 'female'}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2">Female</span>
        </label>
       
        </div>
      
    </div>
    <label className="block text-gray-700 font-bold mt-5 mb-5">About</label>
    <div className="w-90 flex  items-center ">
      
   
      <textarea  value={formData.about} type="text" name="about" onChange={handleChange} rows="5" cols="8"   className="w-full p-8 shadow-lg border-yellow-400 border-b-2  focus:outline-none focus:border-blue-500"></textarea>
      
    
    
    </div>

    <div className="w-90 mt-10 flex flex-col gap-5 ">
      <div className='flex flex-col gap-10 items-start'>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Education</label>
       <div className='flex flex-col gap-4'>
        
       {
       
            formData.education.map((edu,index)=>(
                
<div className='flex items-center gap-4'>

<input placeholder="University or College" value={edu.university} type="text" name="university" onChange={e => handleEdInputChange(index, 'university', e.target.value)}   className="w-80 shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
<input placeholder="Branch"  type="text" value={edu.branch} name="branch" onChange={e => handleEdInputChange(index, 'branch', e.target.value)}   className="w-80 shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
{
  formData.education.length >1?
<button onClick={() => removeEdInputGroup(index)} className='w-8 h-8 font-bold rounded-full border border-1'>-</button>
:
<></>
}
</div>
            )
          )
          }

       </div>
        
       <button onClick={addEdInputGroup} className='w-8 h-8 font-bold rounded-full border border-1'>+</button>
      
      
      </div>
     
      
    
    
    </div>

    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Work Experience</label>
       <input  value = {formData.workExp} type="number" name="workExp" onChange={handleChange}   className="shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
      </div>
      
    
    
    </div>

    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Current Company</label>
       <input  value = {formData.currentJob} type="text" placeholder="Ex : Amazon,Google" name="currentJob" onChange={handleChange}   className="shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
      </div>
      
    
    
    </div>

    <div className="w-90 mt-10 flex gap-5 ">
      <div>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Current Position</label>
       <input  value = {formData.currentTitle} type="text" placeholder="Ex : Software Engg,Data Scientist" name="currentTitle" onChange={handleChange}   className="shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
      </div>
      
    
    
    </div>


    <div className="w-90 mt-10 flex flex-col gap-5 ">
      <div className='flex flex-col gap-10 items-start'>
       <label className="block text-gray-700 font-bold mt-5 mb-5">Important Links/URL's</label>
       <div>
        
       {
       
           formData.links && formData.links.map((edu,index)=>(
                
<div className='flex items-center gap-4'>

<input placeholder="Website Name / URL type" value={edu.linkType} type="text" name="linkType" onChange={e => handleLinkInputChange(index, 'linkType', e.target.value)}   className="w-80 shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
<input placeholder="URL/LINK"  type="text" value={edu.url} name="url" onChange={e => handleLinkInputChange(index, 'url', e.target.value)}   className="w-80 shadow-lg border-yellow-400 border-b-2 p-4 focus:outline-none focus:border-blue-500"></input>
{
  formData.links.length >1?
<button onClick={() => removeLinkInputGroup(index)} className='w-8 h-8 font-bold rounded-full border border-1'>-</button>
:
<></>
}
</div>
            )
          )
          }

       </div>
        
       <button onClick={addLinkInputGroup} className='w-8 h-8 font-bold rounded-full border border-1'>+</button>
       
      
      </div>
     
      
    
    
    </div>

    </div>
    </>
    
    </>
    )
}

export default General;