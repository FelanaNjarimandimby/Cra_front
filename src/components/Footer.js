import React from "react";

import { Box, Container, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "0%",
      }}
      component="footer"
    >
      <Container maxWidth="sm" position="fixed">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Cargo Revenue Management © "}
          <Link color="inherit"></Link> {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
