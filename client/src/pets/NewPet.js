import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Button, Typography, Box } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";

import TextInput from "../shared/form/TextInput";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

import { useForm, Form } from "../shared/form/Form";

const NewPet = () => {
    const auth = useContext(AuthContext);
    const {
        sendRequest,
        clearError,
        clearIsLoading,
        isLoading,
        error,
    } = useAxios();

    const { values, handleInputChange } = useForm({
        name: "",
        description: "",
        maxMeals: 0,
    });

    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(
                "pets",
                "post",
                {
                    name: values.name,
                    maxMeals: values.maxMeals,
                    description: values.description,
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
        <Box sx={{ mt: "10px" }}>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <Typography variant="h4">Register Your Darling</Typography>{" "}
            <Form action="" onSubmit={submitHandler}>
                <TextInput
                    label="Name"
                    name="name"
                    /*                         errorText="Please enter a valid title."
                     */
                    value={values.name}
                    onChange={handleInputChange}
                />
                <TextInput
                    type="number"
                    label="Max meals per day?"
                    name="maxMeals"
                    /* errorText="Please choose how many meals a day your darling should have." */
                    onChange={handleInputChange}
                    value={values.maxMeals}
                />

                <TextInput
                    label="Description"
                    name="description"
                    /*                         errorText="Please enter a description (at least 5 characters)"
                     */
                    value={values.description}
                    onChange={handleInputChange}
                />
                <Button type="submit" color="secondary" variant="contained">
                    SAVE
                </Button>
            </Form>
        </Box>
    );
};

export default NewPet;
