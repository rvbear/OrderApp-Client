import React, { useState } from "react";
import { Search, Coffee, Package, MoreVertical, Plus, X } from "lucide-react";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category: "",
    price: 0,
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
  });

  const categories = ["전체", "커피&음료", "디저트", "샌드위치&샐러드"];

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "전체" || product.category === activeCategory) &&
      product.name.includes(searchTerm)
  );

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditedProduct({
      name: product.name,
      category: product.category,
      price: product.price,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setNewProduct({
      product: "",
      category: "음료",
      price: 0,
    });
    setIsAddModalOpen(true);
  };

  const handleEditSubmit = () => {
    // 수정 로직 구현 (실제로는 API 호출 등이 필요)
    console.log("수정된 상품 정보:", {
      id: selectedOrder.id,
      ...editedProduct,
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    // 삭제 로직 구현 (실제로는 API 호출 등이 필요)
    console.log("삭제된 상품 ID:", selectedOrder.id);
    setIsDeleteModalOpen(false);
  };

  const handleAddSubmit = () => {
    // 추가 로직 구현 (실제로는 API 호출 등이 필요)
    const newId = Math.max(...orders.map((o) => o.id)) + 1;
    console.log("새로운 상품 정보:", { id: newId, ...newProduct });
    setIsAddModalOpen(false);
  };

  return (
    <div className="mt-2">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-600 focus:border-transparent"
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
        <button
          className="flex items-center gap-1 bg-pink-600 hover:bg-pink-700 text-white py-1.5 px-3 rounded-md text-sm font-medium transition-colors"
          onClick={openAddModal}
        >
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
              <button
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                onClick={() => openEditModal(product)}
              >
                수정
              </button>
              <button
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                onClick={() => openDeleteModal(product)}
              >
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

      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">상품 정보 수정</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    메뉴 이름
                  </label>
                  <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        product: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={editedProduct.category}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    가격
                  </label>
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="flex-1 py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full p-3 inline-flex mx-auto mb-4">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">상품 삭제</h3>
              <p className="text-gray-600">
                정말 삭제하시겠습니까?
                <br />
                <span className="font-medium">{selectedProduct.name}</span>{" "}
                상품의 모든 정보가 삭제됩니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">새 상품 등록</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    메뉴 이름
                  </label>
                  <input
                    type="text"
                    value={newProduct.product}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="상품명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    가격
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleAddSubmit}
                  className="flex-1 py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
