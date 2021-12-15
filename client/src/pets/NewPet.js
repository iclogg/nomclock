import React from "react";

import Input from "../shared/Input";
import Button from "../shared/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";

import { useForm } from "../utils/form-hooks";

const NewPet = () => {
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            maxMeals: {
                value: 1,
                isValid: false,
            },
        },
        false
    );

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs); // send to Backend
    };

    return (
        <div>
            <h2>Add your darling pet!</h2>
            <form action="" onSubmit={submitHandler}>
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id="maxMeals"
                    element="input"
                    type="number"
                    label="Max meals per day?"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please choose how many meals a day your darling should have."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a description (at least 5 characters)"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PET
                </Button>
            </form>
        </div>
    );
};

export default NewPet;
