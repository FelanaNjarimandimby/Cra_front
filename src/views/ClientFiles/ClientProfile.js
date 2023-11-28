import * as React from "react";
import { Box, Grid, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { variables } from "../../Variables";
import Avatar from "@mui/material/Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const ClientProfile = () => {
  const [clients, setclients] = useState([]);
  const [ClientID, setIdClient] = useState("");
  const [ClientNom, setNomClient] = useState("");
  const [ClientPrenom, setPrenomClient] = useState("");
  const [ClientMail, setMail] = useState("");
  const [ClientAdresse, setAdresse] = useState("");
  const [ClientContact, setContact] = useState("");
  const [ClientMotPasse, setMotPasse] = useState("");

  useEffect(() => {
    (async () => await VoirDetail())();
    //async ()=> await ListClients())();
    //(async ()=> await FindClientByID(IDClient))();
  }, []);

  async function VoirDetail() {
    const response = await fetch(variables.API_URL + "client/client", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    setIdClient(content.ClientID);
    setNomClient(content.ClientNom);
    setPrenomClient(content.ClientPrenom);
    setMail(content.ClientMail);
    setAdresse(content.ClientAdresse);
    setContact(content.ClientContact);
  }

  async function EditClient(client) {
    handleProfileOpen();

    setIdClient(client.ClientID);
    setNomClient(client.ClientNom);
    setPrenomClient(client.ClientPrenom);
    setMail(client.ClientMail);
    setAdresse(client.ClientAdresse);
    setContact(client.ClientContact);
    setMotPasse(client.ClientMotPasse);
  }

  //Modifier un client
  async function UpdateClient(IDClient) {
    try {
      await axios.put(variables.API_URL + "client/" + IDClient, {
        ClientID: ClientID,
        ClientNom: ClientNom,
        ClientPrenom: ClientPrenom,
        ClientMail: ClientMail,
        ClientAdresse: ClientAdresse,
        ClientContact: ClientContact,
        ClientMotPasse: ClientMotPasse,
      });
      alert("Modification de client avec succès");
      setIdClient("");
      setNomClient("");
      setPrenomClient("");
      setMail("");
      setAdresse("");
      setContact("");
      handleCloseChild();
      VoirDetail();
    } catch (error) {
      alert(error);
    }
  }

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleProfileOpen = () => {
    setOpenProfile(true);
  };
  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const [openChild, setOpenChild] = React.useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };

  return (
    <>
      <div className="container">
        <div>
          <Button
            onClick={handleProfileOpen}
            sx={{
              height: "40",
              fontSize: "10px",
            }}
          >
            <Avatar /> Mon compte
          </Button>
          <Modal
            open={openProfile}
            onClose={handleProfileClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              sx={{
                ...style,
                width: 300,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Avatar sx={{ width: 56, height: 56 }} />
              <h2>
                {ClientNom
                  ? "Bienvenue" + " " + ClientNom
                  : "You are not logged in"}
              </h2>
              <h5 id="parent-modal-title">A propos de vous</h5>
              <p id="parent-modal-description"></p>

              <p>{ClientNom}</p>
              <p>{ClientPrenom}</p>
              <p>{ClientMail}</p>
              <p>{ClientAdresse}</p>
              <p>{ClientContact}</p>

              <box
                sx={{
                  ...style,
                  width: 400,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Button onClick={handleOpenChild}>Modifier</Button>
                <Button onClick={handleProfileClose}>Ok</Button>
              </box>
            </Box>
          </Modal>
        </div>

        <Modal
          open={openChild}
          onClose={handleCloseChild}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h3 id="child-modal-title">Modifier votre information</h3>
            <p id="child-modal-description"></p>

            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={42}>
                  <TextField
                    autoComplete="given-name"
                    name="ID"
                    fullWidth
                    id="id"
                    label="id"
                    value={ClientID}
                    autoFocus
                    hidden
                    sx={{
                      height: "40",
                      fontSize: "10px",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="firstName"
                    label="Nom"
                    value={ClientNom}
                    onChange={(event) => {
                      setNomClient(event.target.value);
                    }}
                    autoFocus
                    sx={{
                      height: "40",
                      fontSize: "10px",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Prénom(s)"
                    name="lastName"
                    value={ClientPrenom}
                    onChange={(event) => {
                      setPrenomClient(event.target.value);
                    }}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Addresse mail "
                    name="email"
                    value={ClientMail}
                    onChange={(event) => {
                      setMail(event.target.value);
                    }}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="adresse"
                    label="Adresse"
                    name="adresse"
                    value={ClientAdresse}
                    onChange={(event) => {
                      setAdresse(event.target.value);
                    }}
                    autoComplete="adresse"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="contact"
                    label="Contact"
                    name="contact"
                    value={ClientContact}
                    onChange={(event) => {
                      setContact(event.target.value);
                    }}
                    autoComplete="contact"
                  />
                </Grid>
              </Grid>
              <box
                sx={{
                  ...style,
                  width: 400,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Button onClick={() => UpdateClient(ClientID)}>Valider</Button>
                <Button onClick={handleCloseChild}>Ok</Button>
              </box>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default ClientProfile;
