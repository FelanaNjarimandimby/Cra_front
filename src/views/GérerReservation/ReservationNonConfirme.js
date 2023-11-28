import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileDownload from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import dateFormat from "dateformat";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ReservationNonConfirme = () => {
  const navigate = useNavigate("");

  const navigateNotification = () => {
    navigate("/confirmation");
  };

  const notify = () =>
    toast.success("Insertion avec succès!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyDanger = () => {
    toast.error("Une erreur est survenue !", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyDelete = () =>
    toast.success("Suppression avec succès!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyEdit = () =>
    toast.success("Modification avec succès!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Les réservations",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "Designation",
      headerName: "Designation",
      width: 200,
    },
    {
      field: "Nature",
      headerName: "Nature",
      width: 190,
    },
    {
      field: "NomDestinataire",
      headerName: "Destinataire",
      width: 200,
    },
    {
      field: "DateExpeditionSouhaite",
      headerName: "Date Souhaitée",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 130,
    },
    { field: "ItineraireArrive", headerName: "Destination", width: 100 },
    { field: "ClientNom", headerName: "Client", width: 200 },

    {
      field: "action",
      width: 109,
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleDetail(
                params.row.id,
                params.row.Designation,
                params.row.NombreColis,
                params.row.Poids,
                params.row.Volume,
                params.row.Nature,
                params.row.NomDestinataire,
                params.row.DateExpeditionSouhaite,
                params.row.ReservationExigences,
                params.row.ReservationEtat,
                params.row.Tarif,
                params.row.ItineraireDepart,
                params.row.ItineraireArrive,
                params.row.ClientNom,
                params.row.VolNumero
              );
            }}
            type="button"
            size="small"
          >
            <Visibility />
          </IconButton>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.Designation,
                params.row.NombreColis,
                params.row.Poids,
                params.row.Volume,
                params.row.Nature,
                params.row.NomDestinataire,
                params.row.DateExpeditionSouhaite,
                params.row.ReservationExigences,
                params.row.ReservationEtat,
                params.row.ItineraireDepart,
                params.row.ItineraireArrive
              );
            }}
            type="button"
            className="btn btn-danger"
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              toggleDelete(params.row.id);
            }}
            type="button"
            className="btn btn-danger"
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openEdit, setOpenedit] = React.useState(false);

  const handleClickOpenEdit = () => {
    setOpenedit(true);
  };
  const handleCloseEdit = () => {
    setOpenedit(false);
  };

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleDetailOpen = () => {
    setOpenDetail(true);
  };
  const handleDetailClose = () => {
    setOpenDetail(false);
  };

  const [clients, setclients] = useState([]);
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

  async function ListReservations() {
    axios
      .get(variables.API_URL + "reservation/reservationNonConfirme")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }

  //Lister les clients
  async function ListClients() {
    axios
      .get(variables.API_URL + "client")
      .then((res) => setclients(res.data))
      .catch((err) => console.log(err));
  }

  //Lister les itineraires
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

  React.useEffect(() => {
    (async () => await ListClients())();
    (async () => await ListReservations())();
    (async () => await ListNatures())();
    (async () => await ListItineraireDeparts())();
    (async () => await ListItineraireArrives(ItineraireDepart))();
  }, [ItineraireDepart]);

  //Lister les natures des marchandises
  async function ListNatures() {
    axios
      .get(variables.API_URL + "nature_marchandise")
      .then((res) => setnatures(res.data))
      .catch((err) => console.log(err));
  }

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteReservation(index) {
    await axios
      .delete(variables.API_URL + "reservation/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListReservations();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  const empty = () => {
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
  };

  const [edId, setEdId] = React.useState("");
  const [eddesignation, setEdDesignation] = React.useState("");
  const [ednombre, setEdNombre] = React.useState("");
  const [edpoids, setEdPoids] = React.useState("");
  const [edvolume, setEdVolume] = React.useState("");
  const [edlibelle, setEdLibelle] = React.useState("");
  const [ednom, setEdNom] = React.useState("");
  const [eddatesouhaite, setEdDateSouhaite] = React.useState(dayjs(new Date()));
  const [edexigence, setEdExigence] = React.useState("");
  const [edetat, setEdEtat] = React.useState("");
  const [eddepart, setEdDepart] = React.useState(dayjs(new Date()));
  const [edarrive, setEdArrive] = React.useState(dayjs(new Date()));
  const [edtarif, setEdTarif] = React.useState("");

  const [edclientnom, setEdClientNom] = React.useState("");
  const [edvolnumero, setEdVolNumero] = React.useState("");
  const toggleDetail = (
    ident,
    m_designation,
    m_nombre,
    m_poids,
    m_volume,
    m_nature,
    m_nom,
    m_datesouhaite,
    m_exigence,
    m_etat,
    m_tarif,
    m_depart,
    m_arrive,
    m_client,
    m_vol
  ) => {
    setEdId(ident);
    setEdDesignation(m_designation);
    setEdNombre(m_nombre);
    setEdPoids(m_poids);
    setEdVolume(m_volume);
    setEdLibelle(m_nature);
    setEdNom(m_nom);
    setEdDateSouhaite(m_datesouhaite);
    setEdExigence(m_exigence);
    setEdEtat(m_etat);
    setEdTarif(m_tarif);
    setEdDepart(m_depart);
    setEdArrive(m_arrive);
    setEdClientNom(m_client);
    setEdVolNumero(m_vol);
    handleDetailOpen();
  };

  const toggleEdit = (
    ident,
    m_designation,
    m_nombre,
    m_poids,
    m_volume,
    m_nature,
    m_nom,
    m_datesouhaite,
    m_exigence,
    m_etat,
    m_depart,
    m_arrive
  ) => {
    setEdId(ident);
    setEdDesignation(m_designation);
    setEdNombre(m_nombre);
    setEdPoids(m_poids);
    setEdVolume(m_volume);
    setEdLibelle(m_nature);
    setEdNom(m_nom);
    setEdDateSouhaite(m_datesouhaite);
    setEdExigence(m_exigence);
    setEdEtat(m_etat);
    setEdDepart(m_depart);
    setEdArrive(m_arrive);
    handleClickOpenEdit();
  };
  async function EditReservation(x_id) {
    await axios
      .put(variables.API_URL + "reservation/Confirmer/" + x_id, {
        id: edId,
        Designation: eddesignation,
        NombreColis: ednombre,
        Poids: edpoids,
        Volume: edvolume,
        Nature: edlibelle,
        NomDestinataire: ednom,
        DateExpeditionSouhaite: eddatesouhaite,
        ReservationExigences: edexigence,
        Tarif: "",
        ReservationEtat: edetat,
        ItineraireDepart: eddepart,
        ItineraireArrive: edarrive,
        ClientID: 1,
        VolID: 1,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListReservations();
        empty();
      })
      .catch((error) => {
        notifyDanger();
        console.log(error);
      });
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          gap: 2,
        }}
      >
        <Grid
          sx={{
            py: 3,
            px: 4,
            display: "flex",
            alignItems: "right",
            gap: "5px",
          }}
        >
          <Grid item xs={5} marginTop={0}>
            <Button
              variant="contained"
              size="small"
              startIcon={<FileDownload />}
              onClick={handlePrint}
            >
              Exporter en pdf
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
            backgroundColor: "#F6F4FF",
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
            color: "#5243C2",
            "&.MuiButtonBase-root:hover": {
              backgroundColor: "#F6F4FF",
            },
          }}
          endIcon={<ArrowRight />}
          onClick={navigateNotification}
        >
          Retour
        </Button>
      </Box>

      <div className="App wrapper">
        <Box sx={{ display: "flex", alignItems: "left" }}>
          <Box
            sx={{
              marginTop: 0,
              marginLeft: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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

            <div ref={componentRef}>
              <DataGrid
                rows={rows}
                columns={column}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                componentsProps={{
                  pagination: {
                    labelRowsPerPage: "Lignes par page",
                  },
                }}
              />
            </div>

            <BootstrapDialog
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle
                align="center"
                sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
                color="#fff"
                id="customized-dialog-title"
              >
                Modifier la réservation
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseEdit}
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
                                  name="ID"
                                  label="ID"
                                  id="id"
                                  value={edId}
                                  onChange={(event) => {
                                    setEdId(event.target.value);
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
                                  value={eddesignation}
                                  onChange={(event) => {
                                    setEdDesignation(event.target.value);
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
                                  value={ednombre}
                                  onChange={(event) => {
                                    setEdNombre(event.target.value);
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
                                  value={edpoids}
                                  onChange={(event) => {
                                    setEdPoids(event.target.value);
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
                                  value={edvolume}
                                  onChange={(event) => {
                                    setEdVolume(event.target.value);
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
                                    defaultValue={edlibelle}
                                    labelId="demo-simple-select-label"
                                    id="Nature"
                                    value={edlibelle}
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
                                      setEdLibelle(event.target.value);
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
                                  value={ednom}
                                  onChange={(event) => {
                                    setEdNom(event.target.value);
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
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                      size="small"
                                      defaultValue={dayjs(new Date())}
                                      label="Date d'expédition souhaitée *"
                                      format="DD/MM/YYYY"
                                      value={dayjs(eddatesouhaite)}
                                      onChange={(date) =>
                                        setEdDateSouhaite(date)
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
                                  value={edexigence}
                                  onChange={(event) => {
                                    setEdExigence(event.target.value);
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
                                    defaultValue={"eddepart"}
                                    labelId="demo-simple-select-label"
                                    id="ItineraireDepart"
                                    value={eddepart}
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
                                      setEdDepart(event.target.value);
                                    }}
                                  >
                                    {itineraireDeparts.map(
                                      (itineraireD, index) => (
                                        <MenuItem
                                          key={index}
                                          value={itineraireD}
                                        >
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
                                    defaultValue={"edarrive"}
                                    labelId="demo-simple-select-label"
                                    id="ItineraireID"
                                    value={edarrive}
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
                                      setEdArrive(event.target.value);
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
                              <Grid item xs={12}>
                                <FormControl fullWidth sx={{ marginTop: 1.5 }}>
                                  <InputLabel id="demo-simple-select-label">
                                    Etat
                                  </InputLabel>
                                  <Select
                                    defaultValue={"edetat"}
                                    labelId="demo-simple-select-label"
                                    id="edetat"
                                    value={edetat}
                                    label="Etat"
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
                                      setEdEtat(event.target.value);
                                    }}
                                  >
                                    <MenuItem value="Reservé">Reservé</MenuItem>
                                    <MenuItem value="Confirmé">
                                      Confirmé
                                    </MenuItem>
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
                <Button autoFocus onClick={() => EditReservation(edId)}>
                  Valider
                </Button>
                <Button autoFocus onClick={handleCloseEdit} color="error">
                  Annuler
                </Button>
              </DialogActions>
            </BootstrapDialog>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Voulez vous vraiment supprimer la réservation avec
                  l'identifiant {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteReservation(edId);
                  }}
                  autoFocus
                >
                  Supprimer
                </Button>
                <Button autoFocus onClick={handleClose} color="error">
                  Annuler
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
                {edId
                  ? "Détails sur la réservation numéro : " + " " + edId
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
                    Client :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {edclientnom}
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
                      {ednom}
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
                    Désignation :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {eddesignation}
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
                      {ednombre}
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
                      {edpoids}
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
                      {edvolume}
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
                      {edlibelle}
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
                      {dateFormat(eddatesouhaite, "dd/mm/yyyy")}
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
                      {edexigence}
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
                      {edetat}
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
                      {edtarif}
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
                    Vol :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {edvolnumero}
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
                      {eddepart}
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
                      {edarrive}
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
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ReservationNonConfirme;
