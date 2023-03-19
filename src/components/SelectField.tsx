import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

type propsType = {
  handleChangeField: (event: SelectChangeEvent) => void;
  selectedValue: number;
  playerIndex: number;
};
export const SelectField = ({
  handleChangeField,
  selectedValue,
  playerIndex,
}: propsType) => {
  const MAX_FIELD_NUM = 9;

  return (
    <FormControl fullWidth>
      <Select
        onChange={handleChangeField}
        value={String(selectedValue)}
        name={String(playerIndex)}
      >
        {Array(MAX_FIELD_NUM)
          .fill(0)
          .map((_, index) => (
            <MenuItem value={String(index + 1)} key={`field-${index + 1}`}>
              {index + 1}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
