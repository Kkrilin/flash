import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "10rem",
        color: "white",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
