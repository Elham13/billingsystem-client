import React from "react";

const Card = ({ amt, date }) => {
  return (
    <div className="card col-center">
      <h4 style={{ marginBottom: "1rem" }}>&#8377; {amt}</h4>
      <h4>{date}</h4>
    </div>
  );
};

export default Card;
