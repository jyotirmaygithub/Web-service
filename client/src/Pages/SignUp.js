import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyStyledTextField from "../components/myStyledTextField";
import { GoogleLogin } from "@react-oauth/google";
import { FrontAuthContext } from "../Context/front-auth";
import { toast } from 'react-toastify';
import { TextField } from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();
  const { handleCreateUser,handleGoogleLogin } = FrontAuthContext();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        NoteVault {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const defaultTheme = createTheme();
  const [combinedState, setCombinedState] = useState({
    name : "",
    email: "",
    password: "",
  });


 async function handleSubmit(event) {
    event.preventDefault();
    returnResponse( await handleCreateUser(combinedState.name ,combinedState.email, combinedState.password));
  }

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  function returnResponse(response){
    if (response.success) {
      toast.success(response.message)
      navigate('/')
    }
    else{
      toast.error(response.message);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              onChange={onchange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onchange}
              autoFocus
            />
            <TextField
              className="text-black"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onchange}
            />
            <Button
              className="bg-black"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <p>LOG IN</p>
            </Button>
            <div className="mb-4 flex w-full items-center gap-4">
              <div className="h-0 w-1/2 border-[1px]"></div>
              <p className="small -mt-1">or</p>
              <div className="h-0 w-1/2 border-[1px]"></div>
            </div>
            {/* Google login button */}
            <div className="flex h-[50px] justify-center">
              <GoogleLogin
                 onSuccess={async (credentialResponse) => {
                  returnResponse(await handleGoogleLogin(credentialResponse.credential))
                 }}
                onError={() => {
                  console.log("Login Failed");
                }}
                text="continue_with"
                width="350"
              />
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
