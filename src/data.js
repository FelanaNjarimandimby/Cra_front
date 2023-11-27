import avion1 from "../src/static/images/avion1.jpg";
import AvionC3 from "../src/static/images/AvionC3.jpg";
import AvionC4 from "../src/static/images/AvionC4.jpg";
import informationbutton from "../src/static/images/informationbutton.png";
import airplane from "../src/static/images/airplane.png";
import reserve from "../src/static/images/reserve.png";

export const navItems = [
  {
    id: 1,
    name: "Accueil",
    route: "/home",
  },
  {
    id: 2,
    name: "Reservation",
    route: "/reservationClient",
  },
  {
    id: 3,
    name: "Vos réservations",
    route: "/voirList",
  },
];

export const navItemsAdmin = [
  {
    id: 1,
    name: "Accueil",
    route: "/accueil",
  },
  {
    id: 2,
    name: "Reservation",
    route: "/reservation",
  },
  {
    id: 3,
    name: "Nos agents",
    route: "/agents",
  },
];

export const searchNavItems = [
  {
    id: 1,
    normalText: "Reseration",
    boldText: "Reservez votre CARGO",
    icon: reserve,
  },
  {
    id: 2,
    normalText: "Transport",
    boldText: "Suivez le transport de votre fret",
    icon: airplane,
  },
  {
    id: 3,
    normalText: "A propos",
    boldText: "Votre détails",
    icon: informationbutton,
  },
];

export const destinations = [
  {
    id: 1,
    name: "Sir Seewoosagur Ramgoolam",
    location: "Maurice",
    image: avion1,
    ratingImage: "<LocationOn/>",
    route: "/destination",
  },
  {
    id: 2,
    name: "Ivato, Antananarivo",
    location: "Madagascar",
    image: AvionC3,
    ratingImage: AvionC3,
    route: "/",
  },
  {
    id: 3,
    name: "Paris-Charles de Gaulle",
    location: "France",
    image: AvionC4,
    ratingImage: AvionC3,
    route: "/",
  },
];
