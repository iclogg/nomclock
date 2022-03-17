import React from "react";

import "./Clock.css";

const Clock = () => {
    return (
        <div className="clockContainer">
            <div className="clock">
                <div class="outer-clock-face">
                    <div class="marking marking-vertical quaterday">
                        <div className="pm">24</div>
                        <div className="am">12</div>
                    </div>
                    <div class="marking marking-one">
                        <div className="pm">13</div>
                        <div className="am">1</div>
                    </div>
                    <div class="marking marking-two">
                        <div className="pm">14</div>
                        <div className="am">2</div>
                    </div>
                    <div class="marking marking-three">
                        <div className="pm">15</div>
                        <div className="am">3</div>
                    </div>
                    <div class="marking marking-four">
                        <div className="pm">16</div>
                        <div className="am">4</div>
                    </div>
                    <div class="marking marking-five">
                        <div className="pm">17</div>
                        <div className="am">5</div>
                    </div>

                    <div class="inner-clock-face">
                        <div class="hand hour-hand time"></div>
                        <div class="hand min-hand"></div>
                        <div class="hand second-hand"></div>
                    </div>
                    <div class="marking marking-horizontal quaterday">
                        <div className="pm">18</div>
                        <div className="am">6</div>
                    </div>
                    <div class="marking marking-six">
                        <div className="pm">19</div>
                        <div className="am">7</div>
                    </div>
                    <div class="marking marking-seven">
                        <div className="pm">20</div>
                        <div className="am">8</div>
                    </div>
                    <div class="marking marking-eight">
                        <div className="pm">21</div>
                        <div className="am">9</div>
                    </div>
                    <div class="marking marking-nine">
                        <div className="pm">22</div>
                        <div className="am">10</div>
                    </div>
                    <div class="marking marking-ten">
                        <div className="pm">23</div>
                        <div className="am">11</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;
