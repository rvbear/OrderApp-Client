import React, { useState } from "react";
import { Search, ShoppingCart, ChevronRight } from "lucide-react";

const orders = [
  {
    id: 1,
    customer: "홍길동",
    items: "아메리카노 외 2건",
    total: 15000,
    status: "배송완료",
    date: "2023-10-15",
  },
  {
    id: 2,
    customer: "이순신",
    items: "카페라떼",
    total: 5000,
    status: "준비중",
    date: "2023-10-16",
  },
  {
    id: 3,
    customer: "김정민",
    items: "티라미수 외 1건",
    total: 11500,
    status: "배송중",
    date: "2023-10-16",
  },
];

const OrderTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const statuses = ["전체", ...new Set(orders.map((o) => o.status))];

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "전체" || order.status === statusFilter) &&
      (order.customer.includes(searchTerm) || order.items.includes(searchTerm))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "배송완료":
        return "bg-green-100 text-green-800";
      case "배송중":
        return "bg-blue-100 text-blue-800";
      case "준비중":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          placeholder="주문자 또는 상품으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex overflow-x-auto pb-2 mb-4 no-scrollbar">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1.5 mr-2 rounded-full text-sm whitespace-nowrap ${
              statusFilter === status
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mr-2">주문 목록</h2>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            총 {filteredOrders.length}건
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <ShoppingCart className="h-6 w-6 text-pink-700" />
                </div>
                <div>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.date}</div>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t border-b border-gray-100 py-3">
              <div className="text-sm">{order.items}</div>
              <div className="font-bold mt-1 text-pink-800">
                {order.total.toLocaleString()}원
              </div>
            </div>

            <button className="w-full mt-3 flex justify-center items-center py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">
              주문 상세 보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTab;
