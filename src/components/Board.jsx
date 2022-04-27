import React from "react";
import { Square } from "./Square";

export const Board = (props) => {
  const { squares, onClick, winLine } = props;

  const renderSquare = (i, isHighlight) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isHighlight={isHighlight}
      />
    );
  };

  const squareBoard = [];
  const maxRow = 3;
  const maxCol = 3;

  for (let row = 0; row < maxRow; row++) {
    const rowBoard = [];

    for (let col = 0; col < maxCol; col++) {
      const index = maxCol * row + col;
      // 勝者が決定した時のみ値が入る、それ以外は[]
      const isHighlight = winLine.includes(index);
      rowBoard.push(renderSquare(index, isHighlight));
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
