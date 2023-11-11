import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "../../Dashboard/pages/sidebarContext";

import Topbar from "../../Dashboard/pages/Topbar";

import Dashboard from "../../Dashboard/pages/Dashboard";
import Team from "../../Dashboard/pages/Team";
import Invoices from "../../Dashboard/pages/Invoices";
import Contacts from "../../Dashboard/pages/Contacts";
import Form from "../../Dashboard/pages/Form";
import Calendar from "../../Dashboard/pages/Calendar";
import Bar from "../../Dashboard/pages/Bar";
import Line from "../../Dashboard/pages/Line";
import Pie from "../../Dashboard/pages/Pie";
import FAQ from "../../Dashboard/pages/FAQ";
import Geography from "../../Dashboard/pages/Geography";

const DashboardT = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <Topbar />
            <Dashboard/>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DashboardT;