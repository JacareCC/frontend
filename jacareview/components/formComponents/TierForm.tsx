import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


interface FormData {
  description: string;
  points: number;
}

interface TierFormProps {
    text: string;
    showForm: boolean;
    setShowForm: any;
    setButtonActive? :any ;
    id: string;
    setStatusCode:any
  }
  
const TierForm: React.FC<TierFormProps> = ({ text, showForm, setShowForm, setButtonActive, id, setStatusCode }) => {
    

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  interface dataToSendObj{
    uid: string,
    tier: string
    description: string;
    points: number

  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const dataToSendObj = {
        id:id,
        tier: text.toLocaleLowerCase(),
        description: data.description,
        points: data.points
    }

        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}business/tier/new/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(dataToSendObj),
      })
        .then((response) => {
          setStatusCode(response.status);
          return response.json();
        })

    setShowForm(false);
    setButtonActive(false);
  };

  function onCancel(){
    setShowForm(false);
    setButtonActive(false)
  }

  return (
        <div>
          {showForm && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 font-yaro">
                  <label htmlFor="description" className="block text-sm font-semibold mb-1">
                    Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500">{errors.description.message}</span>
                  )}
                </div>
                <div className="mb-4 font-yaro">
                  <label htmlFor="points" className="block text-sm font-semibold mb-1">
                    Points:
                  </label>
                  <input
                    type="number"
                    id="points"
                    {...register('points', {
                      required: 'Points is required',
                      valueAsNumber: true,
                      validate: (value) => !isNaN(value) || 'Points must be a number',
                    })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  {errors.points && (
                    <span className="text-xs text-red-500">{errors.points.message}</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      );
    };

export default TierForm;