import React from "react";

const NavTabs = ({ activeTab, tabs, onTabChange }) => {
  return (
    <div className="flex border-b overflow-x-auto no-scrollbar">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-3.5 py-3 whitespace-nowrap ${
            activeTab === index
              ? "border-b-2 border-black font-bold"
              : "text-gray-500"
          }`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;
