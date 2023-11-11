import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../Variables";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { Box, Drawer, Typography, IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import { navItemsAdmin } from "../../data";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import logoIsalosys from "../../static/images/logoIsalosys.png";
import ProfilUser from "../ProfilUser";
import ClientProfile from "../../views/ClientFiles/ClientProfile";
import { grey } from "@mui/material/colors";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuParametre from "../../views/Paramètres/MenuParametre";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ProfilAdmin from "./ProfileAdmin";

const NavAdmin2 = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function Deconnecter(event) {
    event.preventDefault();

    await fetch(variables.API_URL + "client/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setRedirect(true);
  }

  if (redirect) {
    return navigate("/");
  }

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
