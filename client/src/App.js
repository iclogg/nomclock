import React, { useState, useCallback } from "react";
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
import Login from "./users/Login";
import { AuthContext } from "./utils/auth-context";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    /* const [userId, setUserId] = user(false); */

    const login = useCallback(() => {
        setIsLoggedIn(true);
        console.log("isloggeed in");
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        console.log("islogged out");
    }, []);

    let routes;

    if (isLoggedIn) {
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
                <Redirect to="/" />
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
                <Redirect to="/user/login" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout,
            }}
        >
            <Router>
                <main>{routes}</main>
                <hr />
                <Navbar />
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
