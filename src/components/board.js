import React from "react";
import Square from "./square";

const Board = ({ squares, onClick, winSquares }) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        highlight={winSquares ? winSquares.includes(i) : false}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div>
      {Array(3)
        .fill(null)
        .map((v, i) => (
          <div className="board-row">
            {Array(3)
              .fill(null)
              .map((v, j) => renderSquare(j + i * 3))}
          </div>
        ))}
    </div>
  );
};

export default Board;
