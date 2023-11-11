import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

//const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

export default function Lister() {
  const [reservations, setreservations] = useState([]);
  const [MarchandiseNombre, setNombre] = useState("");

  useEffect(() => {
    (async () => await ListReservations())();
  }, []);

  async function ListReservations() {
    axios
      .get(variables.API_URL + "reservation")
      .then((res) => setreservations(res.data))
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 2,
              }}
            >
              {reservations.map((reservation, index) => {
                return <Item key={index}>{reservation.MarchandiseNombre}</Item>;
              })}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
