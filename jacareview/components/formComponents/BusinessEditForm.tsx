import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface BusinessEditFormProps {
  user_uid?: string | any;
  email?: string;
  contactPerson?: string;
  phoneNumber?: string | any;
  placeholder?: string | undefined;
  register?: UseFormRegister<FieldValues>;
  onEditSave?: (data: { email?: string; contactPerson?: string; phoneNumber?: string }) => void;
}

const BusinessEditForm: React.FC<BusinessEditFormProps> = ({ email, contactPerson, phoneNumber, user_uid, register, onEditSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email || '');
  const [editedContactPerson, setEditedContactPerson] = useState(contactPerson || '');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState<string | undefined | any>(phoneNumber);

  const [formData, setFormData] = useState({
    user_uid: user_uid || '',
    email: email || '',
    contactPerson: contactPerson || '',
    phoneNumber: phoneNumber || '',
  });

  const handleEditSaveClick = async () => {
    if (isEditing) {
      const data = {
        email: editedEmail,
        contactPerson: editedContactPerson,
        phoneNumber: editedPhoneNumber,
      };

      setFormData((prevData) => ({
        ...prevData,
        ...data,
      }));

      if (onEditSave) {
        onEditSave(data);
      }

      try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/edit/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user_uid || '',
          },
          body: JSON.stringify(data),
        });

        if (results.ok) {
          console.log('Changes saved successfully');
        } else {
          console.error('Error saving changes:', results.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setIsEditing(!isEditing);
  };

  useEffect(() => {
    setEditedEmail(email || '');
    setEditedContactPerson(contactPerson || '');
    setEditedPhoneNumber(phoneNumber);
  }, [email, contactPerson, phoneNumber]);

  return (
    <div className="flex flex-col gap-4 px-8 py-2 font-yaro">
      <div className="flex flex-col align-center border-solid border-b border-gray-300 mb-2">
        <label className='text-sm text-white'>Email</label>
        {isEditing ? (
          <div className='mb-2 flex justify-between items-center w-full text-white'>
            <input
              type='text'
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              {...register && register('email')} 
              className="text-black"
            />
          </div>
        ) : (
          <div className='mb-2 flex justify-between items-center w-full text-white'>
            <p className='text-lg'>{editedEmail || "N/A"}</p>
          </div>
        )}
      </div>
      <div className="mb-2 flex flex-col align-center border-solid border-b border-gray-300 text-white">
        <label className='text-sm'>Contact Person</label>
        {isEditing ? (
          <div className='flex justify-between items-center w-full'>
            <input
              type='text'
              value={editedContactPerson}
              onChange={(e) => setEditedContactPerson(e.target.value)}
              {...register && register('contactPerson')} 
              className="text-black"
            />
          </div>
        ) : (
          <div className='flex justify-between items-center w-full'>
            <p className='text-lg'>{editedContactPerson || "N/A"}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col align-center border-solid border-b border-gray-300 text-white">
        <label className='text-sm'>Phone Number</label>
        {isEditing ? (
          <div className='flex justify-between items-center w-full'>
            <input
              type='tel'
              value={editedPhoneNumber}
              onChange={(e) => setEditedPhoneNumber(e.target.value)}
              {...register && register('phoneNumber')} 
              className="text-black"
            />
          </div>
        ) : (
          <div className='flex justify-between items-center w-full'>
            <p className='text-lg'>{editedPhoneNumber || "N/A"}</p>
          </div>
        )}
      </div>

      <button className='w-1/2 md:w-1/4 bg-orange text-white p-2 rounded shadow-lg shadow-xl' onClick={handleEditSaveClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default BusinessEditForm;
