import { Box, Container, Typography } from "@mui/material";

export default function PageNotFound() {
    return (
        <Box sx={{ overflow: "hidden" }}>
            <Container
                sx={{
                    backgroundColor: "primary.main",
                    minHeight: 500,
                    height: "calc(100vh - 120px)",
                    maxHeight: { xs: 500, sm: 700, xl: 1000 },
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        backgroundColor: "primary.light",
                        borderRadius: 2,
                        p: "10px",
                    }}
                >
                    Woops, something whent wrong. Looks like this page does not
                    exist.{" "}
                </Typography>
            </Container>
        </Box>
    );
}
