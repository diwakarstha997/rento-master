import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  path,
  message,
  role,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // if (!auth.getCurrentUser())
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: path, message: message, role: role },
            }}
          />
        );
        // return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
