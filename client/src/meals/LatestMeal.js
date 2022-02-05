import React, { useState, useContext, useEffect } from "react";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const LatestMeal = ({ petId }) => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();

    const [meal, setMeal] = useState({});

    const getMeal = async () => {
        try {
            const response = await sendRequest(
                `meals/${petId}/latest`,
                "get",
                {},
                { authorization: "Bearer " + auth.token }
            );

            setMeal(response.data.meal);
        } catch (err) {
            setMeal({});
            console.log(err);
        }
    };

    useEffect(() => {
        getMeal();
    }, [sendRequest, auth, petId]);

    return (
        <Box
            sx={{
                mt: 5,
                pb: 5,
                border: "1px dashed",
                borderColor: "secondary.main",
                backgroundColor: "primary.main",
                fontWeight: "bold",
                textTransform: "uppercase",
            }}
        >
            <Tooltip title="Refresh">
                <IconButton
                    onClick={getMeal}
                    sx={{
                        position: "relative",
                        float: "right",
                        mt: 0.5,
                        mr: 0.5,
                        color: "secondary.dark",
                    }}
                >
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
            <Typography variant="p" display="block" sx={{ mt: 6 }}>
                {meal.time ? "Latest Meal" : "No Meal Saved"}
            </Typography>

            {meal.time && (
                <>
                    <Typography variant="p" sx={{ color: "secondary.main" }}>
                        {moment(meal.time).calendar(null, {
                            sameDay: "[Today]",
                            nextDay: "[Tomorrow]",
                            nextWeek: "dddd",
                            lastDay: "[Yesterday]",
                            lastWeek: "[Last] dddd",
                            sameElse: "DD/MM/YYYY",
                        })}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "secondary.main",
                            fontSize: "52px",
                            textDecoration: "underline",
                        }}
                    >
                        {moment(meal.time).format("HH:mm")}
                    </Typography>
                </>
            )}
        </Box>
    );
};
export default LatestMeal;
