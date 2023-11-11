import React from "react";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import NavAdmin from "../../components/ComponentsAdmin/NavAdmin";
import NavAdmin2 from "../../components/ComponentsAdmin/NavAdmin2";
import { Home } from "@mui/icons-material";
import CompagnieAdmin from "./CompagnieAdmin";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

const CompagnieA = () => {
  return (
    <>
      <NavAdmin2 />
      <NavAdmin />

      <Container
        disableGutters
        maxWidth="lg"
        sx={{
          px: {
            xs: 2,
            sm: 5,
            md: 3.5,
          },
          py: 12,
          my: 10,
        }}
      >
        <Box></Box>
        <Box sx={{ width: "100%", py: 2, px: -7 }}>
          <Grid>
            <Item>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "28px",
                  lineHeight: "48px",
                  color: "#161414",
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                <Home sx={{ width: 35, height: 35 }} />/ Informations sur les
                compagnies
              </Typography>
            </Item>
          </Grid>
        </Box>

        <CompagnieAdmin />
      </Container>
    </>
  );
};

export default CompagnieA;
