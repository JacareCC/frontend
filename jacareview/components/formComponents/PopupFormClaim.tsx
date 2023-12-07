import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { toast } from 'react-toastify';

interface PopupFormClaimProps {
  user_uid: string | null | undefined; 
  onClose: () => void;
}

const PopupFormClaim: React.FC<PopupFormClaimProps> = ({ user_uid, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}business/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user_uid || '', 
          },
          body: JSON.stringify(data),
        });
  
        if (results.ok) {
            console.log('sent!')
        } else {
          console.error('Error:', results.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-4/5 md:w-1/3  p-4 rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('user_uid')} value={user_uid || ''} />

          <div className="mb-1">
            <label className="block text-sm">First Name</label>
            <input type="text" {...register('first_name', { required: {value:true, message: 'This field is required'}})} className="border w-full" />
            {errors.first_name && <span className="text-xs text-red-500">{(errors.first_name as FieldError).message}</span>}
          </div>

          <div className="mb-1">
            <label className="block text-sm">Last Name</label>
            <input type="text" {...register('last_name', { required: {value: true, message: 'This field is required'} })} className="border w-full" />
            {errors.last_name && <span className="text-xs text-red-500">{(errors.last_name as FieldError).message}</span>}
          </div>

          <div className="mb-1">
            <label className="block text-sm">Business Name</label>
            <input type="text" {...register('business_name', { required: {value: true, message: 'This field is required'} })} className="border w-full" />
            {errors.business_name && <span className="text-xs text-red-500">{(errors.business_name as FieldError).message}</span>}
          </div>

          <div className="mb-1">
            <label className="block text-sm">Email</label>
            <input type="email" {...register('email', { required: {value: true, message: 'This field is required'}, pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} className="border w-full" />
            {errors.email && <span className="text-xs text-red-500">{(errors.email as FieldError).message}</span>}
          </div>

          <div className="mb-1">
            <label className="block text-sm">Contact Person</label>
            <input type="text" {...register('contact_person', { required: {value: true, message: 'This field is required'} })} className="border w-full" />
            {errors.contact_person && <span className="text-xs text-red-500">{(errors.contact_person as FieldError).message}</span>}
          </div>

          <div className="mb-1">
            <label className="block text-sm">Address</label>
            <input type="text" {...register('address', { required: {value: true, message: 'This field is required'} })} className="border w-full" />
            {errors.address && <span className="text-xs text-red-500">{(errors.address as FieldError).message}</span>}
          </div>

          <div className="mb-1">
            <label className="block text-sm">Phone Number</label>
            <input type="text" {...register('phone_number', { required: {value: true, message: 'This field is required'} })} className="border w-full" />
            {errors.phone_number && <span className="text-xs text-red-500">{(errors.phone_number as FieldError).message}</span>}
          </div>

          <div className="flex  gap-4 mt-4">
          <button type="button" onClick={onClose} className="rounded bg-gray-300 text-gray-700 px-4 py-2">
            Cancel
          </button>
          <button type="submit" className="rounded bg-orange text-white px-4 py-2">
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default PopupFormClaim;
