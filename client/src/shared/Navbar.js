import React from "react";
import { NavLink } from "react-router-dom";

/* TODO create dynamic routing based on pet and user id*/

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
                <NavLink to="/pets/INSERTID/update">Update Pet</NavLink>
            </li>
            <li>
                <NavLink to="/pets/INSERTID">Pet's own Page</NavLink>
            </li>
            <li>
                <NavLink to="/user">Your Page</NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
