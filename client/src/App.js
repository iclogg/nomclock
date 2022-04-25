import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/mui-theme-customization";

/* To support time pickers */
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
//

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import Pet from "./pets/Pet";
import NewUser from "./users/NewUser";
import User from "./users/User";
import Navbar from "./shared/Navbar";
import Login from "./users/Login";

import { AuthContext } from "./utils/auth-context";
import { useAuth } from "./utils/auth-hook";

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
                    <Route path="/pets/:petId" exact>
                        <Pet />
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
                        </Router>
                    </AuthContext.Provider>
                </ThemeProvider>
            </LocalizationProvider>
        </React.Fragment>
    );
};

export default App;
