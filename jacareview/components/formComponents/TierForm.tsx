import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  description: string;
  points: number;
}

interface TierFormProps {
  buttonLabel: string;
}

const TierForm: React.FC<TierFormProps> = ({ buttonLabel }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Make your fetch request here with the data and buttonLabel
    console.log('Data submitted:', data);
    setShowForm(false);
  };

  const onCancel = () => {
    setShowForm(false);
  };

  const onOpenForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <button onClick={onOpenForm}>{buttonLabel}</button>
      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Description:</label>
              <input {...register('description', { required: 'Description is required' })} />
              {errors.description && <span>{errors.description.message}</span>}
            </div>
            <div>
              <label>Points:</label>
              <input {...register('points', { required: 'Points is required', valueAsNumber: true })} />
              {errors.points && <span>{errors.points.message}</span>}
            </div>
            <div>
              <button type="submit">Save</button>
              <button type="button" onClick={onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TierForm;