import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { Link as RRDLink } from "react-router-dom";

const PetList = (props) => {
    if (props.items.length === 0) {
        /* TODO add a link to create pet here */
        return <h2>No Pet Found</h2>;
    }

    return (
        <Stack direction="row" spacing={2}>
            {props.items.map((pet) => {
                return (
                    <Link
                        to={`/pets/${pet.id}`}
                        key={pet.id}
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
                );
            })}
        </Stack>
    );
};

export default PetList;
{
    /* <ul>
    {props.items.map((pet) => {
        return (
            <PetItem
                key={pet.id}
                id={pet.id}
                name={pet.name}
                image={pet.image}
            />
        );
    })}
</ul>;
 */
}
