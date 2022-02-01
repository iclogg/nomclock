import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import NewMeal from "./NewMeal";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const DailyMeals = (props) => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();
    const { petId } = useParams();

    const [meals, setMeals] = useState([]);
    let maxM = [];

    for (let i = 1; i <= props.maxMeals; i++) {
        maxM.push(i);
    }

    console.log(maxM);

    useEffect(() => {
        const getMeal = async () => {
            let preppedMeals;
            try {
                const response = await sendRequest(
                    `meals/${petId}`,
                    "get",
                    {},
                    { authorization: "Bearer " + auth.token }
                );
                preppedMeals = [...response.data.meals].sort((x, y) => {
                    return new Date(x.time) - new Date(y.time);
                });

                preppedMeals = preppedMeals.filter((meal) => {
                    let mealDate = new Date(meal.time);
                    let today = new Date();
                    console.log("mealDate", mealDate);
                    console.log("today", today);

                    console.log(
                        "compare",
                        mealDate.setHours(0, 0, 0, 0) ===
                            today.setHours(0, 0, 0, 0)
                    );

                    return (
                        mealDate.setHours(0, 0, 0, 0) ===
                        today.setHours(0, 0, 0, 0)
                    );
                });

                console.log("all", response.data.meals);
                console.log("prepped", preppedMeals);

                setMeals(preppedMeals);
            } catch (err) {
                console.log(err);
            }
        };

        getMeal();
    }, [sendRequest, auth, petId]);

    return (
        <Grid
            container
            justifyContent="center"
            sx={{ p: "10px", m: "10px" }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Grid item xs={5} sx={{ backgroundColor: "primary.main" }}>
                <Timeline position="alternate">
                    {maxM.map((mealTime) => {
                        return (
                            <TimelineItem key={mealTime}>
                                <TimelineSeparator>
                                    <TimelineDot
                                        color={
                                            meals[mealTime - 1] && "secondary"
                                        }
                                    />
                                    {mealTime !== props.maxMeals && (
                                        <TimelineConnector />
                                    )}
                                </TimelineSeparator>
                                <TimelineContent>
                                    {moment(
                                        meals[mealTime - 1]
                                            ? meals[mealTime - 1].time
                                            : mealTime
                                    ).format("HH:mm")}
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                    {meals.length > props.maxMeals && (
                        <Typography variant="p">
                            woops, the darling has had a cheat day today
                        </Typography>
                    )}
                    {meals.length > props.maxMeals &&
                        meals.map((meal, i) => {
                            if (i >= props.maxMeals) {
                                return (
                                    <TimelineItem key={meal.time}>
                                        <TimelineSeparator>
                                            <TimelineDot color="secondary" />
                                            {i !== meals.length - 1 && (
                                                <TimelineConnector />
                                            )}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            {moment(meal.time).format("HH:mm")}
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            }
                        })}
                </Timeline>
            </Grid>
            <Grid xs={3} item>
                <NewMeal />
            </Grid>
        </Grid>
    );
};

export default DailyMeals;

/*    <Timeline>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Eat</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Code</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>Sleep</TimelineContent>
                    </TimelineItem>
                </Timeline> */
