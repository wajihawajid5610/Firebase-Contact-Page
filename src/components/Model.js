import React from 'react'
import { createPortal } from 'react-dom';
import { MdClose } from "react-icons/md";

const Model = ({isopen , isclose, children}) => {
  return createPortal(
  <>
     {isopen && (   
           <>
             <div className='h-[265px] w-[348px] z-50 relative p-2 m-auto rounded-lg  bg-white'>
                 <div className='flex flex-col items-end'>
                    <MdClose onClick={isclose} className='text-2xl '/>
                 </div>
                 
                {children}     
            </div>
            <div onClick={isclose} className=' backdrop-blur z-40 h-screen w-screen absolute top-0'/>
           </>
    )}
    </>,
    document.getElementById("modal-root")
  )
}

export default Model
