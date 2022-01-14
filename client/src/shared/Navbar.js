import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";

import Logout from "../users/Logout";

/* TODO create dynamic routing based on pet and user id*/

/* TODO add logic to display appropriate links depending on auth status */

/* TODO either set a favorite pet value for a user to have as a shortcut in navbar or remove link to a pet page in navbar */

const NavBar = (props) => {
    const auth = useContext(AuthContext);

    return (
        <ul>
            <li>
                <NavLink to="/" exact>
                    Welcome Page
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/pets/new" exact>
                        Add Pet
                    </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/pets/:petId/update" exact>
                        Update Pet
                    </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/pets/:petId" exact>
                        Pet's own Page
                    </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/user" exact>
                        Your Page
                    </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <Logout />
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/user/new" exact>
                        Sign up
                    </NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/user/login" exact>
                        Login
                    </NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavBar;
