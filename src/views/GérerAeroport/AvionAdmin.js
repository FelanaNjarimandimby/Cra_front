import { Box, Grid, TextField } from "@mui/material";
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

const AvionAdmin = () => {
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

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Nos avions",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "AvionModele", headerName: "Modele", width: 250 },
    { field: "AvionCapacite", headerName: "Capacite", width: 300 },

    {
      field: "action",
      width: 150,
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.AvionModele,
                params.row.AvionCapacite
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

  async function ListAvions() {
    axios
      .get(variables.API_URL + "avioncargo")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListAvions())();
  }, []);

  const [AvionModele, setModele] = React.useState("");
  const [AvionCapacite, setCapacite] = React.useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteAvion(index) {
    await axios
      .delete(variables.API_URL + "avioncargo/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListAvions();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addAvion(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "avioncargo", {
        AvionModele,
        AvionCapacite,
      });
      handleCloseAdd();
      ListAvions();
      empty();
      notify();
    } catch (error) {
      notifyDangerInsert();
    }
  }

  const empty = () => {
    AvionModele("");
    AvionCapacite("");
  };

  const [edId, setEdId] = React.useState("");
  const [edmodele, setEdModele] = React.useState("");
  const [edcapacite, setEdCapacite] = React.useState("");
  const toggleEdit = (ident, m_modele, m_capacite) => {
    setEdId(ident);
    setEdModele(m_modele);
    setEdCapacite(m_capacite);
    handleClickOpenEdit();
  };
  async function EditAvion(x_id) {
    await axios
      .put(variables.API_URL + "avioncargo/" + x_id, {
        id: edId,
        AvionModele: edmodele,
        AvionCapacite: edcapacite,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListAvions();
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
                Modification d'un avion
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
                    label="Modèle"
                    variant="outlined"
                    size="small"
                    value={edmodele}
                    onChange={(e) => {
                      setEdModele(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Capacite"
                    variant="outlined"
                    size="small"
                    value={edcapacite}
                    onChange={(e) => {
                      setEdCapacite(e.target.value);
                    }}
                  />

                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditAvion(edId);
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
                Ajout d'un itinéraire
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
                    label="Modèle "
                    variant="outlined"
                    size="small"
                    value={AvionModele}
                    onChange={(e) => {
                      setModele(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Capacité"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={AvionCapacite}
                    onChange={(e) => {
                      setCapacite(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
                <Button autoFocus onClick={addAvion}>
                  Ajouter
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
                  Voulez vous vraiment supprimer l'avion avec l'identifiant{" "}
                  {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteAvion(edId);
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

export default AvionAdmin;
