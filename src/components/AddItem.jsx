import React, { useEffect, useState } from "react";
import Items from "../utils/Items";
import { Fab } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../utils/Toast";
import AddItemDialog from "../utils/AddItemDialog";
import { getAllItems } from "../redux/items/itemAction";
import ErrorBox from "../utils/ErrorBox";
import Loading from "../utils/Loading";

const AddItem = () => {
  const dispatch = useDispatch();
  const itemReducer = useSelector((state) => state.addItem);
  const getItemReducer = useSelector((state) => state.getItems);

  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccessAlert(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    if (Object.keys(itemReducer.itemRes).length) {
      setOpenDialog(false);
      setOpenSuccessAlert(true);
    }
    if (itemReducer.itemError !== "") setOpenAlert(true);

    dispatch(getAllItems());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemReducer]);

  return (
    <div className="component" style={{ paddingBottom: "100px" }}>
      <h2 className="heading">Items</h2>

      {getItemReducer.getItemLoading ? (
        <Loading />
      ) : getItemReducer.getItemErr !== "" ? (
        <ErrorBox message={getItemReducer.getItemErr} />
      ) : (
        <>
          {getItemReducer.getItemRes.map((item) => (
            <Items
              key={item._id}
              title={item.name}
              price={item.price}
              sold={`Sold: ${item.sold}`}
            />
          ))}
        </>
      )}

      <AddItemDialog
        openDialog={openDialog}
        handleClose={() => setOpenDialog(false)}
        submitLoading={itemReducer.itemLoading}
      />

      <Toast
        message={itemReducer.itemRes.message}
        onClose={handleSuccessAlertClose}
        open={openSuccessAlert}
        severity="success"
      />

      <Toast
        message={itemReducer.itemError}
        onClose={handleAlertClose}
        open={openAlert}
        severity="error"
      />

      <Fab aria-label="add" className="floating-btn" onClick={handleDialogOpen}>
        <i className="fas fa-plus"></i>
      </Fab>
    </div>
  );
};

export default AddItem;
