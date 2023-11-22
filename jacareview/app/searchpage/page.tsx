"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import { useRouter } from "next/navigation";
import ResultList from "@/components/ResultList";


export default function SearchPage() {
    const [location, setLocation] = useState<any>(null);
    const [cuisineType, setCuisineType] = useState<string | null> (null);
    const [price, setPrice] = useState<number| null>(null);
    const [openNow, setOpenNow] = useState<boolean | null>(null);
    const [amountOfOptions, setAmountOfOptions] = useState<number | null>(null);
    const [distanceToTravel, setDistanceToTravel] = useState<number | null>(null);
    const [resultsFetched, setResultsFetched] = useState<any>(null)

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    
onAuthStateChanged(auth, (user) => {
if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
const uid = user.uid;
} else {
    router.push("/")
}
});

    // if(!user){
    //     router.push("/");
    // }
    
interface searchDataObject {
    cuisineType: string | null,
    price: number | null,
    openNow: boolean | null,
    amountOfOptions: number | null,
    distanceToTravel: number | null
    location : {latitude: number, longitude: number}
}
    
const searchObject: searchDataObject = 
{ cuisineType: cuisineType,
    price: price,
    openNow: openNow,
    amountOfOptions: amountOfOptions,
    distanceToTravel: distanceToTravel,
    location : location
};


useEffect(()=>{   
    console.log(searchObject);
},[location, cuisineType, price, openNow, amountOfOptions])


//handlers for Change
function handleCuisine(event:any) {
    setCuisineType(event.target.value);
}

function handleDistanceToTravel(event:any) {
    let stringDistance = event.target.value;
    let splitStringDistance = stringDistance.split("k")[0];
    let parsedStringDistanceToKM = parseInt(splitStringDistance) * 1000;
    setDistanceToTravel(parsedStringDistanceToKM);
}


function handlePrice(event:any) {
    let priceString = event.target.value;
    let priceNumber = priceString.length - 1;
    setPrice(priceNumber);
}

function handleOpen(event:any){
    if(event.target.value === "Yes"){
    setOpenNow(true);
    }
    else if (event.target.value === "No"){
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
        { !resultsFetched ?
        <>
        <div>Welcome {user?.displayName}</div>
        <select onChange={handleDistanceToTravel}>
            <option value="">Choose Travel Distance</option>
            <option>5km</option>
            <option>10km</option>
            <option>15km</option>
            <option>20km</option>
        </select>
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
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
            <option>$$$$</option>
            <option>$$$$$</option>
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
      : <ResultList/>}
        </>
    )
}