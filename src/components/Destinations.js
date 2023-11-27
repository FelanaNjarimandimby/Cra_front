import React from "react";

import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

import { destinations } from "../data";
import DestinationItem from "./DestinationItem";

const Destinations = () => {
  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        px: {
          xs: 2,
          sm: 5,
          md: 12,
        },
        my: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "26px",
            color: "#161414",
            textAlign: {
              xs: "center",
              md: "left",
            },
          }}
        >
          Envoyez fret vers votre destination
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "space-between",
          alignItems: {
            xs: "center",
            md: "flex-start",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        {destinations.map((item) => (
          <DestinationItem
            key={item.id}
            name={item.name}
            location={item.location}
            image={item.image}
            ratingImage={item.ratingImage}
            route={item.route}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Destinations;
