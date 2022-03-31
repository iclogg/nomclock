import { useState, useEffect } from "react";
import moment from "moment";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Tooltip from "@mui/material/Tooltip";

import "./Clock.css";

import useMeals from "../utils/meal-hooks";

const Clock = ({ maxMeal, meals, mealAddHandler, mealDeletedHandler }) => {
    // Set up state value for keeping track of what time it is a
    const { deleteMeal, addMeal } = useMeals();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, [1000 * 60]);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    // calculate css for meals left indicators on disk
    const getMealsLeftIndicator = (noMeals) => {
        if (noMeals) {
            return `
                #eceff1 0deg,
                white 1deg 2deg,
                #eceff1 3deg,
                
            `;
        }

        let mealsLeft = maxMeal - meals.length;
        let totDegLeft = (mealsLeft / maxMeal) * 360;
        let nLines = meals.length ? mealsLeft - 1 : mealsLeft;
        let degEach = totDegLeft / mealsLeft;
        let returnStr = "";

        for (let i = 1; i <= nLines; i++) {
            returnStr += `
                #eceff1 ${(meals.length / maxMeal) * 360 + degEach * i}deg,
                white ${(meals.length / maxMeal) * 360 + degEach * i + 1}deg,
                white ${(meals.length / maxMeal) * 360 + degEach * i + 2}deg,
                #eceff1 ${(meals.length / maxMeal) * 360 + degEach * i + 3}deg,
                `;
        }
        return returnStr;
    };

    //and dynamically style the hour pointer.
    const trackingStyle = {
        hour: {
            transform: `rotate(${
                ((parseInt(moment(time).format("HH") - 6 > 0)
                    ? parseInt(moment(time).format("HH")) - 6
                    : parseInt(moment(time).format("HH")) + 18) /
                    24) *
                360
            }deg)`,
        },
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
        // Translate amount of eaten meals to a % of 360
        meals: {
            transform: `rotate(${
                (meals.length / maxMeal) * 360 - 90 > 0
                    ? (meals.length / maxMeal) * 360 - 90
                    : (meals.length / maxMeal) * 360 + 270
            }deg)`,
        },
        // and visually represent it in clock.
        // filled space for eaten meals
        // logic for dynamically adjusting the disk.

        disk: {
            background: `conic-gradient(
                from 180deg,
                ${meals.length ? "#e81e62 0deg," : getMealsLeftIndicator(true)}
                #e81e62 ${(meals.length / maxMeal) * 360}deg,
                #eceff1 ${(meals.length / maxMeal) * 360 + 1}deg,
                ${getMealsLeftIndicator()}
                #eceff1 360deg              
                )`,
        },
    };

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
                    style={{ fontSize: "small", color: "#e81e62" }}
                />
            </Tooltip>
        ) : (
            hour || "24"
        );
    };

    const clickHandler = (e) => {
        if (e.target.innerText) {
            addMeal(mealAddHandler, e.target.innerText, "", meals);
        } else if (e.target.id) {
            deleteMeal(e.target.id, meals, mealDeletedHandler);
        }
    };

    return (
        <div className="clockContainer">
            <div className="clock">
                <div className="outer-clock-face">
                    <div className="marking marking-vertical quaterday">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(0)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(12)}
                        </div>
                    </div>
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

                    <div
                        style={trackingStyle.disk}
                        className="inner-clock-face"
                    >
                        {/*  <div
                            style={trackingStyle.hour}
                            className="hand hour-hand time"
                        ></div> */}
                        <div
                            style={trackingStyle.minutesInDay}
                            className="hand min-hand time"
                        ></div>
                        {/* <div className=" hand second-hand time"></div> */}
                    </div>
                    <div className="marking marking-horizontal quaterday">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(18)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(6)}
                        </div>
                    </div>
                    <div className="marking marking-six">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(19)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(7)}
                        </div>
                    </div>
                    <div className="marking marking-seven">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(20)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(8)}
                        </div>
                    </div>
                    <div className="marking marking-eight">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(21)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(9)}
                        </div>
                    </div>
                    <div className="marking marking-nine">
                        <div onClick={clickHandler} className="pm">
                            {checkMeal(22)}
                        </div>
                        <div onClick={clickHandler} className="am">
                            {checkMeal(10)}
                        </div>
                    </div>
                    <div className="marking marking-ten">
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
