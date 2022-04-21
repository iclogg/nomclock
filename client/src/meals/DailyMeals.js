import { useState, useEffect } from "react";
import moment from "moment";

import { Grid, Typography, Paper } from "@mui/material";

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
/* import LatestMeal from "./LatestMeal"; */
import Clock from "../clock/Clock";

import useMeals from "../utils/meal-hooks";
import mealNames from "../utils/meal-names";

const DailyMeals = (props) => {
    const { getMeals } = useMeals();
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
    }, []);

    // Fontsize dynamic styling based on screen size for TimeLine

    const fontSizeMDtoXL = "1em";
    const fontSizeXS = "0.8em";

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            spacing={1}
        >
            <Grid item xs="auto">
                <Clock
                    meals={meals}
                    maxMeal={props.maxMeals}
                    mealsUpdateHandler={mealsUpdateHandler}
                />
            </Grid>
            <Grid xs={12} md={6} item>
                <NewMeal
                    mealsUpdateHandler={mealsUpdateHandler}
                    meals={meals}
                />
                {/*   <LatestMeal petId={petId} /> */}
            </Grid>

            <Grid item xs={12} md={10} xl={8}>
                <Paper
                    elevation={8}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                        textAlign: "center",
                    }}
                >
                    <Typography pt={3} variant="h5">
                        Today's Meals
                    </Typography>
                    {/* Timeline for meals under max amount for day */}
                    <Timeline
                        position="left"
                        sx={{
                            paddingX: "5px",
                            paddingBottom: "0px",
                            marginBottom: "0px",
                        }}
                    >
                        {props.maxMeals &&
                            maxM.arr.map((mealTime, i) => {
                                return (
                                    <TimelineItem key={i}>
                                        {!meals[i] && (
                                            <TimelineOppositeContent
                                                color="text.secondary"
                                                fontSize={{
                                                    xs: fontSizeXS,
                                                    md: fontSizeMDtoXL,
                                                }}
                                                sx={{ paddingRight: "0px" }}
                                            ></TimelineOppositeContent>
                                        )}
                                        {meals[i] && (
                                            <TimelineOppositeContent
                                                color="text.secondary"
                                                fontSize={{
                                                    xs: fontSizeXS,
                                                    md: fontSizeMDtoXL,
                                                }}
                                                sx={{ paddingRight: "0px" }}
                                            >
                                                {meals[i]
                                                    ? " at " +
                                                      moment(
                                                          meals[i].time
                                                      ).format("HH:mm")
                                                    : ""}

                                                {" " + meals[i].comment + " "}
                                                {meals[i] && (
                                                    <DeleteMeal
                                                        mealsUpdateHandler={
                                                            mealsUpdateHandler
                                                        }
                                                        meals={meals}
                                                        mealId={meals[i]._id}
                                                    />
                                                )}
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
                                        <TimelineContent
                                            fontSize={{
                                                xs: fontSizeXS,
                                                md: fontSizeMDtoXL,
                                            }}
                                            sx={{ paddingLeft: "0px" }}
                                        >
                                            {mealTime}
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            })}

                        {/* Text for when max meals are exceeded*/}
                        {meals.length > props.maxMeals && (
                            <Typography
                                color="secondary"
                                variant="p"
                                fontSize={{
                                    xs: fontSizeXS,
                                    md: fontSizeMDtoXL,
                                }}
                                sx={{ mb: "35px" }}
                            >
                                Woops, the darling has had a cheat day today.
                            </Typography>
                        )}

                        {/* Timeline for meals over max amount for day */}
                        {meals.length > props.maxMeals &&
                            meals.map((meal, i) => {
                                if (i >= props.maxMeals) {
                                    return (
                                        <TimelineItem key={meal.time}>
                                            <TimelineOppositeContent
                                                color="text.secondary"
                                                fontSize={{
                                                    xs: fontSizeXS,
                                                    md: fontSizeMDtoXL,
                                                }}
                                                sx={{ paddingRight: "0px" }}
                                            >
                                                {" at "}
                                                {moment(meal.time).format(
                                                    "HH:mm"
                                                )}
                                                {" " + meal.comment + " "}
                                                <DeleteMeal
                                                    mealsUpdateHandler={
                                                        mealsUpdateHandler
                                                    }
                                                    meals={meals}
                                                    mealId={meal._id}
                                                />
                                            </TimelineOppositeContent>

                                            <TimelineSeparator>
                                                <TimelineDot color="secondary" />
                                                {i !== meals.length - 1 && (
                                                    <TimelineConnector />
                                                )}
                                            </TimelineSeparator>
                                            <TimelineContent
                                                fontSize={{
                                                    xs: fontSizeXS,
                                                    md: fontSizeMDtoXL,
                                                }}
                                                sx={{ paddingLeft: "0px" }}
                                            >
                                                {"Snacks"}
                                            </TimelineContent>
                                        </TimelineItem>
                                    );
                                }
                            })}
                    </Timeline>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DailyMeals;
