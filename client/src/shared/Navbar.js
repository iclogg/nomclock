import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    return (
        <ul>
            <li>
                <NavLink to="/" exact>
                    Welcome Page
                </NavLink>
            </li>
            <li>
                <NavLink to="/pets/new">Add Pet</NavLink>
            </li>

            <li>
                <NavLink to="/pets/:id/update">Update Pet Pet</NavLink>
            </li>
            <li>
                <NavLink to="/pets/:id">Pet's own Page</NavLink>
            </li>
            <li>
                <NavLink to="/user">Your Page</NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
