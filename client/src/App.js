import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import Pet from "./pets/Pet";
import NewPet from "./pets/NewPet";
import NewUser from "./users/NewUser";
import UpdatePet from "./pets/UpdatePet";
import User from "./users/User";
import Welcome from "./info/Welcome";
import Navbar from "./shared/Navbar";
import Navbar2 from "./shared/Navbar2";
import Login from "./users/Login";
import { AuthContext } from "./utils/auth-context";
import { useAuth } from "./utils/auth-hook";

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
                <Route path="/pets/:petId/update" exact>
                    <UpdatePet />
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
                    <Navbar2 />

                    <main>{routes}</main>
                    <hr />
                    <Navbar />
                </Router>
            </AuthContext.Provider>
        </React.Fragment>
    );
};

export default App;
