import { TextField } from "@mui/material";
import { useState } from "react";

export const EditableCell = (props: any) => {
  const { value, onUpdate } = props;
  const [text, setText] = useState(value);

  const [editable, setEditable] = useState(false);
  const onClickCell = (e: any) => {
    console.log("onClickCell");
    if (editable) {
      // e.preventDefault();
      return;
    }
    setEditable(!editable);
  };

  const onUpdateText = () => {
    onUpdate(text);
  };

  const inputeDone = () => {
    setEditable(false);
    onUpdateText();
  };

  return (
    <>
      {editable ? (
        <TextField
          autoFocus
          value={text}
          onBlur={inputeDone}
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setText(e.currentTarget.value);
          }}
          variant="filled"
        ></TextField>
      ) : (
        <div
          onClick={(e) => {
            onClickCell(e);
          }}
        >
          {text || "-"}
        </div>
      )}
    </>
  );
};
