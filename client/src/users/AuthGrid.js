import { Grid } from "@mui/material";

const AuthGrid = (props) => {
    return (
        <Grid
            container
            height="100vh"
            alignItems="flex-end"
            justifyContent="center"
            /* sx={{ border: "black solid 2px" }} */
            sx={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {props.children}
        </Grid>
    );
};

export default AuthGrid;
