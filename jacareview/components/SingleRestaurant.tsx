import { useEffect, useState } from "react";
import 'chart.js/auto';
import { Doughnut, Chart } from "react-chartjs-2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"
import SignOut from "./header_components/SignOut";
import GoogleMap from "./GoogleMap";

export default function SingleRestaurant({setSingleClicked, idForFetch, pageVisited, setPageVisited}:
  {setSingleClicked: any, idForFetch:string, pageVisited:boolean, setPageVisited: any}){
    const [singleRestaurantData, setSingleRestaurantData] = useState<any>(null);
    const [dataForChart, setDataForChart] = useState<any> (null);
    const [placeId, setPlaceId] = useState<string | null>(null)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
      if(pageVisited){
        fetchRestaurantData();
        postHistory();
      }
    }, [pageVisited]);

    useEffect(()=>{
      if(singleRestaurantData){
        
      console.log(singleRestaurantData)
      }
    },[singleRestaurantData]);


    //helper
    function goBack(){
        setSingleClicked((prev:boolean) => !prev);
        setPageVisited((prev:boolean) => !prev);
    }

    interface postObject {
        restaurant_id: string,
        uid: string | undefined,
    }

    const postObject: postObject = {
        restaurant_id: idForFetch,
        uid: user?.uid,
    }
    
    const data = {
        labels: [],
        datasets: [
          {
            data: [300, 50, 100, 40, 200],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5733'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5733'],
          },
        ],
      };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right',
        },
        
      };

    const doughnutLabel = {
        id: "doughtnutLabel",
        beforeDataSetsDraw(chart:any, args:any, pluginOptions:any){
            const {ctx, data} = chart;

            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 50px sans-serif';
            ctx.fillStyle = '#FF6384';
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText("text", xCoor, yCoor);
            
        }

    
    }

    async function fetchRestaurantData (){
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}restaurant/${idForFetch}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json" , 
            }
          })
              .then(response => {return response.json()})
              .then(data => {setSingleRestaurantData(data.success); setPlaceId(data.success.place_id) })
}

async function postHistory() {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/history/add/`, {
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
       {/* <Doughnut
       data={data}
       options={options}
       plugins={[doughnutLabel]}
       /> */}
       <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">{singleRestaurantData.name}</h1>
      <GoogleMap apiKey={apiKey} placeId={placeId} />
    </div>
        </div>)
        
        }
        <div>
         <Doughnut
       data={data}
       options={options}
       plugins={[doughnutLabel]}
       />
        </div>
        <button onClick={goBack}>Back</button>
        <SignOut/>
        </>
    )
}