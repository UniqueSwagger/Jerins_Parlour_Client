import React from "react";
import { Redirect, Route } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const {
    currentUser: { email },
    isAdminLoading,
    admin,
  } = useAuth();
  if (isAdminLoading) {
    return <Loader />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/NotFound",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
