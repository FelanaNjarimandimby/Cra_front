import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../Variables";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { Box, Drawer, Typography, IconButton } from "@mui/material";
import Link from "@mui/material/Link";
import { navItems } from "../../data";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import logoIsalosys from "../../static/images/logoIsalosys.png";
import ProfilUser from "../ProfilUser";
import ProfilAdmin from "./ProfileAdmin";
import { grey } from "@mui/material/colors";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuParametre from "../../views/Paramètres/MenuParametre";
import styled from "styled-components";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./Sidebar";
import { FlightTakeoffOutlined } from "@mui/icons-material";
import BadgeAdmin from "./BadgeAdmin";

const NavAdmin = () => {
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
    <AppBar position="fixed" elevation={0} color="inherit">
      <Container
        maxWidth="xl"
        width="50px"
        sx={{
          px: 1,
          pt: -3,
          py: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          height: 98,
          backgroundColor: grey,
        }}
        disableGutters
      >
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },

            gap: "8px",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <Box>
            <Avatar
              alt="logoIsalosys"
              src={logoIsalosys}
              sx={{ width: 200, height: 70, m: 4 }}
              variant="square"
            ></Avatar>
          </Box>
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
        ></Box>
        <BadgeAdmin />
        <Sidebar />

        <Drawer
          anchor="left"
          open={openMobileMenu}
          onClose={() => setOpenMobileMenu(false)}
        >
          <Box
            sx={{
              position: "relative",
              width: 250,
              backgroundColor: "#682128",
              height: "100%",
              py: 3,
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
            role="presentation"
            onKeyDown={() => setOpenMobileMenu(false)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ProfilAdmin />
              <Close onClick={() => setOpenMobileMenu(false)} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              {navItems.map((navItem) => (
                <Link
                  href={navItem.route}
                  key={navItem.id}
                  underline="none"
                  color="#fff"
                  sx={{
                    fontweight: "300",
                    fontSize: "16px",
                    opacity: 0.7,
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
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "500",
                cursor: "pointer",
                position: "absolute",
                bottom: "14px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              &#169; CRA
            </Typography>
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
};

export default NavAdmin;
