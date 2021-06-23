import React from "react";

const Items = ({ title, price, sold }) => {
  return (
    <div className="item">
      <div className="row-between">
        <h4>{title}</h4>
        <h5>&#8377; {price}</h5>
      </div>
      <p>{sold}</p>
    </div>
  );
};

export default Items;
