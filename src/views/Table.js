import React, { useEffect, useState } from "react";
import axios from "axios";
import { variables } from "../Variables";

import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
// Import Material Icons
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import Refresh from "@material-ui/icons/Refresh";
import Delete from "@material-ui/icons/Delete";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table = () => {
  const [clients, setclients] = useState([]);
  const [IDClient, setIdClient] = useState("");
  const [NomClient, setNomClient] = useState("");
  const [Mail, setMail] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Telephone, setTelephone] = useState("");

  useEffect(() => {
    (async () => await ListClients())();
  }, []);

  async function ListClients() {
    axios
      .get(variables.API_URL + "client")
      .then((res) => setclients(res.data))
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const defaultMaterialTheme = createTheme();

  const columns = [
    {
      title: "Avatar",
      field: "avatar",
      render: (rowData) => (
        <img style={{ height: 36, borderRadius: "50%" }} src={rowData.avatar} />
      ),
    },
    { title: "Id", field: "IDClient" },
    { title: "Nom", field: "NomClient" },
    { title: "Mail", field: "Mail" },
    { title: "Adresse", field: "Adresse" },
    { title: "Telephone", field: "Telephone" },
  ];

  const tableRef = React.createRef();

  return (
    <>
      <div className="container">
        <div className="App wrapper">
          <h2>Liste de tous les clients</h2>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title="Clients"
              tableRef={tableRef}
              icons={tableIcons}
              columns={columns}
              data={clients}
              actions={[
                {
                  icon: Refresh,
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                  onClick: () =>
                    tableRef.current && tableRef.current.onQueryChange(),
                },
                {
                  icon: SaveAlt,
                  tooltip: "Save User",
                  onClick: (event, rowData) =>
                    console.log("You saved ", rowData),
                },
                {
                  icon: Delete,
                  tooltip: "Delete User",
                  onClick: (event, rowData) =>
                    console.log("You want to delete ", rowData),
                },
              ]}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default Table;
