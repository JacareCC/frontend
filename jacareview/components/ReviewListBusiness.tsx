"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import ReviewInfo from "./ReviewInfo";

export default function ReviewListBusiness({ reviews }: { reviews: any }) {
  const [historyData, setHistoryData] = useState<any>(null);
  const [reviewData, setReviewData] = useState<any>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [element, setElement] = useState<any>(null);
  const [theyVerified, setTheyVerified] = useState<boolean>(false);
  const [theyWentBack, setTheyWentBack] = useState<boolean>(false);

  useEffect(() => {
    if (reviews) {
      let reverseReviews = reviews.sort();
      reverseReviews = reverseReviews.sort(function (a: any, b: any) {
        return b.created_at < a.created_at
          ? -1
          : b.created_at > a.created_at
          ? 1
          : 0;
      });

      setHistoryData(reverseReviews);
    }
  }, [reviews]);

  useEffect(() => {
    console.log(historyData);
  }, [historyData]);

  useEffect(() => {
    if (theyVerified && theyWentBack) {
      window.location.reload();
    }
  }, [theyVerified, theyWentBack]);

  useEffect(() => {
    if (isClicked === false) {
      setReviewData(null);
      setElement(null);
    }
  }, [isClicked]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any,
    element: any
  ) => {
    event.preventDefault();
    setIsClicked((prev: boolean) => !prev);
    setReviewData(data);
    setElement(element);
  };
  return (
    <div className="flex flex-col align-center items-center bg-test">
      <div className="max-w-screen-md shadow-xl w-11/12 mx-6 mb-2 rounded text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-white">
        <h1 className="flex justify-center bg-test p-2 text-l font-semibold text-xl">
          Reviews
        </h1>
        {historyData === null ? (
          <div className="m-2 p-2 bg-test font-semibold flex justify-center text-xl">
            No Reviews
          </div>
        ) : (
          <div className="bg-test card max-h-[400px] overflow-y-scroll scrollbar-thin p-4 px-4 py-2 flex flex-col rounded gap-4 bg-white">
            {historyData &&
              historyData
                .filter((element: any) => element.isHidden === false)
                .map((filteredElement: any, index: number) => (
                  <div
                    key={`z${index}`}
                    className="flex flex-col  p-4 bg-test rounded"
                  >
                    <h1 className="pb-2">
                      Review made {moment(filteredElement.created_at).fromNow()}
                    </h1>
                    <button
                      onClick={(event) =>
                        handleClick(
                          event,
                          filteredElement.data,
                          filteredElement
                        )
                      }
                      a-key={filteredElement.data}
                      className="bg-jgreen text-white p-2 rounded shadow-lg shadow-xl flex justify-center items-center"
                    >
                      Show
                    </button>
                  </div>
                ))}
          </div>
        )}
      </div>
      {isClicked && reviewData && element && (
        <ReviewInfo
          setTheyVerified={setTheyVerified}
          setTheyWentBack={setTheyWentBack}
          setIsClicked={setIsClicked}
          data={reviewData}
          element={element}
        />
      )}
    </div>
  );
}
