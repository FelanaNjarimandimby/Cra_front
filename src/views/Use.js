import * as React from 'react';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { variables } from "../Variables";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import TopNav from '../components/TopNav';
import Navbar from '../components/Navbar';

export default function Use() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

//Dialog
const [Open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

const handleClickOpen = () => {
  setOpen(true);
};

const handleClickClose = () => {
  setOpen(false);
};



const [clients, setclients] = useState([]);
const [ClientID, setIdClient] = useState("");
const [ClientNom, setNomClient] = useState("");
const [ClientPrenom, setPrenomClient] = useState("");
const [ClientMail, setMail] = useState("");
const [ClientAdresse, setAdresse] = useState("");
const [ClientContact, setContact] = useState("");
const [ClientMotPasse, setMotPasse] = useState("");

useEffect(() => {
    (
        async ()=> {
            const response = await fetch(variables.API_URL+'client/client',{
                headers:{'Content-Type': 'application/json'},
                credentials: 'include',
            });
            const content = await response.json();

            setNomClient(content.ClientNom);
        })();
        //async ()=> await ListClients())();
    //(async ()=> await FindClientByID(IDClient))();
}, []);



  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function Deconnecter(event)
  {
    event.preventDefault();
    
    await fetch(variables.API_URL+'client/logout',{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include'
  });
   
  setRedirect(true);
}

if(redirect){
  return navigate("/");
}

  return (
    <React.Fragment>
    {ClientNom ? 'Hi' + ' ' + ClientNom : 'You are not logged in'}
    
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
    

    
    
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
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
    </React.Fragment>
  );
}