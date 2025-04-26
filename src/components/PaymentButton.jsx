import React from "react";

const PaymentButton = ({ disabled, onClick, totalPrice }) => {
  return (
    <button
      className={`w-full py-4 rounded-lg font-bold text-white ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {totalPrice.toLocaleString()}원 결제하기
    </button>
  );
};

export default PaymentButton;
