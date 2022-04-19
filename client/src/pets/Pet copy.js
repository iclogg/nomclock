import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Typography, Container, Box, Button, Modal, Grid } from "@mui/material";

import { useParams } from "react-router-dom";

import Avatar from "../shared/Avatar";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import PageNotFound from "../shared/PageNotFound";
import UpdatePet from "../pets/UpdatePet";
import DailyMeals from "../meals/DailyMeals";
import PetsFamily from "../pets/PetsFamily";

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

    const petUpdateHandler = (obj) => {
        setPet(obj);
    };

    useEffect(() => {
        const getPet = async () => {
            try {
                const response = await sendRequest(
                    `pets/${petId}`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );
                petUpdateHandler(response.data.pet);
            } catch (err) {
                console.log(err);
            }
        };

        getPet();
    }, [sendRequest, auth, petId]);

    const deletePet = async (e) => {
        e.preventDefault();

        setPet({});

        try {
            await sendRequest(
                `pets/${petId}`,
                "delete",
                {},
                { authorization: `Bearer ${auth.token}` }
            );

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
            {!pet._id && !isLoading && <PageNotFound />}

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

            {pet && isUpdating && (
                <UpdatePet
                    toggleSetIsUpdating={toggleSetIsUpdating}
                    petUpdateHandler={petUpdateHandler}
                    pet={pet}
                />
            )}

            {pet.name && !isLoading && !isUpdating && (
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
                    <Grid
                        container
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        <Grid item xs={1}>
                            {" "}
                            <Typography
                                sx={{
                                    textTransform: "uppercase",
                                    color: "secondary.main",
                                    mt: "20px",
                                }}
                            >
                                Family:{" "}
                            </Typography>
                        </Grid>
                        <Grid item xs="auto">
                            <PetsFamily family={pet.family} owner={pet.owner} />
                        </Grid>
                    </Grid>
                    <DailyMeals maxMeals={pet.maxMeals} />
                </Box>
            )}
        </Container>
    );
};

export default Pet;
