import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { logout } from "../../../redux/slices/userProfileSlice";

function ErrorBoundary(props) {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const logoutDispatch = () => dispatch(logout());

  const handleLogout = () => {
    logoutDispatch();
  };

  try {
    if (hasError) {
      // You can customize the error message and UI here
      return (
        <div>
          <h1>Something went wrong!</h1>
          <p>{error.toString()}</p>

          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleLogout}
          >
            reset data
          </Button>
        </div>
      );
    }

    // If no error occurred, render the children
    return props.children;
  } catch (error) {
    // Handle the error and set state accordingly
    console.error(error);
    setHasError(true);
    setError(error);
    return null;
  }
}

export default ErrorBoundary;
