import React from "react";

import { Button } from "@mui/material";
import AdsClick from '@mui/icons-material/AdsClick';
import { grey } from '@mui/material/colors'

const MainButton = ({ text }) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: {
          xs: "50%",
          md: "auto",
        },
        backgroundColor: "#6D071A",
        p: {
          xs: 1.5,
          md: 3,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        borderRadius: "12px",
        fontFamily: "inherit",
        fontSize: "16px",
        fontWeight: "600",
        "&.MuiButtonBase-root:hover": {
          backgroundColor: "#7B61FF",
        },
      }}
    >
    <AdsClick style={{ cursor: "pointer" }}
    sx={{ color: grey[100] }}  />
      {text}
    </Button>
  );
};

export default MainButton;