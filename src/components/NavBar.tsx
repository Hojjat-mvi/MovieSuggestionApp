import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../features/Login";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const logOut = () => {
    dispatch(logout("normal"));
    navigate("/login");
  };

  let email = localStorage.getItem("email");

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <Button
              sx={{
                flexGrow: 0,
                display: { xs: "none", sm: "block" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              onClick={handleClick}
            >
              Profile
            </Button>
            <Button
              sx={{
                flexGrow: 0,
                display: { xs: "none", sm: "block" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              onClick={() => {
                navigate("/movie/create");
              }}
            >
              Create
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>{email}</Typography>
            </Popover>
            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
