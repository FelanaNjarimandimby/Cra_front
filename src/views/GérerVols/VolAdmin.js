import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
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
import { useReactToPrint } from "react-to-print";
import FileDownload from "@mui/icons-material/FileDownload";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import dateFormat from "dateformat";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VolAdmin = () => {
  const navigate = useNavigate("");

  const navigateEscale = () => {
    navigate("/escales");
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
    documentTitle: "Nos vols",
    onAfterPrint: () => alert("Impréssion terminé"),
  });
  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "VolNumero",
      headerName: "Numéro Vol",
      width: 150,
    },
    {
      field: "VolStatut",
      headerName: "Statut vol",
      width: 150,
    },
    {
      field: "VolDateHeureDepart",
      headerName: "Date départ",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      field: "VolDateHeureArrivee",
      headerName: "Date Arrivée",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 150,
    },
    { field: "AvionModele", headerName: "Avion", width: 150 },
    { field: "AeroportNom", headerName: "Aeroport", width: 200 },

    {
      field: "action",
      width: 150,
      headerName: "Action",

      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleDetail(
                params.row.id,
                params.row.VolNumero,
                params.row.VolStatut,
                params.row.VolDateHeureDepart,
                params.row.VolDateHeureArrivee,
                params.row.AvionModele,
                params.row.AeroportCodeIATA,
                params.row.AeroportCodeOACI,
                params.row.AeroportNom,
                params.row.ItineraireDepart,
                params.row.ItineraireArrive
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
                params.row.VolNumero,
                params.row.VolStatut,
                params.row.VolDateHeureDepart,
                params.row.VolDateHeureArrivee,
                params.row.AvionModele,
                params.row.AeroportCodeIATA,
                params.row.AeroportCodeOACI,
                params.row.AeroportNom,
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
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    empty();
  };

  const [openDetail, setOpenDetail] = React.useState(false);
  const handleDetailOpen = () => {
    setOpenDetail(true);
  };
  const handleDetailClose = () => {
    setOpenDetail(false);
  };

  async function ListVols() {
    axios
      .get(variables.API_URL + "volcargo")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }

  //Lister les natures des avions
  async function ListAvions() {
    axios
      .get(variables.API_URL + "avioncargo")
      .then((res) => setAvions(res.data))
      .catch((err) => console.log(err));
  }

  const [itineraireDeparts, setitineraireDeparts] = React.useState([]);
  const [itineraireArrives, setitineraireArrives] = React.useState([]);
  const [ItineraireDepart, setDepart] = React.useState("");
  const [ItineraireArrive, setArrive] = React.useState("");

  const [aeroports, setaeroports] = React.useState([]);
  const [aeroportbyiatas, setaeroportbyiatas] = React.useState([]);
  const [AeroportCodeIATA, setIATA] = React.useState("");
  const [AeroportCodeOACI, setOACI] = React.useState("");
  const [AeroportNom, setNom] = React.useState("");

  React.useEffect(() => {
    (async () => await ListVols())();
    (async () => await ListAvions())();
    (async () => await ListItineraireDeparts())();
    (async () => await ListItineraireArrives(ItineraireDepart))();
    (async () => await ListAeroports())();
    (async () => await ListAeroport(AeroportCodeIATA))();
  }, [ItineraireDepart, AeroportCodeIATA]);

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

  //Lister des aeroports
  async function ListAeroports() {
    axios
      .get(variables.API_URL + "aeroport")
      .then((res) => setaeroports(res.data))
      .catch((err) => console.log(err));
  }

  async function ListAeroport(codeiata) {
    try {
      const response = await fetch(
        variables.API_URL + "aeroport/aeroport/" + codeiata
      );
      const content = await response.json();
      setOACI(content.AeroportCodeOACI);
      setNom(content.AeroportNom);
    } catch (error) {
      console.log(error);
    }
  }

  const [avions, setAvions] = React.useState([]);
  const [AvionModele, setAvionModele] = React.useState("");

  const [VolID, setIDVol] = React.useState("");
  const [VolNumero, setNumero] = React.useState("");
  const [VolStatut, setStatut] = React.useState("");
  const [VolDateHeureDepart, setDateDepart] = React.useState(dayjs(new Date()));
  const [VolDateHeureArrivee, setDateArrivee] = React.useState(
    dayjs(new Date())
  );
  const [AvionID, setIDAvion] = React.useState("");
  const [AeroportID, setIDAeroport] = React.useState("");
  const [ItineraireID, setIDItineraire] = React.useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteVol(index) {
    await axios
      .delete(variables.API_URL + "volcargo/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListVols();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addVol(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "volcargo/ajoutvol", {
        VolNumero,
        VolStatut,
        VolDateHeureDepart,
        VolDateHeureArrivee,
        AvionModele,
        AeroportCodeIATA,
        AeroportCodeOACI,
        AeroportNom,
        ItineraireDepart,
        ItineraireArrive,
      });
      handleCloseAdd();
      ListVols();
      empty();
      notify();
    } catch (error) {
      notifyDangerInsert();
    }
  }

  const empty = () => {
    setNumero("");
    setStatut("");
    setDateDepart(dayjs(new Date()));
    setDateArrivee(dayjs(new Date()));
    setIDAvion("");
    setIDAeroport("");
    setIDItineraire("");
    setDepart("");
    setArrive("");
    setAvionModele("");
    setIATA("");
    setOACI("");
    setNom("");
  };

  const [edId, setEdId] = React.useState("");
  const [ednumero, setEdNumero] = React.useState("");
  const [edstatut, setEdStatut] = React.useState("");
  const [eddatedepart, setEdDateDepart] = React.useState(dayjs(new Date()));
  const [eddatearrivee, setEdDateArrivee] = React.useState(dayjs(new Date()));
  const [edavionmodele, setEdAvion] = React.useState("");
  const [ediata, setEdIata] = React.useState("");
  const [edoaci, setEdOaci] = React.useState("");
  const [edaeroportnom, setEdAeroportNom] = React.useState("");
  const [eddepart, setEddepart] = React.useState("");
  const [edarrive, setEdarrive] = React.useState("");
  const toggleEdit = (
    ident,
    m_numero,
    m_statut,
    m_datedepart,
    m_datearrivee,
    m_modele,
    m_iata,
    m_oaci,
    m_nom,
    m_depart,
    m_arrive
  ) => {
    setEdId(ident);
    setEdNumero(m_numero);
    setEdStatut(m_statut);
    setEdDateDepart(m_datedepart);
    setEdDateArrivee(m_datearrivee);
    setEdAvion(m_modele);
    setEdIata(m_iata);
    setEdOaci(m_oaci);
    setEdAeroportNom(m_nom);
    setEddepart(m_depart);
    setEdarrive(m_arrive);
    handleClickOpenEdit();
  };

  const toggleDetail = (
    ident,
    m_numero,
    m_statut,
    m_datedepart,
    m_datearrivee,
    m_modele,
    m_iata,
    m_oaci,
    m_nom,
    m_depart,
    m_arrive
  ) => {
    setEdId(ident);
    setEdNumero(m_numero);
    setEdStatut(m_statut);
    setEdDateDepart(m_datedepart);
    setEdDateArrivee(m_datearrivee);
    setEdAvion(m_modele);
    setEdIata(m_iata);
    setEdOaci(m_oaci);
    setEdAeroportNom(m_nom);
    setEddepart(m_depart);
    setEdarrive(m_arrive);
    handleDetailOpen();
  };
  async function EditVol(x_id) {
    await axios
      .put(variables.API_URL + "volcargo/modifier/" + x_id, {
        id: edId,
        VolNumero: ednumero,
        VolStatut: edstatut,
        VolDateHeureDepart: eddatedepart,
        VolDateHeureArrivee: eddatearrivee,
        AvionModele: edavionmodele,
        AeroportCodeIATA: ediata,
        AeroportCodeOACI: edoaci,
        AeroportNom: edaeroportnom,
        ItineraireDepart: eddepart,
        ItineraireArrive: edarrive,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListVols();
        empty();
      })
      .catch((error) => {
        notifyDanger();
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
          <Grid xs={2} item marginTop={0}>
            <Button
              onClick={handleClickOpenAdd}
              variant="outlined"
              startIcon={<AddIcon />}
              size="small"
            >
              Ajouter
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
          onClick={navigateEscale}
        >
          Les escales
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
                Modification du vol
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
                    label="Numero vol"
                    variant="outlined"
                    size="small"
                    value={ednumero}
                    onChange={(e) => {
                      setEdNumero(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Statut"
                    variant="outlined"
                    size="small"
                    sx={{ marginTop: 1.5 }}
                    value={edstatut}
                    onChange={(e) => {
                      setEdStatut(e.target.value);
                    }}
                  />
                  <div style={{ display: "flex", gap: "3px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          label="Date de départ"
                          format="DD/MM/YYYY"
                          value={dayjs(eddatedepart)}
                          onChange={(date) => setEdDateDepart(date)}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: "100%" }} />
                          )}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          label="Date d'arrivée"
                          format="DD/MM/YYYY"
                          value={dayjs(eddatearrivee)}
                          onChange={(date) => setEdDateArrivee(date)}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: "100%" }} />
                          )}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel id="demo-simple-select-label">Avion</InputLabel>
                    <Select
                      defaultValue={edavionmodele}
                      labelId="demo-simple-select-label"
                      id="edavionmodele"
                      value={edavionmodele}
                      label="Avion "
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
                        setEdAvion(event.target.value);
                      }}
                    >
                      {avions.map((avion, index) => (
                        <MenuItem key={index} value={avion.AvionModele}>
                          {avion.AvionModele}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel id="demo-simple-select-label">
                      Départ
                    </InputLabel>
                    <Select
                      defaultValue={eddepart}
                      labelId="demo-simple-select-label"
                      id="eddepart"
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
                        setEddepart(event.target.value);
                      }}
                    >
                      {itineraireDeparts.map((itineraireD, index) => (
                        <MenuItem key={index} value={itineraireD}>
                          {itineraireD}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: 1.5 }}>
                    <InputLabel id="demo-simple-select-label">
                      Destination
                    </InputLabel>
                    <Select
                      defaultValue={edarrive}
                      labelId="demo-simple-select-label"
                      id="edarrive"
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
                        setEdarrive(event.target.value);
                      }}
                    >
                      {itineraireArrives.map((itineraireA, index) => (
                        <MenuItem
                          key={index}
                          value={itineraireA.ItineraireArrive}
                        >
                          {itineraireA.ItineraireArrive}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel id="demo-simple-select-label">
                      Aeroport Code IATA
                    </InputLabel>
                    <Select
                      defaultValue={ediata}
                      labelId="demo-simple-select-label"
                      id="ediata"
                      value={ediata}
                      label="Aeroport Code IATA "
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
                        setEdIata(event.target.value);
                      }}
                    >
                      {aeroports.map((aeroport, index) => (
                        <MenuItem key={index} value={aeroport.AeroportCodeIATA}>
                          {aeroport.AeroportCodeIATA}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    defaultValue={edoaci}
                    id="outlined-basic"
                    placeholder="Code OACI"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={edoaci}
                  />
                  <TextField
                    defaultValue={edaeroportnom}
                    id="outlined-basic"
                    placeholder="Aeroport"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={edaeroportnom}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditVol(edId);
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
                Ajout d'un vol
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
                    required
                    id="outlined-basic"
                    label="Numero"
                    value={VolNumero}
                    onChange={(e) => {
                      setNumero(e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Statut"
                    value={VolStatut}
                    onChange={(e) => {
                      setStatut(e.target.value);
                    }}
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                  />
                  <div style={{ display: "flex", gap: "3px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          label="Date de départ"
                          format="DD/MM/YYYY"
                          value={dayjs(VolDateHeureDepart)}
                          onChange={(date) => setDateDepart(date)}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: "100%" }} />
                          )}
                          sx={{ marginTop: 1.5 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          label="Date d'arrivée"
                          format="DD/MM/YYYY"
                          value={dayjs(VolDateHeureArrivee)}
                          onChange={(date) => setDateArrivee(date)}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: "100%" }} />
                          )}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel id="demo-simple-select-label">Avion</InputLabel>
                    <Select
                      defaultValue={AvionModele}
                      labelId="demo-simple-select-label"
                      id="avionModele"
                      value={AvionModele}
                      label="Avion "
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
                        setAvionModele(event.target.value);
                      }}
                    >
                      {avions.map((avion, index) => (
                        <MenuItem key={index} value={avion.AvionModele}>
                          {avion.AvionModele}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      {itineraireDeparts.map((itineraireD, index) => (
                        <MenuItem key={index} value={itineraireD}>
                          {itineraireD}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      {itineraireArrives.map((itineraireA, index) => (
                        <MenuItem
                          key={index}
                          value={itineraireA.ItineraireArrive}
                        >
                          {itineraireA.ItineraireArrive}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: 1 }}>
                    <InputLabel id="demo-simple-select-label">
                      Aeroport Code IATA
                    </InputLabel>
                    <Select
                      defaultValue={AeroportCodeIATA}
                      labelId="demo-simple-select-label"
                      id="AeroportCodeIATA"
                      value={AeroportCodeIATA}
                      label="Aeroport Code IATA "
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
                        setIATA(event.target.value);
                      }}
                    >
                      {aeroports.map((aeroport, index) => (
                        <MenuItem key={index} value={aeroport.AeroportCodeIATA}>
                          {aeroport.AeroportCodeIATA}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    defaultValue={AeroportCodeOACI}
                    id="outlined-basic"
                    placeholder="AeroportCodeOACI"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={AeroportCodeOACI}
                  />
                  <TextField
                    defaultValue={AeroportNom}
                    id="outlined-basic"
                    placeholder="AeroportNom"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={AeroportNom}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={addVol}>
                  Ajouter
                </Button>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
              </DialogActions>
            </BootstrapDialog>

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
                {ednumero
                  ? "Vol numéro : " + " " + ednumero
                  : "Informations sur vol"}
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
                    Statut :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {edstatut}
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
                    Date départ :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {dateFormat(eddatedepart, "dd/mm/yyyy")}
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
                    Date d'arrivée :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {dateFormat(eddatearrivee, "dd/mm/yyyy")}
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
                    Modèle de l'avion :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {edavionmodele}
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
                    Code IATA de l'aéroport :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {ediata}
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
                    Code OACI de l'aéroport :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {edoaci}
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
                    Nom de l'aéroport :
                    <Typography
                      sx={{
                        fontWeight: "200",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#000",
                      }}
                    >
                      {edaeroportnom}
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
                  Voulez vous vraiment supprimer le vol avec l'identifiant{" "}
                  {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteVol(edId);
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

export default VolAdmin;
