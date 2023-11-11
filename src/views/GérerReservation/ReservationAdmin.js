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
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
import MiniDrawer from "../../views/MiniDrawer";
import dateFormat from "dateformat";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileDownload from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ReservationAdmin = () => {
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
      field: "NomDestinataire",
      headerName: "Destinataire",
    },
    {
      field: "DateExpeditionSouhaite",
      headerName: "Date Souhaitée",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 130,
    },
    { field: "ReservationExigences", headerName: "Exigences", width: 100 },
    { field: "ReservationEtat", headerName: "Etat", width: 120 },
    {
      field: "ReservationDate",
      headerName: "Date",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 120,
    },
    { field: "ClientID", headerName: "ClientID", width: 100 },
    { field: "MarchandiseID", headerName: "MarchandiseID", width: 100 },
    { field: "VolID", headerName: "VolID", width: 100 },
    { field: "ItineraireID", headerName: "ItineraireID", width: 100 },

    {
      field: "action",
      width: 109,
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.NomDestinataire,
                params.row.DateExpeditionSouhaite,
                params.row.ReservationExigences,
                params.row.ReservationEtat,
                params.row.ReservationDate,
                params.row.ClientID,
                params.row.MarchandiseID,
                params.row.VolID,
                params.row.ItineraireID
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
            onClick={handleClickOpen}
            type="button"
            className="btn btn-danger"
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
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
                Voulez vous vraiment supprimer cette information?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  deleteReservation(params.row.id);
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
  };

  async function ListReservations() {
    axios
      .get(variables.API_URL + "reservation/reservation")
      .then((res) => setRows(res.data))
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListReservations())();
  }, []);

  const [ReservationID, setIDReservation] = React.useState("");
  const [NomDestinataire, setNomDestinataire] = React.useState("");
  const [DateExpeditionSouhaite, setDateExpeditionSouhaite] = React.useState(
    dayjs(new Date())
  );
  const [ReservationExigences, setReservationExigences] = React.useState("");
  const [ReservationEtat, setEtatReservation] = React.useState("");
  const [ReservationDate, setDate] = React.useState(dayjs(new Date()));
  const [ClientID, setIDClient] = React.useState("");
  const [MarchandiseID, setIDMarchandise] = React.useState("");
  const [VolID, setIDVol] = React.useState("");
  const [ItineraireID, setIDItineraire] = React.useState("");

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

  async function addReservation(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "reservation", {
        NomDestinataire,
        DateExpeditionSouhaite,
        ReservationExigences,
        ReservationEtat,
        ReservationDate,
        ClientID,
        MarchandiseID,
        VolID,
        ItineraireID,
      });
      handleCloseAdd();
      ListReservations();
      empty();
      notify();
    } catch (error) {
      alert(error);
    }
  }

  const empty = () => {
    setNomDestinataire("");
    setDateExpeditionSouhaite(dayjs(new Date()));
    setReservationExigences("");
    setEtatReservation("");
    setDate(dayjs(new Date()));
    setIDClient("");
    setIDMarchandise("");
    setIDVol("");
    setIDItineraire("");
  };

  const [edId, setEdId] = React.useState("");
  const [ednom, setEdNom] = React.useState("");
  const [eddatesouhaite, setEdDateSouhaite] = React.useState(dayjs(new Date()));
  const [edexigence, setEdExigence] = React.useState("");
  const [edetat, setEdEtat] = React.useState("");
  const [eddate, setEdDate] = React.useState(dayjs(new Date()));
  const toggleEdit = (
    ident,
    m_nom,
    m_datesouhaite,
    m_exigence,
    m_etat,
    m_date
  ) => {
    setEdId(ident);
    setEdNom(m_nom);
    setEdDateSouhaite(m_datesouhaite);
    setEdExigence(m_exigence);
    setEdEtat(m_etat);
    setEdDate(m_date);
    handleClickOpenEdit();
  };
  async function EditReservation(x_id) {
    await axios
      .put(variables.API_URL + "reservation/" + x_id, {
        id: edId,
        NomDestinataire: ednom,
        DateExpeditionSouhaite: eddatesouhaite,
        ReservationExigences: edexigence,
        ReservationEtat: edetat,
        ReservationDate: eddate,
        ClientID: 1,
        MarchandiseID: 1,
        ItineraireID: 1,
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
            startIcon={<AddIcon />}
            size="small"
          >
            Ajouter
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
                sx={{ m: 0, p: 2 }}
                id="customized-dialog-title"
              >
                Modification de la réservation
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
                <Box display="flex" flexDirection="column" width={650}>
                  <TextField
                    id="outlined-basic"
                    label="Destinataire"
                    variant="outlined"
                    size="small"
                    value={ednom}
                    onChange={(e) => {
                      setEdNom(e.target.value);
                    }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        label="Date d'expédition souhaitée"
                        format="DD/MM/YYYY"
                        value={dayjs(eddatesouhaite)}
                        onChange={(date) => setEdDateSouhaite(date)}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ width: "100%" }} />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    id="outlined-basic"
                    label="Exigences"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={edexigence}
                    onChange={(e) => {
                      setEdExigence(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Etat"
                    variant="outlined"
                    size="small"
                    value={edetat}
                    onChange={(e) => {
                      setEdEtat(e.target.value);
                    }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        label="Date réservation"
                        format="DD/MM/YYYY"
                        value={dayjs(eddate)}
                        onChange={(date) => setEdDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ width: "100%" }} />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditReservation(edId);
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
                sx={{ m: 0, p: 2 }}
                id="customized-dialog-title"
              >
                Ajout de réservation
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
                    label="Destinataire"
                    value={NomDestinataire}
                    onChange={(e) => {
                      setNomDestinataire(e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        label="Date d'expédition souhaitée"
                        format="DD/MM/YYYY"
                        value={dayjs(DateExpeditionSouhaite)}
                        onChange={(date) => setDateExpeditionSouhaite(date)}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ width: "100%" }} />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Exigences"
                    variant="outlined"
                    size="small"
                    value={ReservationExigences}
                    onChange={(e) => {
                      setReservationExigences(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Etat"
                    variant="outlined"
                    size="small"
                    value={ReservationEtat}
                    onChange={(e) => {
                      setEtatReservation(e.target.value);
                    }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        label="Date"
                        format="DD/MM/YYYY"
                        value={dayjs(ReservationDate)}
                        onChange={(date) => setDate(date)}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ width: "100%" }} />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    id="outlined-basic"
                    label="ClientID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={ClientID}
                    onChange={(e) => {
                      setIDClient(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="MarchandiseID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={MarchandiseID}
                    onChange={(e) => {
                      setIDMarchandise(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="VolID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={VolID}
                    onChange={(e) => {
                      setIDVol(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="ItineraireID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={ItineraireID}
                    onChange={(e) => {
                      setIDItineraire(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
                <Button autoFocus onClick={addReservation}>
                  Ajouter
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ReservationAdmin;
