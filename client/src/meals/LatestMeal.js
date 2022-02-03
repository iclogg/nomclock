import React, { useState, useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const LatestMeal = ({ petId }) => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();

    const [meal, setMeal] = useState({});

    useEffect(() => {
        const getMeal = async () => {
            try {
                const response = await sendRequest(
                    `meals/${petId}/latest`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );

                console.log("response.data.meal", response.data.meal);

                setMeal(response.data.meal);
            } catch (err) {
                console.log(err);
            }
        };

        getMeal();
    }, [sendRequest, auth, petId]);

    return <Typography>Latest Meal{meal.time} </Typography>;
};
export default LatestMeal;
