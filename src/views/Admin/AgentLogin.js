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
import { ToastContainer, toast } from "react-toastify";
import styled from "@mui/system/styled";

// TODO remove, this demo shouldn't need to reset the theme.
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

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

const AgentLogin = () => {
  const notify = () =>
    toast.success("Authentification réussi!", {
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
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const navigate = useNavigate();

  const [agents, setagents] = useState("");
  const [AgentMail, setMail] = useState("");
  const [AgentMotPasse, setMotPasse] = useState("");
  const [redirect, setRedirect] = useState(false);

  const SeConnecter = async (event) => {
    event.preventDefault();

    const response = await fetch(variables.API_URL + "agent/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        AgentMail,
        AgentMotPasse,
      }),
    });

    if (response.status === 200) {
      notify();
      setRedirect(true);
    }

    if (response.status === 400) {
      notifyDanger();
      setRedirect(false);
    }
  };

  if (redirect) {
    return navigate("/accueil");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
        <Box sx={{ width: "100%", py: 8, px: -7 }}>
          <Grid>
            <Item>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "32px",
                  lineHeight: "48px",
                  color: "#161414",
                  textAlign: {
                    xs: "center",
                    md: "center",
                  },
                }}
              >
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

                  <Box
                    component="form"
                    noValidate
                    onSubmit={SeConnecter}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
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
                      onClick={SeConnecter}
                    >
                      Se connecter
                    </Button>
                    <Grid container>
                      <Grid item xs align="left">
                        <Link href="#" variant="body2" fontSize={12}>
                          Mot de passe oublié?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="/agentCreerCompte"
                          variant="body2"
                          fontSize={12}
                        >
                          {"Pas de compte? Créer un compte"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Typography>
            </Item>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AgentLogin;
