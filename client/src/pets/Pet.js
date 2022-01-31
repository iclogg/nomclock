import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { useParams } from "react-router-dom";

import Avatar from "../shared/Avatar";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import UpdatePet from "../pets/UpdatePet";
import DailyMeals from "../meals/DailyMeals";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Pet = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    //Update
    const { sendRequest, clearError, isLoading, error } = useAxios();
    const { petId } = useParams();
    const [pet, setPet] = useState({});

    const [isUpdating, setIsUpdating] = useState(false);

    //Delete Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getPet = async () => {
            try {
                const response = await sendRequest(
                    `pets/${petId}`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );

                setPet(response.data.pet);
            } catch (err) {
                console.log(err);
            }
        };

        getPet();
    }, [sendRequest, auth, petId]);

    const deletePet = async (e) => {
        e.preventDefault();

        try {
            await sendRequest(
                `pets/${petId}`,
                "delete",
                {},
                { authorization: `Bearer ${auth.token}` }
            );

            setPet({});
            history.replace("/user");
        } catch (error) {
            console.log(error);
        }
    };

    const toggleSetIsUpdating = () => {
        setIsUpdating(!isUpdating);
    };

    return (
        <Container>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Remove {pet.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to remove your darling from
                        Nomclock?
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deletePet}
                    >
                        Remove Pet
                    </Button>
                    <Button color="secondary" onClick={handleClose}>
                        No keep Pet in Nomclock
                    </Button>
                </Box>
            </Modal>

            {isUpdating && (
                <UpdatePet
                    toggleSetIsUpdating={toggleSetIsUpdating}
                    setPet={setPet}
                    pet={pet}
                />
            )}

            {!isLoading && !isUpdating && (
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h1">{pet.name}'s own page</Typography>
                    <Avatar name={pet.name} image={pet.image} />
                    <Typography>{pet.description}</Typography>
                    <Typography variant="body1">
                        {pet.name} is allowed {pet.maxMeals} meals each day.
                    </Typography>
                    <Button color="secondary" onClick={handleOpen}>
                        Remove Pet
                    </Button>
                    <Button onClick={toggleSetIsUpdating} color="secondary">
                        Update Pet
                    </Button>
                    <DailyMeals />
                </Box>
            )}
        </Container>
    );
};

export default Pet;
