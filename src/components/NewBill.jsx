import React, { useEffect, useState } from "react";
import Badge from "@material-ui/core/Badge";
import AddToCartDialog from "../utils/AddToCartDialog";
import { useSelector } from "react-redux";
import Items from "../utils/Items";

const NewBill = () => {
  const getItemReducer = useSelector((state) => state.getItems);
  const [cartItems, setCartItems] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

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
    <div className="component" style={{ paddingBottom: "100px" }}>
      <div className="row-between">
        <h2 className="heading">New Bill</h2>
        <div className="flex-row">
          <Badge badgeContent={cartItems.length} color="primary">
            <i className="fas fa-shopping-cart"></i>
          </Badge>

          <AddToCartDialog
            openDialog={openDialog}
            handleClose={() => setOpenDialog(false)}
          />

          <button className="addBtn" onClick={handleOpenDialog}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>

      {cartItems.length ? (
        <>
          {cartItems.map((item) => (
            <Items
              key={item._id}
              title={item.name}
              price={item.sold * item.price}
              sold={`Quantity: ${item.sold}`}
            />
          ))}
          <div className="float-bottom row-between">
            <h4>Total amount &#8377; {getTotal(cartItems)} </h4>
            <h4>Total items: {cartItems.length}</h4>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NewBill;
