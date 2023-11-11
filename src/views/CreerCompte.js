import * as React from 'react';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoIsalosys from "../static/images/logoIsalosys.png";
import { variables } from "../Variables";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const style = {
    button: {
      background: '#6D071A',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 40,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}


const CreerCompte = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

 
  const navigate = useNavigate();
 
  const [clients, setclients] = useState("");
  const [ClientNom, setNom] = useState("");
  const [ClientPrenom, setPrenom] = useState("");
  const [ClientAdresse, setAdresse] = useState("");
  const [ClientMail, setMail] = useState("");
  const [ClientContact, setContact] = useState("");
  const [ClientMotPasse, setMotPasse] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function AddClient(event)
    {
      event.preventDefault();
      await fetch(variables.API_URL+'client',{
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        ClientNom,
        ClientPrenom,
        ClientMail,
        ClientAdresse,
        ClientContact,
        ClientMotPasse
      })
    });
     
    setRedirect(true);
  }

  if(redirect){
    return navigate("/");
  }
    

 /* const addClient = () => {
    (variables.API_URL)
      .post("/client", {
        ClientNom: Nom,
        ClientPrenom: Prenom,
        ClientMail: Mail,
        ClientAdresse: Adresse,
        ClientContact: Contact,
      })
      .then((response) => {
        handleCloseAdd();
        fet_data();
        empty();
        notify();
      })
      .catch((error) => {
        alert(error);
      });
  };
*/


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar alt="Avion1" src={logoIsalosys} sx={{ width:250,height: 90, m:0}} variant="square">
        </Avatar>  
        

          <Box component="form" noValidate onSubmit={AddClient} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  autoComplete="given-name"
                  name="Nom"
                  required
                  fullWidth
                  id="Nom"
                  label="Nom"
                  value={ClientNom}
                  onChange={(event)=>{setNom(event.target.value)}}
                  autoFocus
                  InputLabelProps={{
                    style:{
                      fontSize:14
                    }}}
                    InputProps={{
                      style:{
                        fontSize:14
                      }}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="Prenom"
                  label="Prénom(s)"
                  name="Prenom"
                  value={ClientPrenom}
                  onChange={(event)=>{setPrenom(event.target.value)}}
                  autoComplete="family-name"
                  InputLabelProps={{
                    style:{
                      fontSize:14
                    }}}
                    InputProps={{
                      style:{
                        fontSize:14
                      }}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="email"
                  label="Addresse mail "
                  name="email"
                  value={ClientMail}
                  onChange={(event)=>{setMail(event.target.value)}}
                  autoComplete="email"
                  InputLabelProps={{
                    style:{
                      fontSize:14
                    }}}
                    InputProps={{
                      style:{
                        fontSize:14
                      }}}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                size='small'
                required
                fullWidth
                id="Adresse"
                label="Adresse"
                name="Adresse"
                value={ClientAdresse}
                onChange={(event)=>{setAdresse(event.target.value)}}
                autoComplete="family-name"
                InputLabelProps={{
                  style:{
                    fontSize:14
                  }}}
                  InputProps={{
                    style:{
                      fontSize:14
                    }}}
              />
            </Grid>
              <Grid item xs={12}>
              <TextField
                size='small'
                required
                fullWidth
                id="contact"
                label="Contact"
                name="contact"
                type="number"
                value={ClientContact}
                onChange={(event)=>{setContact(event.target.value)}}
                autoComplete="contact"
                InputLabelProps={{
                  style:{
                    fontSize:14
                  }}}
                  InputProps={{
                    style:{
                      fontSize:14
                    }}}
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  value={ClientMotPasse}
                  onChange={(event)=>{setMotPasse(event.target.value)}}
                  autoComplete="new-password"
                  InputLabelProps={{
                    style:{
                      fontSize:14
                    }}}
                    InputProps={{
                      style:{
                        fontSize:14
                      }}}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={style.button}
              sx={{ mt: 3, mb: 2}}
              onClick={AddClient}
            >
              S'enregistrer
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Avez-vous déjà un compte? Auhtentifiez-vous
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreerCompte;