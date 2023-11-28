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
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
import FileDownload from "@mui/icons-material/FileDownload";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TarifAdmin = () => {
  const navigate = useNavigate("");

  const navigateCout = () => {
    navigate("/couts");
  };

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
    documentTitle: "Nos tarifs",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "TarifLibelle", headerName: "Libelle", width: 250 },
    { field: "TarifValeur", headerName: "Valeur(en %)", width: 120 },
    {
      field: "TarifFraisAssurance",
      headerName: "Assurance(en Ar)",
      width: 200,
    },
    { field: "TarifAnnexe", headerName: "Annexe(en Ar)", width: 200 },

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
                params.row.TarifLibelle,
                params.row.TarifValeur,
                params.row.TarifFraisAssurance,
                params.row.TarifAnnexe
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

  async function ListTarifs() {
    axios
      .get(variables.API_URL + "typetarif")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListTarifs())();
  }, []);

  const [TarifLibelle, setLibelle] = React.useState("");
  const [TarifValeur, setValeur] = React.useState("");
  const [TarifFraisAssurance, setAssurance] = React.useState("");
  const [TarifAnnexe, setAnnexe] = React.useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteTarif(index) {
    await axios
      .delete(variables.API_URL + "typetarif/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListTarifs();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addTarif(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "typetarif", {
        TarifLibelle,
        TarifValeur,
        TarifFraisAssurance,
        TarifAnnexe,
      });
      handleCloseAdd();
      ListTarifs();
      empty();
      notify();
    } catch (error) {
      notifyDangerInsert();
    }
  }

  const empty = () => {
    setLibelle("");
    setValeur("");
    setAssurance("");
    setAnnexe("");
  };

  const [edId, setEdId] = React.useState("");
  const [edlibelle, setEdLibelle] = React.useState("");
  const [edvaleur, setEdValeur] = React.useState("");
  const [edassurance, setEdAssurance] = React.useState("");
  const [edannexe, setEdAnnexe] = React.useState("");
  const toggleEdit = (ident, m_libelle, m_valeur, m_assurance, m_annexe) => {
    setEdId(ident);
    setEdLibelle(m_libelle);
    setEdValeur(m_valeur);
    setEdAssurance(m_assurance);
    setEdAnnexe(m_annexe);
    handleClickOpenEdit();
  };
  async function EditTarif(x_id) {
    await axios
      .put(variables.API_URL + "typetarif/" + x_id, {
        id: edId,
        TarifLibelle: edlibelle,
        TarifValeur: edvaleur,
        TarifFraisAssurance: edassurance,
        TarifAnnexe: edannexe,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListTarifs();
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
          onClick={navigateCout}
        >
          Coût de fret
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
                Modification du type tarif
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
                    label="Libellé"
                    variant="outlined"
                    size="small"
                    value={edlibelle}
                    onChange={(e) => {
                      setEdLibelle(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Valeur(en %)"
                    variant="outlined"
                    size="small"
                    value={edvaleur}
                    onChange={(e) => {
                      setEdValeur(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Frais d'assurance(en Ar)"
                    variant="outlined"
                    size="small"
                    value={edassurance}
                    onChange={(e) => {
                      setEdAssurance(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Frais annexe(en Ar)"
                    variant="outlined"
                    size="small"
                    value={edannexe}
                    onChange={(e) => {
                      setEdAnnexe(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditTarif(edId);
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
                Ajout d'un tarif
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
                    label="Libellé"
                    variant="outlined"
                    size="small"
                    value={TarifLibelle}
                    onChange={(e) => {
                      setLibelle(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Valeur(en %)"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={TarifValeur}
                    onChange={(e) => {
                      setValeur(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Frais Assurance(en Ar)"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={TarifFraisAssurance}
                    onChange={(e) => {
                      setAssurance(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Tarif annexe(en Ar)"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={TarifAnnexe}
                    onChange={(e) => {
                      setAnnexe(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={addTarif}>
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
                  Voulez vous vraiment supprimer le tarif avec l'identifiant{" "}
                  {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteTarif(edId);
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

export default TarifAdmin;
