import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { navItemsAdmin } from "../../data";
import ProfilAdmin from "./ProfileAdmin";

const NavAdmin2 = () => {
  return (
    <AppBar position="fixed" elevation={0} color="transparent" sx={{ py: 12 }}>
      <Container
        maxWidth="xl"
        sx={{
          px: 1,
          pt: -3,
          py: -2,
          display: "fixed",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#6D071A",
          height: 60,
          borderRadius: {
            xs: "0px 0px 10px 10x",
            md: "0px 0px 20px 20px",
          },
        }}
        disableGutters
      >
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "8px",
          }}
        ></Box>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "54px",
          }}
        >
          {navItemsAdmin.map((navItem) => (
            <Link
              href={navItem.route}
              key={navItem.id}
              underline="none"
              color="#fff"
              sx={{
                fontweight: "300",
                fontSize: "16px",
                opacity: 0.8,
                "&:hover": {
                  opacity: 1,
                },
                "&:first-of-type": {
                  opacity: 1,
                },
              }}
            >
              {navItem.name}
            </Link>
          ))}
        </Box>
        <Box
          color="#000"
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ProfilAdmin />
        </Box>
      </Container>
    </AppBar>
  );
};

export default NavAdmin2;
