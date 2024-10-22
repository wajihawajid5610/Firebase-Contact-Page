 import React from 'react'
import Model from './Model';
import {ErrorMessage, Formik} from 'formik';
import { Field, Form } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const AddUpdateContact = ({isOpen,onClose,IsUpdate,contact}) => {

  const contactSchemaValidation= Yup.object().shape({
    name: Yup.string().required("Name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
  })

  const addContact = async (contact)=>{
    try{
      const contactRef = collection(dataBase,'contacts');
      await addDoc(contactRef,contact);
      toast.success('Record updated successfully');
      onClose();

    }
    catch(error){
      console.log(error)
    }
  };

  const updateContact = async (contact,id)=>{
    try{
      const contactRef = doc(dataBase,'contacts',id);
      await updateDoc(contactRef,contact,id);
      toast.success('Record updated successfully');
      onClose();  
    }
    catch(error){
      console.log(error)
    }
  };
  return (
    <div>
       <Model isopen={isOpen} isclose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            IsUpdate ? {
                name:contact.name,
                Email:contact.Email,
              }
              :
              {
                name:'',
                Email:'',
              }
            }
          onSubmit={(values)=>{
            IsUpdate ? updateContact(values,contact.id) : addContact(values);
          }}>   
            <Form className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='name'> Name</label>
                <Field name='name' className='border h-10 '></Field>
                <div className='text-red-500 text-xs'>
                  <ErrorMessage name='name' />
                </div>
                <label htmlFor='Email'>Email</label>
                <Field name='Email' className='border h-10'></Field>
                <div className='text-red-500 text-xs'>
                  <ErrorMessage name='Email' />
                </div>
                <button  className='bg-orange mt-2 self-end px-3 py-1.5 border'>{IsUpdate? 'Update':'Add'} Contact</button>
              </div>
              
            </Form>
        </Formik>
      </Model> 
    </div>
  )
}
export default AddUpdateContact

