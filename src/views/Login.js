import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../Variables";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import avion1 from "../static/images/avion1.jpg";
import avion2 from "../static/images/avion2.jpg";
import logoIsalosys from "../static/images/logoIsalosys.png";
import { fontSize } from "@mui/system";
import CreerCompte from "./CreerCompte";
import { ToastContainer, toast } from "react-toastify";

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
  grid: {
    backgroundImage: `url(${avion1}), url(${avion2})`,
  },
};

const Login = () => {
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

  const [ClientMail, setMail] = useState("");
  const [ClientMotPasse, setMotPasse] = useState("");
  const [redirect, setRedirect] = useState(false);

  const SeConnecter = async (event) => {
    event.preventDefault();

    const response = await fetch(variables.API_URL + "client/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ClientMail,
        ClientMotPasse,
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
    return navigate("/home");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "98vh" }}>
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
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${avion2})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 350,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <Avatar
                alt="logoIsalosys"
                src={logoIsalosys}
                sx={{ width: 200, height: 70 }}
                variant="square"
              ></Avatar>

              <Box
                component="form"
                noValidate
                onSubmit={SeConnecter}
                sx={{ mt: 1 }}
              >
                <TextField
                  size="small"
                  margin="normal"
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
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  value={ClientMotPasse}
                  onChange={(event) => {
                    setMotPasse(event.target.value);
                  }}
                  autoComplete="current-password"
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se souvenir de moi"
                  sx={{
                    display: "flex",
                  }}
                />
                <Button
                  size="small"
                  type="submit"
                  fullWidth
                  style={style.button}
                  sx={{ mt: 3, mb: 2 }}
                  //href="home"
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
                    <Link href="/creerCompte" variant="body2" fontSize={12}>
                      {"Pas de compte? Créer un compte"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
