import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Icon,
} from "@mui/material";
import { SettingsSuggestRounded} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
// import AccountBoxRounded from '@mui/icons-material/AccountBoxRounded';
// import BorderColorRounded from '@mui/icons-material/BorderColorRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const settings = [
    { title: "Profile", to: '() => handleLogout', icon: 'AccountBoxRounded' },
    { title: "Edit profile", to: '/home', icon: 'BorderColorRounded' },
    { title: "Logout", to: '/home', icon: 'LogoutRoundedIcon' }
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={1} style={{backgroundColor:'#330000f0'}}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer", mr: 2 }}
          onClick={() => navigate("/")}
        >
          Ticket
        </Typography>
        <span>{isAuthenticated}</span>

        {/* {isAuthenticated && (
          <>
            <Button
              color="inherit"
              onClick={() => navigate("/home")}
              sx={{ mr: 1 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/ticker")}
              sx={{ mr: 2 }}
            >
              Tickets
            </Button>
          </>
        )} */}
        <Button
          color="inherit"
          onClick={() => navigate("/home")}
          sx={{ mr: 1 }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate("/ticker")}
          sx={{ mr: 2 }}
        >
          Tickets
        </Button>


        <Box sx={{ flexGrow: 1 }} />

        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Avatar
                sx={{ width: 32, height: 32, mr: 1, bgcolor: "secondary.main" }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Welcome {user?.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Box> */}

        <Box sx={{ display: "flex", alignItems: "center" }}>

          <Avatar
            sx={{ width: 32, height: 32, mr: 1, bgcolor: "secondary.main" }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome {user?.name}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsSuggestRounded />
          </IconButton>
          <Menu
            sx={{ mt: '40px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Logout
            </MenuItem> */}
            {settings.map((setting) => (
              <MenuItem key={setting.title} onClick={setting.to} sx={{ px: '40px' }}>
                {/* <Icon>{setting.icon}</Icon> */}
                {/* <setting.icon />///////// */}
                <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar >
  );
};

export default Header;
