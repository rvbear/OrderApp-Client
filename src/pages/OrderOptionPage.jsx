import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, ShoppingBag } from "lucide-react";
import Header from "../components/Header";
import OrderOption from "../components/OrderOption";
import PaymentButton from "../components/PaymentButton";
import { useCart } from "../contexts/CartContext";
import { createOrder, getOrderCode } from "../apis/order";

const orderOptions = [
  {
    id: 0,
    title: "매장에서 식사",
    description: "매장 내에서 드시고 가실 경우 선택해주세요.",
    icon: <Coffee size={24} />,
  },
  {
    id: 1,
    title: "포장해서 가져가기",
    description: "음식을 포장해서 가져가실 경우 선택해주세요.",
    icon: <ShoppingBag size={24} />,
  },
];

const OrderOptionPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/cart");
  };

  const handlePayment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const totalPrice = getTotalPrice();
      const orderType = selectedOption;
      const menuNum = getTotalItems();

      const orderResponse = await createOrder(
        userId,
        totalPrice,
        menuNum,
        orderType
      );
      const orderId = orderResponse.orderId;

      const { orderCode } = await getOrderCode(orderId);

      navigate("/order/complete", { state: { orderCode } });

      clearCart();
    } catch (err) {
      console.error("결제 실패:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-10">
        <Header text="주문 옵션 선택" handleMoveToBack={handleGoBack} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-bold mb-4">주문 방식 선택</h2>
          <p className="text-gray-600 mb-4">어떤 방식으로 주문하시겠어요?</p>

          {orderOptions.map((option) => (
            <OrderOption
              key={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              selected={selectedOption === option.id}
              onClick={() => setSelectedOption(option.id)}
            />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">총 주문수량</span>
            <span className="font-bold">{getTotalItems()}개</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">총 결제금액</span>
            <span className="font-bold">
              {getTotalPrice().toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <PaymentButton
          disabled={selectedOption !== 0 && selectedOption !== 1}
          onClick={handlePayment}
          totalPrice={getTotalPrice()}
        />
      </div>
    </div>
  );
};

export default OrderOptionPage;
