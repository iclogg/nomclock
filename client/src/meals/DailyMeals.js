import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import NewMeal from "./NewMeal";

const DailyMeals = () => {
    return (
        <Grid
            container
            justifyContent="space-between"
            sx={{ p: "10px", m: "10px" }}
        >
            <Grid item sx={{ backgroundColor: "secondary.main" }}>
                <Typography>Daily Meals</Typography>
            </Grid>
            <Grid item>
                <NewMeal />
            </Grid>
        </Grid>
    );
};

export default DailyMeals;
