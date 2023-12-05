import { UseFormRegister, FieldValues } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface InfosUserProps {
  email?: string;
  name?: string;
  birthday?: string | any;
  placeholder?: string | undefined;
  register?: UseFormRegister<FieldValues>;
  onEditSave?: (data: { email?: string; name?: string; birthday?: string }) => void;
}

const InfosUser: React.FC<InfosUserProps> = ({ email, name, birthday, placeholder, register, onEditSave }) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBirthday, setIsEditingBirthday] = useState(false);

  const [editedEmail, setEditedEmail] = useState(email || '');
  const [editedName, setEditedName] = useState(name || '');
  const [editedBirthday, setEditedBirthday] = useState<string | undefined | any>(birthday);

  const handleEditClick = (field: string) => {
    if (field === 'email') {
      setIsEditingEmail(true);
    } else if (field === 'name') {
      setIsEditingName(true);
    } else if (field === 'birthday') {
      setIsEditingBirthday(true);
    }
  };

  const handleSaveClick = (field: string) => {
    if (onEditSave) {
      const data = {
        email: field === 'email' ? editedEmail : email,
        name: field === 'name' ? editedName : name,
        birthday: field === 'birthday' ? editedBirthday : birthday,
      };
      onEditSave(data);
    }

    if (field === 'email') {
      setIsEditingEmail(false);
    } else if (field === 'name') {
      setIsEditingName(false);
    } else if (field === 'birthday') {
      setIsEditingBirthday(false);
    }
  };

  useEffect(() => {
    setEditedEmail(email || '');
    setEditedName(name || '');
    setEditedBirthday(birthday);
  }, [email, name, birthday]);

  return (
    <div className="flex flex-col w-[100vw] gap-4 px-8 py-2 font-yaro">
      <div>
        <div className="flex flex-col align-center border-solid border-b border-gray-300">
          <label className='text-sm'>Email</label>
          {isEditingEmail ? (
            <div className='flex justify-between items-center w-full'>
              <input
                type='text'
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                {...register && register('email')} // Adiciona o campo ao formulário se register for fornecido
              />
              <button className='bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center' onClick={() => handleSaveClick('email')}>Save</button>
            </div>
          ) : (
            <div className='flex justify-between items-center w-full'>
              <p className='text-lg'>{editedEmail || "jacare@jacareview.com"}</p>
              <button className='bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center' onClick={() => handleEditClick('email')}>Edit</button>
            </div>
          )}
        </div>
        <div className="flex flex-col align-center border-solid border-b border-gray-300">
          <label className='text-sm'>Name</label>
          {isEditingName ? (
            <div className='flex justify-between items-center w-full'>
              <input
                type='text'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                {...register && register('name')} // Adiciona o campo ao formulário se register for fornecido
              />
              <button className='bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center' onClick={() => handleSaveClick('name')}>Save</button>
            </div>
          ) : (
            <div className='flex justify-between items-center w-full'>
              <p className='text-lg'>{editedName || "N/A"}</p>
              <button className='bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center' onClick={() => handleEditClick('name')}>Edit</button>
            </div>
          )}
        </div>
        <div className="flex flex-col align-center border-solid border-b border-gray-300">
          <label className='text-sm'>Birthday</label>
          {isEditingBirthday ? (
            <div className='flex justify-between items-center w-full'>
              <DatePicker
                selected={editedBirthday ? new Date(editedBirthday) : null}
                onChange={(date) => setEditedBirthday(date)}
                {...register && register('birthday')} // Adiciona o campo ao formulário se register for fornecido
              />
              <button className='bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center' onClick={() => handleSaveClick('birthday')}>Save</button>
            </div>
          ) : (
            <div className='flex justify-between items-center w-full'>
              <p className='text-lg'>{editedBirthday || "N/A"}</p>
              <button className='bg-gray-100 text-indigo-500 p-2 rounded shadow-lg shadow-xl flex justify-center items-center' onClick={() => handleEditClick('birthday')}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfosUser;
