import { useEffect, useState, useContext } from "react";

import Typography from "@mui/material/Typography";

import PetsList from "../pets/PetsList";
import Loading from "../shared/Loading";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const PetFriends = ({ petFriends }) => {
    const auth = useContext(AuthContext);
    const { sendRequest, isLoading } = useAxios();

    /*    const [petFriends, setPetFriends] = useState([]);

    useEffect(() => {
        const getPetFriends = async () => {
            try {
                const response = await sendRequest(
                    `users/${auth.userId}/families`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );

                console.log(response);

                if (!response.data.noFamily) {
                    setPetFriends([...response.data.pets]);
                }
            } catch (err) {}
        };

        getPetFriends();
    }, [auth, sendRequest]); */

    return (
        <>
            {isLoading && <Loading />}
            {petFriends.length ? (
                <Typography variant="h5" mt={3}>
                    Your Extended Family
                </Typography>
            ) : (
                ""
            )}

            {petFriends.length && !isLoading ? (
                <PetsList items={petFriends}></PetsList>
            ) : (
                ""
            )}
        </>
    );
};

export default PetFriends;
