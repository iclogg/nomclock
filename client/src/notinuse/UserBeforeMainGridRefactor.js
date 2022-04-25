import { useEffect, useState, useContext } from "react";
import { Box, Tabs, Tab, Grid, Typography } from "@mui/material";
import { theme } from "../utils/mui-theme-customization";

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
    }, [auth.userId]);

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
    const lineStyle = `solid 2px ${theme.palette.secondary.main}`;
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
        <MainGrid>
            <div>
                {" "}
                {isLoading && <Loading />}
                {error && <Error message={error} onClick={clearError} />}
            </div>

            <Grid item xs={10} mt={3}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="account tabs"
                    textColor={"secondary"}
                    variant="fullWidth"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <Tab label="Pets" {...a11yProps(0)} sx={checkActive(0)} />
                    <Tab
                        label="Account"
                        {...a11yProps(1)}
                        sx={checkActive(1)}
                    />
                    <Tab
                        label="Add Pet"
                        {...a11yProps(2)}
                        sx={checkActive(2)}
                    />
                </Tabs>
                <div style={contentBorderStyle}>
                    <TabPanel value={tabValue} index={0}>
                        {!isLoading && pets && (
                            <PetsList
                                setTabValue={setTabValue}
                                items={pets}
                                ownPets={true}
                            />
                        )}

                        {!isLoading &&
                            petFriends &&
                            petFriends[0] !== "noFamily" && (
                                <>
                                    <Typography variant="h5" mt={3}>
                                        Your Extended Family
                                    </Typography>
                                    <PetsList
                                        setTabValue={setTabValue}
                                        items={petFriends}
                                    />
                                </>
                            )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Settings />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <NewPet />
                    </TabPanel>
                </div>
            </Grid>
        </MainGrid>
    );
};

export default User;
