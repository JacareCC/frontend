import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface TierEditFormProps {
    setButtonActive:any;
    setShowForm: any;
  tierId: number;
  description?: string;
  points: number;  
  placeholder?: string | undefined;
  refresh: number;
  register?: UseFormRegister<FieldValues>;
  onEditSave?: (data: { description: string; points: number}) => void;
}

const TierEditForm: React.FC<TierEditFormProps> = ({ refresh, description, points, tierId, register, onEditSave, setButtonActive, setShowForm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description || '');
  const [editedPoints, setEditedPoints] = useState(points || 0);
  

  const [formData, setFormData] = useState({
    description: description || '',
    points: points || 0,
    refresh: refresh || 1,
  });

  const handleEditSaveClick = async () => {
    if (isEditing) {
      const data = {
        description: description || "",
        points: points || 0,
        refresh: refresh || 1,
      };

      setFormData((prevData) => ({
        ...prevData,
        ...data,
      }));

      if (onEditSave) {
        onEditSave(data);
      }

      try {
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}business/tier/edit/${tierId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            
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
    setEditedDescription(description || '');
    setEditedPoints(points || 0);

  }, [points, description]);

  function handleClose() {
        setButtonActive((prev:boolean) => !prev);
        setShowForm(true);

  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md text-black">
      <div className="mb-4 font-yaro text-black">
        <label htmlFor="description" className="block text-sm font-semibold mb-1 text-black">
          Description:
        </label>
        {isEditing ? (
          <input
            type="text"
            id="description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-jyellow text-black"
          />
        ) : (
          <div className="mb-2 flex justify-between items-center w-full text-black">
            <p className="text-lg">{editedDescription || "N/A"}</p>
          </div>
        )}
      </div>
      <div className="mb-4 font-yaro text-black">
        <label htmlFor="points" className="block text-sm text-black font-semibold mb-1">
          Points:
        </label>
        {isEditing ? (
          <input
            type="number"
            id="points"
            value={editedPoints}
            onChange={(e) => setEditedPoints(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-jyellow"
          />
        ) : (
          <div className="mb-2 flex justify-between items-center w-full text-black">
            <p className="text-lg">{editedPoints || 0}</p>
          </div>
        )}
      </div>
      <div className="mb-4 font-yaro text-black">
        <label htmlFor="refresh" className="block text-sm font-semibold mb-1 text-black">
          Days until refresh:
        </label>
        {isEditing ? (
          <input
            type="number"
            id="refresh"
            value={formData.refresh}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                refresh: parseInt(e.target.value),
              }))
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-jyellow text-black"
          />
        ) : (
          <div className="mb-2 flex justify-between items-center w-full text-black">
            <p className="text-lg">{formData.refresh || 1}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-jgreen text-white px-4 py-2 rounded mr-2 hover:bg-jyellow focus:outline-none"
          onClick={handleEditSaveClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button  className="bg-jgreen text-white px-4 py-2 rounded mr-2 hover:bg-jyellow focus:outline-none" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default TierEditForm;