import { Button } from "@mui/material";
import React from "react";

type PropsType = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: String;
};

export const BaseButton = ({ onClick, children }: PropsType) => {
  return (
    <Button
      sx={{ ml: "5px" }}
      variant="outlined"
      color="inherit"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
