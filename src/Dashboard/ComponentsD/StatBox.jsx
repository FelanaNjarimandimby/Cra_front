import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, progress, increase, icon }) => {
  return (
    <Box width="100%" m="0 30px" p="12px 0">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: "white" }}>
          {subtitle}
        </Typography>
        <Typography variant="h6" fontStyle="italic" sx={{ color: "white" }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
