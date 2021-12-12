import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import Pet from "./pets/Pet";
import NewPet from "./pets/NewPet";
import User from "./users/User";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Pet />
                </Route>
                <Route path="/pets/new" exact>
                    <NewPet />
                </Route>
                <Route path="/user" exact>
                    <User />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
