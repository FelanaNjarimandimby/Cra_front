import React from "react";

import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

import { hotelsRestaurants } from "../data";
import HotelRestaurantItem from "./HotelRestaurantItem";
import SecondaryButton from "./SecondaryButton";

const HotelsAndRestaurants = () => {
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
        <SecondaryButton text="Voir plus" />
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
        {hotelsRestaurants.map((item) => (
          <HotelRestaurantItem
            key={item.id}
            name={item.name}
            location={item.location}
            image={item.image}
            ratingImage={item.ratingImage}
          />
        ))}
      </Box>
    </Container>
  );
};

export default HotelsAndRestaurants;
