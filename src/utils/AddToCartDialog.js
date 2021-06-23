import React, { useEffect, useState } from "react";
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Toast from "./Toast";
import { updateItem } from "../redux/cartItems/cartActoins";

const AddToCartDialog = ({ openDialog, handleClose, submitLoading }) => {
  const dispatch = useDispatch();

  const itemsReducer = useSelector((state) => state.getItems);
  const { getItemRes } = itemsReducer;

  const updated = useSelector((state) => state.updated);

  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    qty: 0,
  });

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      item: e.target.value,
    });
  };

  const handleQty = (e) => {
    e.preventDefault();
    const val = e.target.value;
    val < 0
      ? setFormData({
          ...formData,
          qty: 0,
        })
      : setFormData({
          ...formData,
          qty: val,
        });
  };

  const handleSubmit = () => {
    const { item, qty } = formData;

    if (item !== "" && qty > 0) {
      handleClose();
      dispatch(updateItem(item, qty));
    } else {
      setOpenAlert(true);
    }
  };

  const handleAlertClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };
  const handleSuccessAlertClose = (e, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccessAlert(false);
  };

  useEffect(() => {
    if (updated.updateRes !== "") {
      window.location.reload();
      setOpenSuccessAlert(true);
    }
  }, [updated]);
  return (
    <>
      {getItemRes instanceof Array && getItemRes.length > 0 ? (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Select Item</DialogTitle>
          <DialogContent>
            <InputLabel id="demo-simple-select-label">Items</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.item}
              onChange={(e) => handleSelectChange(e)}
            >
              {getItemRes.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              margin="dense"
              id="price"
              label="Quantity"
              type="number"
              value={formData.qty}
              fullWidth
              onChange={(e) => handleQty(e)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {submitLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      <Toast
        message="Please privide values"
        onClose={handleAlertClose}
        open={openAlert}
        severity="warning"
      />
      <Toast
        message={updated.updateRes}
        onClose={handleSuccessAlertClose}
        open={openSuccessAlert}
        severity="success"
      />
    </>
  );
};

export default AddToCartDialog;
