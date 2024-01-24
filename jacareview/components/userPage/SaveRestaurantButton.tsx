import { BookmarkIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface SaveRestaurantProps {
  index: number;
  getRestaurantID: any;
  restaurantId: number;
  elementId: number;
  isSaved: boolean;
}

const SaveRestaurantButton: React.FC<SaveRestaurantProps> = ({
  index,
  getRestaurantID,
  restaurantId,
  elementId,
  isSaved,
}) => {
  const [isRestaurantSaved, setIsRestaurantSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsRestaurantSaved(isSaved);
  }, []);

  const onClickChange = (e: any) => {
    getRestaurantID(e);
    setIsRestaurantSaved((prev: boolean) => !prev);
  };

  return (
    <>
      {!isRestaurantSaved ? (
        <button
          key={`e${index}`}
          onClick={onClickChange}
          a-key={restaurantId}
          b-key={elementId}
          className="flex gap-4 bg-lgreen  text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center"
        >
          <BookmarkIcon className="text-lgreen" />
          Save
          <BookmarkIcon />
        </button>
      ) : (
        <button
          key={`f${index}`}
          onClick={onClickChange}
          a-key={restaurantId}
          b-key={elementId}
          className=" bg-lgreen  text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center"
        >
          Remove
        </button>
      )}
    </>
  );
};

export default SaveRestaurantButton;
