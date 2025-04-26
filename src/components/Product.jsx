import React from "react";

const Product = ({ image, name, price, isNew, id, onAddToCart }) => {
  return (
    <div
      className="px-3 pt-8 pb-3 flex justify-between items-center"
      onClick={() => onAddToCart({ id, name, price, image })}
    >
      <div className="flex">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 object-cover mr-3 rounded"
        />
        <div>
          <div className="flex flex-col items-start">
            {isNew && (
              <span className="bg-red-500 text-white text-xs px-1 rounded mr-1">
                NEW
              </span>
            )}
            <h3 className="pt-2 font-bold">{name}</h3>
          </div>
          <p className="mt-1 font-medium">{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
