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
import { useNavigate } from "react-router-dom";
import FileDownload from "@mui/icons-material/FileDownload";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VenteAdmin = () => {
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
  const notifyInfo = () =>
    toast.info("Récupération de données", {
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
    documentTitle: "Nos ventes",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "VenteDate",
      headerName: "Date de la vente",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "ReservationID",
      width: 200,
      headerName: "Reférence réservation",
    },
    {
      field: "AgentID",
      width: 200,
      headerName: "Agent",
    },

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
                params.row.VenteDate,
                params.row.ReservationID,
                params.row.AgentID
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
                  deleteVente(params.row.id);
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

  async function ListVentes() {
    axios
      .get(variables.API_URL + "vente")
      .then((response) => setRows(response.data))
      .catch((err) => notifyInfo());
  }
  React.useEffect(() => {
    (async () => await ListVentes())();
  }, []);

  const [VenteID, setIDVente] = React.useState("");
  const [VenteDate, setDate] = React.useState(dayjs(new Date()));
  const [ReservationID, setIDReservation] = React.useState("");
  const [AgentID, setIDAgent] = React.useState("");

  async function deleteVente(index) {
    await axios
      .delete(variables.API_URL + "vente/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListVentes();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addVente(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "vente", {
        VenteDate,
        ReservationID,
        AgentID,
      });
      handleCloseAdd();
      ListVentes();
      empty();
      notify();
    } catch (error) {
      alert(error);
    }
  }

  const empty = () => {
    setDate(dayjs(new Date()));
    setIDReservation("");
    setIDAgent("");
  };

  const [edId, setEdId] = React.useState("");
  const [eddate, setEdDate] = React.useState(dayjs(new Date()));
  const toggleEdit = (ident, m_date) => {
    setEdId(ident);
    setEdDate(m_date);
    handleClickOpenEdit();
  };
  async function EditVente(x_id) {
    await axios
      .put(variables.API_URL + "vente/" + x_id, {
        id: edId,
        VenteDate: eddate,
        ReservationID: 1,
        AgentID: 1,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListVentes();
        empty();
      })
      .catch((error) => {
        notifyDanger();
        console.log(error);
      });
  }
  const navigate = useNavigate("");

  const navigatetoLTA = () => {
    navigate("/ltaAdmin");
  };
  return (
    <>
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
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            flex: 1,
          }}
        >
          <Button
            onClick={navigatetoLTA}
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
          >
            Ajouter LTA
          </Button>
        </Grid>
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
                Modification de la vente
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        label="Date de départ"
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
                    EditVente(edId);
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
                Ajout d'une vente
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
                  <div style={{ display: "flex", gap: "3px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          label="Date de départ"
                          format="DD/MM/YYYY"
                          value={dayjs(VenteDate)}
                          onChange={(date) => setDate(date)}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: "100%" }} />
                          )}
                          sx={{ marginTop: 1.5 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>

                  <TextField
                    id="outlined-basic"
                    label="ReservationID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={ReservationID}
                    onChange={(e) => {
                      setIDReservation(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="AgentID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={AgentID}
                    onChange={(e) => {
                      setIDAgent(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
                <Button autoFocus onClick={addVente}>
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

export default VenteAdmin;
