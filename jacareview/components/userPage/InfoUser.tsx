import { UseFormRegister, FieldValues } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CircleDollarSign } from 'lucide-react';
interface InfosUserProps {
  points?: string | any;
  user_uid?: string | any;
  email?: string;
  name?: string;
  birthday?: string | any;
  placeholder?: string | undefined;
  register?: UseFormRegister<FieldValues>;
  onEditSave?: (data: { email?: string; name?: string; birthday?: string }) => void;
}

const InfosUser: React.FC<InfosUserProps> = ({ email, name, birthday, user_uid, points, register, onEditSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email || '');
  const [editedName, setEditedName] = useState(name || '');
  const [editedPoints, setEditePoints] = useState<string | undefined | any>(name || '');
  const [editedBirthday, setEditedBirthday] = useState<string | undefined | any>(birthday);

  const [formData, setFormData] = useState({
    user_uid: user_uid || '',
    email: email || '',
    name: name || '',
    birthday: birthday || '',
    points: points || '',
  });

  const handleEditSaveClick = async () => {
    if (isEditing) {
      const data = {
        email: editedEmail,
        name: editedName,
        birthday: editedBirthday,
      };

      setFormData((prevData) => ({
        ...prevData,
        ...data,
      }));

      if (onEditSave) {
        onEditSave(data);
      }

      try {
        console.log(data)
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/edit/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user_uid || '',
          },
          body: JSON.stringify(data),
        });

        if (results.ok) {
          console.log('sucess');
        } else {
          console.error('Error:', results.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setIsEditing(!isEditing);
  };

  useEffect(() => {
    setEditedEmail(email || '');
    setEditedName(name || '');
    setEditedBirthday(birthday);
  }, [email, name, birthday, points]);

  return (
    <div className="flex flex-col gap-4 px-8 py-2">
      <div className='flex items-center justify-center border-gray-300 gap-2 mb-2 pb-2 border-solid border-b'>
        <CircleDollarSign className='text-jgreen'/>
        <p className=' text-lg rounded text-jgreen'>{points} jacoins</p>
      </div>
  
      <div className='mb-2 flex flex-col border-solid border-b border-gray-300'>
        <label className='text-sm text-gray-500'>Email</label>
        {isEditing ? (
          <input
            className='bg-gray-200 basis-2/3 rounded'
            type='email'
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            {...register && register('email', { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
          }
          />
        ) : (
          <div className='mb-2 flex justify-between items-center w-full'>
            <p className='text-lg'>{editedEmail || "jacare@jacareview.com"}</p>
          </div>
        )}
      </div>
  
      <div className="mb-2 flex flex-col align-center border-solid border-b border-gray-300">
        <label className='text-sm text-gray-500'>Name</label>
        {isEditing ? (
          <div className='flex justify-between items-center w-full'>
            <input
              className='bg-gray-200 basis-2/3 rounded'
              type='text'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              {...register && register('name')} 
            />
          </div>
        ) : (
          <div className='flex justify-between items-center w-full'>
            <p className='text-lg'>{editedName || "N/A"}</p>
          </div>
        )}
      </div>
  
      <div className="flex flex-col align-center border-solid border-b border-gray-300">
        <label className='text-sm text-gray-500'>Birthday</label>
        {isEditing ? (
          <div className='flex justify-between items-center w-full'>
            <input
              className='bg-gray-200 basis-2/3 rounded'
              type='date'
              value={editedBirthday}
              onChange={(e) => setEditedBirthday(e.target.value)}
            />      
          </div>
        ) : (
          <div className='flex justify-between items-center w-full'>
            <p className='text-lg'>{editedBirthday || "N/A"}</p>
          </div>
        )}
      </div>
  
      <button className='w-1/2 md:w-1/4 bg-orange text-white p-2 rounded shadow-lg shadow-xl' onClick={handleEditSaveClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
        }  
export default InfosUser;
