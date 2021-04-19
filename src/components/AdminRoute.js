import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          if (currentUser.photoURL) {
            return currentUser.photoURL === "true" ? (
              <Component {...props} />
            ) : (
              <Redirect to="/browse" />
            );
          } else {
            return <Redirect to="/browse" />;
          }
        }
      }}
    ></Route>
  );
}
