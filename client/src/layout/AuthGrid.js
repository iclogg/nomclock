import { Typography, Grid, Paper, Link } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

const AuthGrid = (props) => {
    let location = useLocation();

    const locationOptions = {
        login: {
            linkText: "SIGNUP HERE",
            linkQuestion: "DON'T HAVE AN ACCOUNT?",
            linkUrl: "/user/new",
            headerText: "WELCOME BACK TO",
        },
        signup: {
            linkText: "LOGIN HERE",
            linkQuestion: "HAVE AN ACCOUNT ALREADY?",
            linkUrl: "/user/login",
            headerText: "WELCOME TO",
        },
    };

    const locationVariables =
        location.pathname === "/user/login"
            ? locationOptions.login
            : locationOptions.signup;

    return (
        <Grid
            container
            height="100vh"
            alignItems="flex-end"
            justifyContent="center"
            sx={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Grid
                item
                sm={12}
                pt={10}
                sx={{ display: { xs: "none", sm: "block" } }}
            >
                <Typography
                    align="center"
                    variant="h1"
                    sx={{
                        fontFamily: "Shadows Into Light, cursive",
                        fontWeight: "bold",
                        color: "secondary.dark",
                        textShadow: "3px 1px 3px #eceff1" /* primary.main */,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "2rem",
                        }}
                    >
                        {" "}
                        {locationVariables.headerText}
                    </Typography>{" "}
                    NOMCLOCK{" "}
                </Typography>
            </Grid>

            <Grid
                item
                xs={12}
                pt={10}
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                <Typography
                    align="center"
                    variant="h2"
                    sx={{
                        fontFamily: "Shadows Into Light, cursive",
                        fontWeight: "bold",
                        color: "secondary.dark",
                        textShadow: "5px 1px 5px #eceff1" /* primary.main */,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "2rem",
                        }}
                    >
                        {" "}
                        {locationVariables.headerText}
                    </Typography>{" "}
                    NOMCLOCK{" "}
                </Typography>
            </Grid>

            <Grid item xs={10} md="auto" mb={15}>
                <Paper>
                    {props.children}

                    <Typography
                        variant="body2"
                        sx={{
                            textShadow: "5px 1px 5px white",
                        }}
                        p={2}
                    >
                        {locationVariables.linkQuestion}
                        <Link
                            component={RRDLink}
                            to={locationVariables.linkUrl}
                            sx={{
                                textDecoration: "none",
                            }}
                        >
                            <br />
                            <Typography
                                variant="span"
                                sx={{
                                    fontFamily: "Shadows Into Light, cursive",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: "secondary.dark",
                                    textShadow: "1px 1px 1px",
                                }}
                            >
                                {locationVariables.linkText}
                            </Typography>
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AuthGrid;
