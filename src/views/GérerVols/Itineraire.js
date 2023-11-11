import React from "react";

import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import NavAdmin from "../../components/ComponentsAdmin/NavAdmin";
import NavAdmin2 from "../../components/ComponentsAdmin/NavAdmin2";
import ItineraireAdmin from "./ItineraireAdmin";
import { Home } from "@mui/icons-material";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

const Itineraire = () => {
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
          py: 7,
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
                  fontSize: "24px",
                  lineHeight: "48px",
                  color: "#161414",
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                <Home sx={{ width: 35, height: 35 }} /> / Gestion des
                itinéraires
              </Typography>
            </Item>
          </Grid>
        </Box>
        <ItineraireAdmin />
      </Container>
    </>
  );
};

export default Itineraire;
