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
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);

    const login = useCallback((userId, token) => {
        setToken(token);
        setUserId(userId);
        console.log("isloggeed in");
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        console.log("islogged out");
    }, []);

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
                isLoggedIn: !!token,
                token,
                userId,
                login,
                logout,
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
