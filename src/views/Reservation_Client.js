import React, { useEffect, useState } from "react";
import axios from "axios";
import { variables } from "../Variables";
import dateFormat from "dateformat";
import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InNav from "../components/InNav";
import TableReservation from "./TableReservation";
import Container from "@mui/material/Container";

const defaultTheme = createTheme();
const style = {
  button: {
    background: "#6D071A",
    borderRadius: 4,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
};

const Reservation = () => {
  const [reservations, setreservations] = useState([]);
  const [ReservationID, setIDReservation] = useState("");
  const [NomDestinaire, setNomDestinaire] = useState("");
  const [DateExpeditionSouhaite, setDateExpeditionSouhaite] = useState(
    dayjs(new Date())
  );
  const [ReservationExigences, setReservationExigences] = useState("");
  const [ReservationEtat, setEtatReservation] = useState("");
  const [ClientID, setIDClient] = useState("");
  const [MarchandiseID, setIDMarchandise] = useState("");
  const [VolID, setIDVol] = useState("");
  const [ItineraireID, setIDItineraire] = useState("");

  const [MarchandiseDesignation, setDesignation] = useState("");
  const [MarchandiseNombre, setNombre] = useState("");
  const [MarchandisePoids, setPoids] = useState("");
  const [MarchandiseVolume, setVolume] = useState("");
  const [Libelle, setLibelle] = useState("");

  useEffect(() => {
    (async () => await ListReservations())();
  }, []);

  /*   export const ListReservations = () => {
        axios.get(variables.API_URL+'reservation')
        .then(res => setreservations(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    } */

  //Lister les réservations
  async function ListReservations() {
    axios
      .get(variables.API_URL + "reservation")
      .then((res) => setreservations(res.data))
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  //Récuperer l'identifiant de la marchandise
  async function postIDMarchandise(event) {
    event.preventDefault();
    await axios
      .post(variables.API_URL + "marchandise/getID", {
        designation: MarchandiseDesignation,
        nombreColis: MarchandiseNombre,
        poids: MarchandisePoids,
        volume: MarchandiseVolume,
        libelle: Libelle,
      })
      .then((res) => setIDMarchandise(res.data))
      .catch((error) => alert(error));
  }

  const Reserver = (e) => {
    e.preventDefault();
    postIDMarchandise();
    AddReservation();
  };

  //Ajouter une réservation
  async function AddReservation(event) {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + "reservation", {
        NomDestinaire: NomDestinaire,
        DateExpeditionSouhaite: DateExpeditionSouhaite,
        ReservationExigences: ReservationExigences,
        ReservationEtat: ReservationEtat,
        ClientID: ClientID,
        MarchandiseID: MarchandiseID,
        VolID: VolID,
        ItineraireID: ItineraireID,
      });
      alert("Votre réservation est bien enregistrée");
      setIDReservation("");
      setNomDestinaire("");
      setDateExpeditionSouhaite(dayjs(new Date()));
      setReservationExigences("");
      setEtatReservation("");
      setIDClient("");
      setIDMarchandise("");
      setIDVol("");
      setIDItineraire("");
      ListReservations();
    } catch (error) {
      alert(error);
    }
  }

  //Récupérer propriétés de la réservation dans les inputs
  async function EditReservation(reservation) {
    setIDReservation(reservation.RefReservation);
    setNomDestinaire(reservation.NomDestinaire);
    setDateExpeditionSouhaite(reservation.DateExpeditionSouhaite);
    setReservationExigences(reservation.ExigencesSpeciales);
    setEtatReservation(reservation.ReservationEtat);
    setIDClient(reservation.ClientID);
    setIDMarchandise(reservation.MarchandiseID);
    setIDVol(reservation.ClientID);
    setIDItineraire(reservation.ItineraireID);
  }

  //Modifier une réservation
  async function UpdateReservation(ReservationID) {
    try {
      await axios.put(variables.API_URL + "reservation/" + ReservationID, {
        ReservationID: ReservationID,
        NomDestinaire: NomDestinaire,
        DateExpeditionSouhaite: DateExpeditionSouhaite,
        ReservationExigences: ReservationExigences,
        ReservationEtat: ReservationEtat,
        ClientID: ClientID,
        MarchandiseID: MarchandiseID,
        VolID: VolID,
        ItineraireID: ItineraireID,
      });
      alert("Modification de la réservation avec succès");
      setIDReservation("");
      setNomDestinaire("");
      setDateExpeditionSouhaite(dayjs(new Date()));
      setReservationExigences("");
      setEtatReservation("");
      setIDClient("");
      setIDMarchandise("");
      setIDVol("");
      setIDItineraire("");
      ListReservations();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Box sx={{ backgroundColor: "lightgrey" }}>
        <InNav />
      </Box>

      <TableReservation />
      <h1>Toutes les réservations</h1>
      <div className="row">
        <form>
          <h2>Info sur client</h2>
          <div className="form-group">
            <label>IDClient</label>
            <input
              type="text"
              className="form-control"
              id="ClientID"
              value={ClientID}
              onChange={(event) => {
                setIDClient(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>IDItineraire</label>
            <input
              type="text"
              className="form-control"
              id="ItineraireID"
              value={ItineraireID}
              onChange={(event) => {
                setIDItineraire(event.target.value);
              }}
            />
          </div>
          <h2>Info sur marchandise</h2>
          <div className="form-group">
            <label>IDMarchandise</label>
            <input
              type="text"
              className="form-control"
              id="MarchandiseID"
              value={MarchandiseID}
              onChange={(event) => {
                setIDMarchandise(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              id="MarchandiseDesignation"
              value={MarchandiseDesignation}
              onChange={(event) => {
                setDesignation(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Nombre Colis</label>
            <input
              type="text"
              className="form-control"
              id="NombreColis"
              value={MarchandiseNombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Poids</label>
            <input
              type="text"
              className="form-control"
              id="Poids"
              value={MarchandisePoids}
              onChange={(event) => {
                setPoids(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Volume</label>
            <input
              type="text"
              className="form-control"
              id="Volume"
              value={MarchandiseVolume}
              onChange={(event) => {
                setVolume(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Libelle</label>
            <input
              type="text"
              className="form-control"
              id="Libelle"
              value={Libelle}
              onChange={(event) => {
                setLibelle(event.target.value);
              }}
            />
          </div>
          <h2>Info sur vol</h2>
          <div className="form-group">
            <label>NumVol</label>
            <input
              type="text"
              className="form-control"
              id="VolID"
              value={VolID}
              onChange={(event) => {
                setIDVol(event.target.value);
              }}
            />
          </div>
          <h2>Info sur réservation</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="ReservationID"
              hidden
              value={ReservationID}
              onChange={(event) => {
                setIDReservation(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Nom du destinataire</label>
            <input
              type="text"
              className="form-control"
              id="NomDestinaire"
              value={NomDestinaire}
              onChange={(event) => {
                setNomDestinaire(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  defaultValue={dayjs(new Date())}
                  label="Date d'expédition souhaitée"
                  format="DD/MM/YYYY"
                  value={dayjs(DateExpeditionSouhaite)}
                  onChange={(date) => setDateExpeditionSouhaite(date)}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "100%" }} />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="form-group">
            <label>Exigences Speciales</label>
            <input
              type="text"
              className="form-control"
              id="ExigencesSpeciales"
              value={ReservationExigences}
              onChange={(event) => {
                setReservationExigences(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <FormControl required sx={{ m: 1, minWidth: 120 }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Etat de la réservation
              </InputLabel>
              <Select
                defaultValue={"ReservationEtat"}
                labelId="demo-simple-select-label"
                id="ReservationEtat"
                value={ReservationEtat}
                label="Etat Reservation *"
                onChange={(event) => {
                  setEtatReservation(event.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"réservé"}>Reservé</MenuItem>
                <MenuItem value={"Confirmé"}>Confirmé</MenuItem>
                <MenuItem value={"Annulé"}>Annulé</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>

          <div className="btn-toolbar">
            <button
              className="btn btn-primary"
              onClick={(event) => {
                postIDMarchandise(event);
              }}
            >
              Ajouter
            </button>
            <button className="btn btn-default" onClick={AddReservation}>
              Modifier
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Nom du destinataire</th>
                <th>Date d'expédition souhaitée</th>
                <th>Exigences Spéciales</th>
                <th>Etat réservation</th>
                <th>IDClient</th>
                <th>IDMarchandise</th>
                <th>IDVol</th>
                <th>IDItineraire</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => {
                return (
                  <tr key={index}>
                    <td>{reservation.ReservationID}</td>
                    <td>{reservation.NomDestinaire}</td>
                    <td>
                      {dateFormat(
                        reservation.DateExpeditionSouhaite,
                        "dd/mm/yyyy"
                      )}
                    </td>
                    <td>{reservation.ReservationExigences}</td>
                    <td>{reservation.ReservationEtat}</td>
                    <td>{reservation.ClientID}</td>
                    <td>{reservation.MarchandiseID}</td>
                    <td>{reservation.VolID}</td>
                    <td>{reservation.ItineraireID}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => EditReservation(reservation)}
                      >
                        Modifier
                      </button>
                      <button className="btn btn-danger">Supprimer</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Reservation;
