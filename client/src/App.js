import React, { useState, useCallback, useEffect } from "react";
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

let logoutTimer;

const App = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);

    const login = useCallback((userId, token, expirationDate) => {
        setToken(token);
        setUserId(userId);
        const updatedTokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(updatedTokenExpirationDate);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId,
                token,
                expiration: updatedTokenExpirationDate.toISOString(),
            })
        );
        console.log("isloggeed in");
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
        console.log("islogged out");
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.userId,
                storedData.token,
                new Date(storedData.expiration)
            );
        }
    }, [login]);

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
};

export default App;
