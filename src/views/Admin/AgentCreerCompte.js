import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logoIsalosys from "../../static/images/logoIsalosys.png";
import { variables } from "../../Variables";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const style = {
  button: {
    background: "#6D071A",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
};

const AgentCreerCompte = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const navigate = useNavigate();

  const [agents, setagents] = useState("");
  const [AgentNom, setNom] = useState("");
  const [AgentPrenom, setPrenom] = useState("");
  const [AgentGenre, setGenre] = useState("");
  const [AgentAdresse, setAdresse] = useState("");
  const [AgentMail, setMail] = useState("");
  const [AgentContact, setContact] = useState("");
  const [AgentFonction, setFonction] = useState("");
  const [AgentMotPasse, setMotPasse] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function AddAgent(event) {
    event.preventDefault();
    await fetch(variables.API_URL + "agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        AgentNom,
        AgentPrenom,
        AgentGenre,
        AgentMail,
        AgentAdresse,
        AgentContact,
        AgentFonction,
        AgentMotPasse,
      }),
    });

    setRedirect(true);
  }

  if (redirect) {
    return navigate("/agentLogin");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="logo"
            src={logoIsalosys}
            sx={{ width: 250, height: 90, m: 0 }}
            variant="square"
          ></Avatar>

          <Box component="form" noValidate onSubmit={AddAgent} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="Nom"
                  required
                  fullWidth
                  id="Nom"
                  label="Nom"
                  value={AgentNom}
                  onChange={(event) => {
                    setNom(event.target.value);
                  }}
                  autoFocus
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="Prenom"
                  label="Prénom(s)"
                  name="Prenom"
                  value={AgentPrenom}
                  onChange={(event) => {
                    setPrenom(event.target.value);
                  }}
                  autoComplete="family-name"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="genre"
                  label="Genre "
                  name="genre"
                  value={AgentGenre}
                  onChange={(event) => {
                    setGenre(event.target.value);
                  }}
                  autoComplete="genre"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Addresse mail "
                  name="email"
                  value={AgentMail}
                  onChange={(event) => {
                    setMail(event.target.value);
                  }}
                  autoComplete="email"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="Adresse"
                  label="Adresse"
                  name="Adresse"
                  value={AgentAdresse}
                  onChange={(event) => {
                    setAdresse(event.target.value);
                  }}
                  autoComplete="family-name"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
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
                  type="number"
                  value={AgentContact}
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                  autoComplete="contact"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
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
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  value={AgentMotPasse}
                  onChange={(event) => {
                    setMotPasse(event.target.value);
                  }}
                  autoComplete="new-password"
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={style.button}
              sx={{ mt: 3, mb: 2 }}
              onClick={AddAgent}
            >
              S'enregistrer
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/agentLogin" variant="body2">
                  Avez-vous déjà un compte? Auhtentifiez-vous
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AgentCreerCompte;
