import Sidebar from "../ComponentsAdmin/Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "@mui/material";
import Page1 from "./Page1";
import Page2 from "./Page2";

function Principale() {
  <>
    return (
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route path="/p1" exact Component={Page1} />
        <Route path="/p2" exact Component={Page2} />
      </Switch>
    </BrowserRouter>
    );
  </>;
}
export default Principale;
