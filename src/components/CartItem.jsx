import React from "react";

const CartItem = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 mr-3 rounded"
        />
        <div>
          <p className="font-bold">{item.name}</p>
          <p className="text-gray-600">{item.price.toLocaleString()}원</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 bg-gray-200 rounded-full text-center"
        >
          -
        </button>
        <span className="mx-3">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 bg-gray-200 rounded-full text-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
