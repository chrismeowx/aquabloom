import React from "react";

export default function PredictButton({ onClick, disabled, text }) {
  return (
    <button
      className="predict"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
