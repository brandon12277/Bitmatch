"use client"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [checked, setCheck] = useState(Array(11).fill(false));

  const [user,setUser] = useState(null)

  useEffect(()=>{
          
    const user_d = JSON.parse(localStorage.getItem("user"))
    console.log(user_d)
    setUser(user_d)
     
  })
    
    
  const Compstack = ['ReactJs','Vue','Angular','MongoDB','Nodejs','Cyber Security','ASP.NET','JAVA','PYTHON','JAVASCRIPT','NextJS']

  const isChecked = () => {

    let newChecked = { ...checked };

    stack.map((item,ind)=>{
      
      if(tech.includes(item)){
        newChecked[ind] = true;
      }

      
    })

    setCheck(newChecked);
    
    
    
  };



    const handleChange = (e,ind) => {
        const { value } = e.target;
        const  check = checked[ind]

        console.log(checked)
       
        
        if (check) {
          setFormData({...formData, ['stack'] : formData.stack.filter(item => item !== value)});
          setCheck({...checked,[ind]: false})
         
            
        } else {
          console.log("hi")
          setFormData({...formData, ['stack'] : [...formData.stack,value]});
          setCheck({...checked,[ind]: true})
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
   (<i class="fa-solid fa-n"></i>)]


  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    owner : '',
    visibility: 'public',
    description: '',
    buffer: null,
    stack : []
  });

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({
          ...formData,
          buffer: reader.result
        });
      };
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create form data for the file upload
   

    try {
      setFormData({
        ...formData,
        owner: user._id
      });
        console.log(formData)
      const response = await axios.post('/auth/routes/communities/createComm', formData);
      if(response){
        window.location.href="/communities"
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div
        className="w-full  bg-white rounded-lg shadow-md p-6 cursor-pointer mb-4"
        style={{ backgroundImage: `url(${ formData.buffer })` }}
        onClick={handleDivClick}
      >
        <p className="text-center text-gray-500">Click to select an image file</p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visibility">
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
        <div className=  "mt-10 grid grid-cols-3 gap-10 justify-center items-center">
            
            {
             Compstack.map((item,ind)=>(
                 <label className={`inline-flex gap-5 items-center mr-4 cursor-pointer  ${checked[ind] ? "checked" : ""}` }>
                   <div className={checked[ind] ? 'm-2 p-2 rounded-full border border-none bg-yellow-400' : ""}>

                   </div>
                    <span style={{color:"#393124",fontSize:"large"}} className="ml-2">{stackImg[ind]}</span>
                 <input
                   type="button"
                   name={item}
                   value={item}
                   onClick={(e)=>{handleChange(e,ind)}}
                   className={`form-radio  `}
                 />
                
               </label>
             ))
            }
            
       </div>
      </form>
    </div>
  );
};

export default App;