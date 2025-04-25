import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="relative h-full" onClick={handleClick}>
      <img
        src="https://picsum.photos/393/350"
        alt="메인"
        className="h-full w-full"
      />
      <div className="absolute z-10 bottom-10 w-full text-xl text-white text-center">
        클릭해주세요!
      </div>
    </div>
  );
};

export default StartPage;
