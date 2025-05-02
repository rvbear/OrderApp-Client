import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const OrderCompletePage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const location = useLocation();
  const code = location.state?.orderCode || "알 수 없음";

  const handleGoToHome = () => {
    clearCart();
    navigate("/order");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-green-500 mb-6">
          <CheckCircle size={80} />
        </div>
        <h1 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h1>
        <p className="text-gray-600 mb-8">주문 번호: {code}</p>
        <p className="text-gray-600 mb-2">
          주문하신 메뉴는 준비가 완료되면 알림으로 안내드립니다.
        </p>
        <p className="text-gray-600 mb-8">이용해 주셔서 감사합니다.</p>
        <button
          onClick={handleGoToHome}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold w-full"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default OrderCompletePage;
