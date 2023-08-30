import React from "react";
import Day from "./Day";

export default class Weather extends React.Component {
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;
    console.log(dates);
    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className={"weather"}>
          {dates.map((value, index) => (
            <Day
              date={value}
              max={max.at(index)}
              min={min.at(index)}
              code={codes.at(index)}
              key={value}
              isToday={index === 0}
            ></Day>
          ))}
        </ul>
      </div>
    );
  }
}
