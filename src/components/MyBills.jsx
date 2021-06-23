import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Items from "../utils/Items";
import moment from "moment";

const MyBills = () => {
  const getItemReducer = useSelector((state) => state.getItems);
  const [cartItems, setCartItems] = useState([]);

  const getTotal = (arr) => {
    let total = 0;
    arr.map((item) => (total += item.price * item.sold));
    return total;
  };

  useEffect(() => {
    const { getItemRes } = getItemReducer;
    if (getItemRes.length) {
      const soldItems = getItemRes.filter((item) => item.sold > 0);
      setCartItems(soldItems);
    }
  }, [getItemReducer]);

  return (
    <div className="component">
      <h2 className="heading">My bills</h2>
      {cartItems.length > 0 ? (
        <Items
          title={cartItems[cartItems.length - 1].bill.billID}
          price={getTotal(cartItems)}
          sold={moment(cartItems[cartItems.length - 1].bill.billDate).format(
            "MM-DD-YYYY"
          )}
        />
      ) : null}
    </div>
  );
};

export default MyBills;
