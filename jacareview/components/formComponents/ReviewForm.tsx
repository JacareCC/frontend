import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../app/globals.css";
import FormFivePoints from "./FormFivePoints";
import { Accessibility, CircleDollarSignIcon, CoinsIcon } from "lucide-react";
import BinaryChoice from "./FormBinaryChoice";
import TextInput from "./FormTextInput";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  userUid: string;
  restaurantPlaceId: string;
  restaurantName: string;
}

interface ReviewData {
  restaurant_place_id: string;
  user_uid: string;
  date_made: string;
  accessibility: number;
  disability_access: string;
  parking: string;
  public_transit_access: string;
  findability: string;
  value_for_price: number;
  food_quality: number;
  ingredients_quality: string;
  amount_of_food: string;
  presentaion: string;
  drink_menu: string;
  customer_service: number;
  staff_knowledge: string;
  courtesy: string;
  table_wait_time: string;
  food_wait_time: string;
  atmosphere: number;
  interior_design: string;
  exterior_design: string;
  cleanliness: string;
  foreigner_friendly: string;
  comfort: string;
  dietary_description: string;
  verified: boolean;
  hidden: boolean;
  competitive_price: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  userUid,
  restaurantPlaceId,
  restaurantName,
}) => {
  const [dataToSend, setDataToSend] = useState<any>(null);
  const [sendReady, setSendReady] = useState<boolean>(false);
  const [back, setBack] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<ReviewData>();
  const [currentPage, setCurrentPage] = useState(1);
  const [starsFilled, setStarsFilled] = useState({
    accessibility: false,
    value_for_price: false,
    customer_service: false,
    atmosphere: false,
    food_quality: false,
  });
  const totalPages = 5;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (currentPage === 1 && !Object.values(starsFilled).every((filled) => filled)) return
      const currentProgress = ((currentPage) / totalPages) * 100;
      setProgress(currentProgress);
    };
  
    calculateProgress();
  }, [currentPage, totalPages]);
  
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmitHandler = async (data: ReviewData) => {
    setDataToSend(data);
  };
console.log(restaurantName)
  useEffect(() => {
    if (dataToSend) {
      dataToSend.id = restaurantPlaceId;
    }
  }, [dataToSend]);

  useEffect(() => {
    if (sendReady) {
      submitReview();
    }
  }, [sendReady]);

  useEffect(() => {
    if (back) router.push('/user');
  }, [back]);



  const submitReview = async () => {
    const results = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}review/new/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
  };

  const handleNextPage = () => {
    if (
      currentPage === 1 &&
      !Object.values(starsFilled).every((filled) => filled)
    ) {
      setWarningMessage("Please fill in all the star ratings before proceeding.");
      return;
    }

    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setWarningMessage(null);
  };
  

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSendReady = () => {
    setSendReady(true);
  };
  const handleBack = () => {
    setBack(true);
  };


  useEffect(() => {
    setValue("restaurant_place_id", restaurantPlaceId);
    setValue("user_uid", userUid);
    setValue("date_made", new Date().toISOString());
    setValue("hidden", false);
    setValue("verified", false);
  }, [userUid, restaurantPlaceId]);

  return (<>
 
    {!sendReady ? (
    <div className="flex flex-col justify-center items-center">
      <form
        className="flex flex-col w-full items-center"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {warningMessage && !Object.values(starsFilled).every((filled) => filled) && (
                    <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
                    {warningMessage}
                  </div>
        )}
        
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-2 mt-8 bg-test sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 1 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            General Points
          </h2>
          <div className="rounded">
            <FormFivePoints
              register={register}
              name="accessibility"
              title="Accessibility"
              setValue={setValue}
              onStarFilled={() => setStarsFilled((prev) => ({ ...prev, accessibility: true }))}
            />
            <FormFivePoints
              register={register}
              name="value_for_price"
              title="Value for Price"
              setValue={setValue}
              onStarFilled={() => setStarsFilled((prev) => ({ ...prev, value_for_price: true }))}
            />
            <FormFivePoints
              register={register}
              name="customer_service"
              title="Customer Service"
              setValue={setValue}
              onStarFilled={() => setStarsFilled((prev) => ({ ...prev, customer_service: true }))}
            />
            <FormFivePoints
              register={register}
              name="atmosphere"
              title="Atmosphere"
              setValue={setValue}
              onStarFilled={() => setStarsFilled((prev) => ({ ...prev, atmosphere: true }))}
            />
            <FormFivePoints
              register={register}
              name="food_quality"
              title="Food Quality"
              setValue={setValue}
              onStarFilled={() => setStarsFilled((prev) => ({ ...prev, food_quality: true }))}
            />
          </div>
        </div>
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-test sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 2 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2 ">
            Accessibility Points
          </h2>
          <div className="py-2">
            <TextInput
              setValue={setValue}
              register={register}
              name="parking"
              title="Parking lot"
              placeholder="Convenient parking with dedicated spaces for patrons."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="public_transit_access"
              title="Public transit access"
              placeholder="Easily accessible via public transportation (e.g., bus, subway)."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="findability"
              title="Findability"
              placeholder="Clearly marked entrance and easy to locate within the area."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="disability_access"
              title="Disability Access"
              placeholder="Wheelchair ramps, elevators, and other accessible features available."
            />
          </div>
        </div>
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-test sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 3 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Food quality Points
          </h2>
          <div className="py-2">
            <TextInput
              setValue={setValue}
              register={register}
              name="ingredients_quality"
              title="Ingredients Quality"
              placeholder="Fresh, locally sourced ingredients used in all dishes."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="amount_of_food"
              title="Portion size"
              placeholder="Generous portion sizes that satisfy customers."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="presentation"
              title="Presentation"
              placeholder="Artfully presented dishes that are visually appealing."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="drink_menu"
              title="Drink Menu"
              placeholder="Extensive drink menu with a variety of options."
            />
          </div>
        </div>
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-test sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 4 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Customer service Points
          </h2>
          <div className="py-2">
            <TextInput
              setValue={setValue}
              register={register}
              name="staff_knowledge"
              title="Staff knowledge"
              placeholder="Well-informed staff with knowledge about the menu and dietary options."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="courtesy"
              title="Courtesy"
              placeholder="Friendly and courteous staff providing excellent customer service."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="table_wait_time"
              title="Table wait time in minutes"
              placeholder="Efficient service with minimal wait times for seating."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="food_wait_time"
              title="Food wait time in minutes"
              placeholder="Prompt preparation and delivery of meals."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="foreigner_friendly"
              title="Foreigner Friendly"
              placeholder="Welcoming to international visitors with English-speaking staff."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="dietary_description"
              title="Dietary Description"
              placeholder="Clear and detailed dietary information for each menu item."
            />
          </div>
        </div>
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-test sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 5 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Atmosphere Points
          </h2>
          <div className="py-2">
            <TextInput
              setValue={setValue}
              register={register}
              name="interior_design"
              title="Interior Design"
              placeholder="Cozy and inviting interior with stylish decor."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="exterior_design"
              title="Exterior Design"
              placeholder="Eye-catching exterior design that stands out."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="cleanliness"
              title="Cleanliness"
              placeholder="Impeccably clean and well-maintained facilities."
            />
            <TextInput
              setValue={setValue}
              register={register}
              name="comfort"
              title="Comfort"
              placeholder="Comfortable seating and a relaxed dining atmosphere."
            />
          </div>
        </div>
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-test sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 6 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Value for price Points
          </h2>
          <div className="py-2">
            <TextInput
              setValue={setValue}
              register={register}
              name="competitive_price"
              title="Competitive price"
              placeholder="Reasonable prices with good value for the quality of food and service."
            />
          </div>
        </div>
          <div className="w-10/12 max-w-md md:w-6/12 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-200 my-1">
           <div className="bg-blue-600 h-1.5 rounded-full dark:bg-jgreen" style={{width: `${progress}%`}}></div>
          </div>
        <div className={`flex items-center justify-center gap-2 w-11/12 mx-6  my-4 ${
            currentPage !== totalPages ? "mb-8" : ""
          }`}>

            <button
              className={`mt-2 bg-jgreen text-white p-2 px-5 rounded-full shadow-lg shadow-xl flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl  ${
                currentPage === 1 ? "hidden" : ""
              }`}
              type="button"
              onClick={handlePrevPage}
            >
              {"<"}
            </button>
            <button
              className={`mt-2 bg-jgreen text-white p-2 px-5 rounded-full shadow-lg shadow-xl flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl  ${
                currentPage === totalPages ? "hidden" : ""
              }`}
              type="button"
              onClick={handleNextPage}
            >
              {">"}
            </button>
            <button
              className={`mt-2 bg-orange text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl px-8 ${
                currentPage !== totalPages ? "hidden" : ""
              }`}
              type="submit"
              onClick={handleSendReady}
            >
              Save
            </button>
          </div>
          <div className="flex justify-center w-11/12 mx-6 ">
            <p className="text-lg">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </form>
      </div>
    ) : (
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex flex-col justify-center items-center">
      <div className="bg-emerald-500 p-2 rounded-full">
        <img
          src={'./thanks.gif'}
          alt="Thanks"
          className="w-full h-full rounded-full border-2 border-white"
        />
      </div>
      <p className="text-jgreen text-xl mt-4">Get 1 Jacoin!</p>
      <button className="flex  flex-col items-center bg-gradient-to-r mt-4 ml-4 from-yellow-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded shadow-md hover:scale-105 transform transition-transform duration-300" onClick={handleBack}>
        <CircleDollarSignIcon />
        </button>
    </div>
      )} </>
  );

  //     return (
  //         <div className="flex flex-col justify-center items-center">
  //             <form className="flex flex-col w-full items-center" onSubmit={handleSubmit(onSubmitHandler)}>
  //                 <div className="max-w-screen-md shadow-xl w-11/12 mx-6 my-2 bg-jgreen text-base sm:text-lg md:text-xl lg:text-2xl">
  //                 <h2 className="flex justify-center font-semibold p-2 bg-white">General Points</h2>
  //                 <div className="rounded">
  //                 <FormFivePoints register={register} name='accessibility' title='Accessibility'/>
  //                 <FormFivePoints register={register} name='value_for_price' title='Value for Price' />
  //                 <FormFivePoints register={register} name='customer_service' title='Customer Service' />
  //                 <FormFivePoints register={register} name='atmosphere' title='Atmosphere' />
  //                 <FormFivePoints register={register} name='food_quality' title='Food Quality' />
  //                 </div>
  //                 </div>
  //                 <div className=" max-w-screen-md shadow-xl w-11/12 mx-6 my-4 bg-gradient-to-r from-green-200 from-10% via-green-100 via-30% to-green-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl">
  //                 <h2 className="flex justify-center font-semibold p-2 bg-white ">Accessibility Points</h2>
  //                 <div className="py-2">

  //                 <TextInput register={register} name='parking' title='Parking lot' placeholder='Convenient parking with dedicated spaces for patrons.'/>
  //                 <TextInput register={register} name='public_transit_access'title="Public transit access" placeholder='Easily accessible via public transportation (e.g., bus, subway).'/>
  //                 <TextInput register={register} name='findability' title='Findability' placeholder='Clearly marked entrance and easy to locate within the area.'/>
  //                 <TextInput register={register} name='disability_access' title ='Disability Access' placeholder="Wheelchair ramps, elevators, and other accessible features available."/>
  //                 </div>
  //                 </div>
  //                 <div className="max-w-screen-md shadow-xl w-11/12 mx-6 my-4 bg-gradient-to-r from-green-200 from-10% via-green-100 via-30% to-green-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl">
  //                 <h2 className="flex justify-center font-semibold p-2 bg-white">Food quality Points</h2>
  //                 <div className="py-2">

  //                 <TextInput register={register} name='ingredients_quality' title='Ingredients Quality' placeholder="Fresh, locally sourced ingredients used in all dishes."/>
  //                 <TextInput register={register} name='amount_of_food' title="Portion size" placeholder='Generous portion sizes that satisfy customers.'/>
  //                 <TextInput register={register} name='presentation' title='Presentation' placeholder='Artfully presented dishes that are visually appealing.'/>
  //                 <TextInput register={register} name='drink_menu' title="Drink Menu" placeholder='Extensive drink menu with a variety of options.'/>
  //                 </div>
  //                 </div>
  //                 <div className="max-w-screen-md shadow-xl w-11/12 mx-6 my-4 bg-gradient-to-r from-green-200 from-10% via-green-100 via-30% to-green-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl">

  //                 <h2 className="flex justify-center font-semibold p-2 bg-white">Customer service Points</h2>
  //                 <div className="py-2">

  //                 <TextInput register={register} name='staff_knowledge' title="Staff knowledge" placeholder='Well-informed staff with knowledge about the menu and dietary options.'/>
  //                 <TextInput register={register} name='courtesy' title="Courtesy" placeholder='Friendly and courteous staff providing excellent customer service.'/>
  //                 <TextInput register={register} name='table_wait_time' title="Table wait time in minutes" placeholder='Efficient service with minimal wait times for seating.'/>
  //                 <TextInput register={register} name='food_wait_time' title="Food wait time in minutes" placeholder='Prompt preparation and delivery of meals.'/>
  //                 <TextInput register={register} name='foreigner_friendly' title='Foreigner Friendly' placeholder='Welcoming to international visitors with English-speaking staff.'/>
  //                 <TextInput register={register} name='dietary_description' title="Dietary Description" placeholder='Clear and detailed dietary information for each menu item.'/>
  //                 </div>
  //                 </div>
  //                 <div className="max-w-screen-md shadow-xl w-11/12 mx-6 my-4 bg-gradient-to-r from-green-200 from-10% via-green-100 via-30% to-green-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl">

  //                 <h2 className="flex justify-center font-semibold p-2 bg-white">Atmosphere Points</h2>
  //                 <div className="py-2">

  //                 <TextInput register={register} name='interior_design' title='Interior Design' placeholder='Cozy and inviting interior with stylish decor.'/>
  //                 <TextInput register={register} name='exterior_design' title='Exterior Design' placeholder='Eye-catching exterior design that stands out.'/>
  //                 <TextInput register={register} name='cleanliness' title='Cleanliness' placeholder='Impeccably clean and well-maintained facilities.'/>
  //                 <TextInput register={register} name='comfort' title="Comfort" placeholder='Comfortable seating and a relaxed dining atmosphere.'/>
  //                 </div>
  //                 </div>
  //                 <div className="max-w-screen-md shadow-xl w-11/12 mx-6 my-4 bg-gradient-to-r from-green-200 from-10% via-green-100 via-30% to-green-100 to-90% text-base sm:text-lg md:text-xl lg:text-2xl">

  //                 <h2 className="flex justify-center font-semibold p-2 bg-white">Value for price Points</h2>
  //                 <div className="py-2">

  //                 <TextInput register={register} name='competitive_price'title="Competitive price" placeholder='Reasonable prices with good value for the quality of food and service.'/>
  //                 </div>
  //                 </div>
  //                 <button className="py-2 shadow-lg shadow-xl text-lg flex justify-center items-center w-11/12 mx-6 my-4 rounded bg-green-500 text-white p-2" type="submit">Submit</button>
  //             </form>
  //         </div>
  //     )
};

export default ReviewForm;
