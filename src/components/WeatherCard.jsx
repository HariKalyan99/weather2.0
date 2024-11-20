import React, { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import ForecastCard from "./ForecastCard";

const WeatherCard = ({ report }) => {
  const {
    temp_c,
    temp_f,
    weatherStatus,
    weatherImg,
    last_updated,
    country,
    localtime,
    name,
    region,
    dayForecast,
  } = report;

  

  return (
    <>
      <div className="weather-details">
        <div className="location">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <span className="city-name">
              <IoLocationSharp style={{ color: "black" }} /> {name}
            </span>
            <span className="city-date">
              {new Date(last_updated).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="city-time">
              {new Date(localtime).toLocaleTimeString().split(":00")}
            </span>
          </div>
          <span className="city-status">{weatherStatus}</span>
        </div>
        <div className="weatherIcon">
          <img
            src={weatherImg}
            alt="weather-icon"
            className="weatherIcon-img"
          />
        </div>
        <div className="temperature">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span className="country">COUNTRY: {country}</span>
            <span className="region">REGION: {region}</span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <span className="farenheit">{temp_f}f</span>
            <span className="celcius">{temp_c}&deg;C</span>
          </div>
        </div>
      </div>

      <div className="weather-forecast-main">
      <div className="weather-forecast">
        {dayForecast.map((forecast, ind) => <ForecastCard forecast={forecast} key={ind}/>)}
                
      </div>
      </div>
    </>
  );
};

export default WeatherCard;
