import SingleRestaurant from "./SingleRestaurant"
import { useEffect, useState} from "react"

export default function ResultList({results}:{results:any}){
    console.log(results.result)
    const[resultArray, setResultArray] = useState<any>(null);
    const[propFetched, setPropFetched] =useState<boolean>(false);
    const [singleClicked, setSingleClicked] =useState<boolean>(false);

    useEffect(()=>{
        setResultArray(results.result);
    }, []);

    useEffect(() => {
        if (resultArray){
            setPropFetched(true);
        }
    }, [resultArray]);

    return (
        <>{
        <>
        {propFetched ? (resultArray.map((element:any, index:number) => {
            return <div key={index}>{element.displayName.text}</div>
        })): <div>Loading...</div>}
        
        <SingleRestaurant/>
        </>}
        </>
    )
}