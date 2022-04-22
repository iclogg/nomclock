import { useEffect, useState, useContext } from "react";
import { Box, Tabs, Tab, Grid } from "@mui/material";

export const PetGrid = (props) => {
    console.log(props.children);

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
        <Grid
            container
            alignItems="flex-end"
            justifyContent="center"
            sx={{
                backgroundImage: "linear-gradient(#eceff1, #ff3f2a)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {props.children[0]}
            {props.children[1]}
            {props.children[2]}
            {props.children[3]}
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
                        {props.children[5]}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}></TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        {props.children[4]}
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    );
};

export default PetGrid;
