import { useContext } from "react";

import { AppBar, Box, Typography, Toolbar, Link } from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";

import { NavLink as RouterLink } from "react-router-dom";

import Logout from "../users/Logout";

import { AuthContext } from "../utils/auth-context";

/* TODO 
home icon button
responsiveness 
test if links can be btns instead
remove unsused imports
fix redirect bug refreshing page/ or logging in and out

*/

const pages = [
    { auth: true, text: "Home", url: "/user" },
    { auth: true, text: "Add Pet", url: "/pets/new" },

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
                        if (auth.isLoggedIn === page.auth) {
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
                        } else {
                            return null;
                        }
                    })}
                </Box>
                {auth.isLoggedIn && <Logout />}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
