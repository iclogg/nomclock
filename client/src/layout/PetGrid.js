export const PetGrid = () => {
    return (
        <Grid
            container
            alignItems="flex-end"
            justifyContent="center"
            sx={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Grid xs={12} sm={10} pt={10}>
                <Typography align="center" variant="h1"></Typography>
            </Grid>

            <Grid item xs={10} md="auto" mb={20}>
                <Paper
                    elevation={8}
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                >
                    {props.children}
                </Paper>
            </Grid>
        </Grid>
    );
};
