import { Box, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box sx={{ textAlign: 'right' }}>
    <CircularProgress color="inherit" size={24} />
  </Box>
);
