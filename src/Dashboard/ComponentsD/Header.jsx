import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color="grey"
        fontWeight="bold"
        sx={{ mb: "2px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color="grey">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
