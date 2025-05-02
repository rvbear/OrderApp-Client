const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const googleOAuthLogin = async (code) => {
  console.log(BASE_URL);
  const response = await fetch(`${BASE_URL}/user/oauth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error(`서버 오류: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const loginUser = async (email, passWord) => {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, passWord }),
  });

  const token = response.headers.get("Authorization");
  const data = await response.json();

  return {
    token: token?.replace("Bearer ", ""),
    data,
  };
};

export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/user?userId=${userId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const getUserAll = async () => {
  const response = await fetch(`${BASE_URL}/user/all`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data;
};

export const updateUser = async (userId, userName, role) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, userName, role }),
  });

  const data = await response.json();
  return data;
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();
  return data;
};
