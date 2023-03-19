import { AppBar, Box, Toolbar } from "@mui/material";
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLogin } from "./ButtonLogin";

export const Header = memo(() => {
  const navigate = useNavigate();

  console.log("Headerレンダリング: ");

  const handleLogin = useCallback((diplayName: String) => {
    console.log(diplayName);
  }, []);

  const handleLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <header>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <div style={{ flexGrow: 1 }}></div>
              <ButtonLogin
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            </Toolbar>
          </AppBar>
        </Box>
      </>
    </header>
  );
});
