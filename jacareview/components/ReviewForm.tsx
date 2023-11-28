import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import '../app/globals.css';
import FormFivePoints from "./FormFivePoints";
import { Accessibility } from "lucide-react";
import BinaryChoice from "./FormBinaryChoice";
import TextInput from "./FormTextInput";


interface ReviewFormProps {
    userUid: string;
    restaurantPlaceId: string;
    restaurantName: string;
}

interface ReviewData {
    restaurant_place_id: string;
    user_uid: string;
    date_made: string;
    accessibility: number; 
    disability_access: string;
    parking: string;
    public_transit_access: string;
    findability: string;
    value_for_price: number;
    food_quality: number;
    ingredients_quality: string;
    amount_of_food: string; 
    presentaion: string; 
    drink_menu: string; 
    customer_service: number; 
    staff_knowledge: string; 
    courtesy: string; 
    table_wait_time: string; 
    food_wait_time: string; 
    atmosphere: number; 
    interior_design: string; 
    exterior_design: string; 
    cleanliness: string; 
    foreigner_friendly: string; 
    comfort: string; 
    dietary_description: string; 
    verified: boolean;
    hidden: boolean;
    competitive_price: string; 
}

const ReviewForm: React.FC<ReviewFormProps> = ({ userUid, restaurantPlaceId, restaurantName }) => {

    const { register, handleSubmit, setValue } = useForm<ReviewData>();

    const  onSubmitHandler = async (data: ReviewData) => {
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}submitreview/`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json" , 
            },
            body : JSON.stringify(data)
          })
              .then(response => console.log(response))
            
        console.log(data);
    }


useEffect(() => {
    setValue('restaurant_place_id', restaurantPlaceId);
    setValue('user_uid', userUid);
    setValue('date_made', new Date().toISOString());
    setValue('hidden', false);
    setValue('verified', false);
}, [userUid, restaurantPlaceId])

//handler

    return (
        <div className="w-[100vw] flex justify-center">
            <form className="w-[100vw] flex flex-col" onSubmit={handleSubmit(onSubmitHandler)}>
                <h2 className="font-semibold p-2 shadow-md bg-green-50">General Points</h2>
                <FormFivePoints register={register} name='accessibility' title='Accessibility'/>
                <FormFivePoints register={register} name='value_for_price' title='Value for Price' />
                <FormFivePoints register={register} name='customer_service' title='Customer Service' />
                <FormFivePoints register={register} name='atmosphere' title='Atmosphere' />
                <FormFivePoints register={register} name='food_quality' title='Food Quality' />
                <h2 className="font-semibold p-2 shadow-md bg-green-50">Accessibility Points</h2>
                <TextInput register={register} name='parking' title='Parking lot' />
                <TextInput register={register} name='public_transit_access'title="Public transit access" />
                <TextInput register={register} name='findability' title='Findability' />
                <TextInput register={register} name='disability_access' title ='Disability Access' />
                <h2 className="font-semibold p-2 shadow-md bg-green-50">Food quality Points</h2>
                <TextInput register={register} name='ingredients_quality' title='Ingredients Quality' />
                <TextInput register={register} name='amount_of_food' title="Portion size" />
                <TextInput register={register} name='presentation' title='Presentation' />
                <TextInput register={register} name='drink_menu' title="Drink Menu" />
                <h2 className="font-semibold p-2 shadow-md bg-green-50">Customer service Points</h2>
                <TextInput register={register} name='staff_knowledge' title="Staff knowledge" />
                <TextInput register={register} name='courtesy' title="Courtesy" />
                <TextInput register={register} name='table_wait_time' title="Table wait time in minutes" />
                <TextInput register={register} name='food_wait_time' title="Food wait time in minutes" />
                <TextInput register={register} name='foreigner_friendly' title='Foreigner Friendly' />
                <TextInput register={register} name='dietary_description' title="Dietary Description" />
                <h2 className="font-semibold p-2 shadow-md bg-green-50">Atmosphere Points</h2>
                <TextInput register={register} name='interior_design' title='Interior Design' />
                <TextInput register={register} name='exterior_design' title='Exterior Design' />
                <TextInput register={register} name='cleanliness' title='Cleanliness' />
                <TextInput register={register} name='comfort' title="Comfort" />
                <h2 className="font-semibold p-2 shadow-md bg-green-50">Value for price Points</h2>
                <TextInput register={register} name='competitive_price'title="Competitive price" />
                <button className=" mx-8 mb-4 mt-4 bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm;
