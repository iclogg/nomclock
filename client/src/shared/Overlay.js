import React from "react";
import Box from "@mui/material/Box";

const Overlay = (props) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(128, 128, 128, 0.75)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {props.children}
        </Box>
    );
};

export default Overlay;
