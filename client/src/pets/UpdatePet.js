import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "../shared/Input";
import Button from "../shared/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";

import { useForm } from "../utils/form-hooks";

/* TODO remove dummy pet once backen is up */
const PET = {
    id: "pet1",
    name: "Lucifer",
    image: "/lucifer.png",
    description: "Best kitten EVER!!!!",
    maxMeals: 3,
};

const UpdatePet = () => {
    const petId = useParams().petId;

    const [formState, inputHandler, setFormData] = useForm(
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

    // Here we fetch data from Backend
    const PETDATA = PET;

    useEffect(() => {
        setFormData(
            {
                name: {
                    value: PETDATA.name,
                    isValid: true,
                },
                description: {
                    value: PETDATA.description,
                    isValid: true,
                },
                maxMeals: {
                    value: PETDATA.maxMeals,
                    isValid: true,
                },
            },
            true
        );
    }, [setFormData, PETDATA]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs); // send to Backend
    };

    /* TODO add loading component to render whilst getting data to replace formState.inputs.name.value &&*/

    return (
        formState.inputs.name.value && (
            <div>
                <h1>Update Pet</h1>
                <form action="" onSubmit={submitHandler}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        initialValue={formState.inputs.name.value}
                        initialValid={formState.inputs.name.isValid}
                    />
                    <Input
                        id="maxMeals"
                        element="input"
                        type="number"
                        label="Max meals per day?"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please choose how many meals a day your darling should have."
                        onInput={inputHandler}
                        initialValue={formState.inputs.maxMeals.value}
                        initialValid={formState.inputs.maxMeals.isValid}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a description (at least 5 characters)"
                        onInput={inputHandler}
                        initialValue={formState.inputs.description.value}
                        initialValid={formState.inputs.description.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        ADD PET
                    </Button>
                </form>
            </div>
        )
    );
};

export default UpdatePet;
