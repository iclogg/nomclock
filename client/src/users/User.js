import React, { useEffect, useState, useContext } from "react";

import PetsList from "../pets/PetsList";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const User = () => {
    const auth = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const { sendRequest, clearError, isLoading, error } = useAxios();

    useEffect(() => {
        const getPets = async () => {
            try {
                const response = await sendRequest(
                    `pets/owner/${auth.userId}`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );

                setPets([...response.data.pets]);
            } catch (err) {}
        };

        getPets();
    }, [auth, sendRequest]);

    return (
        <div>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <h1>Pet Owner Page</h1>
            <div>
                <h2>Your Pets</h2>
                {!isLoading && <PetsList items={pets} isLoading />}
            </div>
        </div>
    );
};

export default User;
