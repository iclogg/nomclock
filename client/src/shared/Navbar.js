import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { AppBar, Box, Typography, Toolbar, Link } from "@mui/material";

import { NavLink as RouterLink } from "react-router-dom";

import Logout from "../users/Logout";

import { AuthContext } from "../utils/auth-context";

const pages = [
    { auth: true, text: "Home", url: "/user" },
    /*     { auth: true, text: "Add Pet", url: "/pets/new" },
     */
    { auth: false, text: "Go to Signup", url: "/user/new" },
    { auth: false, text: "Go to Login", url: "/user/login" },
];

const NavBar = (props) => {
    const auth = useContext(AuthContext);
    let location = useLocation();

    return (
        <AppBar
            position={auth.isLoggedIn ? "static" : "fixed"}
            sx={{ backgroundColor: "rgba(237, 240, 242, 0.75)" }} // primary.main with transparency 0.75
        >
            <Toolbar
                sx={{
                    paddingLeft: "2px",
                }}
            >
                <Typography
                    sx={{
                        ml: 1,
                        mr: 2,
                        fontFamily: "Shadows Into Light, cursive",
                        fontSize: "40px",
                        fontWeight: "bold",
                        color: "#e81e62",
                        textShadow: "5px 1px 5px white",
                    }}
                >
                    NOMCLOCK{" "}
                </Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                        textAlign: "right",
                    }}
                >
                    {pages.map((page) => {
                        /* Toggles Login/Signup */
                        if (
                            location.pathname === page.url &&
                            auth.isLoggedIn === false
                        ) {
                            return null;
                        }
                        /* Toggles auth/no auth options */
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
                                        verticalAlign: "sub",
                                        textDecoration: "none",
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
