"use client"

import { useState, useEffect} from "react"
import moment from "moment"
import ReviewInfo from "./ReviewInfo"

export default function ReviewListBusiness({reviews}:{reviews:any}){
    const[historyData, setHistoryData]=useState<any>(null);
    const [reviewData, setReviewData]= useState<any>(null);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [element, setElement] = useState<any>(null);

    useEffect(()=>{
      if(reviews){
        let reverseReviews = reviews.reverse();
        setHistoryData(reverseReviews);
      }
    },[reviews])

    useEffect(()=>{
      if(reviewData){
      console.log(reviewData)
      }
  },[reviewData])

    useEffect(() =>{
      if(isClicked === false) {
        setReviewData(null);
        setElement(null)
      }

    }, [isClicked])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: any, element:any) => {
      event.preventDefault();
      setIsClicked((prev:boolean) => !prev);
      setReviewData(data)
      setElement(element)
    }

    return(
        <div className="flex flex-col align-center items-center bg-white rounded">
    <h1 className="font-yaro pt-2 text-l font-semibold text-xl my-2" >Viewed Restaurants</h1>
    <div className="max-w-screen-md shadow-xl w-11/12 mx-6 my-2 rounded bg-gray-100 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        
        { historyData && historyData.length === 0 ? (
            <div>No Reviews</div>
            ) : (
                <div className="card max-h-[400px] overflow-y-scroll scrollbar-thin p-4 px-4 py-2">
                   <div>
             
              </div>
            {historyData &&
              historyData.map((element: any, index: number) => (
                  <div key={`z${index}`} className="flex flex-col border-b mb-2 p-4">
                    { element.data.hidden === false && (
                  <button  onClick={(event) => handleClick(event, element.data, element)} a-key={element.data} className='bg-green-500 text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center' >Go To Review Made {moment(element.created_at).fromNow()}</button>
                    )
                    }
                </div>
              ))}
          </div>
        )}
              
      </div>
       {isClicked && reviewData && element &&(<ReviewInfo setIsClicked={setIsClicked} data={reviewData} element={element}/>)}
      </div>
    )

}