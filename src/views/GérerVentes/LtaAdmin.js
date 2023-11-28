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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
import dateFormat from "dateformat";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import FileDownload from "@mui/icons-material/FileDownload";
import { ArrowRight } from "@mui/icons-material";
import { useState } from "react";
import Check from "@material-ui/icons/Check";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const style = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid black",
  },

  th: {
    border: "1px solid black",
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
};

const LtaAdmin = () => {
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
    documentTitle: "Les Ltas",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const handlePrintLTA = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lettre de Transport Aérien",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "LTANumero", headerName: "Numéro LTA", width: 250 },
    {
      field: "LTADateEmission",
      headerName: "Date du LTA",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 250,
    },
    {
      field: "VenteID",
      width: 250,
      headerName: "ID Vente",
    },

    {
      field: "action",
      headerName: "Action",
      width: 250,

      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              toggleEdit(
                params.row.id,
                params.row.LTANumero,
                params.row.LTADateEmission,
                params.row.VenteID
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
          <IconButton
            onClick={() => {
              ToggleGenererLTA(params.row.LTANumero);
            }}
            type="button"
            size="small"
          >
            Générer LTA <ArrowRight />
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

  const [openLTA, setOpenLTA] = React.useState(false);

  const handleOpenLta = () => {
    setOpenLTA(true);
  };

  const handleCloseLta = () => {
    setOpenLTA(false);
  };

  const [openGenererLTA, setOpenGenererLTA] = React.useState(false);

  const handleOpenGenererLta = () => {
    setOpenGenererLTA(true);
  };

  const handleCloseGenererLta = () => {
    setOpenGenererLTA(false);
  };

  async function ListLtas() {
    axios
      .get(variables.API_URL + "lta")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListLtas())();
  }, []);

  const [id, setIDLta] = React.useState("");
  const [LTANumero, setNumero] = React.useState("");
  const [LTADateEmission, setDate] = React.useState(dayjs(new Date()));
  const [VenteID, setIDVente] = React.useState("");

  //Générer LTA
  const [demanderId, setDemanderId] = useState("");
  const [ltas, setLtas] = React.useState([]);
  const [AgentNom, setAgentNom] = React.useState("");
  const [AgentContact, setAgentContact] = React.useState("");
  const [ClientNom, setClientNom] = React.useState("");
  const [ClientContact, setClientContact] = React.useState("");
  const [Destinataire, setDestinataire] = React.useState("");
  const [MarchandiseDesignation, setMarDesignation] = React.useState("");
  const [MarchandiseNombre, setNombre] = React.useState("");
  const [MarchandisePoids, setPoids] = React.useState("");
  const [MarchandiseVolume, setVolume] = React.useState("");
  const [Nature, setNature] = React.useState("");
  const [Tarif, setTarifLibelle] = React.useState("");
  const [VolNumero, setVolNumero] = React.useState("");
  const [DateHeureDepart, setDateDepart] = React.useState(dayjs(new Date()));
  const [DateHeureArrive, setDateArrivee] = React.useState(dayjs(new Date()));
  const [ItineraireDepart, setItineraireDepart] = React.useState("");
  const [ItineraireArrive, setItineraireArrive] = React.useState("");
  const [AvionModele, setAvionModele] = React.useState("");
  const [AvionCapacite, setAvionCapacite] = React.useState("");
  const [AeroportNom, setAeroportNom] = React.useState("");
  const [AeroportContact, setAeroportContact] = React.useState("");
  const [AeroportLocalisation, setAeroportLocalisation] = React.useState("");
  const [CompagnieNom, setCompagnieNom] = React.useState("");

  const toggleDelete = (ident) => {
    setEdId(ident);
    handleClickOpen();
  };

  async function deleteLta(index) {
    await axios
      .delete(variables.API_URL + "lta/" + index)
      .then((response) => {
        handleClose();
        notifyDelete();
        ListLtas();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  //Ajouter une LTA
  const ToggleGenererLTA = (ltanumero) => {
    setNumero(ltanumero);
    handleOpenGenererLta();
  };

  async function postIDLta(event, ltanum) {
    event.preventDefault();
    await axios
      .post(variables.API_URL + "lta/getID?LTANumero=" + ltanum)
      .then((res) => {
        setLtas(res.data);
        handleCloseLta();
      })
      .catch((error) => alert(error));
  }
  async function addLta(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "lta", {
        LTANumero,
        LTADateEmission,
        VenteID,
      });
      handleCloseAdd();
      ListLtas();
      empty();
      notify();
    } catch (error) {
      notifyDangerInsert();
    }
  }

  const empty = () => {
    setNumero("");
    setDate(dayjs(new Date()));
    setIDVente("");
  };

  const [edId, setEdId] = React.useState("");
  const [ednumero, setEdNumero] = React.useState("");
  const [eddate, setEdDate] = React.useState(dayjs(new Date()));
  const toggleEdit = (ident, m_numero, m_date) => {
    setEdId(ident);
    setEdNumero(m_numero);
    setEdDate(m_date);
    handleClickOpenEdit();
  };
  async function EditLta(x_id) {
    await axios
      .put(variables.API_URL + "lta/" + x_id, {
        id: edId,
        LTANumero: ednumero,
        LTADateEmission: eddate,
        VenteID: 1,
      })
      .then((reponse) => {
        console.log(x_id);
        handleCloseEdit();
        notifyEdit();
        ListLtas();
        empty();
      })
      .catch((error) => {
        notifyDanger();
        console.log(error);
      });
  }
  const navigate = useNavigate("");

  const navigateGenererLTA = () => {
    navigate("/vente");
  };
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
          onClick={navigateGenererLTA}
        >
          Gérer les ventes
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
                Modification du LTA
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
                    label="Numero LTA"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={ednumero}
                    onChange={(e) => {
                      setEdNumero(e.target.value);
                    }}
                  />
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
                        sx={{ marginTop: 1.5, width: 500 }}
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
                    EditLta(edId);
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
                Ajout d'une LTA
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
                    label="Numéro LTA"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={LTANumero}
                    onChange={(e) => {
                      setNumero(e.target.value);
                    }}
                  />
                  <div style={{ display: "flex", gap: "3px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          defaultValue={dayjs(new Date())}
                          label="Date de départ"
                          format="DD/MM/YYYY"
                          value={dayjs(LTADateEmission)}
                          onChange={(date) => setDate(date)}
                          renderInput={(params) => (
                            <TextField {...params} sx={{ width: "100%" }} />
                          )}
                          sx={{ marginTop: 1.5, width: 500 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>

                  <TextField
                    id="outlined-basic"
                    label="VenteID"
                    variant="outlined"
                    sx={{ marginTop: 1.5 }}
                    size="small"
                    value={VenteID}
                    onChange={(e) => {
                      setIDVente(e.target.value);
                    }}
                  />
                  <br />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={addLta}>
                  Ajouter
                </Button>
                <Button autoFocus color="error" onClick={handleCloseAdd}>
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
                  Voulez vous vraiment supprimer la Lettre de Transport Aérien
                  avec l'identifiant {edId} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    deleteLta(edId);
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

            <Dialog open={openGenererLTA} onClose={handleCloseGenererLta}>
              <DialogTitle>Lettre de Transport Aérien</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Pour générer la Lettre de Transport Aérien, veuillez confirmer
                  le numéro du LTA
                </DialogContentText>
                <div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        md: "row",
                      },
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: -2,
                      gap: 0,
                    }}
                  >
                    <Grid
                      sx={{
                        py: 5,
                        display: "flex",
                        alignItems: "right",
                        gap: 2,
                      }}
                    >
                      <Grid item xs={5} marginTop={0}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Check />}
                          onClick={handleOpenLta}
                        >
                          Confirmer le numero du LTA
                        </Button>
                      </Grid>
                    </Grid>
                    <Button
                      onClick={handlePrintLTA}
                      variant="outlined"
                      startIcon={<FileDownload />}
                      size="small"
                    >
                      Générer LTA
                    </Button>
                  </Box>

                  <Dialog open={openLTA} onClose={handleCloseLta}>
                    <DialogTitle>Lettre de Transport Aérien</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Pour générer la Lettre de Transport Aérien, veuillez
                        insérer le numéro du LTA
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Numéro du LTA"
                        type="texte"
                        fullWidth
                        variant="standard"
                        value={LTANumero}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={(event) => {
                          postIDLta(event, LTANumero);
                        }}
                      >
                        Générer LTA
                      </Button>
                      <Button onClick={handleCloseLta}>Annuler</Button>
                    </DialogActions>
                  </Dialog>

                  <div>
                    <div
                      ref={componentRef}
                      style={{ width: "100%", height: window.innerHeight }}
                    >
                      <div className="classValide">
                        <div className="valide" style={{ textAlign: "left" }}>
                          {
                            <table style={style.table}>
                              <tr style={style.tr}>
                                <th colSpan="2" style={style.th}>
                                  Lettre de Transport Aérien
                                </th>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Date LTA</th>
                                <td style={style.td}>
                                  {dateFormat(
                                    ltas.LTADateEmission,
                                    "dd/mm/yyyy"
                                  )}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Numéro LTA</th>
                                <td style={style.td}>{ltas.LTANumero}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Compagnie</th>
                                <td style={style.td}>{ltas.CompagnieNom}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Aéroport</th>
                                <td style={style.td}>{ltas.AeroportNom}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Aéroport contact</th>
                                <td style={style.td}>{ltas.AeroportContact}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Aéroport Localisation</th>
                                <td style={style.td}>
                                  {ltas.AeroportLocalisation}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Avion Modèle</th>
                                <td style={style.td}>{ltas.AvionModele}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Avion Capacité</th>
                                <td style={style.td}>{ltas.AvionCapacite}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Numéro du vol</th>
                                <td style={style.td}>{ltas.VolNumero}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Date et heure départ</th>
                                <td style={style.td}>{ltas.DateHeureDepart}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Date et heure arrivé</th>
                                <td style={style.td}>{ltas.DateHeureArrive}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Itinéraire départ</th>
                                <td style={style.td}>
                                  {ltas.ItineraireDepart}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Itinéraire destination</th>
                                <td style={style.td}>
                                  {ltas.ItineraireArrive}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Nom du client </th>
                                <td style={style.td}>{ltas.ClientNom}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Contact du client</th>
                                <td style={style.td}>{ltas.ClientContact}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Nom de l'agent </th>
                                <td style={style.td}>{ltas.AgentNom}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Contact de l'agent</th>
                                <td style={style.td}>{ltas.AgentContact}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>
                                  Désignation de la marchandise
                                </th>
                                <td style={style.td}>
                                  {ltas.MarchandiseDesignation}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Nombre du marchandise</th>
                                <td style={style.td}>
                                  {ltas.MarchandiseNombre}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Poids net</th>
                                <td style={style.td}>
                                  {ltas.MarchandisePoids}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Volume</th>
                                <td style={style.td}>
                                  {ltas.MarchandiseVolume}
                                </td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Nature</th>
                                <td style={style.td}>{ltas.Nature}</td>
                              </tr>
                              <tr style={style.tr}>
                                <th style={style.th}>Tarif</th>
                                <td style={style.td}>{ltas.Tarif}</td>
                              </tr>
                            </table>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button color="error" onClick={handleCloseGenererLta}>
                  Fermer
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default LtaAdmin;
