import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css';
import TextInput from "./FormTextInputRequired";
import ClaimConfirm from "../popUpComponents/ClaimConfirm";
import { useRouter } from "next/navigation";

interface ClaimFormProps {
    userUid: string;
}

interface ClaimData {
    user_uid: string;
    first_name: string;
    last_name: string;
    business_name: string;
    email: string;
    contact_person: string;
    address: string;
    phone_number: string;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ userUid }) => {
    const { register, handleSubmit, setValue } = useForm<ClaimData>();
    const router = useRouter();


    const onSubmitHandler = async (data: ClaimData) => {
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}business/claim`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            

        toast.success('Claim submitted!'
        , {
            autoClose: 2000,
        });
        setTimeout(() => {
            router.push('/userpage');
        }, 3000); 

       
    }

    useEffect(() => {
        setValue('user_uid', userUid);
    }, [userUid])

    return (
        <div className="w-[100vw] flex justify-center">
            <form className="w-[100vw] flex flex-col" onSubmit={handleSubmit(onSubmitHandler)}>
                <h2 className="font-semibold p-2 shadow-md bg-green-50">
                    Claim your restaurant now and start leveraging customer reviews to boost your business.</h2>
                <TextInput register={register} name='first_name' title='First Name' placeholder={"First Name"}/>
                <TextInput register={register} name='last_name' title="Last Name" placeholder={"Last Name"}/>
                <TextInput register={register} name='email' title='Email' placeholder={"Email"} />
                <TextInput register={register} name='business_name' title='Business Name' placeholder={"Business Name"}/>
                <TextInput register={register} name='address' title="Business Address" placeholder={"Business Address"}/>
                <TextInput register={register} name='contact_person' title='Contact Person' placeholder={"Contact Person"}/>
                <TextInput register={register} name='phone_number' title='Phone number' placeholder={"Phone Number"}/>
                <button className=" mx-8 mb-4 mt-4 bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600" type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default ClaimForm;
