import { useState, useEffect } from "react";
import moment from "moment";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import "./Clock.css";

const Clock = ({ maxMeal, meals }) => {
    // Set up state value for keeping track of what time it is a

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, [1000 * 60]);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

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
                #e81e62 0deg,
                #e81e62 ${(meals.length / maxMeal) * 360}deg,
                #eceff1 ${(meals.length / maxMeal) * 360 + 1}deg,
                #eceff1 360deg              
                )`,
        },
    };

    // add half an hour check to check meal function

    // Somehow indicate how many meals are left in a day
    // dotted line for each meal?

    const checkMeal = (hour) => {
        let mealHour = meals.find((meal) => {
            let h = moment(meal.time).format("HH");
            let mins = moment(meal.time).format("mm");

            if (mins > 30) {
                h++;
            }

            return h == hour;
        });

        return mealHour ? (
            <LunchDiningIcon style={{ fontSize: "small", color: "#e81e62" }} />
        ) : (
            hour
        );
    };

    /*  const checkMeal = (hour) =>
        meals.find((meal) => moment(meal.time).format("HH") == hour) ? (
            <LunchDiningIcon style={{ fontSize: "small", color: "#e81e62" }} />
        ) : (
            hour
        ); */

    /*  return meals.find((meal) => {
            let h = moment(meal.time).format("HH");
            let mins = moment(meal.time).format("mm");

            if (mins > 30) {
                h++;
            }

            return h == hour ? (
                <LunchDiningIcon
                    style={{ fontSize: "small", color: "#e81e62" }}
                />
            ) : (
                hour
            );
        });
    }; */

    return (
        <div className="clockContainer">
            <div className="clock">
                <div className="outer-clock-face">
                    <div className="marking marking-vertical quaterday">
                        <div className="pm">{checkMeal(24)}</div>
                        <div className="am">{checkMeal(12)}</div>
                    </div>
                    <div className="marking marking-one">
                        <div className="pm">{checkMeal(13)}</div>
                        <div className="am">{checkMeal(1)}</div>
                    </div>
                    <div className="marking marking-two">
                        <div className="pm">{checkMeal(14)}</div>
                        <div className="am">{checkMeal(2)}</div>
                    </div>
                    <div className="marking marking-three">
                        <div className="pm">{checkMeal(15)}</div>
                        <div className="am">{checkMeal(3)}</div>
                    </div>
                    <div className="marking marking-four">
                        <div className="pm">{checkMeal(16)}</div>
                        <div className="am">{checkMeal(4)}</div>
                    </div>
                    <div className="marking marking-five">
                        <div className="pm">{checkMeal(17)}</div>
                        <div className="am">{checkMeal(5)}</div>
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
                        <div className="pm">{checkMeal(18)}</div>
                        <div className="am">{checkMeal(6)}</div>
                    </div>
                    <div className="marking marking-six">
                        <div className="pm">{checkMeal(19)}</div>
                        <div className="am">{checkMeal(7)}</div>
                    </div>
                    <div className="marking marking-seven">
                        <div className="pm">{checkMeal(20)}</div>
                        <div className="am">{checkMeal(8)}</div>
                    </div>
                    <div className="marking marking-eight">
                        <div className="pm">{checkMeal(21)}</div>
                        <div className="am">{checkMeal(9)}</div>
                    </div>
                    <div className="marking marking-nine">
                        <div className="pm">{checkMeal(22)}</div>
                        <div className="am">{checkMeal(10)}</div>
                    </div>
                    <div className="marking marking-ten">
                        <div className="pm">{checkMeal(23)}</div>
                        <div className="am">{checkMeal(11)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;

/*   useEffect(() => {
        console.log("meals.length", meals.length);
        console.log("meals", meals);
        console.log("maxMeal", maxMeal);
        console.log("%360", (meals.length / maxMeal) * 360);
        console.log(
            "%360 + 90deg",
            (meals.length / maxMeal) * 360 - 90 > 0
                ? (meals.length / maxMeal) * 360 - 90
                : (meals.length / maxMeal) * 360 + 270
        );
    }, [maxMeal, meals]);
 */
