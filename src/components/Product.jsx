import React from "react";

const Product = ({ image, name, price, category, id, onAddToCart }) => {
  return (
    <div
      className="px-3 pt-8 pb-3 flex justify-between items-center"
      onClick={() => onAddToCart({ id, name, price, image, category })}
    >
      <div className="flex">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 object-cover mr-3 rounded"
        />
        <div>
          <h3 className="pt-2 font-bold">{name}</h3>
          <p className="mt-1 font-medium">{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
