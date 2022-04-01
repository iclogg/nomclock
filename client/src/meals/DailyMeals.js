import { useState, useEffect, useContext } from "react";
import moment from "moment";

import { useParams } from "react-router-dom";

import { Grid, Box, Typography } from "@mui/material";

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineDot,
} from "@mui/lab";

import NewMeal from "./NewMeal";
import DeleteMeal from "./DeleteMeal";
import LatestMeal from "./LatestMeal";
import Clock from "../clock/Clock";

import useAxios from "../utils/axios-hook";
import useMeals from "../utils/meal-hooks";
import { AuthContext } from "../utils/auth-context";
import mealNames from "../utils/meal-names";

const DailyMeals = (props) => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();
    const { getMeals } = useMeals();
    const { petId } = useParams();
    const [meals, setMeals] = useState([]);

    let maxM = {};

    if (props.maxMeals) {
        if (props.maxMeals > 6) {
            let mealTimeArr = [];
            for (let i = 0; i < props.maxMeals; i++) {
                mealTimeArr.push(`${i + 1}/${props.maxMeals} meals`);
            }
            maxM = {
                num: "over six",
                arr: mealTimeArr,
            };
        } else {
            maxM = mealNames.filter((listObj) => {
                return listObj.arr.length == props.maxMeals;
            })[0];
        }
    }

    const mealsUpdateHandler = (list) => {
        setMeals(list);
    };

    useEffect(() => {
        getMeals(mealsUpdateHandler);
    }, [sendRequest, auth, petId]);

    return (
        <Grid
            container
            justifyContent="center"
            sx={{ p: "10px", m: "10px" }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Box>
                <Clock
                    meals={meals}
                    maxMeal={props.maxMeals}
                    mealsUpdateHandler={mealsUpdateHandler}
                    /*  mealAddHandler={mealAddHandler} */
                />
            </Box>

            <Grid item xs={8} sx={{ backgroundColor: "primary.main" }}>
                <Typography
                    variant="h5"
                    sx={{ textTransform: "uppercase", mt: "35px" }}
                >
                    Today's Meals
                </Typography>
                <Timeline position="alternate">
                    {props.maxMeals &&
                        maxM.arr.map((mealTime, i) => {
                            return (
                                <TimelineItem key={i}>
                                    {meals[i] && meals[i].comment && (
                                        <TimelineOppositeContent color="text.secondary">
                                            {meals[i].comment}
                                        </TimelineOppositeContent>
                                    )}
                                    <TimelineSeparator>
                                        <TimelineDot
                                            color={meals[i] && "secondary"}
                                        />
                                        {i + 1 !== props.maxMeals && (
                                            <TimelineConnector />
                                        )}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        {meals[i]
                                            ? mealTime +
                                              " at " +
                                              moment(meals[i].time).format(
                                                  "HH:mm"
                                              )
                                            : mealTime}

                                        {meals[i] && (
                                            <DeleteMeal
                                                mealsUpdateHandler={
                                                    mealsUpdateHandler
                                                }
                                                meals={meals}
                                                mealId={meals[i]._id}
                                            />
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        })}
                    {meals.length > props.maxMeals && (
                        <Typography
                            color="secondary"
                            variant="p"
                            sx={{ mb: "35px" }}
                        >
                            Woops, the darling has had a cheat day today.
                        </Typography>
                    )}
                    {meals.length > props.maxMeals &&
                        meals.map((meal, i) => {
                            if (i >= props.maxMeals) {
                                return (
                                    <TimelineItem key={meal.time}>
                                        {meal.comment && (
                                            <TimelineOppositeContent color="text.secondary">
                                                {meal.comment}
                                            </TimelineOppositeContent>
                                        )}
                                        <TimelineSeparator>
                                            <TimelineDot color="secondary" />
                                            {i !== meals.length - 1 && (
                                                <TimelineConnector />
                                            )}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            {"Snacks at " +
                                                moment(meal.time).format(
                                                    "HH:mm"
                                                )}

                                            <DeleteMeal
                                                mealsUpdateHandler={
                                                    mealsUpdateHandler
                                                }
                                                meals={meals}
                                                mealId={meal._id}
                                            />
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            }
                        })}
                </Timeline>
            </Grid>
            <Grid xs={3} item>
                <NewMeal
                    mealsUpdateHandler={mealsUpdateHandler}
                    meals={meals}
                />
                <LatestMeal petId={petId} />
            </Grid>
        </Grid>
    );
};

export default DailyMeals;
