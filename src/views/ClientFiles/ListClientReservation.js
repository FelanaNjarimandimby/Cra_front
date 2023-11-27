import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
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
import { AttachMoney } from "@mui/icons-material";
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
import Avion4 from "../../static/images/Avion4.jpg";
import Close from "@mui/icons-material/Close";

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
  const notifyGetConnection = () =>
    toast.info("Connectez-vous sur votre compte", {
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

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleDetailOpen = () => {
    setOpenDetail(true);
  };
  const handleDetailClose = () => {
    setOpenDetail(false);
  };

  const [action, setAction] = React.useState(5);

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
    (async () => await GetCurrentClient())();
    (async () => await ListNatures())();
    (async () => await ListItineraires())();
  }, []);

  //Récupérer le client
  async function GetCurrentClient() {
    try {
      const response = await fetch(variables.API_URL + "client/client", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setIDClient(content.id);

      ListReservationClients(content.id);
    } catch (error) {
      notifyGetConnection();
    }
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

  const ToggleDetail = (
    ident,
    m_designation,
    m_nombre,
    m_poids,
    m_volume,
    m_nature,
    m_nom,
    m_datesouhaite,
    m_exigence,
    m_tarif,
    m_etat,
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
    setTarif(m_tarif);
    setEtatReservation(m_etat);
    setDepart(m_depart);
    setArrive(m_arrive);
    handleDetailOpen();
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
        ReservationEtat: "Reservé",
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
        GetTarifNature(response.data);
        GetTarif(response.data);
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

  const [tarifnature, setTarifNature] = React.useState("");
  async function GetTarifNature(idMarch) {
    await axios
      .get(variables.API_URL + "Marchandise/tarifNature/" + idMarch)
      .then((response) => setTarifNature(response.data))
      .catch((error) => notifyGet());
  }

  const [TarifLibelle, setTarifLibelle] = React.useState("");
  const [TarifFraisAssurance, setAssurance] = React.useState("");
  const [TarifAnnexe, setAnnexe] = React.useState("");
  async function GetTarif(idMarch) {
    try {
      const response = await fetch(
        variables.API_URL + "TypeTarif/tarif/" + idMarch
      );
      const content = await response.json();
      setTarifLibelle(content.TarifLibelle);
      setAssurance(content.TarifFraisAssurance);
      setAnnexe(content.TarifAnnexe);
    } catch (error) {
      notifyGet();
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
      <Container sx={{ backgroundImage: `url(${Avion4}) ` }}>
        <div>
          <BootstrapDialog
            open={openChild}
            onClose={handleCloseChild}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle
              align="center"
              sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
              color="#fff"
              id="customized-dialog-title"
            >
              Modifier votre réservation
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseChild}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column">
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
                                label="Poids(en Kg)"
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
                                label="Volume(en dm3)"
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
                        <Box sx={{ flex: 1 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                name="destinataire"
                                label="Nom du destinataire"
                                id="destinatire"
                                sx={{ marginTop: 3 }}
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
                            <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    </Item>
                  </Grid>
                </Grid>
                <br />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => UpdateReservation(id)}>
                Valider
              </Button>
              <Button autoFocus onClick={handleCloseChild} color="error">
                Annuler
              </Button>
            </DialogActions>
          </BootstrapDialog>

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
                  Cliquer sur continuer pour confirmer la réservation Numéro :{" "}
                  {IDReservation}.
                  <TextField
                    hidden
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="ID"
                    label="ID"
                    id="id"
                    value={IDReservation}
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

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "48px",
                color: "#fff",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                py: 4,
              }}
            >
              Vos réservations
            </Typography>

            <Card sx={{ width: "100%" }}>
              <CardActionArea>
                <CardMedia />

                <CardContent>
                  <Box sx={{ width: "100%", marginLeft: 5 }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <div className="row">
                        <div className="col-12">
                          <table
                            className="table table-borderless"
                            width="100%"
                          >
                            <thead>
                              <tr>
                                <th>Ref</th>
                                <th>Designation</th>
                                <th>Nature</th>
                                <th>Destinataire</th>
                                <th>Expédition</th>
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
                                    <td>{reservation.Nature}</td>
                                    <td>{reservation.NomDestinataire}</td>
                                    <td>
                                      {dateFormat(
                                        reservation.DateExpeditionSouhaite,
                                        "dd/mm/yyyy"
                                      )}
                                    </td>
                                    <td>{reservation.ItineraireDepart}</td>
                                    <td>{reservation.ItineraireArrive}</td>
                                    <td>
                                      <Box display="flex">
                                        <FormControl
                                          sx={{ m: 1, minWidth: 120 }}
                                        >
                                          <Select
                                            size="small"
                                            displayEmpty
                                            value={action}
                                            onChange={(event) =>
                                              setAction(event.target.value)
                                            }
                                          >
                                            <MenuItem value={5}>
                                              Choisir ...
                                            </MenuItem>
                                            <MenuItem value={10}>
                                              <Typography
                                                onClick={() => {
                                                  ToggleDetail(
                                                    reservation.id,
                                                    reservation.Designation,
                                                    reservation.NombreColis,
                                                    reservation.Poids,
                                                    reservation.Volume,
                                                    reservation.Nature,
                                                    reservation.NomDestinataire,
                                                    reservation.DateExpeditionSouhaite,
                                                    reservation.ReservationExigences,
                                                    reservation.Tarif,
                                                    reservation.ReservationEtat,
                                                    reservation.ItineraireDepart,
                                                    reservation.ItineraireArrive
                                                  );
                                                }}
                                                color="info"
                                              >
                                                Détails
                                              </Typography>
                                            </MenuItem>
                                            <MenuItem value={20}>
                                              <Typography
                                                color="warning"
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
                                                Modifier
                                              </Typography>
                                            </MenuItem>
                                            <MenuItem value={30}>
                                              <Typography
                                                onClick={() => {
                                                  ToggleNotif(reservation.id);
                                                }}
                                                color="success"
                                              >
                                                Confirmer
                                              </Typography>
                                            </MenuItem>
                                            <MenuItem value={40}>
                                              <Typography
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
                                                Tarif
                                              </Typography>
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
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
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>

          <Dialog
            fullScreen={fullScreen}
            open={opentarif}
            onClose={handleCloseTarif}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" variant="h6">
              {"Tarif"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography> Libellé: {TarifLibelle}</Typography>
                <Typography>
                  {" "}
                  Tarifs Assurance:{TarifFraisAssurance} Ar
                </Typography>
                <Typography> Tarifs Annexe:{TarifAnnexe} Ar</Typography>
                <Typography> tarif par nature: {tarifnature} Ar</Typography>
                <br />
                <Typography variant="h6"> Tarif Total: {tarif} Ar</Typography>
              </DialogContentText>
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
          <Dialog
            open={openDetail}
            onClose={handleDetailClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                margin: "auto",
              }}
            >
              {id
                ? "Détails sur la réservation numéro : " + " " + id
                : "Informations sur réservation ..."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p id="parent-modal-description"></p>
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
                  Désignation :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {Designation}
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
                  Nombre de Colis :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {MarchandiseNombre}
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
                  Poids(en Kg) :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {MarchandisePoids}
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
                  Volume(en m3) :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {MarchandiseVolume}
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
                  Nature de la marchandise :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {Nature}
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
                  Destinataire :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {NomDestinataire}
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
                  Date expédition :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {dateFormat(DateExpeditionSouhaite, "dd/mm/yyyy")}
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
                  Exigences spéciales :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {ReservationExigences}
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
                  Etat de la réservation :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {ReservationEtat}
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
                  Type de tarif :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {tarif}
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
                  Départ :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {ItineraireDepart}
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
                  Destination :
                  <Typography
                    sx={{
                      fontWeight: "200",
                      fontSize: "14px",
                      lineHeight: "21px",
                      color: "#000",
                    }}
                  >
                    {ItineraireArrive}
                  </Typography>
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDetailClose} autoFocus>
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
