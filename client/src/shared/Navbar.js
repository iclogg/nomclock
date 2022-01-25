import React, { useContext, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";

import Button from "@mui/material/Button";

import Link from "@mui/material/Link";

import { NavLink as RouterLink } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";

import Logout from "../users/Logout";

/* TODO 
home icon button
responsiveness 
test if links can be btns instead
remove unsused imports
fix redirect bug refreshing page/ or logging in and out

*/

const pages = [
    { auth: false, text: "Home", url: "/" },
    { auth: true, text: "Add Pet", url: "/pets/new" },
    { auth: true, text: "Update Pet", url: "/pets/:petId/update" },
    { auth: true, text: "Pet's own Page", url: "/pets/:petId" },
    { auth: true, text: "Your Page", url: "/user" },
    { auth: false, text: "Sign up", url: "/user/new" },
    { auth: false, text: " Login", url: "/user/login" },
];

const NavBar = (props) => {
    const auth = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography sx={{ mr: 2 }}>
                    <PetsIcon />
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    {pages.map((page) => {
                        if (
                            auth.isLoggedIn === page.auth ||
                            page.text === "Home"
                        ) {
                            return (
                                <Link
                                    exact
                                    component={RouterLink}
                                    sx={{
                                        my: 1,
                                        mx: 1,
                                        color: "primary.contrastText",
                                        "&:hover": {
                                            textDecoration: "none",
                                            color: "secondary.main",
                                        },
                                    }}
                                    to={page.url}
                                    key={page.url}
                                    activeStyle={{
                                        textDecoration: "none",
                                        color: "#e81e62",
                                        textShadow: "1px 1px 1px #babdbe",
                                    }}
                                >
                                    {page.text}
                                </Link>
                            );
                        }
                    })}
                </Box>
                {auth.isLoggedIn && (
                    <Button
                        color="secondary"
                        size="small"
                        onClick={auth.logout}
                    >
                        <LogoutIcon />
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
