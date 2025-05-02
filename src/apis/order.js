const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getOrder = async (orderId) => {
  const response = await fetch(`${BASE_URL}/order?orderId=${orderId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const getOrderCode = async (orderId) => {
  const response = await fetch(`${BASE_URL}/order/code?orderId=${orderId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const getOrderAll = async () => {
  const response = await fetch(`${BASE_URL}/order/all`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const createOrder = async (userId, totalPrice, menuNum, orderType) => {
  console.log(JSON.stringify({ userId, totalPrice, menuNum, orderType }));

  const response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, totalPrice, menuNum, orderType }),
  });

  const data = await response.json();
  return data;
};

export const updateOrderState = async (orderId, state) => {
  const response = await fetch(`${BASE_URL}/order/state`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ orderId, state }),
  });

  const data = await response.json();
  return data;
};

export const deleteOrder = async (orderId) => {
  const response = await fetch(`${BASE_URL}/order`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ orderId }),
  });

  const data = await response.json();
  return data;
};
