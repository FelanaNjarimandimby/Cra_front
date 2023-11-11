import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { variables } from "../../Variables";
import SecondaryButton from "../../components/SecondaryButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import dateFormat from "dateformat";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Check from "@mui/icons-material/Check";
import Visibility from "@mui/icons-material/Visibility";
import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { styled } from "@mui/material/styles";
import TopNav from "../../components/TopNav";
import Edit from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
// TODO remove, this demo shouldn't need to reset the theme.

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const defaultTheme = createTheme();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ListClientReservation = () => {
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
  const notifyEdit = () =>
    toast.success("Modification avec succès!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyConfirmation = () =>
    toast.success("Votre demande est envoyée!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyInfo = () =>
    toast.info("Confirmation de cette réservation est déjà envoyée!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyGet = () =>
    toast.error("Erreur lors de l'execution !", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [openChild, setOpenChild] = React.useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };

  //Dialog
  const [Open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [opentarif, setOpenTarif] = React.useState(false);
  const handleOpenTarif = () => {
    setOpenTarif(true);
  };

  const handleCloseTarif = () => {
    setOpenTarif(false);
  };

  const [reservations, setreservations] = useState([]);
  const [natures, setnatures] = useState([]);
  const [itineraires, setitineraires] = useState([]);
  const [ItineraireDepart, setDepart] = useState("");
  const [ItineraireArrive, setArrive] = useState("");
  const [id, setIDReservation] = useState("");
  const [NomDestinataire, setNomDestinataire] = useState("");
  const [DateExpeditionSouhaite, setDateExpeditionSouhaite] = useState(
    dayjs(new Date())
  );
  const [ReservationExigences, setReservationExigences] = useState("");
  const [ReservationEtat, setEtatReservation] = useState("");
  const [ClientID, setIDClient] = useState("");
  const [ClientNom, setNomClient] = useState("");
  const [VolID, setIDVol] = useState("");

  const [Designation, setDesignation] = useState("");
  const [MarchandiseNombre, setNombre] = useState("");
  const [MarchandisePoids, setPoids] = useState("");
  const [MarchandiseVolume, setVolume] = useState("");
  const [Nature, setLibelle] = useState("");

  const [clients, setclients] = useState([]);

  const [Vue, setVue] = useState("");
  const [IDReservation, setIDRes] = useState("");

  useEffect(() => {
    GetCurrentClient();
    (async () => await ListNatures())();
    (async () => await ListItineraires())();
  }, []);

  //Récupérer le client
  async function GetCurrentClient() {
    const response = await fetch(variables.API_URL + "client/client", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    setIDClient(content.id);

    ListReservationClients(content.id);
  }

  //Lister les natures des réservations par le client
  async function ListReservationClients(x_id) {
    axios
      .get(variables.API_URL + "reservation/client/" + x_id)
      .then((res) => setreservations(res.data))
      .catch((err) => console.log(err));
  }

  //Lister les natures des marchandises
  async function ListNatures() {
    axios
      .get(variables.API_URL + "nature_marchandise")
      .then((res) => setnatures(res.data))
      .catch((err) => console.log(err));
  }

  //Lister les natures des itineraires
  async function ListItineraires() {
    axios
      .get(variables.API_URL + "itineraire")
      .then((res) => setitineraires(res.data))
      .catch((err) => console.log(err));
  }

  //Demander confirmation
  async function Confirmer(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "notification", {
        Vue: "",
        ClientID: ClientID,
        ClientNom: ClientNom,
        ReservationID: IDReservation,
      });
      notifyConfirmation();
      setVue("");
      setIDClient("");
      setNomClient("");
      handleClickClose();
      GetCurrentClient();
    } catch (error) {
      handleClickClose();
      notifyInfo();
    }
  }

  const ToggleNotif = (ident) => {
    setIDRes(ident);
    handleClickOpen();
  };

  const Toggle = (
    ident,
    m_designation,
    m_nombre,
    m_poids,
    m_volume,
    m_nature,
    m_nom,
    m_datesouhaite,
    m_exigence,
    m_depart,
    m_arrive
  ) => {
    setIDReservation(ident);
    setDesignation(m_designation);
    setNombre(m_nombre);
    setPoids(m_poids);
    setVolume(m_volume);
    setLibelle(m_nature);
    setNomDestinataire(m_nom);
    setDateExpeditionSouhaite(m_datesouhaite);
    setReservationExigences(m_exigence);
    setDepart(m_depart);
    setArrive(m_arrive);
    handleOpenChild();
  };

  async function UpdateReservation(x_id) {
    await axios
      .put(variables.API_URL + "reservation/modifier/" + x_id, {
        id: id,
        Designation: Designation,
        NombreColis: MarchandiseNombre,
        Poids: MarchandisePoids,
        Volume: MarchandiseVolume,
        Nature: Nature,
        NomDestinataire: NomDestinataire,
        DateExpeditionSouhaite: DateExpeditionSouhaite,
        ReservationExigences: ReservationExigences,
        Tarif: "",
        ReservationEtat: "Réservé",
        ItineraireDepart: ItineraireDepart,
        ItineraireArrive: ItineraireArrive,
        ClientID: 1,
        VolID: 1,
      })
      .then((reponse) => {
        console.log(x_id);
        notifyEdit();
        handleCloseChild();
        GetCurrentClient();
      })
      .catch((error) => {
        notifyDanger();
        console.log(error);
      });
  }

  const [idMarchandise, setIDmarchandise] = React.useState("");

  async function GetIdMarchandise(designation, nombre, poids, volume, nature) {
    await axios
      .post(variables.API_URL + "Marchandise/getID", {
        MarchandiseDesignation: designation,
        MarchandiseNombre: nombre,
        MarchandisePoids: poids,
        MarchandiseVolume: volume,
        NatureMarchandiseLibelle: nature,
      })
      .then((response) => {
        setIDmarchandise(response.data);
        GetIdTarif(response.data);
      })
      .catch((error) => notifyGet());
  }

  const [tarif, setTarif] = React.useState("");
  async function GetIdTarif(idMarch) {
    await axios
      .get(variables.API_URL + "Marchandise/tarif/" + idMarch)
      .then((response) => setTarif(response.data))
      .catch((error) => notifyGet());
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
          position: "fixed",
          color: "inherit",
        }}
        disableGutters
        color="inherit"
        width="100%"
      ></Container>

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
      <Container>
        <div>
          <Modal
            open={openChild}
            onClose={handleCloseChild}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 600 }}>
              <h3 id="child-modal-title">Modifier votre réservation</h3>
              <p id="child-modal-description"></p>

              <Box component="form" noValidate sx={{ mt: 7 }}>
                <Box display="flex" flexDirection="column" width={500}>
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
                                    hidden
                                    name="ID"
                                    label="ID"
                                    id="id"
                                    value={id}
                                    onChange={(event) => {
                                      setIDReservation(event.target.value);
                                    }}
                                    autoComplete="id"
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
                                    label="Poids"
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
                                    label="Volume"
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
                                      defaultValue={Nature}
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
                                          value={
                                            nature.NatureMarchandiseLibelle
                                          }
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
                        <Box sx={{ flex: 1 }}>
                          <Box
                            component="form"
                            noValidate
                            //onSubmit={postIDMarchandise}
                            sx={{ mt: -6 }}
                          >
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
                              <div>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                      size="small"
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
                              </div>
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
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Départ
                                  </InputLabel>
                                  <Select
                                    defaultValue={"ItineraireDepart"}
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
                                    {itineraires.map((itineraire, index) => (
                                      <MenuItem
                                        key={index}
                                        value={itineraire.ItineraireDepart}
                                      >
                                        {itineraire.ItineraireDepart}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
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
                                    {itineraires.map((itineraire, index) => (
                                      <MenuItem
                                        key={index}
                                        value={itineraire.ItineraireArrive}
                                      >
                                        {itineraire.ItineraireArrive}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>

                  <br />
                </Box>
                <box
                  sx={{
                    ...style,
                    width: 400,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Button onClick={() => UpdateReservation(id)}>Valider</Button>
                  <Button onClick={handleCloseChild}>Ok</Button>
                </box>
              </Box>
            </Box>
          </Modal>

          <div>
            <Dialog
              fullScreen={fullScreen}
              open={Open}
              onClose={handleClickClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Confirmer votre réservation
                  <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="ID"
                    label="ID"
                    id="id"
                    value={IDReservation}
                    onChange={(event) => {
                      setIDRes(event.target.value);
                    }}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={Confirmer}>
                  Continuer
                </Button>
                <Button onClick={handleClickClose} autoFocus>
                  Annuler
                </Button>
              </DialogActions>
            </Dialog>
          </div>

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
              p: 6,
            }}
            marginLeft="2px"
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
                Vos réservations
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <div className="row">
                    <div className="col-12">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Ref</th>
                            <th>Designation</th>
                            <th>Nombre</th>
                            <th>Poids</th>
                            <th>Volume</th>
                            <th>Nature</th>
                            <th>Tarif</th>
                            <th>Destinataire</th>
                            <th>Expédition</th>
                            <th>Exigences</th>
                            <th>Etat</th>
                            <th>Départ</th>
                            <th>Arrivé</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map((reservation, index) => {
                            return (
                              <tr key={index}>
                                <td>{reservation.id}</td>
                                <td>{reservation.Designation}</td>
                                <td>{reservation.NombreColis}</td>
                                <td>{reservation.Poids}</td>
                                <td>{reservation.Volume}</td>
                                <td>{reservation.Nature}</td>
                                <td>{reservation.Tarif}</td>
                                <td>{reservation.NomDestinataire}</td>
                                <td>
                                  {dateFormat(
                                    reservation.DateExpeditionSouhaite,
                                    "dd/mm/yyyy"
                                  )}
                                </td>
                                <td>{reservation.ReservationExigences}</td>
                                <td>{reservation.ReservationEtat}</td>
                                <td>{reservation.ItineraireDepart}</td>
                                <td>{reservation.ItineraireArrive}</td>
                                <td>
                                  <Box display="flex">
                                    <Button
                                      className="btn btn-warning"
                                      //onClick={() => EditReservation(reservation)}
                                      onClick={() => {
                                        Toggle(
                                          reservation.id,
                                          reservation.Designation,
                                          reservation.NombreColis,
                                          reservation.Poids,
                                          reservation.Volume,
                                          reservation.Nature,
                                          reservation.NomDestinataire,
                                          reservation.DateExpeditionSouhaite,
                                          reservation.ReservationExigences,
                                          reservation.ItineraireDepart,
                                          reservation.ItineraireArrive
                                        );
                                      }}
                                    >
                                      <Edit />
                                    </Button>
                                    <IconButton
                                      onClick={() => {
                                        ToggleNotif(reservation.id);
                                      }}
                                      color="success"
                                    >
                                      <Check />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        GetIdMarchandise(
                                          reservation.Designation,
                                          reservation.NombreColis,
                                          reservation.Poids,
                                          reservation.Volume,
                                          reservation.Nature
                                        );
                                        handleOpenTarif();
                                      }}
                                    >
                                      <Visibility />
                                    </IconButton>
                                  </Box>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Grid>
              </Box>
            </Box>
          </Box>
          <Dialog
            fullScreen={fullScreen}
            open={opentarif}
            onClose={handleCloseTarif}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Voulez vous vraiment supprimer cette information?
              </DialogContentText>
              <Typography> Libellé: {tarif}</Typography>
              <Typography> Poids de taxation:{tarif}</Typography>
              <Typography> Tarifs Assurance:{tarif}</Typography>
              <Typography> Tarifs Annexe:{tarif}</Typography>
              <Typography> tarif par nature: {tarif}</Typography>
              <Typography> tarif total: {tarif}</Typography>
              <Typography variant="h6"> TARIFS</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleCloseTarif();
                }}
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </>
  );
};

export default ListClientReservation;
