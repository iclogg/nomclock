import React, { useState, useContext } from "react";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";
import { AuthContext } from "../utils/auth-context";

import { useForm } from "../utils/form-hooks";
import { sendRequest } from "../utils/api";

const NewPet = () => {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
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
                value: 2,
                isValid: false,
            },
        },
        false
    );

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const response = await sendRequest(
                "pets",
                "post",
                {
                    name: formState.inputs.name.value,
                    maxMeals: formState.inputs.maxMeals.value,
                    description: formState.inputs.description.value,
                    userId: auth.userId,
                },
                { Authorization: `Bearer ${auth.token}` }
            );

            console.log(response);
            setIsLoading(false);

            if (response.statusText !== "OK") {
                setError(response.data.message);
            } else {
                //TODO ad pet to state
            }
        } catch (error) {
            setIsLoading(false);

            setError(error.message || "Something went wrong, please try again");
        }
    };

    const clearError = () => {
        setError("");
    };

    return (
        <div>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
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
