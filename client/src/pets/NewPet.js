import React from "react";

import Input from "../shared/Input";

const NewPet = () => {
    return (
        <div>
            <h2>Add your darling pet!</h2>
            <form action="">
                <Input
                    element="input"
                    type="text"
                    label="Name" /* validators={[]} onChange={} */
                />
            </form>
        </div>
    );
};

export default NewPet;
