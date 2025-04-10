import React from "react";

// Making a custom Button Component
const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white font-bold p-3 m-2 rounded w-[100px] text-center ${
        disabled ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-600"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
