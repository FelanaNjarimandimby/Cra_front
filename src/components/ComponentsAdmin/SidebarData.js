import React from "react";
import {
  ArrowDropDown,
  ArrowDropUp,
  Dashboard,
  SupportAgent,
  People,
  ProductionQuantityLimits,
  Category,
  BookOnline,
  FlightTakeoffOutlined,
  AirlineStopsOutlined,
  SellOutlined,
  TextSnippetOutlined,
  PriceChange,
  AirplaneTicket,
  Airlines,
} from "@mui/icons-material";

export const SidebarData = [
  {
    title: "Tableau de bord",
    path: "/accueil",
    icon: <Dashboard />,
  },
  {
    title: "Client",
    path: "/clients",
    icon: <People />,
  },
  {
    title: "Réservation",
    path: "#",
    icon: <BookOnline />,
    iconClosed: <ArrowDropDown />,
    iconOpened: <ArrowDropUp />,

    subNav: [
      {
        title: "Reservation",
        path: "/reservation",
        icon: <BookOnline />,
      },
      {
        title: "Marchandise",
        path: "/marchandises",
        icon: <ProductionQuantityLimits />,
      },
      {
        title: "Nature",
        path: "/natures",
        icon: <Category />,
      },
    ],
  },
  {
    title: "Vente",
    path: "#",
    icon: <SellOutlined />,
    iconClosed: <ArrowDropDown />,
    iconOpened: <ArrowDropUp />,

    subNav: [
      {
        title: "Vente",
        path: "/vente",
        icon: <SellOutlined />,
        cName: "sub-nav",
      },
      {
        title: "LTA",
        path: "/ltas",
        icon: <TextSnippetOutlined />,
        cName: "sub-nav",
      },
      {
        title: "Tarif",
        path: "/tarifs",
        icon: <PriceChange />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Vol",
    path: "#",
    icon: <FlightTakeoffOutlined />,

    iconClosed: <ArrowDropDown />,
    iconOpened: <ArrowDropUp />,

    subNav: [
      {
        title: "Vol",
        path: "/vol",
        icon: <FlightTakeoffOutlined />,
      },
      {
        title: "Itineraire",
        path: "/itineraires",
        icon: <AirlineStopsOutlined />,
      },
      {
        title: "Aéroport",
        path: "/aeroports",
        icon: <Airlines />,
      },
      {
        title: "Avion",
        path: "/avions",
        icon: <AirplaneTicket />,
      },
    ],
  },
  {
    title: "Agent",
    path: "/agents",
    icon: <SupportAgent />,
  },
];
