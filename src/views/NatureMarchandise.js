import React, {useEffect, useState} from "react";
import axios from "axios";
import { variables } from "../Variables";
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";

const NatureMarchandise = () => {
    const [typeTarifs, settarifs] = useState([]);
    const [natures, setnatures] = useState([]);
    const [NatureMarchandiseID, setIDNature] = useState("");
    const [NatureMarchandiseLibelle, setLibelle] = useState("");
    const [TypeTarifID, setIDTypeTarif] = useState("");
    
    const [TarifLibelle, setTarifLibelle] = useState("");
    


    useEffect(() => {
        (async ()=> await ListNatures())();
        (async ()=> await ListTarifs())();
    }, []);
 
    //Lister les marchandises
    async function ListNatures()
    {
        axios.get(variables.API_URL+'nature_marchandise')
        .then(res => setnatures(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    //Lister les natures des marchandises
    async function ListTarifs()
    {
        axios.get(variables.API_URL+'typetarif')
        .then(res => settarifs(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));



    }

    //Ajouter une marchandise
    async function AddNature(event)
    {
        event.preventDefault();
        try{
            await axios.post(variables.API_URL+'nature_marchandise',{
                NatureMarchandiseLibelle: NatureMarchandiseLibelle,
                TarifLibelle: TarifLibelle,
            });
            alert("Nature de la marchandise bien enregistrée");
            setIDNature("");
            setLibelle("");
            setTarifLibelle("");
            ListNatures();
            }catch (error){
                alert(error);
            }
    }

    //Récupérer propriétés du marchandise dans input
    async function EditNature(nature){
        setIDNature(nature.NatureMarchandiseID);
        setLibelle(nature.NatureMarchandiseLibelle);
        setTarifLibelle(nature.TarifLibelle);
    }

    
    return(
        <div className="container">
            <h1>Toutes les natures</h1>
            <div className="row">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="NatureMarchandiseID" hidden value={NatureMarchandiseID}
                        onChange={(event)=>{setIDNature(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Libelle</label>
                        <input type="text" className="form-control" id="NatureMarchandiseLibelle" value={NatureMarchandiseLibelle}
                        onChange={(event)=>{setLibelle(event.target.value)}} />
                    </div>
                    <div className="form-group">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type tarif</InputLabel>
                            <Select
                            defaultValue={"TarifLibelle"}
                            labelId="demo-simple-select-label" 
                            id="TarifLibelle"
                            value={TarifLibelle} 
                            label="TarifLibelle"
                            onChange={(event)=>{setTarifLibelle(event.target.value)}}>
                            {typeTarifs.map((typetarif, index) => (
                                <MenuItem key={index} value={typetarif.TarifLibelle}>{typetarif.TarifLibelle}</MenuItem>
                            ))}
                            </Select>
                    </FormControl>
                </div>



                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={AddNature}>Ajouter</button>
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
                                <th>Tarif Libelle</th>
                                <th>Libelle</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {natures.map((nature, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{nature.NatureMarchandiseID}</td>
                                        <td>{nature.TarifLibelle}</td>
                                        <td>{nature.NatureMarchandiseLibelle}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={()=>EditNature(nature)}>Modifier</button>
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
    );
}

export default NatureMarchandise;

