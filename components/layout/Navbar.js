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
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";

export default function Navbar({ displayname }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (Cookies.get("authenticated")) {
      setAuthenticated(true);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/register/provider">
          <a style={{ color: "black", textDecoration: "none" }}>
            Register as Issuing Institution
          </a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/register/employer">
          <a style={{ color: "black", textDecoration: "none" }}>
            Register as Hiring Institution
          </a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/register/earner">
          <a style={{ color: "black", textDecoration: "none" }}>
            Register as an Individual
          </a>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar pposition="fixed">
          {authenticated ? (
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link href="/">
                  <a style={{ textDecoration: "none", color: "#fff" }}>
                    VYETI .
                  </a>
                </Link>
              </Typography>

              <Typography variant="body1" component="div" sx={{ mr: 1 }}>
                {displayname}
              </Typography>

              <LogOutButton />
            </Toolbar>
          ) : (
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link href="/">
                  <a style={{ textDecoration: "none", color: "#fff" }}>
                    VYETI .
                  </a>
                </Link>
              </Typography>
              <Button onClick={handleMenuOpen} color="inherit">
                Register
              </Button>
              {renderMenu}
              <WalletLogin />
            </Toolbar>
          )}
        </AppBar>
      </Box>
      <Box sx={{ m: 12 }} />
    </div>
  );
}
