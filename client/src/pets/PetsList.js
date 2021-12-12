import React, { useReducer } from "react";

import PetItem from "./PetItem";
import "./PetList.css";

const PetList = (props) => {
    if (props.items.length === 0) {
        return <h2>No Pet Found</h2>;
    }

    return (
        <ul>
            {props.items.map((pet) => {
                return (
                    <PetItem
                        key={pet.id}
                        id={pet.id}
                        name={pet.name}
                        image={pet.image}
                    />
                );
            })}
        </ul>
    );
};

export default PetList;
