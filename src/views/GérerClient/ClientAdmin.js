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
    { field: "ClientContact", headerName: "Contact", width: 150 },

    {
      field: "action",
      width: 90,
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
            onClick={handleClickOpen}
            type="button"
            className="btn btn-danger"
            color="error"
            size="small"
          >
            <PersonRemove />
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
                  deleteClient(params.row.id);
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

  async function ListClients() {
    axios
      .get(variables.API_URL + "client")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListClients())();
  }, []);

  const [ClientNom, setNom] = React.useState("");
  const [ClientPrenom, setPrenom] = React.useState("");
  const [ClientMail, setMail] = React.useState("");
  const [ClientAdresse, setAdresse] = React.useState("");
  const [ClientContact, setContact] = React.useState("");
  const [ClientMotPasse, setMdp] = React.useState("");

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
      notifyDanger();
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
                sx={{ m: 0, p: 2 }}
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
                sx={{ m: 0, p: 2 }}
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
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ClientAdmin;
