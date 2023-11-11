import React from "react";

import { Box, Container } from "@mui/material";

import { searchNavItems } from "../data";
import MainButton from "./MainButton";
import SearchNavItem from "./SearchNavItem";

const SearchNav = () => {
  return (
    <Container
      sx={{
        mt: 15,
        padding: "0 30px 0 30px",
        maxWidth: {
          xs: "400px",
          md: "1200px",
        },
      }}
      disableGutters
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderRadius: "12px",
          p: {
            xs: 2,
            md: 1,
          },
          md: {
            xs: 2,
            md: 0,
          },
        }}
      >
        {searchNavItems.map((item) => (
          <SearchNavItem
            key={item.id}
            normalText={item.normalText}
            boldText={item.boldText}
            iconImg={item.icon}
          />
        ))}
        
      </Box>
    </Container>
  );
};

export default SearchNav;