import { useEffect, useState, useContext } from "react";
import { Typography } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import MainGrid from "../layout/MainGrid";

import PetsList from "../pets/PetsList";
import NewPet from "../pets/NewPet";
import Settings from "../users/Settings";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const User = () => {
    const auth = useContext(AuthContext);
    const [pets, setPets] = useState([]);

    const { sendRequest, clearError, isLoading, error } = useAxios();

    // Getting users own pets
    useEffect(() => {
        const getPets = async () => {
            if (auth.userId) {
                try {
                    const response = await sendRequest(
                        `pets/owner/${auth.userId}`,
                        "get",
                        {},
                        { authorization: "Bearer " + auth.token }
                    );
                    console.log(response);

                    setPets([...response.data.pets]);
                } catch (err) {}
            }
        };

        getPets();
    }, [auth, sendRequest]);

    // Getting pets of friends
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

                console.log(response);

                if (!response.data.noFamily) {
                    setPetFriends([...response.data.pets]);
                } else {
                    setPetFriends(["noFamily"]);
                }
            } catch (err) {}
        };

        getPetFriends();
    }, [auth.userId, auth.token, sendRequest]);

    // Component PetsPanel created inorder to pass the setTabValue prop recived by the 3rd div expected by the maingrid to the PetList component.
    const PetsPanel = (props) => {
        return (
            <div>
                {!isLoading && pets && (
                    <PetsList
                        setTabValue={props.handlechange}
                        items={pets}
                        ownPets={true}
                    />
                )}
                {!isLoading && petFriends && petFriends[0] !== "noFamily" && (
                    <>
                        <Typography variant="h5" mt={3}>
                            Your Extended Family
                        </Typography>
                        <PetsList
                            setTabValue={props.handlechange}
                            items={petFriends}
                        />
                    </>
                )}
            </div>
        );
    };

    return (
        <MainGrid>
            {/* Error and Loading Components*/}
            <div>
                {" "}
                {isLoading && <Loading />}
                {error && <Error message={error} onClick={clearError} />}
            </div>

            {/* PETS PANEL */}
            <PetsPanel tablabel="Pets" />

            {/* ACCOUNT PANEL */}
            <Settings tablabel="account" />

            {/* NEW PET PANEL */}
            <NewPet tablabel="add pet" />
        </MainGrid>
    );
};

export default User;
