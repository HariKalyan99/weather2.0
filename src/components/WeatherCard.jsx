import React, { useEffect } from 'react'
import { IoLocationSharp } from 'react-icons/io5'

const WeatherCard = ({report}) => {
   
  return (
    <>
    <div className="weather-details">
          <div className="location">
          <IoLocationSharp style={{color: "red"}}/>
          </div>
          <div className="temperature">
            <span>30 &deg; C</span>
            <span>30 f</span>
          </div>
        </div>

        <div className="weather-forecast">
          <div className="forecast"></div>
          <div className="forecast"></div>
          <div className="forecast"></div>
          <div className="forecast"></div>
          <div className="forecast"></div>
        </div>
    </>
  )
}

export default WeatherCard
