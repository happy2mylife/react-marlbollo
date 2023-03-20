import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

type PropsType = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: String;
};

const BaseButtonWithStyle = styled(Button)({
  marginLeft: "5px",
  "&:hover": {
    cursor: "pointer",
    opacity: "0.5",
  },
});

export const BaseButton = ({ onClick, children }: PropsType) => {
  return (
    <BaseButtonWithStyle variant="outlined" color="inherit" onClick={onClick}>
      {children}
    </BaseButtonWithStyle>
  );
};
