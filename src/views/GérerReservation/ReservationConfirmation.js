import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variables } from "../../Variables";
import axios from "axios";
import dayjs from "dayjs";
import FileDownload from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";

const ReservationConfirmation = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate("");

  const navigateEscale = () => {
    navigate("/reservationNonConfirme");
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
  const notifyEdit = () =>
    toast.success("Confirmation avec succès!", {
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
    documentTitle: "Les demandes de confirmation de réservation",
    onAfterPrint: () => alert("Impréssion terminé"),
  });

  const [rows, setRows] = React.useState([]);
  const column = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "Vue",
      headerName: "Statut de la notification",
      width: 200,
    },
    { field: "ClientNom", headerName: "ClientNom", width: 200 },
    { field: "ReservationID", headerName: "ReservationID", width: 200 },

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
                params.row.ClientNom,
                params.row.ClientID,
                params.row.ReservationID,
                params.row.NomDestinataire,
                params.row.DateExpeditionSouhaite,
                params.row.ReservationExigences,
                params.row.ReservationDate,
                params.row.MarchandiseID,
                params.row.VolID,
                params.row.ItineraireID
              );
            }}
            type="button"
            color="success"
            size="small"
          >
            <Typography>Confirmer</Typography>
          </IconButton>
        </>
      ),
    },
  ];

  async function ListNotifications() {
    axios
      .get(variables.API_URL + "notification/notification")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    (async () => await ListNotifications())();
  }, []);

  const [NomDestinataire, setNomDestinataire] = React.useState("");
  const [DateExpeditionSouhaite, setDateExpeditionSouhaite] = React.useState(
    dayjs(new Date())
  );
  const [ReservationExigences, setReservationExigences] = React.useState("");
  const [ReservationEtat, setEtatReservation] = React.useState("");
  const [ReservationDate, setDate] = React.useState(dayjs(new Date()));

  const [MarchandiseID, setIDMarchandise] = React.useState("");
  const [VolID, setIDVol] = React.useState("");
  const [ItineraireID, setIDItineraire] = React.useState("");

  const [ReservationID, setIDReservation] = React.useState("");
  const [Vue, setVue] = React.useState("");
  const [ClientNom, setClientNom] = React.useState("");
  const [ClientID, setClientID] = React.useState("");
  const [edId, setEdId] = React.useState("");
  const toggleEdit = (
    ident,
    m_nomcli,
    m_idcli,
    m_resid,
    m_nom,
    m_datesouhait,
    m_exigence,
    m_date,
    m_marid,
    m_volid,
    m_itid
  ) => {
    setEdId(ident);
    setClientNom(m_nomcli);
    setClientID(m_idcli);
    setIDReservation(m_resid);
    setNomDestinataire(m_nom);
    setDateExpeditionSouhaite(m_datesouhait);
    setReservationExigences(m_exigence);
    setDate(m_date);
    setIDMarchandise(m_marid);
    setIDVol(m_volid);
    setIDItineraire(m_itid);
    handleClickOpen();

    console.log(NomDestinataire);
    console.log(ReservationExigences);
  };
  async function EditNotification(x_id) {
    await axios
      .put(variables.API_URL + "notification/" + x_id, {
        id: edId,
        Vue: "Oui",
        ClientNom: ClientNom,
        ClientID: ClientID,
        ReservationID: ReservationID,
      })
      .then((reponse) => {
        console.log(x_id);
        ListNotifications();
      })
      .catch((error) => {
        notifyDanger();
      });
  }

  const Confirmer = (idNot) => {
    EditNotification(idNot);
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
          onClick={navigateEscale}
        >
          Voir les demandes de confirmation
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
                  Confirmer la réservation sélectionnée
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    Confirmer(edId, ReservationID);
                  }}
                  autoFocus
                >
                  Confirmer
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

export default ReservationConfirmation;
