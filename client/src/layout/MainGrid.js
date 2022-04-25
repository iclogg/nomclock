import React, { useEffect, useState, useContext } from "react";
import { Box, Tabs, Tab, Grid } from "@mui/material";
import { theme } from "../utils/mui-theme-customization";

export const PetGrid = (props) => {
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
        <Grid
            container
            justifyContent="center"
            sx={{
                backgroundImage: "linear-gradient(#eceff1, #babdbe)", // primary.main, primary.dark
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "calc(100vh - 64px)",
            }}
        >
            {props.children[0]}

            {props && props.children[3] && (
                <Grid item xs={10} mt={3} mb={3}>
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
                        <Tab
                            label={props.children[1].props.tablabel}
                            {...a11yProps(0)}
                            sx={checkActive(0)}
                        />
                        <Tab
                            label={props.children[2].props.tablabel}
                            {...a11yProps(1)}
                            sx={checkActive(1)}
                        />
                        <Tab
                            label={props.children[3].props.tablabel}
                            {...a11yProps(2)}
                            sx={checkActive(2)}
                        />
                    </Tabs>
                    <div style={contentBorderStyle}>
                        <TabPanel value={tabValue} index={0}>
                            {/* Check if the pets panel is getting passed and in that case clone element and pass props to be able to toggle tabvalue*/}
                            {props.children[1].props.tablabel === "Pets"
                                ? React.cloneElement(props.children[1], {
                                      handlechange: handleChange,
                                  })
                                : props.children[1]}
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {props.children[2]}
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            {props.children[3]}
                        </TabPanel>
                    </div>
                </Grid>
            )}
        </Grid>
    );
};

export default PetGrid;
