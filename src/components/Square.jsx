import React from "react";

export const Square = (props) => {
  const { value, onClick, isHighlight } = props;
  const className = isHighlight ? "highlight-square" : "square";

  return (
    <>
      <button className={className} onClick={onClick}>
        {value}
      </button>
    </>
  );
};
