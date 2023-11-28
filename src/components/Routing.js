import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import CreerCompte from "../views/CreerCompte";
import Home from "../views/Home";
import Client from "../views/Client";
import AgentLogin from "../views/Admin/AgentLogin";
import AgentCreerCompte from "../views/Admin/AgentCreerCompte";
import NatureMarchandiseAdmin from "../views/GérerReservation/NatureMarchandiseAdmin";
import TarifAdmin from "../views/GérerTarif/TarifAdmin";
import CoutFretAdmin from "../views/GérerTarif/CoutFretAdmin";
import NonConfirmer from "../views/GérerReservation/NonConfirmer";

import ClientAdmin from "../views/GérerClient/ClientAdmin";
import ReservationAdmin from "../views/GérerReservation/ReservationAdmin";
import Vol from "../views/GérerVols/Vol";
import VolAdmin from "../views/GérerVols/VolAdmin";
import Itineraire from "../views/GérerVols/Itineraire";
import ItineraireAdmin from "../views/GérerVols/ItineraireAdmin";
import AdminClient from "../views/Admin/AdminClient";
import Reservation from "../views/GérerReservation/Reservation";
import VenteAdmin from "../views/GérerVentes/VenteAdmin";
import Vente from "../views/GérerVentes/Vente";
import LtaAdmin from "../views/GérerVentes/LtaAdmin";
import ReservationClient from "../views/ClientFiles/ResevationClient";
import ClientA from "../views/GérerClient/ClientA";
import MarchandiseA from "../views/GérerReservation/MarchandiseA";
import Nature from "../views/GérerReservation/Nature";
import LtaA from "../views/GérerVentes/LtaA";
import TarifA from "../views/GérerTarif/TarifA";
import AeroportA from "../views/GérerAeroport/AeroportA";
import AvionA from "../views/GérerAeroport/AvionA";
import AgentA from "../views/Admin/AgentA";
import EscaleA from "../views/GérerVols/EscaleA";
import CoutFretA from "../views/GérerTarif/CoutFretA";
import ListClientReservation from "../views/ClientFiles/ListClientReservation";
import ReservationConfirmation from "../views/GérerReservation/ReservationConfirmation";
import Confirmer from "../views/GérerReservation/Confirmer";
import Dash from "../Dashboard/ComponentsD/Dash";
import CompagnieA from "../views/GérerAeroport/CompagnieA";

import ClientProfile from "../views/ClientFiles/ClientProfile";
import Sidebar from "./ComponentsAdmin/Sidebar";

function Routing() {
  return (
    <BrowserRouter>
      <div className="Routing">
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/creerCompte" Component={CreerCompte} />
          <Route path="/home" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/reservation" element={<Reservation />} />

          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/clientAdmin" element={<ClientAdmin />} />
          <Route path="/reservationAdmin" element={<ReservationAdmin />} />
          <Route path="/vol" element={<Vol />} />
          <Route path="/volAdmin" element={<VolAdmin />} />
          <Route path="/itineraires" element={<Itineraire />} />
          <Route path="/itineraireAdmin" element={<ItineraireAdmin />} />
          <Route path="/AdminClient" element={<AdminClient />} />
          <Route path="/agentCreerCompte" element={<AgentCreerCompte />} />
          <Route path="/agentLogin" element={<AgentLogin />} />
          <Route path="/natureAdmin" element={<NatureMarchandiseAdmin />} />
          <Route path="/tarifAdmin" element={<TarifAdmin />} />
          <Route path="/coutFret" element={<CoutFretAdmin />} />
          <Route path="/venteAdmin" element={<VenteAdmin />} />
          <Route path="/vente" element={<Vente />} />
          <Route path="/ltaAdmin" element={<LtaAdmin />} />
          <Route path="/reservationClient" element={<ReservationClient />} />

          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/clients" element={<ClientA />} />
          <Route path="/marchandises" element={<MarchandiseA />} />
          <Route path="/natures" element={<Nature />} />
          <Route path="/ltas" element={<LtaA />} />
          <Route path="/tarifs" element={<TarifA />} />
          <Route path="/aeroports" element={<AeroportA />} />
          <Route path="/avions" element={<AvionA />} />
          <Route path="/agents" element={<AgentA />} />
          <Route path="/escales" element={<EscaleA />} />
          <Route path="/couts" element={<CoutFretA />} />
          <Route path="/voirList" element={<ListClientReservation />} />
          <Route
            path="/voirListDemandeConfirmation"
            element={<ReservationConfirmation />}
          />
          <Route path="/confirmation" element={<Confirmer />} />
          <Route path="/accueil" element={<Dash />} />
          <Route path="/reservationNonConfirme" element={<NonConfirmer />} />
          <Route path="/compagnies" element={<CompagnieA />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routing;
