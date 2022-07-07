import { useState, useEffect, useMemo } from "react";
import { HomeIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { navFilter, fourFilter } from "../atoms/filterAtom";
import { useRecoilState } from "recoil";
import customData from "../data/MOCK_DATA.json";

function Navbar() {
  const [navfilter, setNavFilter] = useRecoilState(navFilter);
  const [fourfilter, setFourFilter] = useRecoilState(fourFilter);
  const [active, setActive] = useState("rent");

  //console.log(customData);
  const filterByPropertyStatus = (name) => {
    let navFilterMap = new Map();
    customData.forEach((item) => {
      if (item.status === name) {
        navFilterMap.set(item.id, true);
      }
    });
    return navFilterMap;
  };
  let buyHomes = useMemo(() => {
    return filterByPropertyStatus("buy");
  }, []);
  let sellHomes = useMemo(() => {
    return filterByPropertyStatus("sell");
  }, []);
  let rentHomes = useMemo(() => {
    return filterByPropertyStatus("rent");
  }, []);
  useEffect(() => {
    setNavFilter(rentHomes);
    setFourFilter(rentHomes);
  }, []);

  const handleClick = (name) => {
    if (name === "buy") {
      setActive("buy");
      setNavFilter(buyHomes);
      setFourFilter(buyHomes);
    } else if (name === "sell") {
      setNavFilter(sellHomes);
      setFourFilter(sellHomes);
      setActive("sell");
    } else {
      setNavFilter(rentHomes);
      setFourFilter(rentHomes);
      setActive("rent");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center space-x-20">
        <div className="flex items-center justify-center space-x-2">
          <HomeIcon className="w-6 h-6 text-violet-600" />
          <h1 className="text-lg font-bold">Estatery</h1>
        </div>
        <div className="hidden space-x-10 font-semibold lg:flex">
          <button
            className={`cursor-pointer rounded-lg p-2 px-4 ${
              active === "rent" && "bg-black/10 text-violet-500"
            } `}
            onClick={() => handleClick("rent")}
          >
            Rent
          </button>
          <button
            className={`cursor-pointer rounded-lg p-2 px-4 ${
              active === "buy" && "bg-black/10 text-violet-500"
            } `}
            onClick={() => handleClick("buy")}
          >
            Buy
          </button>
          <button
            className={`cursor-pointer rounded-lg p-2 px-4 ${
              active === "sell" && "bg-black/10 text-violet-500"
            } `}
            onClick={() => handleClick("sell")}
          >
            Sell
          </button>
          <div className="flex items-center">
            <h1>Manage Property</h1>

            <ChevronDownIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-around">
            <h1>Resources</h1>
            <ChevronDownIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button className="btn text-violet-500 ">Login</button>
        <button className="text-white btn bg-violet-500 border-violet-500">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
