import React, { useEffect, useState, useContext } from "react";

import Typography from "@mui/material/Typography";
import PetsList from "../pets/PetsList";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const PetFriends = () => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();

    const [petFriends, setPetFriends] = useState([]);

    useEffect(() => {
        const getPetFriends = async () => {
            try {
                const response = await sendRequest(
                    `users/${auth.userId}/families`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );

                setPetFriends([...response.data.pets]);
            } catch (err) {}
        };

        getPetFriends();
        console.log(petFriends);
    }, [auth, sendRequest]);

    return <PetsList items={petFriends}>Hello</PetsList>;
};

export default PetFriends;
