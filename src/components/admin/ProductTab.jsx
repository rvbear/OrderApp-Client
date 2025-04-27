import React, { useState } from "react";
import { Search, Coffee, Package, MoreVertical, Plus } from "lucide-react";

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

const ProductTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const categories = ["전체", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "전체" || product.category === activeCategory) &&
      product.name.includes(searchTerm)
  );

  return (
    <div className="mt-2">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
          placeholder="상품명으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex overflow-x-auto pb-2 mb-4 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 mr-2 rounded-full text-sm whitespace-nowrap ${
              activeCategory === category
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mr-2">상품 목록</h2>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            총 {filteredProducts.length}개
          </span>
        </div>
        <button className="flex items-center gap-1 bg-pink-600 hover:bg-pink-700 text-white py-1.5 px-3 rounded-md text-sm font-medium transition-colors">
          <Plus className="h-4 w-4" />
          <span>상품 등록</span>
        </button>
      </div>

      <div className="space-y-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  {product.category === "커피" ? (
                    <Coffee className="h-8 w-8 text-pink-700" />
                  ) : (
                    <Package className="h-8 w-8 text-pink-700" />
                  )}
                </div>
                <div>
                  <div className="font-bold">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    {product.category}
                  </div>
                </div>
              </div>
              <div className="dropdown relative">
                <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold">가격</span>
                <span className="font-medium">
                  {product.price.toLocaleString()}원
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-md text-sm font-medium transition-colors">
                수정
              </button>
              <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-md text-sm font-medium transition-colors">
                삭제
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTab;
