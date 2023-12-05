"use client"
import { useState, useEffect} from "react";
import Navbar from "@/components/Navbar";
import BusinessNavBar from "@/components/BusinessNavBar";
import { useRouter, useSearchParams } from 'next/navigation';
import OnlyOneOkButtonTier from "@/components/buttons/onlyOneOkButton/OnlyOneOkButtonTier";

const BusinessPageWithId: React.FC = () => {
    const [statusCode, setStatusCode] = useState<number|null>(0);
    const [pageData, setPageData] = useState<any>(null);
    const router = useRouter();
    const params = useSearchParams()
    const data = params.get("data");
  

    useEffect(() =>{
        if(data){
            setPageData(data);
        }
    }, [data])

    useEffect(() =>{
      console.log(pageData);
  }, [pageData]);

    useEffect(() =>{
       if(statusCode === 201){
        window.location.reload();
       }
    }, [statusCode])

    function handleClose(){
      router.push("/user/business")
    }
  
    return (
      <div>
        <Navbar />
  
       
      <div className="mt-16 p-4 flex flex-col items-center">
        <BusinessNavBar />

        {pageData && (
          <div className="flex">
            <div className="bg-black bg-opacity-50 absolute inset-0"></div>
            <div className="bg-white p-8 rounded-md shadow-md relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <OnlyOneOkButtonTier
                  id={pageData.owner_user_id_id}
                  backgroundColor={'bronze'}
                  text={'Bronze'}
                  setStatusCode={setStatusCode}
                />
                <OnlyOneOkButtonTier
                  id={pageData.owner_user_id_id}
                  backgroundColor={'silver'}
                  text={'Silver'}
                  setStatusCode={setStatusCode}
                />
                <OnlyOneOkButtonTier
                  backgroundColor={'gold'}
                  id={pageData.owner_user_id_id}
                  text={'Gold'}
                  setStatusCode={setStatusCode}
                />
              </div>
              <div className="flex justify-center items-center">
              <button
              key={"CloseButton"}
              onClick={handleClose}
              className={`${
             'bg-jgreen' 
              } text-white p-2 m-1 rounded`}
                  >
                  Close
             </button>
             </div>
            </div>
            
          </div>
          
        )}
      </div>


      
    </div>


  );

  };

export default BusinessPageWithId;