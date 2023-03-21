import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { BaseButton } from "../button/BaseButton";

export type YesNoDialogProps = {
  open: boolean;
  title: string;
  positiveLabel: string;
  negativeLabel: string;
};

export enum YesNoResult {
  Yes,
  No,
}

type YesNoDialogPropsType = YesNoDialogProps & {
  handleClose: (e: YesNoResult) => void;
};

export const YesNoDialog = ({
  open,
  handleClose,
  title,
  positiveLabel,
  negativeLabel,
}: YesNoDialogPropsType) => {
  const onCloseYes = (e: any) => {
    handleClose(YesNoResult.Yes);
  };

  const onCloseNo = (e: any) => {
    handleClose(YesNoResult.No);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <BaseButton onClick={onCloseNo}>{negativeLabel}</BaseButton>
        <BaseButton onClick={onCloseYes}>{positiveLabel}</BaseButton>
      </DialogActions>
    </Dialog>
  );
};
