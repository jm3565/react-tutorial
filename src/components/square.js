import React from "react";

const Square = ({ value, onClick, highlight }) => {
  let classes = "square";

  if (highlight) {
    classes += " square-highlight";
  }

  return (
    <button className={classes} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
