import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavTabs from "../components/Navtabs";
import Product from "../components/Product";
import CartButton from "../components/CartButton";
import { useCart } from "../contexts/CartContext";
import { getMenuAll } from "../apis/menu";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart, getTotalItems } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const tabs = ["전체", "커피&음료", "디저트", "샌드위치&샐러드"];

  useEffect(() => {
    const getMenu = async () => {
      try {
        const data = await getMenuAll();
        setProducts(data.menuList);
      } catch (error) {
        console.error("메뉴를 불러오는데 실패했습니다:", err);
      }
    };

    getMenu();
  }, []);

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
        <img
          src="https://mcdn.twosome.co.kr/upload/MODS0040/202504/MODS0040_20250410150959_tNoDSrDv"
          alt="배너"
        />

        <div className="bg-white">
          {filteredProducts.map((product) => (
            <Product
              key={product.menuId}
              image={product.img}
              name={product.name}
              price={product.price}
              category={product.category}
              id={product.menuId}
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
