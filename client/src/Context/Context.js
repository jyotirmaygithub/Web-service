import React, { useContext, createContext, useEffect, useState } from "react";

const FrontAuth = createContext();

export function AuthFunction(props) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    handleExistingUsers();
  }, []);

  // Route 1 : handling creation of new user.
  async function handleCreateUser(name, age, gender, mobileNumber) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/user/newuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, age, gender, mobileNumber }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      handleExistingUsers();
      return { success: true, message: "user data has been stored!" };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: error.message };
    }
  }

  // Route 2 : handling existing users.
  async function handleExistingUsers() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/user/documents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userDocuments = await response.json();
      setDocuments(userDocuments);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  // Route 3 : To delete a user.
  async function handleDeleteUser(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      handleExistingUsers(); // Assuming this function updates the list of existing users
      return { success: true, message: "Delete Successful" };
    } catch (error) {
      console.error("Error fetching notes:", error);
      return { success: false, message: "Not able to Delete the document!" };
    }
  }

  // Route 4 : To edit exiting suer.
  async function handleEditUser(id, name, age, gender, mobileNumber) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/user/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, age, gender, mobileNumber }),
        }
      );
      handleExistingUsers(); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return { success: true, message: "Edit Successful" };
    } catch (error) {
      console.error("Error fetching notes:", error);
      return { success: false, message: "Edit Unsuccessful" };
    }
  }

  return (
    <FrontAuth.Provider
      value={{
        handleCreateUser,
        handleExistingUsers,
        documents,
        handleDeleteUser,
        handleEditUser,
      }}
    >
      {props.children}
    </FrontAuth.Provider>
  );
}

export function FrontAuthContext() {
  return useContext(FrontAuth);
}
