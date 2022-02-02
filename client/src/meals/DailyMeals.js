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
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import NewMeal from "./NewMeal";
import DeleteMeal from "./DeleteMeal";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const mealNames = [
    { num: "one", arr: ["MealTime!"] },
    { num: "two", arr: ["Breakfast", "Dinner"] },
    { num: "three", arr: ["Breakfast", "Lunch", "Dinner"] },
    { num: "four", arr: ["Breakfast", "Second Breakfast", "Lunch", "Dinner"] },
    {
        num: "five",
        arr: [
            "Breakfast",
            "Second Breakfast",
            "Lunch",
            "Afternoon Tea",
            "Dinner",
        ],
    },
    {
        num: "six",
        arr: [
            "Breakfast",
            "Second Breakfast",
            "Lunch",
            "Afternoon Tea",
            "Dinner",
            "Late Night Munchies",
        ],
    },
];

const DailyMeals = (props) => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();
    const { petId } = useParams();
    let maxM = {};

    const [meals, setMeals] = useState([]);

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

                    return (
                        mealDate.setHours(0, 0, 0, 0) ===
                        today.setHours(0, 0, 0, 0)
                    );
                });

                setMeals(preppedMeals);
            } catch (err) {
                console.log(err);
            }
        };

        getMeal();
    }, [sendRequest, auth, petId]);

    const mealDeletedHandler = (newMeals) => {
        setMeals(newMeals);
    };

    const mealAddHandler = (list) => {
        setMeals(list);
    };

    return (
        <Grid
            container
            justifyContent="center"
            sx={{ p: "10px", m: "10px" }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Grid item xs={5} sx={{ backgroundColor: "primary.main" }}>
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
                                                mealDeletedHandler={
                                                    mealDeletedHandler
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
                                                mealDeletedHandler={
                                                    mealDeletedHandler
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
                <NewMeal mealAddHandler={mealAddHandler} meals={meals} />
            </Grid>
        </Grid>
    );
};

export default DailyMeals;
