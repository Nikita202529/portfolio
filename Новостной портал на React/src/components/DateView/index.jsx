import React from "react";
import prepareDate from "../../utils/prepareDate";

import './style.scss';

const DateView = (props) => {

    const {day, month} = prepareDate(props.value);

    return (
        <p className="dateView">
            <span className="day">{day}</span> / {" "}
            <span className="month">{month}</span>
        </p>
    )
}

export default DateView;