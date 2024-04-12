import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFoundPage from "./Pages/NotFound";
import FrontPage from "./Pages/FrontPage";
import { TokenStatusFunction } from "./Context/tokenStatus";
import { AuthFunction } from "./Context/front-auth"

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_AUTH_CLIENT_ID}>
        <TokenStatusFunction>
          <AuthFunction>
            <Router>
              <Routes>
              <Route exact path="/" element={<FrontPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
            <ToastContainer autoClose={2000} transition={Slide} />
          </AuthFunction>
        </TokenStatusFunction>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
