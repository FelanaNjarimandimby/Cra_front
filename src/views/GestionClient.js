import {
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
import React from "react";
import axios from "axios";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../Variables";
//import url from "../../url";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const GestionClient = () => {
  const notify = () =>
    toast.success("Insertion avec success!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyDanger = () => {
    toast.error("Veuillez remplir tous les champs !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyDelete = () =>
    toast.success("Suppression avec success!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyEdit = () =>
    toast.success("Modification avec success!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "ClientID", headerName: "ID", width: 70 },
    { field: "ClientNom", headerName: "Nom", width: 200, editable: true },
    { field: "ClientPrenom", headerName: "Prénom", width: 70 },
  
    { field: "ClientAdresse", headerName: "Adresse", width: 120 },
    { field: "ClientMail", headerName: "Email", width: 100 },
    { field: "CientContact", headerName: "Contact", width: 100 },
    
    
    
    
    {
      field: "action",
      width: 109,
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.ClientID,
                params.row.ClientNom,
                params.row.ClientPrenom,
                params.row.ClientAdresse,
                params.row.ClientMail,
                params.row.ClientContact,
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
          <IconButton type="button" className="btn btn-danger" size="small">
            <VisibilityIcon />
          </IconButton>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Validation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Voulez vous vraiment supprimer cette information?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="error">
                Annuler
              </Button>
              <Button
                onClick={() => {
                  deleteClient(params.row.ClientID);
                }}
                autoFocus
              >
                Oui
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

  const fet_data = async () => {
    axios.get(variables.API_URL+'client')
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    fet_data();
  }, []);


  const [clients, setclients] = useState([]);
  const [ID, setID] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Mail, setMail] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Contact, setContact] = useState("");

  const deleteClient = (index) => {
    (variables.API_URL)
      .delete("/client/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        fet_data();
      })
      .catch((error) => {
        notifyDanger();
      });
  };
  const addClient = () => {
    (variables.API_URL)
      .post("/client", {
        ClientNom: Nom,
        ClientPrenom: Prenom,
        ClientMail: Mail,
        ClientAdresse: Adresse,
        ClientContact: Contact,
      })
      .then((response) => {
        handleCloseAdd();
        fet_data();
        empty();
        notify();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const empty = () => {
    setNom("");
    setPrenom("");
    setMail("");
    setAdresse("");
    setContact("");
  };

  
  const [edId, setEdId] = React.useState("");
  const [EdNom, setEdNom] = React.useState("");
  const [EdPrenom, setEdPrenom] = React.useState("");
  const [EdMail, setEdMail] = React.useState("");
  const [EdAdresse, setEdAdresse] = React.useState("");
  const [EdContact, setEdContact] = React.useState("");
  const toggleEdit = (
    ident,
    m_nom,
    m_prenom,
    m_mail,
    m_adresse,
    m_contact,
  ) => {
    setEdId(ident);
    setEdNom(m_nom);
    setEdPrenom(m_prenom);
    setEdMail(m_mail);
    setEdAdresse(m_adresse);
    setEdContact(m_contact);
    
    handleClickOpenEdit();
  };

  const EditClient = (
    x_id,
    x_nom,
    x_prenom,
    x_mail,
    x_adresse,
    x_contact
  ) => {
    (variables.API_URL)
      .put("/client/" + x_id, {
        ClientNom: x_nom,
        ClientPrenom: x_prenom,
        ClientMail: x_mail,
        ClientAdresse: x_adresse,
        ClientContact: x_contact,
      })
      .then((reponse) => {
        handleCloseEdit();
        notifyEdit();
        fet_data();
        empty();
      })
      .catch((error) => {
        notifyDanger();
        console.log(error);
      });
  };
  return (
    <div>
      <Box>
        <Typography variant="h5" textAlign="center">
          GESTION DES CLIENTS
        </Typography>
        <Grid container>
          <Grid item xs={2} marginTop={1.5}>
            <Button
              variant="contained"
              size="small"
              startIcon={<InsertDriveFileIcon />}
            >
              Importer fichier
            </Button>
          </Grid>
          <Grid xs={2} item marginTop={1.5}>
            <Button
              onClick={handleClickOpenAdd}
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              size="small"
            >
              Ajouter
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <DataGrid
          rows={rows}
          columns={column}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />

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
            MODIFICATION CLIENT
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
                label="Nom"
                variant="outlined"
                size="small"
                value={EdNom}
                onChange={(e) => {
                  setEdNom(e.target.value);
                }}
              />
              <TextField
                sx={{ marginTop: 1.5 }}
                id="outlined-basic"
                label="Prenom"
                variant="outlined"
                size="small"
                value={EdPrenom}
                onChange={(e) => {
                  setEdPrenom(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Mail"
                variant="outlined"
                sx={{ marginTop: 1.5 }}
                size="small"
                value={EdMail}
                onChange={(e) => {
                  setEdMail(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Adresse"
                variant="outlined"
                sx={{ marginTop: 1.5 }}
                size="small"
                value={EdAdresse}
                onChange={(e) => {
                  setEdAdresse(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Contact"
                variant="outlined"
                sx={{ marginTop: 1.5 }}
                size="small"
                value={EdContact}
                onChange={(e) => {
                  setEdContact(e.target.value);
                }}
              />
              <br />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="error">
              Annuler
            </Button>
            <Button
              autoFocus
              onClick={() => {
                EditClient(
                  edId,
                  EdNom,
                  EdPrenom,
                  EdMail,
                  EdAdresse,
                  EdContact,
                );
              }}
              color="success"
            >
              Valider
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
            AJOUT CLIENT
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
                value={Nom}
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
                value={Prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
              />

              <TextField
                id="outlined-basic"
                label="Adresse"
                variant="outlined"
                sx={{ marginTop: 1.5 }}
                size="small"
                value={Adresse}
                onChange={(e) => {
                  setAdresse(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Contact"
                variant="outlined"
                size="small"
                value={Contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                sx={{ marginTop: 1.5 }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ marginTop: 1.5 }}
                value={Mail}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                size="small"
              />
              <br />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseAdd} color="error">
              Annuler
            </Button>
            <Button
              autoFocus
              onClick={() => {
                addClient();
              }}
              color="success"
            >
              Ajouter
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </div>
  );
};

export default GestionClient;
