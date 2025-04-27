import React, { useState } from "react";
import NavTabs from "../components/Navtabs";
import Header from "../components/Header";
import MemberTab from "../components/admin/MemberTab";
import OrderTab from "../components/admin/OrderTab";
import ProductTab from "../components/admin/ProductTab";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["회원", "상품", "주문"];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <MemberTab />;
      case 1:
        return <ProductTab />;
      case 2:
        return <OrderTab />;
      default:
        return <MemberTab />;
    }
  };

  const getHeaderText = () => {
    switch (activeTab) {
      case 0:
        return "회원 관리";
      case 1:
        return "상품 관리";
      case 2:
        return "주문 관리";
      default:
        return "관리자 페이지";
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header text={getHeaderText()} />
      <NavTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
      <div className="p-4">{renderTabContent()}</div>
    </div>
  );
};

export default AdminPage;
