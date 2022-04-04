import React from "react";

import Overlay from "./Overlay";
import { Button, Typography, Box } from "@mui/material";

const Error = (props) => {
    return (
        <Overlay className="overlay">
            <Box sx={{ p: "20px", backgroundColor: "primary.main" }}>
                <Typography sx={{ maxWidth: "70vw", m: "15px" }} variant="h4">
                    {props.message}
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={props.onClick}
                >
                    Close
                </Button>
            </Box>
        </Overlay>
    );
};

export default Error;
