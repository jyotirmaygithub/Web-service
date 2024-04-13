import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./Pages/NotFound";
import FrontPage from "./layout/FrontPage";
import { AuthFunction } from "./Context/front-auth";

function App() {
  return (
    <>
      <AuthFunction>
        <Router>
          <Routes>
            <Route exact path="/" element={<FrontPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <ToastContainer autoClose={2000} transition={Slide} />
      </AuthFunction>
    </>
  );
}

export default App;
