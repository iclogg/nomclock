import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

const randomPicExtraWord = [
    "young",
    "cool",
    "retired",
    "female",
    "male",
    "kid",
    "fun",
    "artsy",
    "fun",
    "girl",
    "boy",
    "person",
];

const PetsFamily = ({ family, owner }) => {
    return (
        <>
            {owner && (
                <Grid item sx={4} key={owner._id} textAlign="center">
                    <Avatar
                        sx={{
                            width: "80px",
                            height: "80px",
                            border: "3px solid black",
                        }}
                        alt={owner.name}
                        src={`https://source.unsplash.com/random?profilepicture,${
                            randomPicExtraWord[Math.floor(Math.random() * 12)]
                        }`}
                    />
                    <Typography
                        sx={{
                            color: "primary.contrastText",
                        }}
                        variant="body1"
                    >
                        {owner.name}
                    </Typography>
                </Grid>
            )}

            {family &&
                family.map((member) => {
                    return (
                        <Grid sx={4} textAlign="center" item key={member._id}>
                            <Avatar
                                sx={{
                                    width: "80px",
                                    height: "80px",
                                    border: "3px solid black",
                                }}
                                alt={member.name}
                                src={`https://source.unsplash.com/random?profilepicture,${
                                    randomPicExtraWord[
                                        Math.floor(Math.random() * 12)
                                    ]
                                }`}
                            />
                            <Typography
                                sx={{
                                    color: "primary.contrastText",
                                }}
                                variant="body1"
                            >
                                {member.name}
                            </Typography>
                        </Grid>
                    );
                })}
        </>
    );
};

export default PetsFamily;
