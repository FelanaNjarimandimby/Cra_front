import React, {useEffect, useState} from "react";
import axios from "axios";
import { variables } from "../Variables";
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


const Exemple = () => {

    const [exemples, setExemple] = useState([]);
    const [ID, setId] = useState("");
    const [chiffre, setChiffre] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [cal1, setCal1] = useState("");
    const [cal2, setCal2] = useState("");

    useEffect(() => {
        (async ()=> await ListClients())();
        //(async ()=> await FindClientByID(IDClient))();
    }, []);
 
    //Lister les clients
    async function ListClients()
    {
        axios.get(variables.API_URL+'exemple')
        .then(res => setExemple(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
    //Ajouter un client
    async function AddClient(event)
    {
        event.preventDefault();
        try{
            await axios.post(variables.API_URL+'exemple',{
                chiffre: chiffre,
                firstname: firstname,
                lastname: lastname,
                cal1: cal1,
                cal2: cal2,
            });
            alert("Client ajouté avec succès");
            }catch (error){
                alert(error);
            }
    }

        //Récupérer propriétés du client dans input
        async function EditClient(exemple){
            setId(exemple.ID);
            setChiffre(exemple.chiffre);
            setFirstname(exemple.firstname);
            setLastname(exemple.lastname);
            setCal1(exemple.cal1);
            setCal2(exemple.cal2);
        }
    return(
        <>
        

        <div className="container">
            <h1>Tous les clients</h1>
            <div className="row">
                <form>

                    <div className="form-group">
                        <label>chiffre</label>
                        <input type="text" className="form-control" id="chiffre" value={chiffre}
                        onChange={(event)=>{setChiffre(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>firstname</label>
                        <input type="text" className="form-control" id="firstname" value={firstname}
                        onChange={(event)=>{setFirstname(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>lastname</label>
                        <input type="text" className="form-control" id="lastname" value={lastname}
                        onChange={(event)=>{setLastname(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>cal1</label>
                        <input type="text" className="form-control" id="cal1" value={cal1}
                        onChange={(event)=>{setCal1(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>cal2</label>
                        <input type="text" className="form-control" id="cal2" value={cal2}
                        onChange={(event)=>{setCal2(event.target.value)}} />
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={AddClient}>Ajouter</button>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>chiffre</th>
                                <th>firstname</th>
                                <th>lastname</th>
                                <th>name</th>
                                <th>cal1</th>
                                <th>cal2</th>
                                <th>cal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exemples.map((exemple, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{exemple.ID}</td>
                                        <td>{exemple.chiffre}</td>
                                        <td>{exemple.firstname}</td>
                                        <td>{exemple.lastname}</td>
                                        <td>{exemple.name}</td>
                                        <td>{exemple.cal1}</td>
                                        <td>{exemple.cal2}</td>
                                        <td>{exemple.cal}</td>
                                        <td>
                                        <button className="btn btn-warning" onClick={()=>EditClient(exemple)}>Modifier</button>
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

export default Exemple;

