import React, {useEffect, useState} from "react";
import axios from "axios";
import { variables } from "../Variables";


const TypeTarif = () => {
    const [typeTarifs, settarifs] = useState([]);
    const [TypeTarifID, setIDTarif] = useState("");
    const [TarifLibelle, setLibelle] = useState("");
    const [TarifValeur, setValeur] = useState("");
    const [TarifFraisAssurance, setFraisAssurance] = useState("");
    const [TarifAnnexe, setAnnexe] = useState("");
    


    useEffect(() => {
        (async ()=> await ListTarifs())();
    }, []);
 
    //Lister les marchandises
    async function ListTarifs()
    {
        axios.get(variables.API_URL+'typetarif')
        .then(res => settarifs(res.data))
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    //Ajouter une marchandise
    async function AddTarif(event)
    {
        event.preventDefault();
        try{
            await axios.post(variables.API_URL+'typetarif',{
                TarifLibelle: TarifLibelle,
                TarifValeur: TarifValeur,
                TarifFraisAssurance: TarifFraisAssurance,
                TarifAnnexe: TarifAnnexe,
            });
            alert("Type tarif bien enregistrée");
            setIDTarif("");
            setLibelle("");
            setValeur("");
            setFraisAssurance("");
            setAnnexe("");
            ListTarifs();
            }catch (error){
                alert(error);
            }
    }

    //Récupérer propriétés du marchandise dans input
    async function EditTarif(tarif){
        setIDTarif(tarif.TypeTarifID);
        setLibelle(tarif.TarifLibelle);
        setValeur(tarif.TarifValeur);
        setFraisAssurance(tarif.TarifFraisAssurance);
        setAnnexe(tarif.TarifAnnexe);
    }

    
    return(
        <div className="container">
            <h1>Toutes les tarifs</h1>
            <div className="row">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="TypeTarifID" hidden value={TypeTarifID}
                        onChange={(event)=>{setIDTarif(event.target.value)}} />
                    </div>
                    <div className="form-group">
                        <label>Libelle</label>    
                        <input type="text" className="form-control" id="TarifLibelle" value={TarifLibelle}
                            onChange={(event)=>{setLibelle(event.target.value)}} />
                    </div>

                    <div className="form-group">
                        <label>Valeur</label>
                        <input type="text" className="form-control" id="TarifValeur" value={TarifValeur}
                        onChange={(event)=>{setValeur(event.target.value)}} />
                    </div>
                    <div className="form-group">
                    <label>Frais Assurance</label>
                    <input type="text" className="form-control" id="TarifFraisAssurance" value={TarifFraisAssurance}
                    onChange={(event)=>{setFraisAssurance(event.target.value)}} />
                </div>
                <div className="form-group">
                <label>Frais Annexe</label>
                <input type="text" className="form-control" id="TarifAnnexe" value={TarifAnnexe}
                onChange={(event)=>{setAnnexe(event.target.value)}} />
            </div>

                    <div className="btn-toolbar">
                        <button className="btn btn-primary" onClick={AddTarif}>Ajouter</button>
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
                                <th>Libelle</th>
                                <th>Valeur</th>
                                <th>Assurance</th>
                                <th>Annexe</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeTarifs.map((typetarif, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{typetarif.TypeTarifID}</td>
                                        <td>{typetarif.TarifLibelle}</td>
                                        <td>{typetarif.TarifValeur}</td>
                                        <td>{typetarif.TarifFraisAssurance}</td>
                                        <td>{typetarif.TarifAnnexe}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={()=>EditTarif(typetarif)}>Modifier</button>
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

export default TypeTarif;

