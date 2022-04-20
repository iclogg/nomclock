import { Avatar, Typography, Link, Paper, Grid, Button } from "@mui/material";

import LatestMealMini from "../meals/LatestMealMini";

import { Link as RRDLink } from "react-router-dom";

const PetsList = (props) => {
    if (props.items.length === 0) {
        return (
            <Typography variant="h5" mt={5}>
                No lovely little friend added yet.{" "}
                {props.ownPets && (
                    <>
                        <br />
                        <br />
                        <span>Click </span>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                props.setTabValue(2);
                            }}
                            sx={{
                                textDecoration: "none",
                                verticalAlign: "3",
                                paddingBottom: "8px",
                                paddingTop: "10px",
                                paddingLeft: "0px",
                                paddingRight: "0px",
                            }}
                            color="secondary"
                        >
                            here{" "}
                        </Button>
                        <span> to register your darling.</span>
                    </>
                )}
            </Typography>
        );
    }

    return (
        <>
            {" "}
            {props.ownPets && <Typography variant="h5">Your Pets</Typography>}
            <Grid container spacing={1}>
                {props.items.map((pet) => {
                    return (
                        <Grid
                            item
                            xs={11}
                            sm={5}
                            md={4}
                            lg={3}
                            maxWidth="250px"
                            key={pet.id}
                        >
                            <Paper
                                elevation={8}
                                sx={{
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.75)",
                                }}
                            >
                                {" "}
                                <Link
                                    to={`/pets/${pet.id}`}
                                    component={RRDLink}
                                    sx={{
                                        "&:hover p": {
                                            color: "secondary.main",
                                        },
                                        textDecoration: "none",
                                    }}
                                >
                                    <Grid container m={1} columnSpacing={1}>
                                        <Grid item xs={10}>
                                            <Typography
                                                mt={1}
                                                sx={{
                                                    color:
                                                        "primary.contrastText",
                                                    textTransform: "uppercase",
                                                    borderBottom:
                                                        "3px solid black",
                                                }}
                                                variant="subtitle1"
                                            >
                                                {pet.name.length < 15
                                                    ? pet.name
                                                    : pet.name.slice(0, 15) +
                                                      "..."}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} py={1}>
                                            <Avatar
                                                sx={{
                                                    width: 65,
                                                    height: 65,
                                                    border: "3px solid black",
                                                }}
                                                alt={pet.name}
                                                src={pet.image}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={8}
                                            display="flex"
                                            sx={{
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <LatestMealMini petId={pet._id} />
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default PetsList;
