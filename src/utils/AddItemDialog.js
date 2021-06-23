import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/items/itemAction";
import {
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Toast from "./Toast";

const AddItemDialog = ({ openDialog, handleClose, submitLoading }) => {
  const dispatch = useDispatch();

  const [openNameToast, setOpenNameToast] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 1,
  });

  const handleName = (e) => {
    const val = e.target.value;
    setFormData({
      ...formData,
      name: val,
    });
  };

  const handlePrice = (e) => {
    const val = e.target.value;
    if (val < 1) {
      setFormData({
        ...formData,
        price: 1,
      });
      return;
    }
    setFormData({
      ...formData,
      price: val,
    });
  };

  const handleSubmit = () => {
    if (formData.name === "") {
      setOpenNameToast(true);
    } else {
      handleClose();
      setFormData({
        name: "",
        price: 1,
      });
      dispatch(addItem(formData));
    }
  };

  const handleNameToastClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenNameToast(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={(e) => handleName(e)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            value={formData.price}
            fullWidth
            onChange={(e) => handlePrice(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {submitLoading ? <i className="fas fa-spinner fa-spin"></i> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        message="Name cannot be empty"
        onClose={handleNameToastClose}
        open={openNameToast}
        severity="warning"
      />
    </>
  );
};

export default AddItemDialog;
