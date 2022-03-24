import { useState, useEffect } from "react";
import moment from "moment";

import "./Clock.css";

const Clock = ({ maxMeal, meals }) => {
    // Set up state value for keeping track of what time it is a

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, [1000]);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    //and dynamically style the hour pointer.
    const trackingStyle = {
        hour: {
            background: "blue",
            transform: `rotate(${
                ((parseInt(moment(time).format("HH") - 6 > 0)
                    ? parseInt(moment(time).format("HH")) - 6
                    : parseInt(moment(time).format("HH")) + 18) /
                    24) *
                360
            }deg)`,
        },
        meals: {
            background: "green",
            transform: `rotate(${
                (meals.length / maxMeal) * 360 - 90 > 0
                    ? (meals.length / maxMeal) * 360 - 90
                    : (meals.length / maxMeal) * 360 + 270
            }deg)`,
        },
    };

    // Translate amount of eaten meals to a % of 360
    useEffect(() => {
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

    // and visually represent it in clock.
    // dotted line for each meal
    // filled space for eaten meals
    // hour conversion to smoother set up

    // Somehow indicate how many meals are left in a day

    return (
        <div className="clockContainer">
            <div className="clock">
                <div className="outer-clock-face">
                    <div className="marking marking-vertical quaterday">
                        <div className="pm">24</div>
                        <div className="am">12</div>
                    </div>
                    <div className="marking marking-one">
                        <div className="pm">13</div>
                        <div className="am">1</div>
                    </div>
                    <div className="marking marking-two">
                        <div className="pm">14</div>
                        <div className="am">2</div>
                    </div>
                    <div className="marking marking-three">
                        <div className="pm">15</div>
                        <div className="am">3</div>
                    </div>
                    <div className="marking marking-four">
                        <div className="pm">16</div>
                        <div className="am">4</div>
                    </div>
                    <div className="marking marking-five">
                        <div className="pm">17</div>
                        <div className="am">5</div>
                    </div>

                    <div className="inner-clock-face">
                        <div
                            style={trackingStyle.hour}
                            className="hand hour-hand time"
                        ></div>
                        <div
                            style={trackingStyle.meals}
                            className="hand min-hand time"
                        ></div>
                        <div className=" hand second-hand time"></div>
                        {/* <div className="hand second-hand time"></div>
                         */}{" "}
                    </div>
                    <div className="marking marking-horizontal quaterday">
                        <div className="pm">18</div>
                        <div className="am">6</div>
                    </div>
                    <div className="marking marking-six">
                        <div className="pm">19</div>
                        <div className="am">7</div>
                    </div>
                    <div className="marking marking-seven">
                        <div className="pm">20</div>
                        <div className="am">8</div>
                    </div>
                    <div className="marking marking-eight">
                        <div className="pm">21</div>
                        <div className="am">9</div>
                    </div>
                    <div className="marking marking-nine">
                        <div className="pm">22</div>
                        <div className="am">10</div>
                    </div>
                    <div className="marking marking-ten">
                        <div className="pm">23</div>
                        <div className="am">11</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;
