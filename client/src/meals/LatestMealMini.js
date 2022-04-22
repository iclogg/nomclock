import { useState, useContext, useEffect } from "react";
import moment from "moment";

import { Typography } from "@mui/material";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const LatestMealMini = ({ meal }) => {
    return (
        <Typography
            variant="body1"
            sx={{ fontSize: "0.7em", color: "secondary.contrastText" }}
        >
            {meal ? "Latest Meal" : "No Meal Saved"}{" "}
            {meal && (
                <>
                    <br />
                    <Typography
                        variant="span"
                        sx={{
                            color: "secondary.main",
                            fontSize: "2em",
                            lineHeight: "1",
                        }}
                    >
                        {moment(meal.time).format("HH:mm")}
                    </Typography>
                    <br />

                    {moment(meal.time).calendar(null, {
                        sameDay: "[Today]",
                        nextDay: "[Tomorrow]",
                        nextWeek: "dddd",
                        lastDay: "[Yesterday]",
                        lastWeek: "[Last] dddd",
                        sameElse: "DD/MM/YYYY",
                    })}
                </>
            )}
        </Typography>
    );
};
export default LatestMealMini;
