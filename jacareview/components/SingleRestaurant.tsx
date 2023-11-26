import { useEffect, useState } from "react";

export default function SingleRestaurant({setSingleClicked, idForFetch}:{setSingleClicked: any, idForFetch:string}){
    const [singleRestaurantData, setSingleRestaurantData] = useState<any>(null);

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    //helper
    function goBack(){
        setSingleClicked((prev:boolean) => !prev);
    }

    async function fetchRestaurantData (){
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}restaurants/${idForFetch}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json" , 
            }
          })
              .then(response => {return response.json()})
              .then(data => {setSingleRestaurantData(data) })
}

    return (
        <>
        { singleRestaurantData &&(
        <div>PlaceHolder</div>)
        }
        <button onClick={goBack}>Back</button>
        </>
    )
}