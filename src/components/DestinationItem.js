import React from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocationOn from "@material-ui/icons/LocationOn";
import Link from "@mui/material/Link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DestinationItem = ({ name, location, image, ratingImage, route }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: {
            xs: "70vw",
            sm: "60vw",
            md: "auto",
          },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link onClick={handleClickOpen}>
          <img
            src={image}
            ute
            alt=""
            style={{ width: "100%", objectFit: "cover", cursor: "pointer" }}
          />
        </Link>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia />
                  <img
                    src={image}
                    ute
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Envoyez votre fret vers votre destination
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Typography
        sx={{
          mt: 1.25,
          fontFamily: "Poppins",
          fontWeight: "500",
          fontSize: "16px",
          color: "#161414",
          maxWidth: "252px",
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          alignItems: {
            xs: "flex-start",
            lg: "center",
          },
          justifyContent: "space-between",
          gap: 1,
          mt: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <LocationOn />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "13px",
              color: "#979797",
            }}
          >
            {location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DestinationItem;
