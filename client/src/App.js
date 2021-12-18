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
import UpdatePet from "./pets/UpdatePet";
import User from "./users/User";
import Welcome from "./info/Welcome";
import Navbar from "./shared/Navbar";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Welcome />
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
                    <Route path="/user/:userId" exact>
                        <User />
                    </Route>
                    <Redirect to="/" />
                </Switch>
                <hr />
                <Navbar />
            </Router>
        </>
    );
}

export default App;
