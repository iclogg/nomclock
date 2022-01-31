import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* To support time pickers */
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Pet from "./pets/Pet";
import NewPet from "./pets/NewPet";
import NewUser from "./users/NewUser";
import User from "./users/User";
import Welcome from "./info/Welcome";
import Navbar from "./shared/Navbar";
import Login from "./users/Login";
import Footer from "./shared/Footer";

import { AuthContext } from "./utils/auth-context";
import { useAuth } from "./utils/auth-hook";

const theme = createTheme({
    palette: {
        primary: {
            light: "#ffffff",
            main: "#eceff1",
            dark: "#babdbe",
            contrastText: "#000",
        },
        secondary: {
            light: "#ff608f",
            main: "#e81e62",
            dark: "#af0039",
            contrastText: "#000",
        },
    },
});

const App = () => {
    const { token, userId, login, logout } = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Welcome />
                </Route>
                <Route path="/user" exact>
                    <User />
                </Route>

                <Route path="/pets/new" exact>
                    <NewPet />
                </Route>

                <Route path="/pets/:petId" exact>
                    <Pet />
                </Route>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Welcome />
                </Route>
                <Route path="/user/new" exact>
                    <NewUser />
                </Route>
                <Route path="/user/login" exact>
                    <Login />
                </Route>
            </Switch>
        );
    }

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthContext.Provider
                        value={{
                            isLoggedIn: !!token,
                            token,
                            userId,
                            login,
                            logout,
                        }}
                    >
                        <Router>
                            <Navbar />
                            <Container component="main">{routes}</Container>
                            <Footer />
                        </Router>
                    </AuthContext.Provider>
                </ThemeProvider>
            </LocalizationProvider>
        </React.Fragment>
    );
};

export default App;
