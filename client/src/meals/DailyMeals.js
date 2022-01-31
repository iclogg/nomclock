import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import NewMeal from "./NewMeal";

const DailyMeals = () => {
    return (
        <Grid
            container
            justifyContent="center"
            sx={{ p: "10px", m: "10px" }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Grid item xs={5} sx={{ backgroundColor: "secondary.main" }}>
                <Typography>Daily Meals</Typography>
            </Grid>
            <Grid xs={3} item>
                <NewMeal />
            </Grid>
        </Grid>
    );
};

export default DailyMeals;
