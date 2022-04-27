import React, { useState } from "react";
import { Board } from "./Board";

export const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      point: null
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDesc, setIsDesc] = useState(false);

  // マス目をクリックした時の動き
  const handleClick = (i) => {
    // 現時点のゲーム進行点が大事（sliceプロパティを使用する場合、現時点+1でstart~goal）
    const nowHistory = history.slice(0, stepNumber + 1);
    const current = nowHistory[nowHistory.length - 1];
    const squares = current.squares.slice();

    // ゲームの決着がついてるか、クリックしたマスが既に埋まってる場合
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      nowHistory.concat([
        {
          squares: squares,
          point: i
        }
      ])
    );
    setStepNumber(nowHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // 勝利情報について
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const result = {
      winner: null,
      winLine: []
    };

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        result.winner = squares[a];
        result.winLine = lines[i];
      }
    }

    return result;
  };

  const current = history[stepNumber];
  const { winner, winLine } = calculateWinner(current.squares);

  // 履歴ボタン
  const moves = history.map((step, move) => {
    const col = (step.point % 3) + 1;
    const row = (step.point / 3 + 1) | 0;

    const desc = move
      ? "Go to move #" + move + "(" + col + "," + row + ")"
      : "Go to game start";

    return (
      <li key={move}>
        <button
          className={move === stepNumber ? "bold" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  // ゲーム状況
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else if (!winner && history.length === 10) {
    status = "引き分けです。";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // ソート
  if (isDesc) {
    moves.reverse();
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            winLine={winLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            onClick={() => {
              setIsDesc(!isDesc);
            }}
          >
            ソートする
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
};
