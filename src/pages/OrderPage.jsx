import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavTabs from "../components/Navtabs";
import Product from "../components/Product";
import CartButton from "../components/CartButton";
import { useCart } from "../contexts/CartContext";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart, getTotalItems } = useCart();
  const navigate = useNavigate();

  const tabs = ["NEW", "커피&음료", "디저트", "샌드위치&디저트"];

  const products = [
    {
      id: 1,
      image: "https://picsum.photos/80/80",
      name: "오트 큐 모",
      price: 6500,
      isNew: true,
    },
    {
      id: 2,
      image: "https://picsum.photos/80/80",
      name: "애플 망고 주스",
      price: 6300,
      isNew: true,
    },
    {
      id: 3,
      image: "https://picsum.photos/80/80",
      name: "청귤 스퀘즈",
      price: 6300,
      isNew: true,
    },
    {
      id: 4,
      image: "https://picsum.photos/80/80",
      name: "아이스 아메리카노",
      price: 4500,
      isNew: false,
    },
    {
      id: 5,
      image: "https://picsum.photos/80/80",
      name: "달고나 라떼",
      price: 5800,
      isNew: false,
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-10">
        <Header text="투썸오더" />
        <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <img src="https://picsum.photos/393/260" alt="배너" />

        <div className="bg-white">
          {products.map((product) => (
            <Product
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              isNew={product.isNew}
              id={product.id}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <CartButton itemCount={getTotalItems()} onClick={goToCart} />
    </div>
  );
};

export default OrderPage;
