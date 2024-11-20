import React from 'react'

const ForecastCard = ({forecast}) => {
    const {condition, time} = forecast;
    const {text, icon} = condition;
  return (
    <div  className="forecast">
            <img src={icon} alt="forecast-icon" className='forecast-icon'/>
            <span>{text}</span>
            <span>@{new Date(time).toLocaleTimeString().split(":00")}</span>
        </div>
  )
}

export default ForecastCard
