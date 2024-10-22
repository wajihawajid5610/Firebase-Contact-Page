import {  deleteDoc, doc } from 'firebase/firestore'
import React from 'react'

import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { dataBase } from '../config/firebase'
import AddUpdateContact from './AddUpdateContact'
import useDisclose from '../hooks/useDisclose'
import { toast } from 'react-toastify'

const DispalyBar = ({contact}) => {

  const {onOpen,onClose,isOpen} = useDisclose();
    const deleteContact = async (id)=>{
      try{
       await deleteDoc(doc(dataBase,'contacts',id));
       toast.success("Record deleted successfully");
      }
      catch(error){
        console.log(error)
      }
    };
  return (
   <>
     <div key={contact.id} className='bg-yellow h-16 rounded-lg mt-1 flex justify-between items-center'>
        <div className='flex'>
          <HiOutlineUserCircle className='ml-1 text-mustard text-5xl' />
          <div className='ml-2 h-4 w-36'>
            <h2 className='font-medium'>{contact.name}</h2>
            <p className='text-sm'>{contact.Email}</p>
          </div>
        </div>
        <div className='flex text-3xl p-2 gap-2 '>
          <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
          <IoMdTrash onClick={()=>deleteContact(contact.id)} className='text-purple cursor-pointer'/>
        </div>
      </div>
      <AddUpdateContact contact={contact} IsUpdate isOpen={isOpen} onClose={onClose}/>
      
   </>
  )
}

export default DispalyBar
