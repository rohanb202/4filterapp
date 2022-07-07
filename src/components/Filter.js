import React from "react";
import Slider from "@mui/material/Slider";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { navFilter, fourFilter } from "../atoms/filterAtom";
import { useRecoilState } from "recoil";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import { FilterIcon as FilterIcon2 } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import customData from "../data/MOCK_DATA.json";

function valuetext(value) {
  return `$${value * 50}`;
}

function Filter() {
  const [priceValue, setPriceValue] = useState([0, 5000]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredValue] = useRecoilState(navFilter);
  const [, setFourFilter] = useRecoilState(fourFilter);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSubmit = (data) => {
    let filteredBy4 = new Map(filteredValue);
    if (
      data.address &&
      data.address !== "All" &&
      data.address.trim().length > 0
    ) {
      filteredBy4.forEach((value, key) => {
        if (customData[key - 1].address !== data.address) {
          filteredBy4.delete(key);
        }
      });
    }
    if (
      data.propertyType &&
      data.propertyType !== "All" &&
      data.propertyType.length > 0
    ) {
      filteredBy4.forEach((value, key) => {
        if (customData[key - 1].type !== data.propertyType) {
          filteredBy4.delete(key);
        }
      });
    }
    if (data.date && data.date.trim().length > 0) {
      filteredBy4.forEach((value, key) => {
        if (
          new Date(customData[key - 1].date).getTime() <
          new Date(data.date).getTime()
        ) {
          filteredBy4.delete(key);
        }
      });
    }
    filteredBy4.forEach((value, key) => {
      if (
        customData[key - 1].price < priceValue[0] ||
        customData[key - 1].price > priceValue[1]
      ) {
        filteredBy4.delete(key);
      }
    });

    setFourFilter(filteredBy4);
  };

  return (
    <div
      className={`
      } flex flex-col items-center space-y-5  justify-center`}
    >
      <button
        className="flex items-center space-x-2 xl:hidden"
        onClick={() => setOpenFilter(!openFilter)}
      >
        {openFilter ? (
          <FilterIcon className="w-5 h-5 text-violet-500" />
        ) : (
          <FilterIcon2 className="w-5 h-5 text-violet-500" />
        )}

        <span className="font-semibold ">Filter</span>
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={` ${
          !openFilter && "hidden "
        }   max-w-[25rem] xl:max-w-none  flex flex-col justify-around p-2 space-y-2 bg-white rounded-lg shadow-md xl:space-x-10 xl:justify-around xl:items-center xl:divide-x xl:flex-row xl:flex`}
      >
        <div className="flex flex-col items-start justify-center px-5 py-2 space-y-2 ">
          <h1 className="font-light">Location</h1>
          <select
            id="location"
            className="font-semibold border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
            {...register("address")}
          >
            <option defaultValue={null}>All</option>
            {customData.map(
              (item) =>
                filteredValue?.get(item.id) && (
                  <option key={item.id} value={item.address}>
                    {item.address}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="flex flex-col items-start justify-center px-5 py-2 space-y-2">
          <h1 className="font-light">When to move in</h1>

          <label className="block">
            <input
              {...register("date")}
              type="date"
              min={`${new Date().toISOString().split("T")[0]}`}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></input>
          </label>
        </div>
        <div className="flex flex-col justify-center px-5 py-2 min-w-[15rem] space-y-2  items-start ">
          <h1 className="font-light">Price</h1>
          <div className="flex flex-col justify-start space-x-10 xl:items-center xl:flex-row ">
            <h1 className="text-xl font-semibold">
              ${priceValue[0]} - ${priceValue[1]}
            </h1>
            <button className="hidden xl:block" onClick={handleClick}>
              <ChevronDownIcon className="w-[1.4rem] h-[1.4rem] text-black/50" />
            </button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="w-[300px] py-5 px-10 ">
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceValue}
                  onChange={handleChange}
                  valueLabelDisplay="off"
                  min={0}
                  max={5000}
                  getAriaValueText={valuetext}
                  //color="#8b5cf6"
                />
              </div>
            </Popover>
            <div className="w-[200px] !ml-[0.5rem]  xl:hidden ">
              <Slider
                getAriaLabel={() => "Price range"}
                value={priceValue}
                onChange={handleChange}
                valueLabelDisplay="off"
                min={0}
                max={5000}
                getAriaValueText={valuetext}
                //color="#8b5cf6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center px-5 py-2 space-y-2 ">
          <h1 className="font-light">Property Type</h1>
          {/* <h1 className="text-xl font-semibold text-">All</h1> */}
          <select
            id="property"
            className="font-semibold border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
            {...register("propertyType")}
          >
            <option defaultValue={null}>All</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Cottage">Cottage</option>
            <option value="Apartment">Apartment</option>
            <option value="Co-Op">Co-Op</option>
          </select>
        </div>
        <div className="px-5 py-2 ">
          <button type="submit" className="text-white btn bg-violet-500">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filter;
