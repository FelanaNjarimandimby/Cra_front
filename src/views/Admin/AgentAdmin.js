import { Box, FormControl, Grid, TextField } from "@mui/material";
import React from "react";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
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

const AgentAdmin = () => {
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
    documentTitle: "Nos agents",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "AgentNom", headerName: "Nom", width: 170 },
    { field: "AgentPrenom", headerName: "Prénom", width: 140 },
    { field: "AgentGenre", headerName: "Genre", width: 90 },
    { field: "AgentMail", headerName: "Email", width: 170 },
    { field: "AgentAdresse", headerName: "Adresse", width: 170 },
    { field: "AgentContact", headerName: "Contact", width: 110 },
    { field: "AgentFonction", headerName: "Fonction", width: 170 },

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
                params.row.AgentNom,
                params.row.AgentPrenom,
                params.row.AgentGenre,
                params.row.AgentMail,
                params.row.AgentAdresse,
                params.row.AgentContact,
                params.row.AgentFonction
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

  async function ListAgents() {
    axios
      .get(variables.API_URL + "agent")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListAgents())();
  }, []);

  const [AgentNom, setNom] = React.useState("");
  const [AgentPrenom, setPrenom] = React.useState("");
  const [AgentGenre, setGenre] = React.useState("");
  const [AgentMail, setMail] = React.useState("");
  const [AgentAdresse, setAdresse] = React.useState("");
  const [AgentContact, setContact] = React.useState("");
  const [AgentMotPasse, setMdp] = React.useState("");
  const [AgentFonction, setFonction] = React.useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteAgent(index) {
    await axios
      .delete(variables.API_URL + "agent/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListAgents();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addAgent(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "agent", {
        AgentNom,
        AgentPrenom,
        AgentGenre,
        AgentMail,
        AgentAdresse,
        AgentContact,
        AgentMotPasse: "",
        AgentFonction,
      });
      handleCloseAdd();
      ListAgents();
      empty();
      notify();
    } catch (error) {
      notifyDanger();
    }
  }

  const empty = () => {
    setNom("");
    setPrenom("");
    setGenre("");
    setMail("");
    setAdresse("");
    setContact("");
    setFonction("");
  };

  const [edId, setEdId] = React.useState("");
  const [ednom, setEdNom] = React.useState("");
  const [edprenom, setEdPrenom] = React.useState("");
  const [edgenre, setEdGenre] = React.useState("");
  const [edemail, setEdMail] = React.useState("");
  const [edadresse, setEdAdresse] = React.useState("");
  const [edcontact, setEdContact] = React.useState("");
  const [edfonction, setEdFonction] = React.useState("");
  const toggleEdit = (
    ident,
    m_nom,
    m_prenom,
    m_genre,
    m_email,
    m_adresse,
    m_contact,
    m_fonction
  ) => {
    setEdId(ident);
    setEdNom(m_nom);
    setEdPrenom(m_prenom);
    setEdGenre(m_genre);
    setEdMail(m_email);
    setEdAdresse(m_adresse);
    setEdContact(m_contact);
    setEdFonction(m_fonction);
    handleClickOpenEdit();
  };
  async function EditAgent(x_id) {
    await axios
      .put(variables.API_URL + "agent/" + x_id, {
        id: edId,
        AgentNom: ednom,
        AgentPrenom: edprenom,
        AgentGenre: edgenre,
        AgentMail: edemail,
        AgentAdresse: edadresse,
        AgentContact: edcontact,
        AgentFonction: edfonction,
        AgentMotPasse,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListAgents();
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
                sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
                color="#fff"
                id="customized-dialog-title"
              >
                Modification de l'agent
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
                  <FormControl
                    sx={{ marginTop: 1.5 }}
                    value={edgenre}
                    onChange={(e) => {
                      setEdGenre(e.target.value);
                    }}
                  >
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Genre
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Masculin"
                        control={
                          <Radio
                            size="small"
                            checked={edgenre === "Masculin"}
                          />
                        }
                        label="Masculin"
                      />
                      <FormControlLabel
                        value="Féminin"
                        control={
                          <Radio size="small" checked={edgenre === "Féminin"} />
                        }
                        label="Féminin"
                      />
                    </RadioGroup>
                  </FormControl>

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
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Fonction"
                    variant="outlined"
                    size="small"
                    value={edfonction}
                    onChange={(e) => {
                      setEdFonction(e.target.value);
                    }}
                  />

                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditAgent(edId);
                  }}
                >
                  Valider
                </Button>
                <Button autoFocus onClick={handleCloseEdit} color="error">
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
                Ajout d'un agent
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
                    value={AgentNom}
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
                    value={AgentPrenom}
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                  />
                  <FormControl
                    sx={{ marginTop: 1.5 }}
                    value={AgentGenre}
                    onChange={(e) => {
                      setGenre(e.target.value);
                    }}
                  >
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Genre
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Masculin"
                        control={<Radio size="small" />}
                        label="Masculin"
                      />
                      <FormControlLabel
                        value="Féminin"
                        control={<Radio size="small" />}
                        label="Féminin"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Mail"
                    variant="outlined"
                    size="small"
                    value={AgentMail}
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
                    value={AgentAdresse}
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
                    value={AgentContact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />

                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Fontion"
                    variant="outlined"
                    size="small"
                    value={AgentFonction}
                    onChange={(e) => {
                      setFonction(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={addAgent}>
                  Ajouter
                </Button>
                <Button autoFocus onClick={handleCloseAdd} color="error">
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
                  Voulez vous vraiment supprimer l'agent avec l'identifiant{" "}
                  {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteAgent(edId);
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

export default AgentAdmin;
