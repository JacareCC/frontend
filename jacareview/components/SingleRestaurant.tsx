import { useEffect, useState } from "react";
import 'chart.js/auto';
import { Doughnut, Chart } from "react-chartjs-2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { initFirebase } from "@/firebase/firebaseapp"

export default function SingleRestaurant({setSingleClicked, idForFetch}:{setSingleClicked: any, idForFetch:string}){
    const [singleRestaurantData, setSingleRestaurantData] = useState<any>(null);
    const [dataForChart, setDataForChart] = useState<any> ()

    initFirebase();
    const auth = getAuth(); 
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        fetchRestaurantData();
        postHistory();

    }, []);


    //helper
    function goBack(){
        setSingleClicked((prev:boolean) => !prev);
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
        id: "doughtnutLaber",
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
        const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}restaurant/?id=${idForFetch}/`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json" , 
            }
          })
              .then(response => {return response.json()})
              .then(data => {setSingleRestaurantData(data) })
}

async function postHistory() {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/history/`, {
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
       data={data}
       options={options}
       plugins={[doughnutLabel]}
       />
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
        </>
    )
}