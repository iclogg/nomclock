import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import PetsIcon from "@mui/icons-material/Pets";
import Grid from "@mui/material/Grid";

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
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper
                                elevation={8}
                                sx={{
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.75)",
                                }}
                            >
                                <Grid container xs={12} key={pet.id}>
                                    <Grid xs={5} m={1} p={1}>
                                        {" "}
                                        <Link
                                            to={`/pets/${pet.id}`}
                                            component={RRDLink}
                                            sx={{
                                                "&:hover p": {
                                                    color: "secondary.main",
                                                    textDecoration: "none",
                                                },
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                }}
                                                alt={pet.name}
                                                src={pet.image}
                                            />
                                            <Typography
                                                m={0}
                                                sx={{
                                                    color:
                                                        "primary.contrastText",
                                                    width: "50px",
                                                }}
                                                variant="subtitle1"
                                            >
                                                {pet.name}
                                            </Typography>
                                        </Link>
                                    </Grid>

                                    <Grid
                                        item
                                        display="flex"
                                        xs={6}
                                        sx={{
                                            border: "solid 1px white",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="caption">
                                            LATEST MEAL
                                        </Typography>

                                        <Typography variant="h4">
                                            13:40
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default PetsList;
