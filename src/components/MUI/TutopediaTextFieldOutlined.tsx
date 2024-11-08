import { styled, TextField } from "@mui/material";

export const TutopediaTextFieldOutlined = styled(TextField)({
  // THIS IS THE LABEL (ON TOP) OR INSIDE IF NOTHING IS FILLED IN
  "& .MuiInputLabel-root": {
    color: "#1976D2",
    marginTop: "-3px",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    // THE SAME BUT WHEN DISABLED
    color: "#0D3B69",
  },
  // BORDER COLOR OF (UNSELECTED) FIELD
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0D3B69",
  },
  "& .Mui-disabled": {
    "& .MuiOutlinedInput-notchedOutline": {
      // THE SAME BUT WHEN DISABLED
      borderColor: "#0D3B7A",
    },
  },
  // HOVER COLOR OVER THE FIELD
  "& :hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976D2",
    },
  },
  // THE SAME BUT WHEN DISABLED
  "& :hover.Mui-disabled": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0D3B7A",
    },
  },
  // INPUT FIELD TEXT COLOR AND CARET COLOR
  "& .MuiInputBase-input": {
    WebkitTextFillColor: "#1976D2",
    caretColor: "#1976D2",
  },
  // THE SAME BUT WHEN DISABLED
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#0D3B69",
  },
  "& .MuiOutlinedInput-root": {
    height: "48px",
  },
});
