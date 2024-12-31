// import React from 'react'

import { Clock, Gauge, NotepadTextDashed } from "lucide-react";

const CaptainDetails = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center mt-5 px-3">
        <div className="flex gap-5 items-center">
          <div>
            <img
              src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
              className="h-20 w-20 object-center object-cover rounded-full"
            ></img>
          </div>
          <div>
            <h3>
              <span className="text-lg ">Driver Name</span>
            </h3>
            <h3>
              <span className="text-base text-gray-400">Driver Level</span>
            </h3>
          </div>
        </div>
        <div>
          <h3 className="w-full text-end text-lg ">₹60</h3>
          <h3 className="w-full text-end text-lg text-gray-400">Earned</h3>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-3 py-10  rounded-3xl border-2 border-red-300 shadow-md  shadow-gray-400 gap-3 bg-yellow-200 ">
        <div className="flex  flex-col  items-center gap-3">
          <div className="flex justify-center  ">
            <Clock
              color="black"
              absoluteStrokeWidth
              stroke="gray"
              strokeOpacity={0.77}
              className="h-12 w-12"
            />
          </div>
          <h3 className="text-3xl font-bold">10</h3>
          <h3 className="mt-2 text-base text-gray-500 text-center">
            Total time online
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex justify-center">
            <Gauge
              color="black"
              absoluteStrokeWidth
              stroke="gray"
              strokeOpacity={0.77}
              className="h-12 w-12 "
            />
          </div>
          <h3 className="text-3xl font-bold">30 Km</h3>
          <h3 className="mt-2 text-base text-gray-500 text-center">
            Total time online
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex justify-center">
            <NotepadTextDashed
              color="black"
              absoluteStrokeWidth
              stroke="gray"
              strokeOpacity={0.77}
              className="h-12 w-12"
            />
          </div>
          <h3 className="text-3xl font-bold">20</h3>
          <h3 className="mt-2 text-base text-gray-500 text-center">
            Total time online
          </h3>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
