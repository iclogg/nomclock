import React, { useEffect, useState, useContext } from "react";

import PetsList from "../pets/PetsList";
import Loading from "../shared/Loading";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const PetFriends = () => {
    const auth = useContext(AuthContext);
    const { sendRequest, isLoading } = useAxios();

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
    }, [auth, sendRequest]);

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && <PetsList items={petFriends}>Hello</PetsList>}
        </>
    );
};

export default PetFriends;
