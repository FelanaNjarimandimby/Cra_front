import Container from "@mui/material/Container";

import { Box } from "@mui/system";
import InNav from "./InNav";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  //const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="100%"
      disableGutters
      sx={{
        height: "130px",
        borderRadius: {
          xs: "0px 0px 27px 27px",
          md: "0px 0px 54px 54px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <InNav />
      </Box>
    </Container>
  );
};
export default TopNav;
