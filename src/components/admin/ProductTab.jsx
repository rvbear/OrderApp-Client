import React, { useState, useEffect } from "react";
import { Search, Coffee, Package, Plus, X } from "lucide-react";
import {
  getMenu,
  getMenuAll,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../../apis/menu";

const ProductTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category: "",
    price: 0,
    img: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    img: "",
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
      img: product.img,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const openAddModal = () => {
    setNewProduct({
      name: "",
      price: 0,
      category: "커피&음료",
      img: "",
    });
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getMenuAll();
        setProducts(data.menuList);
      } catch (error) {
        console.error("메뉴 리스트를 불러오는데 실패했습니다:", err);
      }
    };

    getProducts();
  }, []);

  const handleEditSubmit = async () => {
    try {
      await updateMenu(
        selectedProduct.menuId,
        editedProduct.name,
        editedProduct.price,
        editedProduct.category,
        editedProduct.img
      );
      const updatedList = await getMenuAll();
      setProducts(updatedList.menuList);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("상품 수정 실패:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMenu(selectedProduct.menuId);
      const updatedList = await getMenuAll();
      setProducts(updatedList.menuList);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("상품 삭제 실패:", err);
    }
  };

  const handleAddSubmit = async () => {
    try {
      await createMenu(
        newProduct.name,
        newProduct.price,
        newProduct.category,
        newProduct.img
      );
      const updatedList = await getMenuAll();
      setProducts(updatedList.menuList);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("상품 등록 실패:", err);
    }
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
            key={product.menuId}
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
                        name: e.target.value,
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    메뉴 이미지
                  </label>
                  <input
                    type="text"
                    value={editedProduct.img}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        img: e.target.value,
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
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이미지 URL
                  </label>
                  <input
                    type="text"
                    value={newProduct.img}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, img: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="이미지 url을 입력하세요"
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
