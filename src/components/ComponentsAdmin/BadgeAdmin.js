import * as React from "react";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import { variables } from "../../Variables";
import { useState, useEffect } from "react";
import { rowsMetaStateInitializer } from "@mui/x-data-grid/internals";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function BadgeAdmin() {
  const notify = () =>
    toast.info("Vous n'avez pas de notification!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const navigate = useNavigate("");

  const [rows, setRows] = React.useState([]);

  async function ListNotifications() {
    axios
      .get(variables.API_URL + "notification/notification")
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }

  const navigateConfirmation = () => {
    if (rows.length === 0) {
      notify();
      navigate("/confirmation");
    } else navigate("/confirmation");
  };

  React.useEffect(() => {
    (async () => await ListNotifications())();
  }, []);

  return (
    <Stack spacing={2} direction="row">
      <IconButton onClick={navigateConfirmation}>
        <Badge badgeContent={rows.length} color="info">
          <MailIcon color="action" />
        </Badge>
      </IconButton>
    </Stack>
  );
}
