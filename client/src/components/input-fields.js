import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify'; 
import {FrontAuthContext} from "../Context/front-auth"

export default function BasicTextFields() {
    const {handleCreateUser} =  FrontAuthContext()
  const [combinedState, setCombinedState] = useState({
    name: "",
    age: "",
    gender: "", 
    mobile: "",
  });
  
  function onchange(e) {
    const { name, value } = e.target;
    setCombinedState({ ...combinedState, [name]: value });
  }

 async function handleSubmit(event) {
    event.preventDefault();
  
    // Validate each field and display toast message
    const { name, age, gender, mobile } = combinedState;
  
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
  
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid mobile number");
      return;
    }
  
    // If all fields are valid, proceed with form submission
    console.log("Form submitted:", combinedState);
    returnResponse(await handleCreateUser(name, age, gender, mobile));
  }

  function returnResponse(response){
    if (response.success) {
      toast.success(response.message)
    }
    else{
      toast.error(response.message);
    }
  }
  
  return (
    <Box
     className="w-[300px]"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
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
        name="mobile"
        label="Mobile Number"
        id="mobile"
        type="tel"
        value={combinedState.mobile}
        onChange={onchange}
      />
      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  );
}
