import React, { useState } from "react";

const Count = ({count, setCount}) => {
  const increment = () => {
    setCount(count + 1);
  };



  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className="rounded-md"
          style={{
            border: "1px solid #C5C5C5",
            width: "28px",
            height: "28px",
          }}
          onClick={decrement}
        >
          -
        </button>
        <div className="mx-3">{count}</div>
        <button
          className="rounded-md orange-text"
          style={{
            border: "1px solid #FF724C",
            width: "28px",
            height: "28px",
          }}
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Count;
