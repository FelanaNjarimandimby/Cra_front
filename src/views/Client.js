import React, {useEffect, useState} from "react";
import axios from "axios";
import { variables } from "../Variables";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
// Import Material Icons
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const Client = () => {

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
            //(async ()=> await ListClients())();
        //(async ()=> await FindClientByID(IDClient))();
    }, []);
 

    //Dialog
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


    //Lister les clients
    async function ListClients()
    {
        axios.get(variables.API_URL+'client')
        .then(res => setclients(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
  /*  async function Deconnecter()
    {
    
    await fetch(variables.API_URL+'client/client',{
    method: 'GET',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include'
    }).then(res => console.log(res.data));
    }*/


    //Récupérer l'identifiant du client
    async function find(IDClient)
    {
        /*axios.get(variables.API_URL+'client/'+IDClient,{
        IDClient: IDClient})
        .then(res => console.log(res.data));
        //.then(res =>setclients(res.data));*/

        const res = await axios.get(variables.API_URL+'client/'+IDClient,{
            IDClient: IDClient
        });
        setclients(res.data) ;
        alert("recherche avec succès");
        setIdClient("");
    }

    async function handleFilter(event)
    {
        const newData = clients.filter(row => {
            return row.ClientNom.toLowerCase().includes(event.target.value.toLowerCase())
        })

        setclients(newData);
    }

    //Ajouter un client
    async function AddClient(event)
    {
        event.preventDefault();
        try{
            await axios.post(variables.API_URL+'client',{
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  ClientNom,
                  ClientPrenom,
                  ClientMail,
                  ClientAdresse,
                  ClientContact,
                  ClientMotPasse
                })
              });
            alert("Client ajouté avec succès");
            setIdClient("");
            setNomClient("");
            setPrenomClient("");
            setMail("");
            setAdresse("");
            setContact("");
            setMotPasse("");
            ListClients();
            }catch (error){
                alert(error);
            }
    }

    //Récupérer propriétés du client dans input
    async function EditClient(client){
        setIdClient(client.ClientID);
        setNomClient(client.ClientNom);
        setPrenomClient(client.ClientPrenom);
        setMail(client.ClientMail);
        setAdresse(client.ClientAdresse);
        setContact(client.ClientContact);
        setMotPasse(client.ClientMotPasse);
    }
 
    //Modifier un client
    async function UpdateClient(IDClient)
    {
        try{
            await axios.put(variables.API_URL+'client/'+IDClient,{
                IDClient: ClientID,
                NomClient: ClientNom,
                PrenomClient: ClientPrenom,
                Mail: ClientMail,
                Adresse: ClientAdresse,
                Contact: ClientContact,
                MotPasse: ClientMotPasse
            });
            alert("Modification de client avec succès");
            setIdClient("");
            setNomClient("");
            setPrenomClient("");
            setMail("");
            setAdresse("");
            setContact("");
            setMotPasse("");
            ListClients();
            }catch (error){
                alert(error);
            }
    }

    //Supprimer un client
    async function DeleteClient(IDClient)
    {
        if(window.confirm('Etes-vous sur de vouloir supprimer?')){
            try{
                await axios.delete(variables.API_URL+'client/'+IDClient);
                alert("Client supprimé avec succès");
                setIdClient("");
                setNomClient("");
                setPrenomClient("");
                setMail("");
                setAdresse("");
                setContact("");
                setMotPasse("");
                ListClients();
            }catch (error){
                alert(error);
            }
        }
    }

    return(
        <>
        <div className="container">
        <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
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
  
        
            <h1>Tous les clients</h1>

            {ClientNom ? 'Hi' + ' ' + ClientNom : 'You are not logged in'}
            <div className="row">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="IDClient" hidden value={ClientID}
                        onChange={(event)=>{setIdClient(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Nom du client</label>
                        <input type="text" className="form-control" id="NomClient" value={ClientNom}
                        onChange={(event)=>{setNomClient(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Prénom du client</label>
                        <input type="text" className="form-control" id="PrenomClient" value={ClientPrenom}
                        onChange={(event)=>{setPrenomClient(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control" id="Mail" value={ClientMail}
                        onChange={(event)=>{setMail(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Adresse du client</label>
                        <input type="text" className="form-control" id="Adresse" value={ClientAdresse}
                        onChange={(event)=>{setAdresse(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Telephone du client</label>
                        <input type="text" className="form-control" id="Contact" value={ClientContact}
                        onChange={(event)=>{setContact(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe du client</label>
                        <input type="text" className="form-control" id="MotPasse" value={ClientMotPasse}
                        onChange={(event)=>{setMotPasse(event.target.value)}} />
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={AddClient}>Ajouter</button>
                        <button className="btn btn-default" onClick={()=>UpdateClient(ClientID)}>Modifier</button>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="IDClient2" value={ClientID}
                         onChange={(event)=>{setIdClient(event.target.value)}}/>
                        <button className="btn btn-default" onClick={()=>find(ClientID)}>Rechercher</button>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12">
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
                                        <td>{client.id}</td>
                                        <td>{client.ClientNom}</td>
                                        <td>{client.ClientPrenom}</td>
                                        <td>{client.ClientMail}</td>
                                        <td>{client.ClientAdresse}</td>
                                        <td>{client.ClientContact}</td>
                                        <td>{client.ClientMotPasse}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={()=>EditClient(client)}>Modifier</button>
                                            <button className="btn btn-danger" onClick={()=>find(client.ClientID)}>Supprimer</button>
                                        </td>
                                    </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default Client;

