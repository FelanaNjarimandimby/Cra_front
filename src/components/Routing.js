import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import CreerCompte from "../views/CreerCompte";
import Home from "../views/Home";
import Client from "../views/Client";
import Table from "../views/Table";
import Marchandise from "../views/Marchandise";
import NatureMarchandise from "../views/NatureMarchandise";
import TypeTarif from "../views/TypeTarif";
import AccueilAdmin from "../views/Paramètres/AccueilAdmin";
import AgentLogin from "../views/Admin/AgentLogin";
import AgentCreerCompte from "../views/Admin/AgentCreerCompte";
import NatureMarchandiseAdmin from "../views/GérerReservation/NatureMarchandiseAdmin";
import TarifAdmin from "../views/GérerTarif/TarifAdmin";
import CoutFretAdmin from "../views/GérerTarif/CoutFretAdmin";

import MiniDrawer from "../views/MiniDrawer";
import Reservation_Client from "../views/Reservation_Client";
import Exemple from "../views/Exemple";
import GestionClient from "../views/GestionClient";
import Use from "../views/Use";
import AvatarT from "../views/AvatarT";
import DashboardT from "../views/AdminFiles/DashboardT";

import ClientAdmin from "../views/GérerClient/ClientAdmin";
import ReservationAdmin from "../views/GérerReservation/ReservationAdmin";
import Vol from "../views/GérerVols/Vol";
import VolAdmin from "../views/GérerVols/VolAdmin";
import Itineraire from "../views/GérerVols/Itineraire";
import ItineraireAdmin from "../views/GérerVols/ItineraireAdmin";
import AdminClient from "../views/Admin/AdminClient";
import Menu from "../views/Paramètres/MenuParametre";
import Reservation from "../views/GérerReservation/Reservation";
import VenteAdmin from "../views/GérerVentes/VenteAdmin";
import Vente from "../views/GérerVentes/Vente";
import LtaAdmin from "../views/GérerVentes/LtaAdmin";
import ReservationClient from "../views/ClientFiles/ResevationClient";
import Principale from "./pages/Principale";
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
import DashboardAdmin from "../views/Admin/DashboardAdmin";
import ListClientReservation from "../views/ClientFiles/ListClientReservation";
import ReservationConfirmation from "../views/GérerReservation/ReservationConfirmation";
import Confirmer from "../views/GérerReservation/Confirmer";
import Dash from "../Dashboard/ComponentsD/Dash";

import BarT from "../views/AdminFiles/BarT";
import Team from "../views/AdminFiles/Team";
import Invoices from "../views/AdminFiles/Invoices";
import Contact from "../views/AdminFiles/Contact";
import Form from "../views/AdminFiles/Form";
import Calendar from "../views/AdminFiles/Calendar";
import Line from "../views/AdminFiles/Line";
import Pie from "../views/AdminFiles/Pie";
import FAQ from "../views/AdminFiles/FAQ";
import Geography from "../views/AdminFiles/Geography";

import ClientProfile from "../views/ClientFiles/ClientProfile";
import LTA from "../views/LTA";
import Sidebar from "./ComponentsAdmin/Sidebar";
import Lister from "../views/Lister";

function Routing() {
  return (
    <BrowserRouter>
      <div className="Routing">
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/creerCompte" Component={CreerCompte} />
          <Route path="/home" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/marchandise" Component={Marchandise} />
          <Route path="/nature" Component={NatureMarchandise} />
          <Route path="/tarif" Component={TypeTarif} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/drawer" element={<MiniDrawer />} />
          <Route path="/table" element={<Table />} />
          <Route path="/reservation_client" element={<Reservation_Client />} />
          <Route path="/exemple" element={<Exemple />} />
          <Route path="/gestionClient" element={<GestionClient />} />
          <Route path="/use" element={<Use />} />
          <Route path="/avatar" element={<AvatarT />} />
          <Route path="/dashboard" element={<DashboardT />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<BarT />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/clientAdmin" element={<ClientAdmin />} />
          <Route path="/reservationAdmin" element={<ReservationAdmin />} />
          <Route path="/vol" element={<Vol />} />
          <Route path="/volAdmin" element={<VolAdmin />} />
          <Route path="/itineraires" element={<Itineraire />} />
          <Route path="/itineraireAdmin" element={<ItineraireAdmin />} />
          <Route path="/AdminClient" element={<AdminClient />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/accueilAdmin" element={<AccueilAdmin />} />
          <Route path="/agentCreerCompte" element={<AgentCreerCompte />} />
          <Route path="/agentLogin" element={<AgentLogin />} />
          <Route path="/natureAdmin" element={<NatureMarchandiseAdmin />} />
          <Route path="/tarifAdmin" element={<TarifAdmin />} />
          <Route path="/coutFret" element={<CoutFretAdmin />} />
          <Route path="/venteAdmin" element={<VenteAdmin />} />
          <Route path="/vente" element={<Vente />} />
          <Route path="/ltaAdmin" element={<LtaAdmin />} />
          <Route path="/reservationClient" element={<ReservationClient />} />

          <Route path="/generer_lta" element={<LTA />} />
          <Route path="/principale" element={<Principale />} />
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
          <Route path="/lister" element={<Lister />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/voirList" element={<ListClientReservation />} />
          <Route
            path="/voirListDemandeConfirmation"
            element={<ReservationConfirmation />}
          />
          <Route path="/confirmation" element={<Confirmer />} />
          <Route path="/accueil" element={<Dash />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Routing;
