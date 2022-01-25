import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Overlay from "./Overlay";

const Loading = () => {
    return (
        <Overlay className="overlay">
            <CircularProgress color="secondary" />
        </Overlay>
    );
};

export default Loading;
