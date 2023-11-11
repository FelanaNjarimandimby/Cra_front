import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./Header";
import LineChart from "./LineChart";
import GeographyChart from "./GeographyChart";
import BarChart from "./BarChart";
import StatBox from "./StatBox";
import StatBox1 from "./StatBox1";
import ProgressCircle from "./ProgressCircle";
import Sidebar from "../../components/ComponentsAdmin/Sidebar";
import DashboardAdmin from "../../views/Admin/DashboardAdmin";
import { useState, useEffect } from "react";
import { variables } from "../../Variables";
import axios from "axios";
import ListClientReservation from "../../views/ClientFiles/ListClientReservation";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import { SellOutlined, BookOnline } from "@mui/icons-material";
import ProfilAdmin from "../../components/ComponentsAdmin/ProfileAdmin";

const Dash = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const [clients, setClients] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    (async () => await ListClients())();
    (async () => await ListVentes())();
    (async () => await ListReservations())();
  }, []);

  async function ListClients() {
    axios
      .get(variables.API_URL + "client")
      .then((res) => setClients(res.data))
      .catch((err) => console.log(err));
  }

  async function ListVentes() {
    axios
      .get(variables.API_URL + "vente")
      .then((res) => setVentes(res.data))
      .catch((err) => console.log(err));
  }

  async function ListReservations() {
    axios
      .get(variables.API_URL + "reservation/reservation")
      .then((res) => setReservations(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <Box m="20px">
      {/* HEADER */}

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
          title="TABLEAU DE BORD"
          subtitle="Bienvenue sur la page d'accueil"
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
              increase="+14%"
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
              increase="+21%"
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
              increase="+5%"
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
              title="1,325,134"
              subtitle="Recettes"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
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
                    color={colors.grey[100]}
                  >
                    Recettes commerciales
                  </Typography>
                  <Typography variant="h5" fontWeight="600" color="#6D071A">
                    $58,373,698
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Réservations
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]}>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Vente
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
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
            {mockTransactions.map((transaction, i) => {
              return (
                <Box
                  key={`${transaction}-${i}`}
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
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    color={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dash;
