import React from "react";

import Input from "../shared/Input";
import Button from "../shared/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";

import { useForm } from "../utils/form-hooks";
import { createUser } from "../utils/api";

const NewUser = () => {
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
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
            <h2>Enter your details to sign up!</h2>
            <form action="" onSubmit={submitHandler}>
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name."
                    onInput={inputHandler}
                />
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter valid email"
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    label="Password"
                    type="password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a password (at least 6 characters)"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    SIGN UP
                </Button>
            </form>
        </div>
    );
};

export default NewUser;
