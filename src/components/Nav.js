import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { Box, Drawer, Typography } from "@mui/material";
import girl from "../static/images/girl.jpg";
import Link from "@mui/material/Link";
import { navItems } from "../data";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container
        maxWidth="xl"
        sx={{
          px: 10,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
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
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: {
                  xs: "38px",
                  md: "48px",
                },
                lineHeight: "50px",
                color: "#fff",
              }}
            >
              CRA
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                opacity: "0.5",
              }}
            >
              CARGO Accounting Revenue
            </Typography>
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
              color="#fff"
              sx={{
                fontweight: "300",
                fontSize: "20px",
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
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                opacity: "0.5",
              }}
            >
              Holla,
            </Typography>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
              }}
            >
              Ales Nesetril
            </Typography>
          </Box>

          <Avatar
            alt="user"
            src={girl}
            sx={{ width: 100, height: 100 }}
            style={{ cursor: "pointer" }}
          ></Avatar>
        </Box>
        <MenuIcon
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            cursor: "pointer",
            color: "#fff",
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
              backgroundColor: "#6D071A",
              height: "100%",
              py: 3,
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
            role="presentation"
            onClick={() => setOpenMobileMenu(false)}
            onKeyDown={() => setOpenMobileMenu(false)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#fff",
                    opacity: "0.5",
                  }}
                >
                  Holla,
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#fff",
                  }}
                >
                  Ales Nesetril
                </Typography>
              </Box>
              <Avatar
                alt="user"
                src={girl}
                sx={{ width: 100, height: 100 }}
                style={{ cursor: "pointer" }}
              ></Avatar>
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

export default Nav;
