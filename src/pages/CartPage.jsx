import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/order");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-10">
        <Header text="장바구니" handleMoveToBack={handleGoBack} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow mt-4">
            <div className="text-gray-500 mb-4">장바구니가 비어있습니다</div>
            <button
              onClick={handleGoBack}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              메뉴 담으러 가기
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow mt-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">장바구니</h2>
            </div>

            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            <div className="p-4 mt-2">
              <div className="flex justify-between mb-4">
                <span className="font-bold">총 메뉴개수</span>
                <span className="font-bold">{getTotalItems()}개</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold">총 결제금액</span>
                <span className="font-bold">
                  {getTotalPrice().toLocaleString()}원
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleGoBack}
                  className="flex-1 bg-gray-200 py-3 rounded-lg font-bold"
                >
                  계속 쇼핑하기
                </button>
                <button className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-bold">
                  주문하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
