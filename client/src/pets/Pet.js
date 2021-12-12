import React from "react";
import Avatar from "../shared/Avatar";

import "./Pet.css";

const Pet = () => {
    const PET = {
        id: "pet1",
        name: "Lucifer",
        image: "/lucifer.png",
        description: "Best kitten EVER!!!!",
        maxMeals: "three",
    };
    return (
        <div className="pet">
            <h1>{PET.name}'s own page</h1>
            <Avatar name={PET.name} image={PET.image} />
            <p>{PET.description}</p>
            <p>
                {PET.name} is allowed {PET.maxMeals} meals each day.
            </p>
        </div>
    );
};

export default Pet;
