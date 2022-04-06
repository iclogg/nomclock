import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import PetsIcon from "@mui/icons-material/Pets";
import Grid from "@mui/material/Grid";

import { Link as RRDLink } from "react-router-dom";

const PetList = (props) => {
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
        <Grid container spacing={2} sx={{ width: "40%" }}>
            {props.items.map((pet) => {
                return (
                    <Grid item sx={{ width: 75 }} key={pet.id}>
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
                                sx={{
                                    color: "primary.contrastText",
                                }}
                                variant="body1"
                            >
                                {pet.name}
                            </Typography>
                        </Link>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PetList;
