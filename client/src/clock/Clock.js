import moment from "moment";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Tooltip from "@mui/material/Tooltip";

import "./Clock.css";
import { theme } from "../utils/mui-theme-customization";

import useMeals from "../utils/meal-hooks";

const Clock = ({ maxMeal, meals, mealsUpdateHandler }) => {
    const { deleteMeal, addMeal } = useMeals();

    // Colors for meals-disk
    const indicatorColor = theme.palette.secondary.main;
    const clockBackgroundColor = theme.palette.primary.light;

    const styleBackgroundColor = {
        clock: { backgroundColor: clockBackgroundColor },
        disk: {
            borderColor: clockBackgroundColor,
        },
    };

    // Calculate css for indicator lines on meals-disk for how many meals left in the day
    const getMealsLeftIndicator = (noMeals) => {
        if (noMeals) {
            return `
                ${clockBackgroundColor} 0deg,
                ${indicatorColor} 1deg 2deg,
                ${clockBackgroundColor} 3deg,
                
            `;
        }

        let mealsLeft = maxMeal - meals.length;
        let totDegLeft = (mealsLeft / maxMeal) * 360;
        let nLines = meals.length ? mealsLeft - 1 : mealsLeft;
        let degEach = totDegLeft / mealsLeft;
        let returnStr = "";

        for (let i = 1; i <= nLines; i++) {
            returnStr += `
                ${clockBackgroundColor} ${
                (meals.length / maxMeal) * 360 + degEach * i
            }deg,
                ${indicatorColor} ${
                (meals.length / maxMeal) * 360 + degEach * i + 1
            }deg,
                ${indicatorColor} ${
                (meals.length / maxMeal) * 360 + degEach * i + 2
            }deg,
                ${clockBackgroundColor} ${
                (meals.length / maxMeal) * 360 + degEach * i + 3
            }deg,
                `;
        }
        return returnStr;
    };

    //Style object for styles indicating the tracking of current time and amount of meals left and eaten.
    const trackingStyle = {
        //Calculates the CSS for showing the current time.
        minutesInDay: {
            transform: `rotate(${
                ((parseInt(
                    moment().diff(moment().clone().startOf("day"), "minutes") -
                        360 >
                        0
                )
                    ? parseInt(
                          moment().diff(
                              moment().clone().startOf("day"),
                              "minutes"
                          )
                      ) - 360
                    : parseInt(
                          moment().diff(
                              moment().clone().startOf("day"),
                              "minutes"
                          )
                      ) + 1080) /
                    1440) *
                360
            }deg)`,
        },
        // Translate amount of eaten meals and meals left into color segments on the meals-disk. First checks if any meals at all. Fills in indicatorColor for amount of eaten. Then uses getMealsLeftIndicator to get segmented section.
        disk: {
            background: `conic-gradient(
                from 180deg,
                ${
                    meals.length
                        ? `${indicatorColor} 0deg,`
                        : getMealsLeftIndicator(true)
                }
                ${indicatorColor} ${(meals.length / maxMeal) * 360}deg,
                ${clockBackgroundColor} ${
                (meals.length / maxMeal) * 360 + 1
            }deg,
                ${getMealsLeftIndicator()}
                ${clockBackgroundColor} 360deg              
                )`,
        },
    };
    // Check if there is a meal eaten or not in the hour passed to it and returns either an icon for eaten or the number of the hour passed.
    const checkMeal = (hour) => {
        let mealHour = meals.find((meal) => {
            let h = moment(meal.time).format("HH");
            let mins = moment(meal.time).format("mm");

            if (mins > 30) {
                h++;
                if (h == "24") {
                    h = "00";
                }
            }

            return h == hour;
        });

        return mealHour ? (
            <Tooltip title="Delete">
                <LunchDiningIcon
                    className="clockburger"
                    id={mealHour._id}
                    style={{ fontSize: "medium" }}
                    color="secondary"
                />
            </Tooltip>
        ) : (
            hour || "24"
        );
    };
    //Toggles adding and deleting a meal for the hour clicked.
    const clickHandler = (e) => {
        if (e.target.innerText) {
            addMeal(mealsUpdateHandler, e.target.innerText, "", meals);
        } else if (e.target.id) {
            deleteMeal(e.target.id, meals, mealsUpdateHandler);
        }
    };

    return (
        <div className="clockContainer">
            <div className="clock" style={styleBackgroundColor.clock}>
                <div className="outer-clock-face">
                    {/* Meals-Disk and Current Time */}
                    <div
                        style={{
                            ...trackingStyle.disk,
                            ...styleBackgroundColor.disk,
                        }}
                        className="meals-disk"
                    >
                        <div
                            style={trackingStyle.minutesInDay}
                            className="time "
                        ></div>
                    </div>
                    {/* Quater Day Markings */}
                    <div className="marking marking-vertical quaterday">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(0)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(12)}
                        </div>
                    </div>
                    <div className="marking marking-horizontal quaterday">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(18)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(6)}
                        </div>
                    </div>
                    {/* Hour of the Day Markings */}
                    <div className="marking marking-one">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(13)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(1)}
                        </div>
                    </div>
                    <div className="marking marking-two">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(14)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(2)}
                        </div>
                    </div>
                    <div className="marking marking-three">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(15)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(3)}
                        </div>
                    </div>
                    <div className="marking marking-four">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(16)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(4)}
                        </div>
                    </div>
                    <div className="marking marking-five">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(17)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(5)}
                        </div>
                    </div>
                    <div className="marking marking-seven">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(19)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(7)}
                        </div>
                    </div>
                    <div className="marking marking-eight">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(20)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(8)}
                        </div>
                    </div>
                    <div className="marking marking-nine">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(21)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(9)}
                        </div>
                    </div>
                    <div className="marking marking-ten">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(22)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(10)}
                        </div>
                    </div>
                    <div className="marking marking-eleven">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(23)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(11)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;
