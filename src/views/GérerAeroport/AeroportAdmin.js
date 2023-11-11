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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
import MiniDrawer from "../../views/MiniDrawer";
import Fab from "@mui/material/Fab";
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

const AeroportAdmin = () => {
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

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Nos aéroports",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "AeroportCodeIATA", headerName: "Code IATA", width: 150 },
    { field: "AeroportCodeOACI", headerName: "Code OACI", width: 150 },
    { field: "AeroportNom", headerName: "Aeroport", width: 150 },
    { field: "AeroportContact", headerName: "Contact", width: 150 },
    { field: "AeroportLocalisation", headerName: "Localisation", width: 150 },
    { field: "CompagnieID", headerName: "Compagnie", width: 150 },

    {
      field: "action",
      width: 80,
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.AeroportCodeIATA,
                params.row.AeroportCodeOACI,
                params.row.AeroportNom,
                params.row.AeroportContact,
                params.row.AeroportLocalisation,
                params.row.CompagnieID
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
                  deleteAeroport(params.row.id);
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

  async function ListAeroports() {
    axios
      .get(variables.API_URL + "aeroport")
      .then((res) => setRows(res.data))
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListAeroports())();
  }, []);

  const [AeroportCodeIATA, setIATA] = React.useState("");
  const [AeroportCodeOACI, setOACI] = React.useState("");
  const [AeroportNom, setNom] = React.useState("");
  const [AeroportContact, setContact] = React.useState("");
  const [AeroportLocalisation, setLocalisation] = React.useState("");
  const [CompagnieID, setCompagnie] = React.useState("");

  async function deleteAeroport(index) {
    await axios
      .delete(variables.API_URL + "aeroport/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListAeroports();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addAeroport(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "aeroport", {
        AeroportCodeIATA,
        AeroportCodeOACI,
        AeroportNom,
        AeroportContact,
        AeroportLocalisation,
        CompagnieID,
      });
      handleCloseAdd();
      ListAeroports();
      empty();
      notify();
    } catch (error) {
      notifyDanger();
    }
  }

  const empty = () => {
    setIATA("");
    setOACI("");
    setNom("");
    setContact("");
    setLocalisation("");
    setCompagnie("");
  };

  const [edId, setEdId] = React.useState("");
  const [edIATA, setEdIATA] = React.useState("");
  const [edOACI, setEdOACI] = React.useState("");
  const [ednom, setEdNom] = React.useState("");
  const [edcontact, setEdContact] = React.useState("");
  const [edlocalisation, setEdLocalisation] = React.useState("");
  const toggleEdit = (
    ident,
    m_iata,
    m_oaci,
    m_nom,
    m_contact,
    m_localisation
  ) => {
    setEdId(ident);
    setEdIATA(m_iata);
    setEdOACI(m_oaci);
    setEdNom(m_nom);
    setEdContact(m_contact);
    setEdLocalisation(m_localisation);
    handleClickOpenEdit();
  };
  async function EditAeroport(x_id) {
    await axios
      .put(variables.API_URL + "aeroport/" + x_id, {
        id: edId,
        AeroportCodeIATA: edIATA,
        AeroportCodeOACI: edOACI,
        AeroportNom: ednom,
        AeroportContact: edcontact,
        AeroportLocalisation: edlocalisation,
        CompagnieID: 1,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListAeroports();
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
                Modification
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
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Code IATA"
                    variant="outlined"
                    size="small"
                    value={edIATA}
                    onChange={(e) => {
                      setEdIATA(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Code OACI"
                    variant="outlined"
                    size="small"
                    value={edOACI}
                    onChange={(e) => {
                      setEdOACI(e.target.value);
                    }}
                  />
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
                    label="Contact"
                    variant="outlined"
                    size="small"
                    value={edcontact}
                    onChange={(e) => {
                      setEdContact(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Localisation"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={edlocalisation}
                    onChange={(e) => {
                      setEdLocalisation(e.target.value);
                    }}
                  />

                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditAeroport(edId);
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
                Ajout d'un aéroport
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
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Code IATA"
                    variant="outlined"
                    size="small"
                    value={AeroportCodeIATA}
                    onChange={(e) => {
                      setIATA(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Code OACI"
                    variant="outlined"
                    size="small"
                    value={AeroportCodeOACI}
                    onChange={(e) => {
                      setOACI(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Aeroport"
                    value={AeroportNom}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Contact"
                    variant="outlined"
                    size="small"
                    value={AeroportContact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Localisation"
                    variant="outlined"
                    size="small"
                    value={AeroportLocalisation}
                    onChange={(e) => {
                      setLocalisation(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Compagnie"
                    variant="outlined"
                    size="small"
                    value={CompagnieID}
                    onChange={(e) => {
                      setCompagnie(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
                <Button autoFocus onClick={addAeroport}>
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

export default AeroportAdmin;
