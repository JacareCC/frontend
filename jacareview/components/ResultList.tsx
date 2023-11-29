import SingleRestaurant from "./SingleRestaurant"
import { useEffect, useState} from "react"
import { getPreciseDistance } from "geolib";

export default function ResultList({results}:{results:any}){
    const[resultArray, setResultArray] = useState<any>(null);
    const[propFetched, setPropFetched] =useState<boolean>(false);
    const [singleClicked, setSingleClicked] =useState<boolean>(false);
    const [idForFetch, setIdForFetch] = useState<string>("");
    const [location, setLocation] = useState<any>(null);
    const [pageVisited, setPageVisited] = useState<boolean>(false)

    useEffect(()=>{
        setResultArray(results.result);
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    useEffect(() => {
        if (resultArray){
            setPropFetched(true);
        }
    }, [resultArray]);

    //handler

    function setView(event:any) {
        const stringId:string= event.target.getAttribute('a-key');
        setSingleClicked((prev:boolean)=> !prev);
        setIdForFetch(stringId);
        setPageVisited((prev:boolean) => !prev);
    }

    //helper

    function getDistanceInApproxKm(point1:any, point2:any){
        const metersDistance = getPreciseDistance(point1, point2);
        let kmDistance = metersDistance / 1000;
        let kmDistanceInString = kmDistance.toFixed(2);
        return kmDistanceInString;
    }

    return (
        <>
        {propFetched && !singleClicked ? 
        resultArray.map((element:any, index:number) => {
            return <div key={`b${index}`} onClick={setView} >
            <div  a-key={element.id} key={index}>{element.displayName.text}</div>
            <div a-key={element.id} key ={`a${index}`}>About: {getDistanceInApproxKm(element?.location, location)} km</div>
            </div>
        }) :
        
        <SingleRestaurant pageVisited={pageVisited} setPageVisited={setPageVisited} setSingleClicked={setSingleClicked} idForFetch={idForFetch}/>
        }
        </>
    )
}