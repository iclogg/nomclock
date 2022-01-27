import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Input from "../shared/Input";
import { Button } from "../shared/Button";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";
import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

import { useForm } from "../utils/form-hooks";

const NewPet = () => {
    const auth = useContext(AuthContext);
    const {
        sendRequest,
        clearError,
        clearIsLoading,
        isLoading,
        error,
    } = useAxios();

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

    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(
                "pets",
                "post",
                {
                    name: formState.inputs.name.value,
                    maxMeals: formState.inputs.maxMeals.value,
                    description: formState.inputs.description.value,
                    userId: auth.userId,
                },
                { authorization: `Bearer ${auth.token}` }
            );

            history.push(`/pets/${response.data._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        clearIsLoading();
    }, [clearIsLoading]);

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
