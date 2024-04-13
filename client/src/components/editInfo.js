import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FrontAuthContext } from "../Context/Context";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

export default function FormDialog({ open, openState, entireDocument }) {
  const { handleEditUser } = FrontAuthContext();
  console.log("id on edit info = ", entireDocument);
  let { _id, name, age, gender, mobileNumber } = entireDocument;
  const [combinedState, setCombinedState] = useState({
    id: _id,
    name: name,
    age: age,
    gender: gender,
    mobileNumber: mobileNumber,
  });

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  function handleClose() {
    openState(false);
  }
  async function handleEdit() {
    openState(false);
    const { id, name, age, gender, mobileNumber } = combinedState;

    if (name.trim() === "") {
      toast.error("Please enter user name");
      return;
    }

    if (isNaN(age) || age === "") {
      toast.error("Please enter a valid age");
      return;
    }

    if (gender === "") {
      toast.error("Please select gender");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Please enter a valid mobile number of 10 digits");
      return;
    }
    returnResponse(await handleEditUser(id, name, age, gender, mobileNumber));
  }

  function returnResponse(response) {
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Revamp Your Ideas</DialogTitle>
      <DialogContent className="space-y-4">
        <DialogContentText>
          Edit and elevate your existing notes effortlessly in the NoteVault app
        </DialogContentText>
        <TextField
          className="text-black"
          margin="normal"
          required
          fullWidth
          name="name"
          label="User Name"
          id="name"
          type="text"
          value={combinedState.name}
          onChange={onchange}
        />
        <TextField
          className="text-black"
          margin="normal"
          required
          fullWidth
          name="age"
          label="Age"
          id="age"
          type="number"
          value={combinedState.age}
          onChange={onchange}
        />
        {/* Gender Selection */}
        <TextField
          select
          className="text-black"
          margin="normal"
          required
          fullWidth
          name="gender"
          label="Gender"
          id="gender"
          value={combinedState.gender}
          onChange={onchange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          className="text-black"
          margin="normal"
          required
          fullWidth
          name="mobileNumber"
          label="Mobile Number"
          id="mobileNumber"
          type="tel"
          value={combinedState.mobileNumber}
          onChange={onchange}
        />
      </DialogContent>
      <DialogActions className="mb-3">
        <Button sx={{ color: "black" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ color: "black" }} onClick={handleEdit}>
          Edit Note
        </Button>
      </DialogActions>
    </Dialog>
  );
}
