import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            light: "#ffffff",
            main: "#eceff1",
            dark: "#babdbe",
            contrastText: "#000",
        },
        secondary: {
            light: "#ff5983",
            main: "#00897b" /* f50057 */,
            dark: "#bb002f",
            contrastText: "#000",
        },
    },
    typography: {
        fontFamily: `"Josefin Sans", sans-serif`,
        fontSize: 17,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // Fixing verical placing of text caused by font.
                    paddingBottom: "0px",
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 8,
            },
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                },
            },
        },
        MuiInputBase: {
            defaultProps: {
                color: "secondary",
            },
        },
        MuiInputLabel: {
            defaultProps: {
                color: "secondary",
            },
        },
    },
});

export { theme };
