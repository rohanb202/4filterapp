import React from "react";
import Card from "./Card";
import Filter from "./Filter";
import { navFilter, fourFilter } from "../atoms/filterAtom";
import { useRecoilValue } from "recoil";
import customData from "../data/MOCK_DATA.json";
function Main() {
  //console.log(customData);
  const filter = useRecoilValue(navFilter);
  const fourFilterValue = useRecoilValue(fourFilter);
  return (
    <div className=" px-[8vw] ">
      <div className="flex py-10">
        <div className="flex flex-col items-center w-full space-y-5 md:space-y-0 md:justify-between md:flex-row md:flex">
          <h1 className="text-2xl font-bold md:text-4xl">
            Search properties to rent
          </h1>
          <label className="block md:w-fit">
            <input
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Search with SearchBar"
            />
          </label>
        </div>
      </div>
      <Filter />
      <div className="grid grid-cols-1 gap-5 my-10 place-items-center md:grid-cols-2 xl:grid-cols-3">
        {customData.map(
          (item) =>
            fourFilterValue?.get(item.id) && <Card key={item.id} item={item} />
        )}
      </div>
    </div>
  );
}

export default Main;
