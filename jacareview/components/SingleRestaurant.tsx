import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

export default function SingleRestaurant({setSingleClicked, idForFetch}:{setSingleClicked: any, idForFetch:string}){
    const [singleRestaurantData, setSingleRestaurantData] = useState<any>(null);
    const [dateVisited, setDateVisited] = useState<Date | null> (null);
    const [dataForChart, setDataForChart] = useState<any> (null)

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

    const options = {

    }

    const textCenter = {
        id: "textCenter",
        beforeDataSetsDraw(chart:any, args:any, pluginOptions:any){
            const {ctx, data} = chart;

            ctx.save();
            ctx.font = "bolder 5S0px sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText("text", chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
            
        }

    
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
        <div>
        <div>PlaceHolder</div>
       <Doughnut
       data={dataForChart}
       options={options}
       plugins={[textCenter]}
       />
        </div>)
        
        }
        <button onClick={goBack}>Back</button>
        </>
    )
}