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
    const [resultsFetched, setResultsFetched] = useState<boolean>(false);
    const [searchAvailable, setSearchAvailable] =useState<boolean>(false);
    const [results, setResults] = useState<any>(null);
    const [statusCode, setStatusCode] = useState<number | null> (null)

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
    if( cuisineType && price && openNow !== null && amountOfOptions && distanceToTravel){
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }
    console.log(searchObject);
},[ cuisineType, price, openNow, amountOfOptions, distanceToTravel]);

useEffect(()=>{
    if(location){
        setSearchAvailable(true);
    }
    console.log(location);
}, [location]);

useEffect (() => {
    console.log(searchAvailable);
    console.log(searchObject);
},[searchAvailable])

useEffect(() =>{
    if(statusCode && statusCode !== 404){
        setResultsFetched(true);
    }
    console.log(results);
}, [results]);


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

async function handleSubmitWithLocation(){
    console.log(searchObject);
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}search/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" , 
        },
        body : JSON.stringify(searchObject)
      })
          .then(response => {setResults(response.body);
        setStatusCode(response.status)} )
          
}

    return(
        <>{!user ?<div>Loading...</div> : <>
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
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <select  onChange={handleOpen} >
            <option value="">Open Now?</option>
            <option>Yes</option>
            <option>No</option>
        </select>
        { searchAvailable ?
        <button onClick={handleSubmitWithLocation}>Search</button> : <button>Search</button>}
        </>
      : <ResultList/>} </>}
        </>
    )
}