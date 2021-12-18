import React from "react";
import PetsList from "../pets/PetsList";

const User = () => {
    /* TODO remove dummy pet and fetch from backend */
    const PETS = [{ id: "pet1", name: "Lucifer", image: "/lucifer.png" }];

    return (
        <div>
            <h1>Pet Owner Page</h1>
            <div>
                <h2>Your Pets</h2>
                <PetsList items={PETS} />;
            </div>
        </div>
    );
};

export default User;
