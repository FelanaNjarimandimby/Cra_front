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
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { PersonRemove, PersonAdd } from "@mui/icons-material";
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
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
import FileDownload from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import reserve from "../../static/images/reserve.png";

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

const ClientAdmin = () => {
  const notify = () =>
    toast.success("Insertion avec succès!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyDangerInsert = () => {
    toast.error("Veuillez vérifier les informations saisies", {
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
  const notifyDelete = () =>
    toast.success("Suppression avec succès!", {
      position: "bottom-center",
      autoClose: 3000,
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
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyConfirmation = () =>
    toast.success("Réservation enregistrée!", {
      position: "bottom-center",
      autoClose: 3000,
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
    documentTitle: "Nos clients",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "ClientNom", headerName: "Nom", width: 200 },
    { field: "ClientPrenom", headerName: "Prénom", width: 200 },
    { field: "ClientMail", headerName: "Email", width: 250 },
    { field: "ClientAdresse", headerName: "Adresse", width: 180 },
    { field: "ClientContact", headerName: "Contact", width: 120 },

    {
      field: "action",
      width: 180,
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.ClientNom,
                params.row.ClientPrenom,
                params.row.ClientMail,
                params.row.ClientAdresse,
                params.row.ClientContact
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
            <PersonRemove />
          </IconButton>

          <IconButton
            onClick={() => {
              ToggleReservation(params.row.id);
            }}
            type="button"
            className="btn btn-danger"
            color="primary"
            size="small"
          >
            <img src={reserve} />
          </IconButton>
        </>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openEdit, setOpenedit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenedit(true);
  };
  const handleCloseEdit = () => {
    setOpenedit(false);
  };
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [openReserver, setOpenReserver] = useState(false);

  const handleClickOpenReserver = () => {
    setOpenReserver(true);
  };
  const handleCloseReserver = () => {
    setOpenReserver(false);
  };

  async function ListClients() {
    axios
      .get(variables.API_URL + "client")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }

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

  React.useEffect(() => {
    (async () => await ListClients())();
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

  const [ClientNom, setNom] = useState("");
  const [ClientPrenom, setPrenom] = useState("");
  const [ClientMail, setMail] = useState("");
  const [ClientAdresse, setAdresse] = useState("");
  const [ClientContact, setContact] = useState("");
  const [ClientMotPasse, setMdp] = useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteClient(index) {
    await axios
      .delete(variables.API_URL + "client/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListClients();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addClient(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "client", {
        ClientNom,
        ClientPrenom,
        ClientMail,
        ClientAdresse,
        ClientContact,
        ClientMotPasse: "",
      });
      handleCloseAdd();
      ListClients();
      empty();
      notify();
    } catch (error) {
      notifyDangerInsert();
    }
  }

  const empty = () => {
    setNom("");
    setPrenom("");
    setMail("");
    setAdresse("");
    setContact("");
  };

  const [edId, setEdId] = React.useState("");
  const [ednom, setEdNom] = React.useState("");
  const [edprenom, setEdPrenom] = React.useState("");
  const [edemail, setEdMail] = React.useState("");
  const [edadresse, setEdAdresse] = React.useState("");
  const [edcontact, setEdContact] = React.useState("");
  const toggleEdit = (
    ident,
    m_nom,
    m_prenom,
    m_email,
    m_adresse,
    m_contact
  ) => {
    setEdId(ident);
    setEdNom(m_nom);
    setEdPrenom(m_prenom);
    setEdMail(m_email);
    setEdAdresse(m_adresse);
    setEdContact(m_contact);
    handleClickOpenEdit();
  };
  async function EditClient(x_id) {
    await axios
      .put(variables.API_URL + "client/" + x_id, {
        id: edId,
        ClientNom: ednom,
        ClientPrenom: edprenom,
        ClientMail: edemail,
        ClientAdresse: edadresse,
        ClientContact: edcontact,
        ClientMotPasse,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListClients();
        empty();
      })
      .catch((error) => {
        notifyDanger();
        console.log(error);
      });
  }

  //Ajouter une réservation

  const ToggleReservation = (ident) => {
    setIDClient(ident);
    handleClickOpenReserver();
  };

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
            handleCloseReserver();
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
    } catch (error) {
      notifyDanger();
    }
  }

  return (
    <>
      <Grid
        sx={{ py: 3, px: 4, display: "flex", alignItems: "right", gap: "5px" }}
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
        <Grid xs={2} item marginTop={0}>
          <Button
            onClick={handleClickOpenAdd}
            variant="outlined"
            startIcon={<PersonAdd />}
            size="small"
          >
            Nouveau
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

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
              onClose={handleCloseEdit}
              aria-labelledby="customized-dialog-title"
              open={openEdit}
            >
              <DialogTitle
                align="center"
                sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
                color="#fff"
                id="customized-dialog-title"
              >
                Modification du client
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
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Box display="flex" flexDirection="column" width={500}>
                  <TextField
                    id="outlined-basic"
                    label="Nom"
                    variant="outlined"
                    size="small"
                    value={ednom}
                    onChange={(e) => {
                      setEdNom(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Prénom"
                    variant="outlined"
                    size="small"
                    value={edprenom}
                    onChange={(e) => {
                      setEdPrenom(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={edemail}
                    onChange={(e) => {
                      setEdMail(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Adresse"
                    variant="outlined"
                    size="small"
                    value={edadresse}
                    onChange={(e) => {
                      setEdAdresse(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Contact"
                    variant="outlined"
                    size="small"
                    value={edcontact}
                    onChange={(e) => {
                      setEdContact(e.target.value);
                    }}
                  />

                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditClient(edId);
                  }}
                >
                  Valider
                </Button>
                <Button autoFocus onClick={handleCloseEdit}>
                  Annuler
                </Button>
              </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
              onClose={handleCloseAdd}
              aria-labelledby="customized-dialog-title"
              open={openAdd}
            >
              <DialogTitle
                align="center"
                sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
                color="#fff"
                id="customized-dialog-title"
              >
                Ajout d'un client
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseAdd}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Box display="flex" flexDirection="column" width={500}>
                  <TextField
                    id="outlined-basic"
                    label="Nom"
                    value={ClientNom}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Prénom"
                    variant="outlined"
                    size="small"
                    value={ClientPrenom}
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Mail"
                    variant="outlined"
                    size="small"
                    value={ClientMail}
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Adresse"
                    variant="outlined"
                    size="small"
                    value={ClientAdresse}
                    onChange={(e) => {
                      setAdresse(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Contact"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={ClientContact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={addClient}>
                  Ajouter
                </Button>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
              </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
              onClose={handleCloseReserver}
              aria-labelledby="customized-dialog-title"
              open={openReserver}
            >
              <DialogTitle
                align="center"
                sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
                color="#fff"
                id="customized-dialog-title"
              >
                Passer la réservation du client
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseReserver}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
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
                            gap: 5,
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
                              }}
                            >
                              <Box
                                //onSubmit={AddMarchandise}
                                sx={{ mt: 0 }}
                              >
                                <Grid container spacing={1}>
                                  <Grid item xs={12}>
                                    <TextField
                                      sx={{ width: 250 }}
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
                                      sx={{ width: 250 }}
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
                                      sx={{ width: 250 }}
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
                                      sx={{ width: 250 }}
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
                                    <FormControl fullWidth sx={{ width: 250 }}>
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
                            <Box component="form">
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <TextField
                                    sx={{ width: 250 }}
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
                                <Grid item xs={12}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DemoContainer components={["DatePicker"]}>
                                      <DatePicker
                                        sx={{ width: 250 }}
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
                                    sx={{ width: 250 }}
                                    size="small"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="exigence"
                                    label="Exigences spéciales"
                                    id="exigence"
                                    value={ReservationExigences}
                                    onChange={(event) => {
                                      setReservationExigences(
                                        event.target.value
                                      );
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
                                  <FormControl
                                    fullWidth
                                    sx={{ marginTop: 1, width: 250 }}
                                  >
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
                                  <FormControl
                                    fullWidth
                                    sx={{ marginTop: 1.5, width: 250 }}
                                  >
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
                      </Item>
                    </Grid>
                  </Grid>
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={AddReservation}>
                  Réserver
                </Button>
                <Button autoFocus onClick={handleCloseReserver} color="error">
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
                  Voulez vous vraiment supprimer le client avec l'identifiant{" "}
                  {edId} y compris toutes les opérations effectuées par ce
                  dernier?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteClient(edId);
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
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ClientAdmin;
