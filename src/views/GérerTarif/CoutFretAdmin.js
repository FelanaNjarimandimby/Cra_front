import { Box, Grid, Pagination, TextField } from "@mui/material";
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
import { useReactToPrint } from "react-to-print";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CoutFretAdmin = () => {
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
    documentTitle: "Les coûts de fret",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "CoutPoidsMin", headerName: "Poids Minimal", width: 150 },
    { field: "CoutPoidsMax", headerName: "Poids Maximal", width: 150 },
    { field: "Cout", headerName: "Cout", width: 200 },
    { field: "AgentID", headerName: "Agent", width: 120 },

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
                params.row.CoutPoidsMin,
                params.row.CoutPoidsMax,
                params.row.Cout,
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
                  deleteCout(params.row.id);
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

  async function ListCouts() {
    await axios
      .get(variables.API_URL + "coutfret")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    (async () => await ListCouts())();
  }, []);

  const [CoutPoidsMin, setPoidsMin] = React.useState("");
  const [CoutPoidsMax, setPoidsMax] = React.useState("");
  const [Cout, setCout] = React.useState("");
  const [AgentID, setAgent] = React.useState("");

  async function deleteCout(index) {
    await axios
      .delete(variables.API_URL + "coutfret/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListCouts();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  async function addCout(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "coutfret", {
        CoutPoidsMin,
        CoutPoidsMax,
        Cout,
        AgentID,
      });
      handleCloseAdd();
      ListCouts();
      empty();
      notify();
    } catch (error) {
      alert(error);
    }
  }

  const empty = () => {
    setPoidsMin("");
    setPoidsMax("");
  };

  const [edId, setEdId] = React.useState("");
  const [edpoidsmin, setEdPoidsMin] = React.useState("");
  const [edpoidsmax, setEdPoidsMax] = React.useState("");
  const [edcout, setEdCout] = React.useState("");
  const toggleEdit = (ident, m_pmin, m_pmax, m_cout) => {
    setEdId(ident);
    setEdPoidsMin(m_pmin);
    setEdPoidsMax(m_pmax);
    setEdCout(m_cout);
    handleClickOpenEdit();
  };
  async function EditCout(x_id) {
    await axios
      .put(variables.API_URL + "coutfret/" + x_id, {
        id: edId,
        CoutPoidsMin: edpoidsmin,
        CoutPoidsMax: edpoidsmax,
        Cout: edcout,
        AgentID: 1,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListCouts();
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
                    paginationModel: {
                      page: 0,
                      pageSize: 5,
                    },
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
                Modification du cout de fret
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
                    label="Poids Min"
                    variant="outlined"
                    size="small"
                    value={edpoidsmin}
                    onChange={(e) => {
                      setEdPoidsMin(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Poids Max"
                    variant="outlined"
                    size="small"
                    value={edpoidsmax}
                    onChange={(e) => {
                      setEdPoidsMax(e.target.value);
                    }}
                  />
                  <TextField
                    sx={{ marginTop: 1.5 }}
                    id="outlined-basic"
                    label=" Cout"
                    variant="outlined"
                    size="small"
                    value={edcout}
                    onChange={(e) => {
                      setEdCout(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    EditCout(edId);
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
                Ajout d'un cout de fret
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
                    label="Poids Min"
                    variant="outlined"
                    size="small"
                    value={CoutPoidsMin}
                    onChange={(e) => {
                      setPoidsMin(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Poids Max"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={CoutPoidsMax}
                    onChange={(e) => {
                      setPoidsMax(e.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Cout"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={Cout}
                    onChange={(e) => {
                      setCout(e.target.value);
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
                      setAgent(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseAdd}>
                  Annuler
                </Button>
                <Button autoFocus onClick={addCout}>
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

export default CoutFretAdmin;
