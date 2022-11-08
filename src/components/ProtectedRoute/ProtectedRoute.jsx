import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged, isUnauthNavigateTo, children }) => {
  if (isLogged === undefined) {
    return null;
  }
  
  return isLogged
    ? children
    : <Navigate to={isUnauthNavigateTo} replace />;
};

export default ProtectedRoute;