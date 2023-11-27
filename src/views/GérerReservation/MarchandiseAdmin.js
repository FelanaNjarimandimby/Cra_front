import { Box, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
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
import FileDownload from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";
import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MarchandiseAdmin = () => {
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
  const notifyDangerDelete = () => {
    toast.error("Cette information ne peut être supprimée !", {
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
    documentTitle: "Nos marchandises",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "MarchandiseDesignation", headerName: "Designation", width: 250 },
    { field: "MarchandiseNombre", headerName: "Nombre" },
    { field: "MarchandisePoids", headerName: "Poids" },
    { field: "MarchandiseVolume", headerName: "Volume" },
    { field: "NatureMarchandiseLibelle", headerName: "Nature", width: 200 },
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
                params.row.MarchandiseDesignation,
                params.row.MarchandiseNombre,
                params.row.MarchandisePoids,
                params.row.MarchandiseVolume,
                params.row.Nature
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
  };
  const [natures, setNatures] = React.useState([]);
  async function ListNatures() {
    axios
      .get(variables.API_URL + "nature_marchandise")
      .then((res) => setNatures(res.data))
      .catch((err) => console.log(err));
  }
  async function ListMarchandises() {
    axios
      .get(variables.API_URL + "marchandise")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListMarchandises())();
    (async () => await ListNatures())();
  }, []);

  const [id, setIDMarchandise] = useState("");
  const [MarchandiseDesignation, setDesignation] = useState("");
  const [MarchandiseNombre, setNombre] = useState("");
  const [MarchandisePoids, setPoids] = useState("");
  const [MarchandiseVolume, setVolume] = useState("");
  const [NatureMarchandiseLibelle, setLibelle] = useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteMarchandise(index) {
    await axios
      .delete(variables.API_URL + "marchandise/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListMarchandises();
      })
      .catch((error) => {
        notifyDangerDelete();
      });
  }

  async function addMarchandise(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "marchandise", {
        MarchandiseDesignation,
        MarchandiseNombre,
        MarchandisePoids,
        MarchandiseVolume,
        NatureMarchandiseLibelle,
      });
      handleCloseAdd();
      ListMarchandises();
      empty();
      notify();
    } catch (error) {
      notifyDangerInsert();
    }
  }

  const empty = () => {
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
  const [ednature, setEdNature] = React.useState("");
  const toggleEdit = (
    ident,
    m_designation,
    m_nombre,
    m_poids,
    m_volume,
    m_nature
  ) => {
    setEdId(ident);
    setEdDesignation(m_designation);
    setEdNombre(m_nombre);
    setEdPoids(m_poids);
    setEdVolume(m_volume);
    setEdNature(m_nature);
    handleClickOpenEdit();
  };
  async function EditMarchandise(x_id) {
    await axios
      .put(variables.API_URL + "marchandise/" + x_id, {
        id: edId,
        MarchandiseDesignation: eddesignation,
        MarchandiseNombre: ednombre,
        MarchandisePoids: edpoids,
        MarchandiseVolume: edvolume,
        NatureMarchandiseLibelle: ednature,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListMarchandises();
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
                sx={{ m: 0, p: 2, backgroundColor: "#6D071A" }}
                color="#fff"
                id="customized-dialog-title"
              >
                Modification de la marchandise
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
                    label="Designation"
                    variant="outlined"
                    size="small"
                    value={eddesignation}
                    onChange={(e) => {
                      setEdDesignation(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Nombre de colis"
                    variant="outlined"
                    size="small"
                    value={ednombre}
                    onChange={(e) => {
                      setEdNombre(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Poids *"
                    variant="outlined"
                    size="small"
                    value={edpoids}
                    onChange={(e) => {
                      setEdPoids(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Volume *"
                    variant="outlined"
                    size="small"
                    value={edvolume}
                    onChange={(e) => {
                      setEdVolume(e.target.value);
                    }}
                  />
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                      <InputLabel id="demo-simple-select-label">
                        Nature
                      </InputLabel>
                      <Select
                        defaultValue={ednature}
                        labelId="demo-simple-select-label"
                        id="ednature"
                        value={ednature}
                        label="Nature"
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
                          setEdNature(event.target.value);
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
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditMarchandise(edId);
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
                Ajout d'une marchandise
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
                    label="Designation"
                    variant="outlined"
                    size="small"
                    value={MarchandiseDesignation}
                    onChange={(e) => {
                      setDesignation(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    size="small"
                    value={MarchandiseNombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Poids"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={MarchandisePoids}
                    onChange={(e) => {
                      setPoids(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Volume"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={MarchandiseVolume}
                    onChange={(e) => {
                      setVolume(e.target.value);
                    }}
                  />
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                      <InputLabel id="demo-simple-select-label">
                        Nature
                      </InputLabel>
                      <Select
                        defaultValue={NatureMarchandiseLibelle}
                        labelId="demo-simple-select-label"
                        id="ItineraireDepart"
                        value={NatureMarchandiseLibelle}
                        label="Nature"
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
                            value={nature.NatureMarchandiseLibelle}
                          >
                            {nature.NatureMarchandiseLibelle}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={addMarchandise}>
                  Ajouter
                </Button>
                <Button autoFocus onClick={handleCloseAdd}>
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
                  Voulez vous vraiment supprimer la marchandise avec
                  l'identifiant {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteMarchandise(edId);
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

export default MarchandiseAdmin;
