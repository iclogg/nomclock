import React, { useCallback, useReducer } from "react";

import Input from "../shared/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";

import { formReducer } from "../utils/form-hooks";

const NewPet = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        isValid: false,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    }, []);

    return (
        <div>
            <h2>Add your darling pet!</h2>
            <form action="">
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onChange={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a description (at least 5 characters)"
                    onChange={inputHandler}
                />
            </form>
        </div>
    );
};

export default NewPet;
