import React from "react";
import { ChevronLeft } from "lucide-react";

const Header = ({ text, handleMoveToBack }) => {
  return (
    <div className="h-16 flex items-center relative">
      {handleMoveToBack && (
        <button className="absolute left-4" onClick={handleMoveToBack}>
          <ChevronLeft size={24} />
        </button>
      )}
      <div className="flex-1 text-2xl text-center font-bold">{text}</div>
    </div>
  );
};

export default Header;
