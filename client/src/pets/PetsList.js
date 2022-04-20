import React from "react";
import { Avatar, Typography, Link, Paper, Grid, Stack } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

import { Link as RRDLink } from "react-router-dom";

const PetsList = (props) => {
    if (props.items.length === 0) {
        return (
            <Typography variant="h5">
                No lovely little friend added yet.{" "}
                {props.ownPets && (
                    <>
                        <span>Click </span>
                        <Link
                            component={RRDLink}
                            to={`/pets/new`}
                            sx={{
                                color: "secondary.main",
                                textDecoration: "none",
                            }}
                            color="secondary"
                        >
                            <PetsIcon fontSize="small" /> here{" "}
                            <PetsIcon fontSize="small" />{" "}
                        </Link>
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
                        <Grid item xs={12} sm={5} md={3} key={pet.id}>
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
                                    <Grid container m={1}>
                                        <Grid item xs={11}>
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
                                        <Grid item xs={5} py={1}>
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
                                            display="flex"
                                            xs="auto"
                                            sx={{
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="caption">
                                                Latest Meal
                                            </Typography>

                                            <Typography variant="h5">
                                                13:40
                                            </Typography>
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
