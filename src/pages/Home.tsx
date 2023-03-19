import { Alert, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const Home = () => {
  console.log("Homeレンダリング");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location: ", location);

  const currentUser = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const goResultPage = () => {
    if (!currentUser) {
      setErrorMessage("ログインしてください");
      return;
    }

    setErrorMessage(null);
    navigate("/game/result");
  };

  const loginAlert = !currentUser && errorMessage && (
    <Alert severity="info">{errorMessage}</Alert>
  );

  return (
    <>
      <h1>マルボロ</h1>
      <Button onClick={goResultPage}>試合結果を入力</Button>
      {loginAlert}
    </>
  );
};
