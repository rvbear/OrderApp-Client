import React from "react";

const Product = ({ image, name, price, isNew }) => {
  return (
    <div className="flex items-center px-3 py-4">
      <img
        src={image}
        alt={name}
        className="w-28 h-28 object-cover mr-4 rounded-lg"
      />
      <div className="flex-1">
        <div className="flex flex-col items-start mb-1">
          {isNew && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full mr-2">
              New
            </span>
          )}
          <h3 className="pt-0.5 font-bold">{name}</h3>
        </div>
        <p className="text-sm font-medium">{price.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default Product;
