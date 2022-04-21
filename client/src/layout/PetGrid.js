import { useEffect, useState, useContext } from "react";
import { Box, Tabs, Tab, Grid } from "@mui/material";

export const PetGrid = (props) => {
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
            {props.children}
        </Grid>
    );
};

export default PetGrid;
