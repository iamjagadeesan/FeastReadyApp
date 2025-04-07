import React from "react";
import { IoBag } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";

const OrderTimeline = ({ status }) => {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <div className="flex items-center justify-between gap-1 w-4/5 md:w-2/3 lg:w-1/2 text-2xl">
        {/* Bag Icon */}
        <div className={`p-1 rounded-full ${status === "Food Processing" ? "bg-orange-500" : `${status === "Out for Delivery" ? "bg-blue-500" : ""} ${status === "Delivered" ? "bg-green-500" : ""} `} `}>
          <IoBag />
        </div>

        {/* First Line */}
        <div className={`h-[2px] w-full ${status === "Out for Delivery" || status === "Delivered" ? "bg-blue-500" : "bg-white"} ${status === "Delivered" ? "bg-green-500" : ""}`}></div>

        {/* Bike Icon */}
        <div className={`text-3xl p-1 rounded-full ${status === "Out for Delivery" || status === "Delivered" ? "bg-blue-500" : "" } ${status === "Delivered" ? "bg-green-500" : ""}`}>
          <MdDeliveryDining />
        </div>

        {/* Second Line */}
        <div className={`h-[2px] w-full ${status === "Delivered" ? "bg-green-500" : "bg-white"}`}></div>

        {/* Bag Check Icon */}
        <div className={`p-1 rounded-full ${status === "Delivered" ? "bg-green-500" : ""}`}>
          <IoBagCheck />
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
