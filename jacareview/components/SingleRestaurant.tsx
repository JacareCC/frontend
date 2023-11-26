import { useEffect, useState } from "react";

export default function SingleRestaurant({setSingleClicked, idForFetch}:{setSingleClicked: any, idForFetch:string}){
    const [singleRestaurantData, setSingleRestaurantData] = useState<any>(null);
    const [dateVisited, setDateVisited] = useState<Date | null> (null)

    useEffect(() => {
        fetchRestaurantData();
        setDateVisited(new Date());
    }, []);

    //helper
    function goBack(){
        setSingleClicked((prev:boolean) => !prev);
    }

    interface postObject {
        id: string,
        date: Date | null,
    }

    const postObject: postObject = {
        id: idForFetch,
        date: dateVisited
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

async function postHistory() {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}restauranthistory`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" , 
        },
        body : JSON.stringify(postObject)
      })
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