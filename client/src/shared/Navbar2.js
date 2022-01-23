import React, { useContext, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

import { NavLink as RouterLink } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";

import Logout from "../users/Logout";

const pages = [
    { auth: false, text: "Home", url: "/" },
    { auth: true, text: "Add Pet", url: "/pets/new" },
    { auth: true, text: "Update Pet", url: "/pets/:petId/update" },
    { auth: true, text: "Pet's own Page", url: "/pets/:petId" },
    { auth: true, text: "Your Page", url: "/user" },
    { auth: false, text: "Sign up", url: "/user/new" },
    { auth: false, text: " Login", url: "/user/login" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = (props) => {
    const auth = useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        console.log(auth.isLoggedIn);
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <Box>
                    {pages.map((page) => {
                        if (auth.isLoggedIn === page.auth) {
                            return (
                                <Link
                                    component={RouterLink}
                                    sx={{
                                        my: 1,
                                        mx: 1,
                                        color: "white",
                                    }}
                                    to={page.url}
                                    key={page.url}
                                >
                                    {page.text}
                                </Link>
                            );
                        }
                    })}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
/* 
  {
      pages.map((page) => (
          <MenuItem key={page.url} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page.text}</Typography>
          </MenuItem>
      ));
  }

   
                        {pages.map((page) => (
                            <Button
                                key={page.url}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                                component={RouterLink}
                                to={page.url}
                            >
                                {page.text}
                            </Button>
                        ))} */
