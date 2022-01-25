import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";

import { useParams } from "react-router-dom";

import Avatar from "../shared/Avatar";
import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

import "./Pet.css";

const Pet = () => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();
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
        <div className="pet">
            <Typography variant="h1">{pet.name}'s own page</Typography>
            <Avatar name={pet.name} image={pet.image} />
            <Typography>{pet.description}</Typography>
            <Typography variant="body1">
                {pet.name} is allowed {pet.maxMeals} meals each day.
            </Typography>
        </div>
    );
};

export default Pet;
