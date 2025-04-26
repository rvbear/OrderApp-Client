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

  const tabs = ["전체", "커피&음료", "디저트", "샌드위치&샐러드"];

  const products = [
    {
      id: 1,
      image: "https://picsum.photos/80/80",
      name: "오트 큐 모",
      price: 6500,
      category: "커피&음료",
    },
    {
      id: 2,
      image: "https://picsum.photos/80/80",
      name: "애플 망고 주스",
      price: 6300,
      category: "커피&음료",
    },
    {
      id: 3,
      image: "https://picsum.photos/80/80",
      name: "청귤 스퀘즈",
      price: 6300,
      category: "커피&음료",
    },
    {
      id: 4,
      image: "https://picsum.photos/80/80",
      name: "아이스 아메리카노",
      price: 4500,
      category: "커피&음료",
    },
    {
      id: 5,
      image: "https://picsum.photos/80/80",
      name: "달고나 라떼",
      price: 5800,
      category: "커피&음료",
    },
    {
      id: 6,
      image: "https://picsum.photos/80/80",
      name: "뉴욕 치즈 케이크",
      price: 6500,
      category: "디저트",
    },
    {
      id: 7,
      image: "https://picsum.photos/80/80",
      name: "초콜릿 크로와상",
      price: 4800,
      category: "디저트",
    },
    {
      id: 8,
      image: "https://picsum.photos/80/80",
      name: "에그 샌드위치",
      price: 5500,
      category: "샌드위치&샐러드",
    },
    {
      id: 9,
      image: "https://picsum.photos/80/80",
      name: "치킨 샐러드",
      price: 7200,
      category: "샌드위치&샐러드",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const filteredProducts =
    activeTab === 0
      ? products
      : products.filter((product) => product.category === tabs[activeTab]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="sticky top-0 z-10">
        <Header text="투썸오더" />
        <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <img src="https://picsum.photos/393/260" alt="배너" />

        <div className="bg-white">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
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
