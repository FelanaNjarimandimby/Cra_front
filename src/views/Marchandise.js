import React, {useEffect, useState} from "react";
import axios from "axios";
import { variables } from "../Variables";
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import Team from "../Dashboard/pages/Team";

const Marchandise = () => {
    const [natures, setnatures] = useState([]);
    const [marchandises, setmarchandises] = useState([]);
    const [MarchandiseID, setIDMarchandise] = useState("");
    const [MarchandiseDesignation, setDesignation] = useState("");
    const [MarchandiseNombre, setNombre] = useState("");
    const [MarchandisePoids, setPoids] = useState("");
    const [MarchandiseVolume, setVolume] = useState("");
    const [NatureMarchandiseLibelle, setLibelle] = useState("");
    


    useEffect(() => {
        (async ()=> await ListMarchandises())();
        (async ()=> await ListNatures())();
    }, []);
 
    //Lister les marchandises
    async function ListMarchandises()
    {
        axios.get(variables.API_URL+'marchandise')
        .then(res => setmarchandises(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    //Lister les natures des marchandises
    async function ListNatures()
    {
        axios.get(variables.API_URL+'nature_marchandise')
        .then(res => setnatures(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        

    }

    //Ajouter une marchandise
    async function AddMarchandise(event)
    {
        event.preventDefault();
        try{
            await axios.post(variables.API_URL+'marchandise',{
                MarchandiseDesignation: MarchandiseDesignation,
                MarchandiseNombre: MarchandiseNombre,
                MarchandisePoids: MarchandisePoids,
                MarchandiseVolume: MarchandiseVolume,
                NatureMarchandiseLibelle: NatureMarchandiseLibelle,
            });
            alert("Votre marchandise bien enregistrée");
            setIDMarchandise("");
            setDesignation("");
            setNombre("");
            setPoids("");
            setVolume("");
            setLibelle("");
            ListMarchandises();
            }catch (error){
                alert(error);
            }
    }

    //Récupérer propriétés du marchandise dans input
    async function EditMarchandise(marchandise){
        setIDMarchandise(marchandise.MarchandiseID);
        setDesignation(marchandise.MarchandiseDesignation);
        setNombre(marchandise.MarchandiseNombre);
        setPoids(marchandise.MarchandisePoids);
        setVolume(marchandise.MarchandiseVolume);
        setLibelle(marchandise.NatureMarchandiseLibelle);
    }

    
    return(
        <>
        <div className="container">
            <h1>Toutes les marchandises</h1>
            <div className="row">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="MarchandiseID" hidden value={MarchandiseID}
                        onChange={(event)=>{setIDMarchandise(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Designation</label>
                        <input type="text" className="form-control" id="MarchandiseDesignation" value={MarchandiseDesignation}
                        onChange={(event)=>{setDesignation(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Nombre Colis</label>
                        <input type="text" className="form-control" id="MarchandiseNombre" value={MarchandiseNombre}
                        onChange={(event)=>{setNombre(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Poids</label>
                        <input type="text" className="form-control" id="MarchandisePoids" value={MarchandisePoids}
                        onChange={(event)=>{setPoids(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Volume</label>
                        <input type="text" className="form-control" id="MarchandiseVolume" value={MarchandiseVolume}
                        onChange={(event)=>{setVolume(event.target.value)}} />
                    </div>
                    <div className="form-group">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Libelle</InputLabel>
                            <Select
                            defaultValue={"NatureMarchandiseLibelle"}
                            labelId="demo-simple-select-label" 
                            id="NatureMarchandiseLibelle"
                            value={NatureMarchandiseLibelle} 
                            label="NatureMarchandiseLibelle"
                            onChange={(event)=>{setLibelle(event.target.value)}}>
                            {natures.map((nature, index) => (
                                <MenuItem key={index} value={nature.NatureMarchandiseLibelle}>{nature.NatureMarchandiseLibelle}</MenuItem>
                            ))}
                            </Select>
                    </FormControl>
                </div>
                    


                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={AddMarchandise}>Ajouter</button>
                        <button className="btn btn-default">Modifier</button>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Designation</th>
                                <th>Nombre Colis</th>
                                <th>Poids</th>
                                <th>Volume</th>
                                <th>Libelle</th>
                                <th>Nature</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marchandises.map((marchandise, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{marchandise.MarchandiseID}</td>
                                        <td>{marchandise.MarchandiseDesignation}</td>
                                        <td>{marchandise.MarchandiseNombre}</td>
                                        <td>{marchandise.MarchandisePoids}</td>
                                        <td>{marchandise.MarchandiseVolume}</td>
                                        <td>{marchandise.Libelle}</td>
                                        <td>{marchandise.NatureMarchandiseLibelle}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={()=>EditMarchandise(marchandise)}>Modifier</button>
                                            <button className="btn btn-danger">Supprimer</button>
                                        </td>
                                    </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Team />
        </>
    );
}

export default Marchandise;
