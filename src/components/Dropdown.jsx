import React, { useState } from "react";

export default function Dropdown({ buttonText, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn"
      >
        {buttonText}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 4,
            width: "550px",
            overflowY: "auto",
            zIndex: 10,
            fontSize: "15px",
            padding: "20px"
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              style={{ padding: 8, cursor: "pointer", borderBottom: "1px solid #eee" }}
              onMouseDown={e => e.preventDefault()} 
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
