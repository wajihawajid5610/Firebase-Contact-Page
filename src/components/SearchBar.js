import React, { useEffect ,useState} from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import AddUpdateContact from './AddUpdateContact';
import DispalyBar from './DispalyBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataBase } from '../config/firebase';
import {collection, onSnapshot} from "firebase/firestore";
import useDisclose from '../hooks/useDisclose';
import NotFoundContact from './NotFoundContact';




const SearchBar = () => {
   const [contacts,setcontacts]= useState([]);
   const {onOpen,onClose,isOpen} = useDisclose();

   useEffect(()=>{
    const contact = async()=>{
      try
      {
        const contactRef = collection(dataBase,"contacts"); 
        onSnapshot(contactRef, (snapshot)=>{
          const constList = snapshot.docs.map((doc)=>{
            return{
                id: doc.id,
                ...doc.data(),
              }});
           setcontacts(constList);  
           return(constList)    
      })}
      catch(error){
      }   
    };
   contact();
   },[]);

   const filterContact = (e)=>{
      const value= e.target.value;
      const contactRef = collection(dataBase,"contacts"); 
        onSnapshot(contactRef, (snapshot)=>{
          const constList = snapshot.docs.map((doc)=>{
            return{
                id: doc.id,
                ...doc.data(),
              };
            });
           
           const filterdContact = constList.filter(contact =>
            contact.name.toLowerCase().includes(value.toLowerCase())
           )
           setcontacts(filterdContact);  
           return(filterdContact)    
      });
   };

  return (
    <>
    <div>
      <div className='flex gap-1'>
      <div className=' flex relative items-center flex-grow'>
        <MdOutlineSearch className='text-white text-3xl rounded-lg  absolute pl-1 '/>
        <input type='text' placeholder='Search Contact' onChange={filterContact}
        className='bg-transparent border rounded-lg border-white flex-grow h-10 pl-9 text-white'/>
      </div>
      <AiFillPlusCircle onClick={onOpen} className='text-white text-5xl cursor-pointer'/>
      </div>

        <div className='mt-3'>
          { contacts.lenght <= 0 ?( <NotFoundContact/>) : 
            (contacts.map((contact)=>(
             <DispalyBar key={contact.id} contact={contact}/>
            )))
          }  
        </div>  
    </div>
     <AddUpdateContact isOpen={isOpen} onClose={onClose}/>  
     <ToastContainer position='bottom-center'/>
    </>   
  )
}

export default SearchBar
