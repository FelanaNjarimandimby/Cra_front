import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import axios from "axios";
import { variables } from "../../Variables";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { styled } from "@mui/material/styles";
import TopNav from "../../components/TopNav";
import { ToastContainer, toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const style = {
  button: {
    background: "#6D071A",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
};

const notifyDanger = () => {
  toast.error("Une erreur est survenue !", {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const notifyConfirmation = () =>
  toast.success("Votre réservation est enregistrée!", {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const notify = () =>
  toast.info("Veuillez remplir les champs!", {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const ReservationClient = () => {
  const [reservations, setreservations] = useState([]);
  const [natures, setnatures] = useState([]);
  const [itineraireDeparts, setitineraireDeparts] = useState([]);
  const [itineraireArrives, setitineraireArrives] = useState([]);
  const [ItineraireDepart, setDepart] = useState("");
  const [ItineraireArrive, setArrive] = useState("");
  const [ReservationID, setIDReservation] = useState("");
  const [NomDestinataire, setNomDestinataire] = useState("");
  const [DateExpeditionSouhaite, setDateExpeditionSouhaite] = useState(
    dayjs(new Date())
  );
  const [ReservationExigences, setReservationExigences] = useState("");
  const [ReservationEtat, setEtatReservation] = useState("");
  const [ClientID, setIDClient] = useState("");

  const [VolID, setIDVol] = useState("");

  const [id, setIDMarchandise] = useState("");
  const [Designation, setDesignation] = useState("");
  const [MarchandiseNombre, setNombre] = useState("");
  const [MarchandisePoids, setPoids] = useState("");
  const [MarchandiseVolume, setVolume] = useState("");
  const [Nature, setLibelle] = useState("");
  const [Tarif, setTarif] = useState("");

  const [clients, setclients] = useState([]);

  useEffect(() => {
    (async () => await GetCurrentClient())();
    (async () => await ListNatures())();
    (async () => await ListItineraireDeparts())();
    (async () => await ListItineraireArrives(ItineraireDepart))();
  }, [ItineraireDepart]);

  //Récupérer le client
  async function GetCurrentClient() {
    const response = await fetch(variables.API_URL + "client/client", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    setIDClient(content.id);
  }

  //Lister les natures des marchandises
  async function ListNatures() {
    axios
      .get(variables.API_URL + "nature_marchandise")
      .then((res) => setnatures(res.data))
      .catch((err) => console.log(err));
  }

  //Lister des itineraires
  async function ListItineraireDeparts() {
    axios
      .get(variables.API_URL + "itineraire/itineraireDepart")
      .then((res) => setitineraireDeparts(res.data))
      .catch((err) => console.log(err));
  }

  async function ListItineraireArrives(depart) {
    axios
      .get(variables.API_URL + "itineraire/itineraireArrive?depart=" + depart)
      .then((res) => setitineraireArrives(res.data))
      .catch((err) => console.log(err));
  }

  //Ajouter une réservation
  async function AddReservation(event) {
    event.preventDefault();
    try {
      await axios
        .post(variables.API_URL + "Reservation/ClientReservation", {
          Designation,
          NombreColis: MarchandiseNombre,
          Poids: MarchandisePoids,
          Volume: MarchandiseVolume,
          Nature,
          Tarif,
          NomDestinataire,
          DateExpeditionSouhaite,
          ReservationExigences,
          ReservationEtat,
          ItineraireDepart,
          ItineraireArrive,
          ClientID,
          VolID: 0,
        })
        .then((response) => {
          if (response.status === 200) {
            notifyConfirmation();
          } else if (response.status === 422) {
          }
        });

      notifyConfirmation();
      setIDReservation("");
      setNomDestinataire("");
      setDateExpeditionSouhaite(dayjs(new Date()));
      setReservationExigences("");
      setEtatReservation("");
      setIDClient("");
      setIDMarchandise("");
      setIDVol("");
      setDepart("");
      setArrive("");
      setIDMarchandise("");
      setDesignation("");
      setNombre("");
      setPoids("");
      setVolume("");
      setLibelle("");
      GetCurrentClient();
    } catch (error) {
      notifyDanger();
      GetCurrentClient();
    }
  }
  return (
    <>
      <TopNav />
      <Container
        maxWidth="xl"
        sx={{
          px: 1,
          pt: -3,
          py: -4,
          display: "fixed",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#6D071A",
          height: 5,
          borderRadius: {
            xs: "0px 0px 10px 10x",
            md: "0px 0px 20px 20px",
          },
          position: "fixed",
          color: "inherit",
        }}
        disableGutters
        color="inherit"
      ></Container>
      <Container>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "48px",
                color: "#161414",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                py: 4,
              }}
            >
              Réservez maintenant
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Item>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          md: "row",
                        },
                        justifyContent: "center",
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "32px",
                            color: "#5B5B5B",
                            my: 2,
                          }}
                        >
                          <Box
                            //onSubmit={AddMarchandise}
                            sx={{ mt: -10 }}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <TextField
                                  size="small"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="designation"
                                  label="Designation"
                                  id="designation"
                                  value={Designation}
                                  onChange={(event) => {
                                    setDesignation(event.target.value);
                                  }}
                                  autoComplete="designation"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  InputProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  size="small"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="nombre"
                                  label="Nombre de colis"
                                  type="number"
                                  id="nombre"
                                  value={MarchandiseNombre}
                                  onChange={(event) => {
                                    setNombre(event.target.value);
                                  }}
                                  autoComplete="nombre"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  InputProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  size="small"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="poids"
                                  label="Poids(Kg)"
                                  type="number"
                                  id="poids"
                                  value={MarchandisePoids}
                                  onChange={(event) => {
                                    setPoids(event.target.value);
                                  }}
                                  autoComplete="poids"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  InputProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  size="small"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="volume"
                                  label="Volume(dm3)"
                                  type="number"
                                  id="volume"
                                  value={MarchandiseVolume}
                                  onChange={(event) => {
                                    setVolume(event.target.value);
                                  }}
                                  autoComplete="nombre"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  InputProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Libelle
                                  </InputLabel>
                                  <Select
                                    defaultValue={"Nature"}
                                    labelId="demo-simple-select-label"
                                    id="Nature"
                                    value={Nature}
                                    label="Nature marchandise"
                                    size="small"
                                    InputLabelProps={{
                                      style: {
                                        fontSize: 14,
                                      },
                                    }}
                                    InputProps={{
                                      style: {
                                        fontSize: 14,
                                      },
                                    }}
                                    onChange={(event) => {
                                      setLibelle(event.target.value);
                                    }}
                                  >
                                    {natures.map((nature, index) => (
                                      <MenuItem
                                        key={index}
                                        value={nature.NatureMarchandiseLibelle}
                                      >
                                        {nature.NatureMarchandiseLibelle}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, marginTop: -8.9 }}>
                        <Box component="form">
                          <Grid container spacing={1}>
                            <Grid item xs={22}>
                              <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                name="destinataire"
                                label="Nom du destinataire"
                                id="destinatire"
                                value={NomDestinataire}
                                onChange={(event) => {
                                  setNomDestinataire(event.target.value);
                                }}
                                autoComplete="destinataire"
                                InputLabelProps={{
                                  style: {
                                    fontSize: 14,
                                  },
                                }}
                                InputProps={{
                                  style: {
                                    fontSize: 14,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={22}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                  <DatePicker
                                    sx={{ width: 550 }}
                                    size=""
                                    defaultValue={dayjs(new Date())}
                                    label="Date d'expédition souhaitée *"
                                    format="DD/MM/YYYY"
                                    value={dayjs(DateExpeditionSouhaite)}
                                    onChange={(date) =>
                                      setDateExpeditionSouhaite(date)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        sx={{ width: "100%" }}
                                      />
                                    )}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                name="exigence"
                                label="Exigences spéciales"
                                id="exigence"
                                value={ReservationExigences}
                                onChange={(event) => {
                                  setReservationExigences(event.target.value);
                                }}
                                autoComplete="exigence"
                                InputLabelProps={{
                                  style: {
                                    fontSize: 14,
                                  },
                                }}
                                InputProps={{
                                  style: {
                                    fontSize: 14,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth sx={{ marginTop: 1 }}>
                                <InputLabel id="demo-simple-select-label">
                                  Départ
                                </InputLabel>
                                <Select
                                  defaultValue={ItineraireDepart}
                                  labelId="demo-simple-select-label"
                                  id="ItineraireDepart"
                                  value={ItineraireDepart}
                                  label="Départ "
                                  size="small"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  InputProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  onChange={(event) => {
                                    setDepart(event.target.value);
                                  }}
                                >
                                  {itineraireDeparts.map(
                                    (itineraireD, index) => (
                                      <MenuItem key={index} value={itineraireD}>
                                        {itineraireD}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth sx={{ marginTop: 1.5 }}>
                                <InputLabel id="demo-simple-select-label">
                                  Destination
                                </InputLabel>
                                <Select
                                  defaultValue={"ItineraireArrive"}
                                  labelId="demo-simple-select-label"
                                  id="ItineraireID"
                                  value={ItineraireArrive}
                                  label="Destination"
                                  size="small"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  InputProps={{
                                    style: {
                                      fontSize: 14,
                                    },
                                  }}
                                  onChange={(event) => {
                                    setArrive(event.target.value);
                                  }}
                                >
                                  {itineraireArrives.map(
                                    (itineraireA, index) => (
                                      <MenuItem
                                        key={index}
                                        value={itineraireA.ItineraireArrive}
                                      >
                                        {itineraireA.ItineraireArrive}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <div className="form-group">
                            <input
                              hidden
                              type="text"
                              className="form-control"
                              id="MarchandiseID"
                              value={id}
                              onChange={(event) => {
                                setIDMarchandise(event.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              hidden
                              type="text"
                              className="form-control"
                              id="ClientID"
                              value={ClientID}
                              onChange={(event) => {
                                setIDClient(event.target.value);
                              }}
                            />
                          </div>
                        </Box>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        width: {
                          xs: "100%",
                          md: "center",
                        },
                        backgroundColor: "#6D071A",
                        textTransform: "none",
                        p: 1.25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        borderRadius: "12px",
                        fontFamily: "inherit",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#fff",
                        "&.MuiButtonBase-root:hover": {
                          backgroundColor: "#7B61FF",
                        },
                      }}
                      onClick={AddReservation}
                    >
                      Envoyer votre réservation
                      <ChevronRight />
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ReservationClient;
