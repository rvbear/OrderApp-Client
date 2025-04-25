import React from "react";

const Header = (props) => {
  return (
    <div className="h-16 flex items-center relative">
      <button className="absolute left-4" onClick={props.handleMoveToBack}>
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
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex-1 text-2xl text-center font-bold">{props.text}</div>
    </div>
  );
};

export default Header;
