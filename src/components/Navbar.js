import { useState, useEffect, useMemo } from "react";
import {
  HomeIcon,
  ChevronDownIcon,
  MenuAlt2Icon,
} from "@heroicons/react/solid";
import { navTilte } from "../atoms/navAtom";
import { navFilter, fourFilter } from "../atoms/filterAtom";
import { useRecoilState } from "recoil";
import customData from "../data/MOCK_DATA.json";
import Drawer from "@mui/material/Drawer";
//import Button from "@mui/material/Button";

function Navbar() {
  const [, setNavTitle] = useRecoilState(navTilte);
  const [, setNavFilter] = useRecoilState(navFilter);
  const [, setFourFilter] = useRecoilState(fourFilter);
  const [active, setActive] = useState("rent");

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

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
    setState(false);
    if (name === "buy") {
      setNavTitle("buy");
      setActive("buy");
      setNavFilter(buyHomes);
      setFourFilter(buyHomes);
    } else if (name === "sell") {
      setNavTitle("sell");
      setNavFilter(sellHomes);
      setFourFilter(sellHomes);
      setActive("sell");
    } else {
      setNavTitle("rent");
      setNavFilter(rentHomes);
      setFourFilter(rentHomes);
      setActive("rent");
    }
  };

  return (
    <div className="relative flex items-center justify-between p-4 bg-white">
      <div className="flex justify-center space-x-2">
        <HomeIcon className="w-6 h-6 text-violet-600" />
        <h1 className="text-lg font-bold">Estatery</h1>
      </div>
      <button
        className="absolute right-2 lg:hidden"
        onClick={toggleDrawer(true)}
      >
        <MenuAlt2Icon className="w-8 text-black" />
      </button>

      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        <div className="flex flex-col items-center justify-center px-10 pt-10 space-y-5 font-semibold ">
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

          <button className="btn text-violet-500 ">Login</button>
          <button className="text-white btn bg-violet-500 border-violet-500">
            Sign up
          </button>
        </div>
      </Drawer>

      <div className="flex items-center space-x-20">
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

      <div className="items-center justify-center hidden space-x-4 lg:flex">
        <button className="btn text-violet-500 ">Login</button>
        <button className="text-white btn bg-violet-500 border-violet-500">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
