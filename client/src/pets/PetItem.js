import React from "react";
import { Link } from "react-router-dom";

import "./PetItem.css";
import Avatar from "../shared/Avatar";

const PetItem = (props) => {
    return (
        <li className="pet-item">
            <Link to={`/pets/${props.id}`}>
                <Avatar image={props.image} name={props.name} />
                <h3>{props.name}</h3>
            </Link>
        </li>
    );
};

export default PetItem;
