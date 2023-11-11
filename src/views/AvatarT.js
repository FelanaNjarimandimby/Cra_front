import * as React from 'react';
import {useEffect, useState} from "react";
import { variables } from "../Variables";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const AvatarT = () => {
  const [clients, setclients] = useState([]);
  const [ClientID, setIdClient] = useState("");
  const [ClientNom, setNomClient] = useState("");
  const [ClientPrenom, setPrenomClient] = useState("");
  const [ClientMail, setMail] = useState("");
  const [ClientAdresse, setAdresse] = useState("");
  const [ClientContact, setContact] = useState("");
  const [ClientMotPasse, setMotPasse] = useState("");

  useEffect(() => {
    Deconnecter();
    get();
  
  }, []);


async function Deconnecter()
{
  
  await fetch(variables.API_URL+'client/client',{
  method: 'GET',
  headers:{'Content-Type': 'application/json'},
  credentials: 'include'
}).then(res => console.log(res.data));
}

function get(string){
    let nom="nom";
    let res= nom.charAt(0).toUpperCase();
    return console.log(res); 
}

useEffect(() => {
    get();
    
}, []);

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


  return (
    
    <Stack direction="row" spacing={2}>
    <Button onClick={get} autoFocus>
    Annuler
  </Button>
      <Avatar {...stringAvatar('Kent Dodds')} />
      <Avatar {...stringAvatar('Jed Watson')} />
      <Avatar {...stringAvatar('Tim Neutkens')} />
    
      <table className="table table-striped">
      <thead>
          <tr>
              <th>ID</th>
              <th>Nom Client</th>
              <th>Prénom Client</th>
              <th>Mail</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Mot de passe</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
          {clients.map((client, index) => {
              return(
                  <tr key={index}>
                      <td>{client.ClientID}</td>
                      <td>{client.ClientNom}</td>
                      <td>{client.ClientPrenom}</td>
                      <td>{client.ClientMail}</td>
                      <td>{client.ClientAdresse}</td>
                      <td>{client.ClientContact}</td>
                      <td>{client.ClientMotPasse}</td>
                      <td>
                          <button className="btn btn-warning" >Modifier</button>
                          <button className="btn btn-danger" >Supprimer</button>
                      </td>
                  </tr>
                  );
          })}
      </tbody>
  </table>

  
  </Stack>
  );
}

export default AvatarT;