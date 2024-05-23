
"use client"

import  { useState,useEffect } from "react";
import '../styles/globals.css';
import { Poppins } from 'next/font/google'
import { Ruluko } from 'next/font/google'



 
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})


const ruluko = Ruluko({
  weight: '400',
  subsets: ['latin'],
})


const Navbar = () =>{

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [on,setNav] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    navigateBar()
  };
  const navigateBar = () =>{
    
    if (on)setNav(null)
    else
   setNav(1)
    

   
};

  useEffect(() => {

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 750);
    };

    
    window.addEventListener('resize', handleResize);

   
    handleResize();

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []); 
   
    const redirectToLink = (url) => {
        window.location.href = url;
      };

      const UnAuthNav = (
        <>
        {isSmallScreen ? 
          <div className="p-2 w-full flex flex-col justify-center items-center br-d nav-col nav-bck">
          <div className="p-2 w-full flex justify-center items-center">
          <div className="">
          <img src="/images/bitm.png" style={{width:"150px",height:"auto"}}></img>
          </div>
          <div className="w-full flex justify-end gap-20 mr-5 ">

          <button className="flex items-center justify-center p-2" aria-label="Toggle Menu" onClick={handleClick}>
              {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
          ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
          )}
          </button>
          </div>
          </div>
          {
              on ?
          <div id= "nav-mob" className="w-full flex flex-col items-center gap-20 mt-5">
            <button  onClick={() => redirectToLink('/')}  className="def-but pt-1 pr-4 pb-1 pl-4 ">About</button>
            <button  onClick={() => redirectToLink('/')}  className="def-but pt-1 pr-4 pb-1 pl-4 ">Contact</button>
              <button  onClick={() => redirectToLink('/Login')}  className="def-but pt-1 pr-4 pb-1 pl-4 ">Login</button>
              <button onClick={() => redirectToLink('/Login')} className="get-start">Sign Up</button>

              
          </div>
          :
          <></>

        }
      </div>
        :
        <div className={` poppins w-full flex flex-row items-center p-3 nav-col nav-bck`}>
       <h1 style={{fontFamily:'"Libre Baskerville", serif',color:"#ffe4c0"}} className="text-2xl">BitMatch</h1>
        <div className="w-full flex  items-center justify-end gap-10 mr-10">
        <button  onClick={() => redirectToLink('/')}  className="def-but pt-1 pr-4 pb-1 pl-4 text-white">About</button>
            <button  onClick={() => redirectToLink('/')}  className="def-but pt-1 pr-4 pb-1 pl-4 text-white">Contact</button>
              <button  onClick={() => redirectToLink('/Login')}  className="def-but pt-1 pr-4 pb-1 pl-4 text-white ">Login</button>
              <button onClick={() => redirectToLink('/SignUp')} className="get-start">Sign Up</button>
        </div>

        </div>
        }
       

        </>

      )

    return(
        <>
           {UnAuthNav}
        
        </>
    )


}

export default Navbar