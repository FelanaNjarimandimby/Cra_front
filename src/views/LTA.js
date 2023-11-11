import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import dateFormat from "dateformat";
import { variables } from "../Variables";
import dayjs from "dayjs";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import NavAdmin from "../components/ComponentsAdmin/NavAdmin";
import FileDownload from "@mui/icons-material/FileDownload";

const LTA = () => {
  const [openLTA, setOpenLTA] = React.useState(false);

  const handleOpenLta = () => {
    setOpenLTA(true);
  };

  const handleCloseLta = () => {
    setOpenLTA(false);
  };

  //const { id } = useParams();
  const componentRef = useRef();
  const [demanderId, setDemanderId] = useState("");
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [id, setIDLta] = React.useState("");
  const [LTANumero, setltaNumero] = React.useState("");
  const [LTADateEmission, setltaDate] = React.useState(dayjs(new Date()));
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

  const handlePrint = useReactToPrint(
    {
      content: () => componentRef.current,
      documentTitle: "Air Waybill",
      onAfterPrint: () => alert("Impréssion terminé"),
    }
    //setRows([])
  );
  useEffect(() => {
    //VoirDetail(2);
  }, []);
  //const x_id =
  async function VoirDetail(x_id) {
    const response = await fetch(variables.API_URL + "lta/" + x_id, {
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    setIDLta(x_id);
    setltaNumero(res.LTANumero);
    setltaDate(res.LTADateEmission);
    setAgentNom(res.AgentNom);
    setAgentContact(res.AgentContact);
    setClientNom(res.ClientNom);
    setClientContact(res.ClientContact);
    setDestinataire(res.Destinataire);
    setMarDesignation(res.MarchandiseDesignation);
    setNombre(res.MarchandiseNombre);
    setPoids(res.MarchandisePoids);
    setVolume(res.MarchandiseVolume);
    setNature(res.Nature);
    setTarifLibelle(res.Tarif);
    setVolNumero(res.VolNumero);
    setDateDepart(res.DateHeureDepart);
    setDateArrivee(res.DateHeureArrive);
    setItineraireDepart(res.ItineraireDepart);
    setItineraireArrive(res.ItineraireArrive);
    setAvionModele(res.AvionModele);
    setAvionCapacite(res.AvionCapacite);
    setAeroportNom(res.AeroportNom);
    setAeroportContact(res.AeroportContact);
    setAeroportLocalisation(res.AeroportLocalisation);
    setCompagnieNom(res.CompagnieNom);

    console.log(res.data);
  }

  async function postIDLta(event, ltanum) {
    event.preventDefault();
    await axios
      .post(variables.API_URL + "lta/getID?LTANumero=" + ltanum)
      .then((res) => {
        setRows(res.data);
        handleCloseLta();
      })
      .catch((error) => alert(error));
  }
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
  return (
    <>
      <NavAdmin />
      <Container
        maxWidth="xl"
        sx={{
          px: 1,
          pt: -3,
          py: 8,
          display: "fixed",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#6D071A",
          height: 60,
          borderRadius: {
            xs: "0px 0px 10px 10x",
            md: "0px 0px 20px 20px",
          },
          position: "fixed",
          color: "inherit",
        }}
        disableGutters
        color="inherit"
      ></Container>
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
            mb: -15,
            gap: 0,
          }}
        >
          <Grid
            sx={{
              py: 20,
              display: "flex",
              alignItems: "right",
              gap: 2,
            }}
          >
            <Grid item xs={5} marginTop={0}>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleOpenLta}
              >
                Entrer le numero du LTA
              </Button>
            </Grid>
          </Grid>
          <Button
            onClick={handlePrint}
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
              Pour générer la Lettre de Transport Aérien, veuillez insérer le
              numéro du LTA
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
              onChange={(e) => {
                setltaNumero(e.target.value);
              }}
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
                        {dateFormat(rows.LTADateEmission, "dd/mm/yyyy")}
                      </td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Numéro LTA</th>
                      <td style={style.td}>{rows.LTANumero}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Compagnie</th>
                      <td style={style.td}>{rows.CompagnieNom}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Aéroport</th>
                      <td style={style.td}>{rows.AeroportNom}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Aéroport contact</th>
                      <td style={style.td}>{rows.AeroportContact}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Aéroport Localisation</th>
                      <td style={style.td}>{rows.AeroportLocalisation}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Avion Modèle</th>
                      <td style={style.td}>{rows.AvionModele}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Avion Capacité</th>
                      <td style={style.td}>{rows.AvionCapacite}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Numéro du vol</th>
                      <td style={style.td}>{rows.VolNumero}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Date et heure départ</th>
                      <td style={style.td}>
                        {dateFormat(rows.DateHeureDepart, "dd/mm/yyyy HH:mm")}
                      </td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Date et heure arrivé</th>
                      <td style={style.td}>
                        {dateFormat(rows.DateHeureArrive, "dd/mm/yyyy HH:mm")}
                      </td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Itinéraire départ</th>
                      <td style={style.td}>{rows.ItineraireDepart}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Itinéraire destination</th>
                      <td style={style.td}>{rows.ItineraireArrive}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Nom du client </th>
                      <td style={style.td}>{rows.ClientNom}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Contact du client</th>
                      <td style={style.td}>{rows.ClientContact}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Nom de l'agent </th>
                      <td style={style.td}>{rows.AgentNom}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Contact de l'agent</th>
                      <td style={style.td}>{rows.AgentContact}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Désignation de la marchandise</th>
                      <td style={style.td}>{rows.MarchandiseDesignation}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Nombre du marchandise</th>
                      <td style={style.td}>{rows.MarchandiseNombre}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Poids net</th>
                      <td style={style.td}>{rows.MarchandisePoids}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Volume</th>
                      <td style={style.td}>{rows.MarchandiseVolume}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Nature</th>
                      <td style={style.td}>{rows.Nature}</td>
                    </tr>
                    <tr style={style.tr}>
                      <th style={style.th}>Tarif</th>
                      <td style={style.td}>{rows.Tarif}</td>
                    </tr>
                  </table>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LTA;
