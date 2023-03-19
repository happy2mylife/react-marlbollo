import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const RequireAuth = ({ component, path }: any) => {
  const currentUser = useContext(AuthContext);
  return (
    <>
      {currentUser ? (
        component
      ) : (
        <Navigate to="/" replace={true} state={{ id: 1, name: "きのこ" }} />
      )}
    </>
  );
};
