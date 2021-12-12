import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Pet from "./pets/pages/Pet";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Pet />} />
        </Routes>
    );
}

export default App;
