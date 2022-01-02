import React from "react";
import { NavLink } from "react-router-dom";

/* TODO create dynamic routing based on pet and user id*/

/* TODO add logic to display appropriate links depending on auth status */

const NavBar = (props) => {
    return (
        <ul>
            <li>
                <NavLink to="/" exact>
                    Welcome Page
                </NavLink>
            </li>
            <li>
                <NavLink to="/pets/new" exact>
                    Add Pet
                </NavLink>
            </li>
            <li>
                <NavLink to="/pets/:petId/update" exact>
                    Update Pet
                </NavLink>
            </li>
            <li>
                <NavLink to="/pets/:petId" exact>
                    Pet's own Page
                </NavLink>
            </li>
            <li>
                <NavLink to="/user/:userId" exact>
                    Your Page
                </NavLink>
            </li>
            <li>
                <NavLink to="/user/new" exact>
                    Sign up
                </NavLink>
            </li>
            <li>
                <NavLink to="/user/logout" exact>
                    Logout
                </NavLink>
            </li>
            <li>
                <NavLink to="/user/login" exact>
                    Login
                </NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
