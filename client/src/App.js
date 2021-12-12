import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import Pet from "./pets/pages/Pet";
import NewPet from "./pets/pages/NewPet";

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
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
