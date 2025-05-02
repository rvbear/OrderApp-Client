const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getMenu = async (menuId) => {
  const response = await fetch(`${BASE_URL}/menu?menuId=${menuId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const getMenuAll = async () => {
  const response = await fetch(`${BASE_URL}/menu/all`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const createMenu = async (name, price, category, img) => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      price,
      category,
      img,
    }),
  });

  const data = await response.json();
  return data;
};

export const updateMenu = async (menuId, name, price, category, img) => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ menuId, name, price, category, img }),
  });

  const data = await response.json();
  return data;
};

export const deleteMenu = async (menuId) => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ menuId }),
  });

  const data = await response.json();
  return data;
};
