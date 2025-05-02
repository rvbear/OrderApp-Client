import React, { useState, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { getOrderAll, updateOrderState } from "../../apis/order";
import { getUser } from "../../apis/user";

const OrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderAll();

        const uniqueUserIds = [...new Set(data.orderList.map((o) => o.userId))];
        const userMap = {};

        await Promise.all(
          uniqueUserIds.map(async (id) => {
            try {
              const data = await getUser(id);
              userMap[id] = data.userInfo.userName;
            } catch (e) {
              userMap[id] = "알 수 없음";
            }
          })
        );

        setUserNames(userMap);
        setOrders(data.orderList);
      } catch (err) {
        console.error("주문 리스트를 불러오는데 실패했습니다:", err);
      }
    };

    fetchOrders();
  }, []);

  const statuses = [
    { id: "ALL", label: "전체" },
    { id: "READY", label: "준비중" },
    { id: "FINISH", label: "준비완료" },
    { id: "END", label: "수령완료" },
  ];

  const filteredOrders = orders.filter((order) => {
    const userName = userNames[order.userId] || "";
    return (
      (statusFilter === "ALL" || order.state === statusFilter) &&
      userName.includes(searchTerm)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "READY":
        return "bg-green-100 text-green-800";
      case "FINISH":
        return "bg-blue-100 text-blue-800";
      case "END":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (orderId, newState) => {
    try {
      const updated = await updateOrderState(orderId, newState);

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, state: newState } : order
        )
      );
    } catch (error) {
      console.error("Error updating order state:", error);
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
          placeholder="주문자로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex overflow-x-auto pb-2 mb-4 no-scrollbar">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setStatusFilter(status.id)}
            className={`px-4 py-1.5 mr-2 rounded-full text-sm whitespace-nowrap ${
              statusFilter === status.id
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.label}
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
            key={order.orderId}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <ShoppingCart className="h-6 w-6 text-pink-700" />
                </div>
                <div>
                  <div className="font-medium">
                    {userNames[order.userId] || "로딩 중..."}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.orderTime.split("T")[0]}
                  </div>
                </div>
              </div>
              <select
                value={order.state}
                onChange={(e) =>
                  handleStatusChange(order.orderId, Number(e.target.value))
                }
                className={`text-xs font-medium rounded-full px-2.5 py-1 ${getStatusColor(
                  order.state
                )}`}
              >
                <option value="READY">준비중</option>
                <option value="FINISH">준비완료</option>
                <option value="END">수령완료</option>
              </select>
            </div>

            <div className="border-t border-b border-gray-100 py-3">
              <div className="text-sm">총 {order.menuNum}개</div>
              <div className="font-bold mt-1 text-pink-800">
                {order.totalPrice.toLocaleString()}원
              </div>
            </div>
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
