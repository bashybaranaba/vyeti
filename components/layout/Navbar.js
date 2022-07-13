import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import WalletLogin from "../auth/WalletLogin";
import LogOutButton from "../auth/LogOutButton";
import Cookies from "js-cookie";

export default function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (Cookies.get("authenticated")) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          {authenticated ? (
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                VYETI .
              </Typography>
              <Typography variant="h6" component="div">
                Register
              </Typography>
              <LogOutButton />
            </Toolbar>
          ) : (
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                VYETI .
              </Typography>
              <Typography variant="h6" component="div">
                Register
              </Typography>
              <WalletLogin />
            </Toolbar>
          )}
        </AppBar>
      </Box>
    </div>
  );
}
