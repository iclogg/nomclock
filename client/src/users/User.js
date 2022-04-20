import React, { useEffect, useState, useContext } from "react";
import { Box, Tabs, Tab, Grid } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import UserGrid from "../layout/UserGrid";

import PetsList from "../pets/PetsList";
import NewPet from "../pets/NewPet";
import Settings from "../users/Settings";
import PetFriends from "../users/PetFriends";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const User = () => {
    const auth = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const { sendRequest, clearError, isLoading, error } = useAxios();

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

                    setPets([...response.data.pets]);
                } catch (err) {}
            }
        };

        getPets();
    }, [auth, sendRequest]);

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
        <UserGrid>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <Grid item xs={10} mt={3}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="account tabs"
                    textColor={"secondary"}
                    indicatorColor="transparent"
                    variant="fullWidth"
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
                        {!isLoading && (
                            <PetsList
                                setTabValue={setTabValue}
                                items={pets}
                                ownPets={true}
                            />
                        )}

                        <PetFriends />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Settings />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <NewPet />
                    </TabPanel>
                </div>
            </Grid>
        </UserGrid>
    );
};

export default User;
