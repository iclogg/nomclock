import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

const PetsFamily = ({ family, owner }) => {
    return (
        <Grid container>
            {owner && (
                <Grid item sx={{ mr: 1 }} key={owner._id}>
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                        }}
                        alt={owner.name}
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
                        <Grid item sx={{ mr: 1 }} key={member._id}>
                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56,
                                }}
                                alt={member.name}
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
        </Grid>
    );
};

export default PetsFamily;
