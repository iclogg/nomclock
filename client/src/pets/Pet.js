import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { useParams } from "react-router-dom";

import Avatar from "../shared/Avatar";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const Pet = () => {
    const auth = useContext(AuthContext);
    const { sendRequest, clearError, isLoading, error } = useAxios();
    const { petId } = useParams();
    const [pet, setPet] = useState({});

    useEffect(() => {
        const getPet = async () => {
            try {
                console.log("petId", petId);

                const response = await sendRequest(
                    `pets/${petId}`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );
                console.log(response.data);

                setPet(response.data.pet);
            } catch (err) {
                console.log(err);
            }
        };

        getPet();
        console.log("use effect pet");
    }, [sendRequest, auth]);

    return (
        <Container>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}

            {!isLoading && (
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h1">{pet.name}'s own page</Typography>
                    <Avatar name={pet.name} image={pet.image} />
                    <Typography>{pet.description}</Typography>
                    <Typography variant="body1">
                        {pet.name} is allowed {pet.maxMeals} meals each day.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Pet;
