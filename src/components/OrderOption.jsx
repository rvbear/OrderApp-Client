import React from "react";

const OrderOption = ({ title, description, icon, selected, onClick }) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        selected ? "border-pink-600 bg-pink-50" : "border-gray-200"
      } mb-4 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          className={`mr-4 p-3 rounded-full ${
            selected ? "bg-pink-600 text-white" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderOption;
