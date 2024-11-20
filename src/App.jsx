import { useEffect, useState } from "react"
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {

  const [getVideoBack, setVideoBack] = useState("clearsunny");
  const [getWeatherDetail, setWeatherDetail] = useState([]);


  const videoBackFn = (weather) => {
    console.log(weather);
    // setVideoBack(weather);
  }


  const fetchWeatherReport = async(city) => {
    try {
      const {data} = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=8ed60fb5871c4d04b17182001242207&q=${city}&days=1&aqi=yes&alerts=yes`);
      const {current, location, forecast} = data;
      const {temp_c ,temp_f, condition, last_updated} = current;
      const {text, icon} = condition;
      if(text){
        videoBackFn(text.toLowerCase());
      }
      const {country, localtime, name, tz_id} = location;
      const {forecastday} = forecast;
      const {hour} = forecastday[0];
      setWeatherDetail([{
        temp_c,temp_f, weatherStatus: text, weatherImg: icon, last_updated, country, localtime, name, region: tz_id, dayForecast: hour 
      }])
      console.log(temp_c ,temp_f, condition, last_updated,country, localtime, name, tz_id, hour);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    

    // fetchWeatherReport("tokyo")
  }, [])

  return (
    <div className="container">
      {/* <video autoPlay muted loop id="myVideo" >
      <source src={`./assets/videos/${getVideoBack}.mp4`} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video> */}


          <input type="text" placeholder="Bengaluru, Karnataka" className="searchCity"/>

      <div className="weather-card-main">
       <div className="weather-card">
        {getWeatherDetail.map((report, ind) => <WeatherCard key={ind} report={report} />)}
       </div>
      </div>
    </div>

  )
}

export default App
