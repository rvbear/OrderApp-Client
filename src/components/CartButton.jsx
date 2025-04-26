import React from "react";
import { ShoppingBag } from "lucide-react";

const CartButton = ({ itemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
    >
      <ShoppingBag size={24} />
      {itemCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
          {itemCount}
        </div>
      )}
    </button>
  );
};

export default CartButton;
