import { styled, TextField } from "@mui/material";

export const TutopediaTextFieldStandard = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#1976D2",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    // THE SAME BUT WHEN DISABLED
    color: "#0D3B69",
  },

  "& .MuiInputBase-root": {
    color: "#1976D2",
  },

  "& .MuiInput-underline": {
    borderBottom: "1px solid #0D3B69",
    "&.Mui-disabled": {
      borderBottom: "1px solid #0D3B69",
    },
  },

  "& :hover": {
    borderBottom: "1px solid #1976D2",
    "&.Mui-disabled": {
      borderBottom: "1px solid #0D3B69",
      "&.MuiInput-underline::before": {
        borderBottom: "0px solid #0D3B69",
      },
      "&.MuiInput-underline::after": {
        borderBottom: "0px solid #0D3B69",
      },
    },
  },
});
