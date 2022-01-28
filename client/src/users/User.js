import React, { useEffect, useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Loading from "../shared/Loading";
import Error from "../shared/Error";

import PetsList from "../pets/PetsList";
import Settings from "../users/Settings";

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

    return (
        <div>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <Typography variant="h3" mt="10px">
                Pet Owner Page
            </Typography>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        aria-label="account tabs"
                        textColor={"secondary"}
                        indicatorColor="secondary"
                    >
                        <Tab label="Pets" {...a11yProps(0)} />
                        <Tab label="Account" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                        {!isLoading && <PetsList items={pets} isLoading />}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Settings />
                    </TabPanel>
                </Box>
            </Box>
        </div>
    );
};

export default User;
