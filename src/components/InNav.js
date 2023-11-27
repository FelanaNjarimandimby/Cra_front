import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { Box, Drawer, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { navItems } from "../data";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import logoIsalosys from "../static/images/logoIsalosys.png";
import ProfilUser from "./ProfilUser";
import { grey } from "@mui/material/colors";

const InNav = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <AppBar position="fixed" elevation={0} color="inherit">
      <Container
        maxWidth="xl"
        sx={{
          px: 1,
          pt: -3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
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
            alignItems: "center",
            gap: "8px",
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
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "54px",
          }}
        >
          {navItems.map((navItem) => (
            <Link
              href={navItem.route}
              key={navItem.id}
              underline="none"
              color="#000"
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
          <ProfilUser />
        </Box>

        <MenuIcon
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            cursor: "pointer",
            color: "#000",
          }}
          onClick={() => setOpenMobileMenu(true)}
        />
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
              color="#fff"
            >
              <ProfilUser color="#fff" />
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

export default InNav;
