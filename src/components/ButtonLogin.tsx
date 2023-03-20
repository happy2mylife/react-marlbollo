import { Button } from "@mui/material";
import { User } from "firebase/auth";
import React, { memo, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FirebaseService } from "../services/FirebaseService";
import { BaseButton } from "./atoms/button/BaseButton";

export const ButtonLogin = memo(({ handleLogin, handleLogout }: any) => {
  const currentUser = useContext<User | null>(AuthContext);
  console.log("ButtonLoginレンダリング: ", currentUser);

  const onClickLogin = async () => {
    console.log("ログイン処理 FirebaseService.login");
    const diplayName = await FirebaseService.login();
    handleLogin(diplayName);
  };

  const onClickLogout = async () => {
    console.log("ログアウト処理 FirebaseService.logout");
    await FirebaseService.logout();
    handleLogout();
  };

  return (
    <>
      {currentUser === null ? (
        <Button variant="outlined" color="inherit" onClick={onClickLogin}>
          ログイン
        </Button>
      ) : (
        <>
          {currentUser.displayName}さん
          <BaseButton onClick={onClickLogout}>ログアウト</BaseButton>
        </>
      )}
    </>
  );
});
