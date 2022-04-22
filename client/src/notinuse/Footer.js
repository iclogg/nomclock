import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Footer = () => {
    return (
        <footer>
            <Box
                sx={{
                    backgroundColor: "primary.dark",
                    height: "100px",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Container>
                    <Grid></Grid>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;
