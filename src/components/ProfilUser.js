import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../Variables";
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

export default function ProfilUser() {
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

  const [clients, setclients] = useState([]);
  const [id, setIdClient] = useState("");
  const [ClientNom, setNomClient] = useState("");
  const [ClientPrenom, setPrenomClient] = useState("");
  const [ClientMail, setMail] = useState("");
  const [ClientAdresse, setAdresse] = useState("");
  const [ClientContact, setContact] = useState("");
  const [ClientMotPasse, setMotPasse] = useState("");

  useEffect(() => {
    VoirDetail();
  }, []);

  async function VoirDetail() {
    try {
      const response = await fetch(variables.API_URL + "client/client", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setIdClient(content.id);
      setNomClient(content.ClientNom);
      setPrenomClient(content.ClientPrenom);
      setMail(content.ClientMail);
      setAdresse(content.ClientAdresse);
      setContact(content.ClientContact);
    } catch (error) {
      notifyInfo();
    }
  }

  async function EditClient(client) {
    handleProfileOpen();

    setIdClient(client.id);
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
        id: id,
        ClientNom: ClientNom,
        ClientPrenom: ClientPrenom,
        ClientMail: ClientMail,
        ClientAdresse: ClientAdresse,
        ClientContact: ClientContact,
        ClientMotPasse: ClientMotPasse,
      });
      notifyEdit();
      setIdClient("");
      setNomClient("");
      setPrenomClient("");
      setMail("");
      setAdresse("");
      setContact("");
      handleCloseChild();
      VoirDetail();
    } catch (error) {
      notifyDanger();
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

    await fetch(variables.API_URL + "client/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setRedirect(true);
  }

  if (redirect) {
    return navigate("/");
  }

  return (
    <React.Fragment>
      <Box>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "21px",
            color: "#000",
            opacity: "0.5",
          }}
        >
          {ClientNom ? ClientNom : "Vous n'êtes pas connecté"}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "21px",
            color: "#000",
          }}
        >
          {ClientPrenom ? ClientPrenom : ""}
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
            <Avatar sx={{ width: 52, height: 52 }}>
              {ClientNom ? ClientNom[0].toUpperCase() : ""}
            </Avatar>
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
            <Button autoFocus onClick={Deconnecter} variant="outlined">
              Continuer
            </Button>
            <Button onClick={handleClickClose} autoFocus color="error">
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Dialog
        open={openProfile}
        onClose={handleProfileClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            margin: "auto",
          }}
        >
          <Avatar
            sx={{
              width: 52,
              height: 52,
              margin: "auto",
            }}
          >
            {ClientNom ? ClientNom[0].toUpperCase() : ""}
          </Avatar>

          {ClientNom
            ? "Bienvenue" + " " + ClientNom
            : "Vous n'êtes pas connecté"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p id="parent-modal-description"></p>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Nom :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {ClientNom}
              </Typography>
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Prénom :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {ClientPrenom}
              </Typography>
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Mail :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {ClientMail}
              </Typography>
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Adresse :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {ClientAdresse}
              </Typography>
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#000",
              }}
            >
              Contact :
              <Typography
                sx={{
                  fontWeight: "200",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#000",
                }}
              >
                {ClientContact}
              </Typography>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenChild} variant="outlined">
            Modifier
          </Button>
          <Button onClick={handleProfileClose} autoFocus color="error">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

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
                  size="small"
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
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail "
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
                  size="small"
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
                  size="small"
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
              <Button onClick={() => UpdateClient(id)}>Valider</Button>
              <Button onClick={handleCloseChild} color="error">
                Annuler
              </Button>
            </box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
