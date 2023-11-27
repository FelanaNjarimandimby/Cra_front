import React from "react";
import TopNav from "../components/TopNav";
import Navbar from "../components/Navbar";
import Destinations from "../components/Destinations";
import Footer from "../components/Footer";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <TopNav />
      <Navbar />
      <Destinations />
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "32px",
          lineHeight: "48px",
          color: "#161414",
          mb: 20,
          textAlign: {
            xs: "center",
            md: "left",
          },
        }}
      ></Typography>
      <Footer />
    </>
  );
};
export default Home;
