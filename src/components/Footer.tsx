import { AppBar, Box, Toolbar } from "@mui/material";
import React, { memo, useCallback } from "react";
import styled from "styled-components";

const styleFooter = {
  position: "fixed",
  bottom: "0",
  width: "100%",
  textAlign: "center",
  backgroundColor: "#1976d2",
  color: "#fff",
};

export const Footer = memo(() => {
  return <Box sx={styleFooter}>Marlbollo</Box>;
});
