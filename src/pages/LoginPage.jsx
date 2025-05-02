import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { loginUser, getUser } from "../apis/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleMoveToBack = () => {
    navigate("/");
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token, data } = await loginUser(email, passWord);
      console.log("로그인 성공", data);

      if (token) {
        localStorage.setItem("token", token);
      }

      if (data.userId) {
        localStorage.setItem("userId", data.userId);

        const response = await getUser(data.userId);

        if (response.userInfo.role === "ADMIN") {
          navigate("/admin");
        } else if (response.userInfo.role === "USER") {
          navigate("/order");
        } else {
          console.warn("알 수 없는 사용자 권한:", response.userInfo.role);
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header text="로그인" handleMoveToBack={handleMoveToBack} />

      <div className="px-4 flex-1">
        <div className="py-16 text-center">
          <h1 className="text-xl font-semibold uppercase tracking-wider">
            A TWOSOME PLACE
          </h1>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-3 px-2 outline-none text-sm"
            />
            <button className="absolute right-2 top-3 text-gray-400 bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-sm">
              ?
            </button>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              className="w-full border-b border-gray-300 py-3 px-2 outline-none text-sm"
            />
            <button className="absolute right-2 top-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        <div className="pt-10">
          <button
            className="w-full bg-black text-white py-4 font-medium"
            onClick={handleLogin}
          >
            로그인
          </button>

          <div className="flex justify-center mt-3 space-x-2">
            <button className="text-xs text-gray-500">아이디 찾기</button>
            <div className="text-xs text-gray-300">|</div>
            <button className="text-xs text-gray-500">비밀번호 찾기</button>
          </div>
        </div>

        <div className="pt-10 flex justify-center">
          <button
            className="bg-white rounded-full p-3 shadow-md flex items-center justify-center"
            style={{ width: "48px", height: "48px" }}
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </button>
        </div>

        <div className="pt-16 text-center">
          <p className="text-sm text-start text-gray-600 mb-2">
            <span className="text-red-600 font-bold">투썸하트</span> 앱이
            처음이신가요?
          </p>
          <button className="w-full border border-gray-400 py-3 text-sm font-medium">
            회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
