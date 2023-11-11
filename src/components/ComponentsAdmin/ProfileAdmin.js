import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../../Variables";
import { Box, Typography, Grid, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6D071A",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ProfilAdmin() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifyInfo = () =>
    toast.error("Pas d'utilisateur connecté", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  //Dialog
  const [Open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [agents, setagents] = useState([]);
  const [id, setId] = useState("");
  const [AgentNom, setNom] = useState("");
  const [AgentPrenom, setPrenom] = useState("");
  const [AgentGenre, setGenre] = useState("");
  const [AgentMail, setMail] = useState("");
  const [AgentAdresse, setAdresse] = useState("");
  const [AgentContact, setContact] = useState("");
  const [AgentFonction, setFonction] = useState("");
  const [AgentMotPasse, setMotPasse] = useState("");

  useEffect(() => {
    VoirDetail();
  }, []);

  async function VoirDetail() {
    try {
      const response = await fetch(variables.API_URL + "agent/agent", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setId(content.id);
      setNom(content.AgentNom);
      setPrenom(content.AgentPrenom);
      setGenre(content.AgentGenre);
      setMail(content.AgentMail);
      setAdresse(content.AgentAdresse);
      setContact(content.AgentContact);
      setFonction(content.AgentFonction);
    } catch (error) {
      notifyInfo();
    }
  }

  async function EditAgent(agent) {
    handleProfileOpen();

    setId(agent.id);
    setNom(agent.AgentNom);
    setPrenom(agent.AgentPrenom);
    setGenre(agent.AgentGenre);
    setMail(agent.AgentMail);
    setAdresse(agent.AgentAdresse);
    setContact(agent.AgentContact);
    setFonction(agent.AgentFonction);
    setMotPasse(agent.AgentMotPasse);
  }

  //Modifier un client
  async function UpdateAgent(IDAgent) {
    try {
      await axios.put(variables.API_URL + "agent/" + IDAgent, {
        id: id,
        AgentNom: AgentNom,
        AgentPrenom: AgentPrenom,
        AgentGenre: AgentGenre,
        AgentMail: AgentMail,
        AgentAdresse: AgentAdresse,
        AgentContact: AgentContact,
        AgentFonction: AgentFonction,
        AgentMotPasse: AgentMotPasse,
      });
      alert("Modification avec succès");
      setId("");
      setNom("");
      setPrenom("");
      setGenre("");
      setMail("");
      setAdresse("");
      setContact("");
      setFonction("");
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

  //DECONNEXION
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function Deconnecter(event) {
    event.preventDefault();

    await fetch(variables.API_URL + "agent/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setRedirect(true);
  }

  if (redirect) {
    return navigate("/agentLogin");
  }

  return (
    <React.Fragment>
      <Box>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "21px",
            color: "#fff",
            opacity: "0.5",
          }}
        >
          {AgentNom ? AgentNom : "Vous n'êtes pas connecté"}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "21px",
            color: "#000",
          }}
        >
          {AgentPrenom ? AgentPrenom : ""}
        </Typography>
      </Box>
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Votre compte">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 44, height: 44 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileOpen}>
          <Avatar /> Mon compte
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Se deconnecter
        </MenuItem>
      </Menu>

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={Open}
          onClose={handleClickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment vous déconnecter?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={Deconnecter}>
              Continuer
            </Button>
            <Button onClick={handleClickClose} autoFocus>
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
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
              {AgentNom
                ? "Bienvenue" + " " + AgentNom
                : "Vous n'êtes pas connecté"}
            </h2>
            <h5 id="parent-modal-title">A propos de vous</h5>
            <p id="parent-modal-description"></p>

            <p>Nom: {AgentNom}</p>
            <p>Prénom: {AgentPrenom}</p>
            <p>Genre: {AgentGenre}</p>
            <p>Mail: {AgentMail}</p>
            <p>Adresse:{AgentAdresse}</p>
            <p>Contact:{AgentContact}</p>
            <p>Genre: {AgentFonction}</p>

            <box
              sx={{
                ...style,
                width: 400,
                display: "flex",
                alignItems: "left",
                gap: "8px",
              }}
            >
              <Button onClick={handleOpenChild}>Modifier</Button>
              <Button onClick={handleProfileClose}>Retour</Button>
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
                  value={id}
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
                  size="small"
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="firstName"
                  label="Nom"
                  value={AgentNom}
                  onChange={(event) => {
                    setNom(event.target.value);
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
                  size="small"
                  required
                  fullWidth
                  id="lastName"
                  label="Prénom(s)"
                  name="lastName"
                  value={AgentPrenom}
                  onChange={(event) => {
                    setPrenom(event.target.value);
                  }}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="genre"
                  label="Genre"
                  name="lastName"
                  value={AgentGenre}
                  onChange={(event) => {
                    setGenre(event.target.value);
                  }}
                  autoComplete="genre"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail "
                  name="email"
                  value={AgentMail}
                  onChange={(event) => {
                    setMail(event.target.value);
                  }}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="adresse"
                  label="Adresse"
                  name="adresse"
                  value={AgentAdresse}
                  onChange={(event) => {
                    setAdresse(event.target.value);
                  }}
                  autoComplete="adresse"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  value={AgentContact}
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                  autoComplete="contact"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="fonction"
                  label="Fonction"
                  name="fonction"
                  value={AgentFonction}
                  onChange={(event) => {
                    setFonction(event.target.value);
                  }}
                  autoComplete="fonction"
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
              <Button onClick={() => UpdateAgent(id)}>Valider</Button>
              <Button onClick={handleCloseChild}>Ok</Button>
            </box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
