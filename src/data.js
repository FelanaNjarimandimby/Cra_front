import avion1 from "../src/static/images/avion1.jpg";
import twitter1 from "../src/static/images/twitter1.jpg";
import LocationOn from "@material-ui/icons/LocationOn";

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
    route: "#",
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
    icon: twitter1,
  },
  {
    id: 2,
    normalText: "Transport",
    boldText: "Suivez le transport de votre fret",
    icon: twitter1,
  },
  {
    id: 3,
    normalText: "A propos",
    boldText: "Votre détails",
    icon: twitter1,
  },
];

export const destinations = [
  {
    id: 1,
    name: "Ivato",
    location: "Antananarivo, Madagascar",
    image: avion1,
  },
  {
    id: 2,
    name: "Aéroport Sir Seewoosagur Ramgoolam",
    location: "Maurice",
    image: avion1,
  },
  {
    id: 3,
    name: "Fort Mayers",
    location: "Florida, USA",
    image: avion1,
  },
  {
    id: 4,
    name: "Tucson",
    location: "Arizona, USA",
    image: avion1,
  },
  {
    id: 5,
    name: "St. Joseph",
    location: "Michigan, USA",
    image: avion1,
  },
];

export const hotelsRestaurants = [
  {
    id: 1,
    name: "Sir Seewoosagur Ramgoolam",
    location: "Maurice",
    image: avion1,
    ratingImage: "<LocationOn/>",
  },
  {
    id: 2,
    name: "Ivato, Antananarivo",
    location: "Madagascar",
    image: avion1,
    ratingImage: twitter1,
  },
  {
    id: 3,
    name: "Paris-Charles de Gaulle",
    location: "France",
    image: avion1,
    ratingImage: twitter1,
  },
];

export const travelItems = [
  {
    id: 1,
    image: avion1,
    location: "East Village Ice Cream Crawl",
    text: "We will stop at five different world-class ice cream shops on this 1.5 mile 1.5 hour tour.At each ice cream store we'll explore the story behind the business and see what makes the ice cream unique as you savor every…",
    calendarText: "Today",
    userText: "Maria Philips",
    commentsText: "2",
  },
  {
    id: 2,
    image: avion1,
    location: "Brooklyn Bridge cinematic photo walk",
    text: "This experience takes place at the Brooklyn Bridge Park and Brooklyn Bridge, but I’m always open to capture clients at different locations upon request for an additional charge. ",
    calendarText: "Today",
    userText: "James Calzoni",
    commentsText: "17",
  },
];

export const activities = [
  {
    id: 1,
    name: "Sailing",
    image: avion1,
  },
  {
    id: 2,
    name: "Climbing",
    image: avion1,
  },
  {
    id: 3,
    name: "Skiing",
    image: avion1,
  },
  {
    id: 4,
    name: "Hiking",
    image: avion1,
  },
];

export const footerNav = [
  {
    id: 1,
    title: "About",
    links: ["About Us", "Features", "News", "Menu"],
  },
  {
    id: 2,
    title: "Company",
    links: ["Why 2rism", "Partner With Us", "FAQ", "Blog"],
  },
  {
    id: 3,
    title: "Support",
    links: ["Account", "Support Center", "Feedback", "Contact Us"],
  },
];
