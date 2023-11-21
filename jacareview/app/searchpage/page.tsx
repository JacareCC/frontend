"use client"
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"

export default function SearchPage() {
    const [location, setLocation] = useState<any>(null);
    const [cuisineType, setCuisineType] = useState<string | null> (null);
    const [price, setPrice] = useState<string| null>(null);
    const [openNow, setOpenNow] = useState<boolean>(false);
    const [amountOfOptions, setAmountOfOptions] = useState<number | null>(null)

    
    interface searchDataObject {
        cuisineType: string | null,
        price: string | null,
        openNow: boolean,
        amountOfOptions: number | null
    }
    
    let searchObject: searchDataObject = 
    { cuisineType: cuisineType,
        price: price,
        openNow: openNow,
        amountOfOptions: amountOfOptions
     };


    useEffect(()=>{
        
        if(location){
        console.log(location);
        }
        console.log(searchObject);
    },[location, cuisineType, price, openNow, amountOfOptions])

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth)



//handlers for Change
function handleCuisine(event:any) {
    setCuisineType(event.target.value);
}

function handlePrice(event:any) {
    setPrice(event.target.value);
}

function handleOpen(event:any){
    if(event.target.value === "Yes"){
    setOpenNow(true);
    }
    else {
    setOpenNow(false);
    }
}

function handleAmountOfOptions(event:any){
    const numberOfResults = parseInt(event.target.value)
    setAmountOfOptions(numberOfResults);
}

function handleSubmitWithLocation(){
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
        });
    }
}

    return(
        <>
        <div>Welcome {user?.displayName}</div>
        <select onChangeCapture={handleCuisine}>
            <option value="">Choose Food Type</option>
            <optgroup label="Cuisine Type">
                <option>All</option>
                <option>Vegan</option>
                <option>Japanese</option>
                <option>Chinese</option>
                <option>Korean</option>
                <option>Italian</option>
                <option>Indian</option>
                <option>French</option>
                <option>American</option>
            </optgroup>
            <optgroup label="Non Restaurants">
            <option>
                Bar
            </option>
            <option>
                Cafe
            </option>
            </optgroup>
        </select>
        <select onChange={handlePrice}>
            <option value="">Choose Max Price</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <select  onChange={handleAmountOfOptions} >
            <option value="">How Many Results?</option>
            <option>1</option>
            <option>5</option>
            <option>10</option>
        </select>
        <select  onChange={handleOpen} >
            <option value="">Open Now?</option>
            <option>Yes</option>
            <option>No</option>
        </select>
        <button onClick={handleSubmitWithLocation}>Location</button>
        </>
    )
}