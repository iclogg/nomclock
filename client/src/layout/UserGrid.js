import { Typography, Grid, Paper, Link } from "@mui/material";

const UserGrid = (props) => {
    return (
        <Grid
            container
            justifyContent="center"
            sx={{
                backgroundImage: "linear-gradient(#eceff1, #ff608f)",
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

export default UserGrid;
