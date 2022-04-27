import React from "react";
import { Square } from "./Square";

export const Board = (props) => {
  const { squares, onClick } = props;

  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
  };

  const squareBoard = [];
  const maxRow = 3;
  const maxCol = 3;

  for (let row = 0; row < maxRow; row++) {
    const rowBoard = [];

    for (let col = 0; col < maxCol; col++) {
      const index = maxCol * row + col;
      rowBoard.push(renderSquare(index));
    }

    squareBoard.push(
      <div key={row} className="board-row">
        {rowBoard}
      </div>
    );
  }

  return (
    <>
      <div>{squareBoard}</div>
    </>
  );
};
