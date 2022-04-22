import React from "react";

export const Square = (props) => {
  const { value, onClick } = props;

  return (
    <>
      <button className="square" onClick={onClick}>
        {value}
      </button>
    </>
  );
};
