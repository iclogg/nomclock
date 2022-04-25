import { useEffect, useState, useContext } from "react";
import { Box, Tabs, Tab, Grid } from "@mui/material";

export const MainGrid = (props) => {
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
            {props.children}
        </Grid>
    );
};

export default MainGrid;
