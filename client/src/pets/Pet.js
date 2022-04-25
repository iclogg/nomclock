import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import {
    Typography,
    Box,
    Button,
    Modal,
    Grid,
    Avatar,
    Paper,
} from "@mui/material";

import { useParams } from "react-router-dom";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import PageNotFound from "../shared/PageNotFound";
import UpdatePet from "../pets/UpdatePet";
import DailyMeals from "../meals/DailyMeals";
import PetsFamily from "../pets/PetsFamily";
import MainGrid from "../layout/MainGrid";

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

    //For Update Panel
    const { sendRequest, clearError, isLoading, error } = useAxios();
    const { petId } = useParams();
    const [pet, setPet] = useState({});

    //Delete Modal
    const [open, setOpen] = useState(false);
    const handleOpenDeleteModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const petUpdateHandler = (obj) => {
        setPet(obj);
    };
    // Getting the Pet info
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

    // Deleting pet
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

    return (
        <MainGrid>
            {/* Error, Loading and delete Modal Components*/}
            <div>
                {" "}
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
            </div>

            {/* MEALS PANEL */}
            {pet.name && !isLoading && (
                <Grid tablabel="meals" container>
                    <Grid item xs={12}>
                        <Typography variant="h4">{pet.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {" "}
                    </Grid>

                    <Typography variant="body1">
                        {pet.name} is allowed {pet.maxMeals} meals each day.
                    </Typography>

                    <DailyMeals maxMeals={pet.maxMeals} />
                </Grid>
            )}

            {/* ABOUT PANEL */}
            {pet.name && !isLoading && (
                <Grid
                    tablabel="about"
                    container
                    spacing={3}
                    justifyContent="space-evenly"
                    direction="row-reverse"
                >
                    <Grid item xs={12}>
                        <Typography variant="h4">{pet.name}</Typography>
                    </Grid>

                    <Grid item mt={1} xs="auto">
                        {" "}
                        <Avatar
                            sx={{
                                width: 300,
                                height: 300,
                                border: "5px solid black",
                            }}
                            alt={pet.name}
                            src="https://source.unsplash.com/random?pet"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {" "}
                        <Paper>
                            <Grid container m={1} spacing={2}>
                                <Grid item xs={10}>
                                    <Typography variant="h5">
                                        About the Darling:
                                    </Typography>
                                    <Typography variant="body1" m={3}>
                                        {pet.description}
                                    </Typography>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    xs={10}
                                    container
                                    spacing={2}
                                >
                                    <Grid item xs={12}>
                                        {" "}
                                        <Typography variant="h5">
                                            Family:{" "}
                                        </Typography>
                                    </Grid>
                                    <PetsFamily
                                        family={pet.family}
                                        owner={pet.owner}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            )}
            {/* UPDATE PANEL */}
            {pet.name && (
                <UpdatePet
                    tablabel="update pet"
                    petUpdateHandler={petUpdateHandler}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                    pet={pet}
                />
            )}
        </MainGrid>
    );
};

export default Pet;
