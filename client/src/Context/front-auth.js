import React, { useContext, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { TokenStatusContext } from "./tokenStatus";
// import { StateContext } from "./States";

const FrontAuth = createContext();

export function AuthFunction(props) {
  const { getAuthToken, checkCookie } = TokenStatusContext();
  // const { setUserDocument } = StateContext();

  useEffect(() => {
    if (checkCookie) {
      handleExistingUserData();
    }
  }, []);

  // function  : To store auth token in the cookie..
  function storeAuthToken(userAuth_Token) {
    // Set the cookie with an expiration time
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set to expire in 7 days
    document.cookie = `auth-token=${
      userAuth_Token.auth_token
    }; expires=${expirationDate.toUTCString()}; path=/`;
  }

  // Route 1 : handling creation of new user.
  async function handleCreateUser(name, email, password) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/newuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userAuth_Token = await response.json();
      if (userAuth_Token.auth_token) {
        console.log("this is the authtoken = " + userAuth_Token);
        storeAuthToken(userAuth_Token);
      }
      return { success: true, message: "Your Account has been created!" };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: error.message };
    }
  }

  // Route 2 : handling existing user.
  async function handleExistingUser(email, password) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/newuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userAuth_Token = await response.json();
      if (userAuth_Token.auth_token) {
        console.log("this is the authtoken = " + userAuth_Token);
        storeAuthToken(userAuth_Token);
      }
      return { success: true, message: "Login successfully" };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: error.message };
    }
  }

  // Route 3 : handling google login.
  async function handleGoogleLogin(credential) {
    const dataObject = jwtDecode(credential);
    console.log("dataobject values = ", dataObject);
    return handleGoogleUser(dataObject.name, dataObject.email);
  }

  // Route 4 : handling google authenticating users.
  async function handleGoogleUser(name, email) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/google-auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userAuth_Token = await response.json();
      if (userAuth_Token.auth_token) {
        console.log("this is the authtoken = " + userAuth_Token);
        storeAuthToken(userAuth_Token);
      }
      return { success: true, message: "Login successfully" };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: error.message };
    }
  }

  // Route 5 : To fetch existing user data.
  async function handleExistingUserData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/user-data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getAuthToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();
      // storing userDocument into the context api state.
      if (userData) {
        // setUserDocument(userData.user_data);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }



  return (
    <FrontAuth.Provider
      value={{
        handleCreateUser,
        handleExistingUser,
        // handleEditProfile,
        handleGoogleLogin,
        handleExistingUserData,
      }}
    >
      {props.children}
    </FrontAuth.Provider>
  );
}

export function FrontAuthContext() {
  return useContext(FrontAuth);
}
