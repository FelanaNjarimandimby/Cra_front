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
import { useReactToPrint } from "react-to-print";
import FileDownload from "@mui/icons-material/FileDownload";
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
    { field: "AvionID", headerName: "AvionID", width: 120 },
    { field: "AeroportID", headerName: "AeroportID", width: 120 },
    { field: "ItineraireID", headerName: "ItineraireID", width: 120 },

    {
      field: "action",
      width: 100,
      headerName: "Action",

      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.VolNumero,
                params.row.VolStatut,
                params.row.VolDateHeureDepart,
                params.row.VolDateHeureArrivee,
                params.row.AvionID,
                params.row.AeroportID,
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
                  deleteVol(params.row.id);
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

  async function ListVols() {
    axios
      .get(variables.API_URL + "volcargo")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListVols())();
  }, []);

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
      await axios.post(variables.API_URL + "volcargo", {
        VolNumero,
        VolStatut,
        VolDateHeureDepart,
        VolDateHeureArrivee,
        AvionID,
        AeroportID,
        ItineraireID,
      });
      handleCloseAdd();
      ListVols();
      empty();
      notify();
    } catch (error) {
      alert(error);
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
  };

  const [edId, setEdId] = React.useState("");
  const [ednumero, setEdNumero] = React.useState("");
  const [edstatut, setEdStatut] = React.useState("");
  const [eddatedepart, setEdDateDepart] = React.useState(dayjs(new Date()));
  const [eddatearrivee, setEdDateArrivee] = React.useState(dayjs(new Date()));
  const toggleEdit = (
    ident,
    m_numero,
    m_statut,
    m_datedepart,
    m_datearrivee
  ) => {
    setEdId(ident);
    setEdNumero(m_numero);
    setEdStatut(m_statut);
    setEdDateDepart(m_datedepart);
    setEdDateArrivee(m_datearrivee);
    handleClickOpenEdit();
  };
  async function EditVol(x_id) {
    await axios
      .put(variables.API_URL + "volcargo/" + x_id, {
        id: edId,
        VolNumero: ednumero,
        VolStatut: edstatut,
        VolDateHeureDepart: eddatedepart,
        VolDateHeureArrivee: eddatearrivee,
        AvionID: 1,
        AeroportID: 1,
        ItineraireID: 1,
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
                sx={{ m: 0, p: 2 }}
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
                sx={{ m: 0, p: 2 }}
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
                  <TextField
                    id="outlined-basic"
                    label="AvionID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={AvionID}
                    onChange={(e) => {
                      setIDAvion(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="AeroportID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={AeroportID}
                    onChange={(e) => {
                      setIDAeroport(e.target.value);
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
                <Button autoFocus onClick={addVol}>
                  Ajouter
                </Button>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default VolAdmin;
