import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar({ title = "" }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src="/logo.png" width="50px" height="50px" alt="" />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
