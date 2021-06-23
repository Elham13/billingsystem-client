import React, { useEffect, useState } from "react";
import Card from "../utils/Card";
import { useSelector } from "react-redux";
import moment from "moment";

const Sales = () => {
  const getItemReducer = useSelector((state) => state.getItems);
  const [cartItems, setCartItems] = useState([]);

  const getTodaysSales = (arr) => {
    const start = moment().subtract(1, "days").format("MM-DD-YYYY");
    let count = 0;
    arr.forEach((item) => {
      const date = moment(item.updatedAt)
        .subtract(1, "days")
        .format("MM-DD-YYYY");
      if (date === start) count += item.sold * item.price;
    });
    return count;
  };

  const getThisMonthsSales = (arr) => {
    const start = moment().subtract(30, "days").format("MM-DD-YYYY");
    let count = 0;
    arr.forEach((item) => {
      const date = moment(item.updatedAt)
        .subtract(30, "days")
        .format("MM-DD-YYYY");
      if (date === start) count += item.sold * item.price;
    });
    return count;
  };

  const getThisYearsSales = (arr) => {
    const start = moment().subtract(365, "days").format("MM-DD-YYYY");
    let count = 0;
    arr.forEach((item) => {
      const date = moment(item.updatedAt)
        .subtract(365, "days")
        .format("MM-DD-YYYY");
      if (date === start) count += item.sold * item.price;
    });
    return count;
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
      <h2 className="heading">Sales</h2>
      <div className="flex-center sales">
        <Card amt={getTodaysSales(cartItems)} date="Today" />
        <Card amt={getThisMonthsSales(cartItems)} date="This month" />
        <Card amt={getThisYearsSales(cartItems)} date="This year" />
      </div>
    </div>
  );
};

export default Sales;
