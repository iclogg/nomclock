import { useState, useContext, useEffect } from "react";
import moment from "moment";

import { Typography } from "@mui/material";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const LatestMealMini = ({ petId }) => {
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

            if (!response.data.noMeal) {
                setMeal(response.data.meal);
            }
        } catch (err) {
            setMeal({});
            console.log(err);
        }
    };

    useEffect(() => {
        getMeal();
    }, [sendRequest, auth, petId]);

    return (
        <Typography variant="body1" sx={{ fontSize: "0.7em" }}>
            {meal.time ? "Latest Meal" : "No Meal Saved"}{" "}
            {meal.time && (
                <>
                    <Typography
                        sx={{
                            color: "secondary.main",
                            fontSize: "2em",
                            lineHeight: "1",
                        }}
                    >
                        {moment(meal.time).format("HH:mm")}
                    </Typography>

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
