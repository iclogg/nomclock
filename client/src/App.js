import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* To support time pickers */
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

/* import Pet from "./pets/Pet";
 */ import PetNewDesign from "./pets/PetNewDesign";
/* import NewPet from "./pets/NewPet";
 */
import NewUser from "./users/NewUser";
import User from "./users/User";
import Navbar from "./shared/Navbar";
import Login from "./users/Login";

/* import Footer from "./shared/Footer";
 */
import { AuthContext } from "./utils/auth-context";
import { useAuth } from "./utils/auth-hook";

const theme = createTheme({
    palette: {
        primary: {
            light: "#ffffff",
            main: "#000" /* "#eceff1", */,
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
    typography: {
        fontFamily: `"Josefin Sans", sans-serif`,
        fontSize: 17,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Fixing verical placing of text caused by font.
                    paddingBottom: "0px",
                },
            },
        },
    },
});

const App = () => {
    const { token, userId, login, logout, authLoading } = useAuth();

    let routes;

    if (!authLoading) {
        if (token) {
            routes = (
                <Switch>
                    <Route path="/user" exact>
                        <User />
                    </Route>
                    {/* <Route path="/pets/new" exact>
                        <NewPet />
                    </Route> */}
                    <Route path="/pets/:petId" exact>
                        <PetNewDesign />
                    </Route>
                    <Redirect to="/user" />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/user/new" exact>
                        <NewUser />
                    </Route>
                    <Route path="/user/login" exact>
                        <Login />
                    </Route>
                    <Redirect to="/user/login" />
                </Switch>
            );
        }
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
                            <>{routes}</>
                            {/*  <Footer /> */}
                        </Router>
                    </AuthContext.Provider>
                </ThemeProvider>
            </LocalizationProvider>
        </React.Fragment>
    );
};

export default App;

/*   sx={{
         minHeight: "calc(100vh - 164px)",
         pt: "20px",
          }} */
/* sx={{ backgroundColor: "lightblue" }}
                                component="main" */
