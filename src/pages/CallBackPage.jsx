import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleOAuthLogin } from "../apis/user";

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const apiCalledRef = useRef(false);

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (apiCalledRef.current) {
      return;
    }

    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (!code) {
      setLoading(false);
      return;
    }

    const handleOAuthLogin = async () => {
      try {
        apiCalledRef.current = true;

        console.log("OAuth 로그인 처리 시작:", code);
        const data = await googleOAuthLogin(code);

        setUserInfo(data);
        setLoading(false);

        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/order");
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("OAuth 로그인 에러:", err);
      }
    };

    handleOAuthLogin();

    return () => {};
  }, []);

  return (
    <div className="p-4">
      {loading && <p>정보를 불러오는 중입니다...</p>}

      {userInfo && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-bold">유저 정보</h2>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 border rounded bg-red-100 text-red-700">
          <h2 className="font-bold">에러 발생</h2>
          <pre>{error.message}</pre>
        </div>
      )}
    </div>
  );
};

export default CallbackPage;
