import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../app/globals.css";
import FormFivePoints from "./FormFivePoints";
import { Accessibility } from "lucide-react";
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

  const { register, handleSubmit, setValue } = useForm<ReviewData>();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const router = useRouter();

  const onSubmitHandler = async (data: ReviewData) => {
    setDataToSend(data);
  };

  useEffect(() => {
    if (dataToSend) {
      console.log(dataToSend);
      console.log(restaurantPlaceId);
      dataToSend.id = restaurantPlaceId;
    }
  }, [dataToSend]);

  useEffect(() => {
    if (sendReady) {
      submitReview();
      router.push("/user");
    }
  }, [sendReady]);

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
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSendReady = () => {
    setSendReady(true);
  };

  useEffect(() => {
    setValue("restaurant_place_id", restaurantPlaceId);
    setValue("user_uid", userUid);
    setValue("date_made", new Date().toISOString());
    setValue("hidden", false);
    setValue("verified", false);
  }, [userUid, restaurantPlaceId]);

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className="flex flex-col w-full items-center"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-2 mt-8 bg-gray-100 sm:text-lg md:text-xl lg:text-2xl ${
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
            />
            <FormFivePoints
              register={register}
              name="value_for_price"
              title="Value for Price"
              setValue={setValue}
            />
            <FormFivePoints
              register={register}
              name="customer_service"
              title="Customer Service"
              setValue={setValue}
            />
            <FormFivePoints
              register={register}
              name="atmosphere"
              title="Atmosphere"
              setValue={setValue}
            />
            <FormFivePoints
              register={register}
              name="food_quality"
              title="Food Quality"
              setValue={setValue}
            />
          </div>
        </div>

        {/* Adicione blocos semelhantes para outras páginas, ajustando a condição e o conteúdo conforme necessário */}
        {/* Exemplo da segunda página */}
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-gray-100 sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 2 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2 ">
            Accessibility Points
          </h2>
          <div className="py-2">
            <TextInput
              register={register}
              name="parking"
              title="Parking lot"
              placeholder="Convenient parking with dedicated spaces for patrons."
            />
            <TextInput
              register={register}
              name="public_transit_access"
              title="Public transit access"
              placeholder="Easily accessible via public transportation (e.g., bus, subway)."
            />
            <TextInput
              register={register}
              name="findability"
              title="Findability"
              placeholder="Clearly marked entrance and easy to locate within the area."
            />
            <TextInput
              register={register}
              name="disability_access"
              title="Disability Access"
              placeholder="Wheelchair ramps, elevators, and other accessible features available."
            />
          </div>
        </div>

        {/* Adicione blocos semelhantes para outras páginas, ajustando a condição e o conteúdo conforme necessário */}
        {/* Exemplo da terceira página */}
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-gray-100 sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 3 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Food quality Points
          </h2>
          <div className="py-2">
            <TextInput
              register={register}
              name="ingredients_quality"
              title="Ingredients Quality"
              placeholder="Fresh, locally sourced ingredients used in all dishes."
            />
            <TextInput
              register={register}
              name="amount_of_food"
              title="Portion size"
              placeholder="Generous portion sizes that satisfy customers."
            />
            <TextInput
              register={register}
              name="presentation"
              title="Presentation"
              placeholder="Artfully presented dishes that are visually appealing."
            />
            <TextInput
              register={register}
              name="drink_menu"
              title="Drink Menu"
              placeholder="Extensive drink menu with a variety of options."
            />
          </div>
        </div>

        {/* Adicione blocos semelhantes para outras páginas, ajustando a condição e o conteúdo conforme necessário */}
        {/* Exemplo da quarta página */}
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-gray-100 sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 4 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Customer service Points
          </h2>
          <div className="py-2">
            <TextInput
              register={register}
              name="staff_knowledge"
              title="Staff knowledge"
              placeholder="Well-informed staff with knowledge about the menu and dietary options."
            />
            <TextInput
              register={register}
              name="courtesy"
              title="Courtesy"
              placeholder="Friendly and courteous staff providing excellent customer service."
            />
            <TextInput
              register={register}
              name="table_wait_time"
              title="Table wait time in minutes"
              placeholder="Efficient service with minimal wait times for seating."
            />
            <TextInput
              register={register}
              name="food_wait_time"
              title="Food wait time in minutes"
              placeholder="Prompt preparation and delivery of meals."
            />
            <TextInput
              register={register}
              name="foreigner_friendly"
              title="Foreigner Friendly"
              placeholder="Welcoming to international visitors with English-speaking staff."
            />
            <TextInput
              register={register}
              name="dietary_description"
              title="Dietary Description"
              placeholder="Clear and detailed dietary information for each menu item."
            />
          </div>
        </div>

        {/* Adicione blocos semelhantes para outras páginas, ajustando a condição e o conteúdo conforme necessário */}
        {/* Exemplo da quinta página */}
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-gray-100 sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 5 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Atmosphere Points
          </h2>
          <div className="py-2">
            <TextInput
              register={register}
              name="interior_design"
              title="Interior Design"
              placeholder="Cozy and inviting interior with stylish decor."
            />
            <TextInput
              register={register}
              name="exterior_design"
              title="Exterior Design"
              placeholder="Eye-catching exterior design that stands out."
            />
            <TextInput
              register={register}
              name="cleanliness"
              title="Cleanliness"
              placeholder="Impeccably clean and well-maintained facilities."
            />
            <TextInput
              register={register}
              name="comfort"
              title="Comfort"
              placeholder="Comfortable seating and a relaxed dining atmosphere."
            />
          </div>
        </div>

        {/* Adicione blocos semelhantes para outras páginas, ajustando a condição e o conteúdo conforme necessário */}
        {/* Exemplo da sexta página (última) */}
        <div
          className={`max-w-screen-md shadow-xl w-11/12 mx-6 my-2 mt-8 my-4 bg-gray-100 sm:text-lg md:text-xl lg:text-2xl ${
            currentPage !== 6 ? "hidden" : ""
          }`}
        >
          <h2 className="flex justify-center font-semibold p-2">
            Value for price Points
          </h2>
          <div className="py-2">
            <TextInput
              register={register}
              name="competitive_price"
              title="Competitive price"
              placeholder="Reasonable prices with good value for the quality of food and service."
            />
          </div>
        </div>

        {/* Botões de navegação */}
        <div
          className={`flex justify-between gap-2 w-11/12 mx-6  my-4 ${
            currentPage !== totalPages ? "mb-16" : ""
          }`}
        >
          <button
            className={`w-full mt-2 bg-jgreen text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl ${
              currentPage === 1 ? "hidden" : ""
            }`}
            type="button"
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <button
            className={`w-full mt-2 bg-jgreen text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl ${
              currentPage === totalPages ? "hidden" : ""
            }`}
            type="button"
            onClick={handleNextPage}
          >
            Next
          </button>
          <button
            className={`w-full mt-2 bg-jgreen text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl ${
              currentPage !== totalPages ? "hidden" : ""
            }`}
            type="submit"
            onClick={handleSendReady}
          >
            Save
          </button>
        </div>
        <div className="flex justify-between w-11/12 mx-6 ">
          <p className="text-lg">
            Page {currentPage} of {totalPages}
          </p>
          <p className="text-lg">
            Progress: {((currentPage - 1) / (totalPages - 1)) * 100}%
          </p>
        </div>
      </form>
    </div>
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
