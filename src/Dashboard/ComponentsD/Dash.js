import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./Header";
import StatBox from "./StatBox";
import StatBox1 from "./StatBox1";
import Sidebar from "../../components/ComponentsAdmin/Sidebar";
import { variables } from "../../Variables";
import axios from "axios";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import { SellOutlined, BookOnline } from "@mui/icons-material";
import ProfilAdmin from "../../components/ComponentsAdmin/ProfileAdmin";
import { ToastContainer, toast } from "react-toastify";

const Dash = () => {
  const [openDetail, setOpenDetail] = React.useState(false);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const notifyGet = () =>
    toast.info("Chargement des données", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const [clients, setClients] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [tarif, setTarif] = useState("");
  const [tarifConfirme, setTarifConfirme] = useState("");
  const [tarifReserve, setTarifReserve] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => await ListClients())();
    (async () => await ListVentes())();
    (async () => await ListReservations())();
    (async () => await GetRecette())();
    (async () => await ListClientConfirmes("Confirmé"))();
    (async () => await GetTarifConfirme())();
    (async () => await GetTarifReserve())();
  }, []);

  async function ListClients() {
    axios
      .get(variables.API_URL + "client")
      .then((res) => setClients(res.data))
      .catch((err) => notifyGet());
  }

  async function ListVentes() {
    axios
      .get(variables.API_URL + "vente")
      .then((res) => setVentes(res.data))
      .catch((err) => notifyGet());
  }

  async function ListReservations() {
    axios
      .get(variables.API_URL + "reservation/reservation")
      .then((res) => setReservations(res.data))
      .catch((err) => notifyGet());
  }

  async function GetRecette() {
    await axios
      .get(variables.API_URL + "Marchandise/total/")
      .then((response) => setTarif(response.data))
      .catch((error) => notifyGet());
  }

  async function GetTarifConfirme() {
    await axios
      .get(variables.API_URL + "Marchandise/totalConfirme/")
      .then((response) => setTarifConfirme(response.data))
      .catch((error) => notifyGet());
  }

  async function GetTarifReserve() {
    await axios
      .get(variables.API_URL + "Marchandise/totalReserve/")
      .then((response) => setTarifReserve(response.data))
      .catch((error) => notifyGet());
  }

  async function ListClientConfirmes(etat) {
    await axios
      .get(variables.API_URL + "client/clientConfirme?etat=" + etat)
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <Box m="20px">
      {/* HEADER */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header
          sx={{
            backgroundColor: colors.redAccent[900],
            color: colors.grey[100],
            fontSize: "14px",
          }}
          title="RECETES COMMERCIALES"
          subtitle="Récapitulation"
        />

        <Box display={"flex"} gap={0.5}>
          <ProfilAdmin />
          <Sidebar
            sx={{
              padding: "5px 10px",
            }}
          />
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor="#6D071A"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={clients.length}
              subtitle="Clients"
              progress="0.75"
              icon={
                <PeopleOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox1
              title={reservations.length}
              subtitle="Réservations"
              progress="0.50"
              icon={<BookOnline sx={{ color: "#6D071A", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor="#6D071A"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={ventes.length}
              subtitle="Ventes"
              progress="0.30"
              icon={
                <SellOutlined
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox1
              onClick={handleOpenDetail}
              title={tarif}
              subtitle="Recettes(Ar)"
              progress="0.80"
              icon={
                <IconButton onClick={handleOpenDetail}>
                  {" "}
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                </IconButton>
              }
            />
          </Box>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color="#6D071A"
                  ></Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <Box
                  backgroundColor={colors.primary[400]}
                  maxHeight="100vh"
                  overflow="auto"
                  m="25px 0 0 0"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    color={colors.grey[100]}
                    p="15px"
                  >
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      Réservations confirmées
                    </Typography>
                  </Box>
                  {rows.map((row, i) => {
                    return (
                      <Box
                        key={`${row}-${i}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
                      >
                        <Box>
                          <Typography
                            variant="h5"
                            fontWeight="600"
                            color={colors.greenAccent[100]}
                          >
                            {row.ClientNom}
                          </Typography>
                          <Typography color={colors.grey[100]}>
                            {row.ClientPrenom}
                          </Typography>
                        </Box>
                        <Box color={colors.grey[100]}>{row.ClientContact}</Box>
                        <Box
                          color={colors.greenAccent[100]}
                          p="5px 10px"
                          borderRadius="4px"
                        >
                          {row.ClientAdresse}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={openDetail} onClose={handleCloseDetail}>
        <DialogTitle>Détails sur les recettes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Recettes des réservation reservées :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {tarifReserve}
              </Typography>
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Recettes des réservation confirmées :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {tarifConfirme}
              </Typography>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDetail}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dash;
