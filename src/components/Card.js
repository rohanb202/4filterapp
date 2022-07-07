//import { useEffect } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIcon2 } from "@heroicons/react/solid";
import RoundedCornerOutlinedIcon from "@mui/icons-material/RoundedCornerOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import { useState } from "react";

function Card({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col min-w-[10rem] w-[20rem]  rounded-lg m-2 shadow-lg">
      <div className=" aspect-video">
        <img
          className="object-cover min-w-[10rem]  w-[20rem] h-[12rem] rounded-t-lg"
          src={item?.img}
          alt="house_img"
        />
      </div>
      <div className="p-4 rounded-b-lg ">
        <div className="flex items-center justify-between pt-4 ">
          <h1 className="text-xl font-semibold text-violet-600">
            ${item?.price} <span className="text-sm text-black/60">/month</span>
          </h1>
          {isLiked ? (
            <HeartIcon2
              className="w-5 h-5 rounded-full cursor-pointer outline-2 outline outline-offset-4 text-violet-600 outline-black/10"
              onClick={() => setIsLiked(!isLiked)}
            />
          ) : (
            <HeartIcon
              className="w-5 h-5 rounded-full cursor-pointer outline-2 outline outline-offset-4 text-violet-600 outline-black/10"
              onClick={() => setIsLiked(!isLiked)}
            />
          )}
        </div>
        <div className="flex flex-col space-y-2 divide-y-2">
          <div>
            <h1 className="pt-5 text-xl font-bold truncate whitespace-nowrap">
              {item?.title}
            </h1>
            <h1 className="text-sm font-semibold text-black/60">
              {item?.address}
            </h1>
          </div>

          <div className="flex items-center justify-between pt-4 text-sm font-semibold text-black/60">
            <span className="flex items-center space-x-1">
              <KingBedOutlinedIcon className="!w-6 !h-6" />
              <h1>{item?.beds} Beds</h1>
            </span>
            <span className="flex items-center space-x-1">
              <BathtubOutlinedIcon className="!w-6 !h-6" />
              <h1>{item?.bathrooms} Bathrooms</h1>
            </span>
            <span className="flex items-center space-x-1">
              <RoundedCornerOutlinedIcon className="!w-6 !h-6" />
              <h1>
                {item?.area}m<sup>2</sup>
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
