import { Grid } from "@mui/material";

const AuthGrid = (props) => {
    return (
        <Grid
            container
            spacing={2}
            mt={10} /* sx={{ border: "black solid 2px" }} */
        >
            {props.children}
        </Grid>
    );
};

export default AuthGrid;
