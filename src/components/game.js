import React, { useState } from "react";
import Board from "./board";
import calculateWinner from "../calculateWinner";

const Game = () => {
  const [status, setStatus] = useState("Next player: X");
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      col: null,
      row: null,
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [winningSquares, setWinningSquares] = useState(null);

  const evaluateGame = (currentSquares) => {
    const winner = calculateWinner(currentSquares);
    if (winner) {
      setIsOver(true);
      setStatus(`Winner: ${winner[0]}`);
      setWinningSquares(winner[1]);
    } else {
      setIsOver(false);
      setStatus("Next player: " + (!xIsNext ? "X" : "O"));
      setWinningSquares(null);
    }
  };

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squaresCopy = current.squares.slice();
    if (isOver || squaresCopy[i]) {
      return;
    }

    squaresCopy[i] = xIsNext ? "X" : "O";
    setHistory(
      historyCopy.concat([
        { squares: squaresCopy, col: (i % 3) + 1, row: Math.ceil((i + 1) / 3) },
      ])
    );
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);

    evaluateGame(squaresCopy);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    evaluateGame(history.slice(0, step + 1)[step].squares);
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move # ${move} - (${step.col}, ${step.row})`
      : "Go to game start";

    return (
      <li key={move}>
        <button
          className={stepNumber === move ? "step-selected" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
          winSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <button onClick={() => setIsAscending(!isAscending)}>
            Toggle Order
          </button>
        </div>
        <ol>{isAscending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
};

export default Game;
