import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import {
    Typography,
    Box,
    Button,
    Modal,
    Grid,
    Tabs,
    Tab,
    Avatar,
} from "@mui/material";

import { useParams } from "react-router-dom";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import PageNotFound from "../shared/PageNotFound";
import UpdatePet from "../pets/UpdatePet";
import DailyMeals from "../meals/DailyMeals";
import PetsFamily from "../pets/PetsFamily";
import PetGrid from "../layout/PetGrid";

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

const PetNewDesign = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    //Update
    const { sendRequest, clearError, isLoading, error } = useAxios();
    const { petId } = useParams();
    const [pet, setPet] = useState({});

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

    // TAB LOGIC
    const [tabValue, setTabValue] = useState(0);

    function TabPanel(props) {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    // Tabs Border Styling
    const lineStyle = "solid 2px #ff608f";
    const transitionStyle = "border 0.1s linear";

    const active = {
        borderLeft: lineStyle,
        borderTop: lineStyle,
        borderRight: lineStyle,
        transition: transitionStyle,
    };

    const inactive = {
        borderBottom: lineStyle,
        transition: transitionStyle,
    };

    const checkActive = (num) => (tabValue === num ? active : inactive);

    const contentBorderStyle = {
        borderRight: lineStyle,
        borderLeft: lineStyle,
        borderBottom: lineStyle,
    };

    return (
        <PetGrid>
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

            <Grid item xs={10} mt={3}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="account tabs"
                    textColor={"secondary"}
                    indicatorColor="transparent"
                    variant="fullWidth"
                >
                    <Tab label="Clock" {...a11yProps(0)} sx={checkActive(0)} />
                    <Tab
                        label="TimeLine"
                        {...a11yProps(1)}
                        sx={checkActive(1)}
                    />
                    <Tab
                        label="Update Pet"
                        {...a11yProps(2)}
                        sx={checkActive(2)}
                    />
                </Tabs>
                <div style={contentBorderStyle}>
                    <TabPanel value={tabValue} index={0}>
                        {pet.name && !isLoading && (
                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="h1">
                                    {pet.name}'s own page
                                </Typography>
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    alt={pet.name}
                                    src={pet.image}
                                />
                                <Typography>{pet.description}</Typography>
                                <Typography variant="body1">
                                    {pet.name} is allowed {pet.maxMeals} meals
                                    each day.
                                </Typography>
                                <Button color="secondary" onClick={handleOpen}>
                                    Remove Pet
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
                                        <PetsFamily
                                            family={pet.family}
                                            owner={pet.owner}
                                        />
                                    </Grid>
                                </Grid>
                                <DailyMeals maxMeals={pet.maxMeals} />
                            </Box>
                        )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}></TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        {pet.name && (
                            <UpdatePet
                                petUpdateHandler={petUpdateHandler}
                                pet={pet}
                            />
                        )}
                    </TabPanel>
                </div>
            </Grid>
        </PetGrid>
    );
};

export default PetNewDesign;
