import { useState } from "react";

import Container from "@mui/material/Container";

import avion2 from "../static/images/avion2.jpg";
import Avion4 from "../static/images/Avion4.jpg";
import { Box } from "@mui/system";
import Nav from "./Nav";
import { Typography } from "@mui/material";
import MainButton from "./MainButton";
import SearchNav from "./SearchNav";
import Travel from "./Travel";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import AdsClick from "@mui/icons-material/AdsClick";
import { grey } from "@mui/material/colors";

const Navbar = () => {
  //const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const navigate = useNavigate();

  const navigateReservation = () => {
    navigate("/reservationclient");
  };
  return (
    <Container
      maxWidth="100%"
      disableGutters
      sx={{
        p: {
          xs: 2,
          sm: 5,
          md: 2,
        },
        background: `url(${Avion4}) center center/cover`,
        minHeight: "100px",
        maxHeight: "650px",
        borderRadius: {
          xs: "0px 0px 0px 0px",
          md: "0px 0px 0px 0px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            marginTop: "50.5px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: {
              xs: "25px",
              md: "25px",
            },
            lineHeight: "2px",
            mb: 6,
          }}
        >
          Gestion CARGO d'une compagnie aérienne
        </Typography>

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
          onClick={navigateReservation}
        >
          <AdsClick style={{ cursor: "pointer" }} sx={{ color: grey[100] }} />
          Réservez
        </Button>
        <SearchNav />
      </Box>
    </Container>
  );
};
export default Navbar;
