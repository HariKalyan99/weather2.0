import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [getVideoBack, setVideoBack] = useState("");
  const [getWeatherDetail, setWeatherDetail] = useState([]);
  const [getInputCity, setInputCity] = useState("bengaluru");
  const [getDebounceTimer, setDebounceTimer] = useState(0);

  useEffect(() => {
    if (getDebounceTimer !== 0) {
      clearTimeout(getDebounceTimer);
    }

    const newTimer = setTimeout(async () => {
      if (getInputCity?.length) {
        await fetchWeatherReport(getInputCity);
      } else {
        setVideoBack("sunny");
      }
    }, 600);

    setDebounceTimer(newTimer);
  }, [getInputCity]);

  const fetchWeatherReport = async (city) => {
    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=8ed60fb5871c4d04b17182001242207&q=${city}&days=1&aqi=yes&alerts=yes`
      );
      const { current, location, forecast } = data;
      const { temp_c, temp_f, condition, last_updated } = current;
      const { text, icon } = condition;
      const { country, localtime, name, tz_id } = location;
      const { forecastday } = forecast;
      const { hour } = forecastday[0];
      if (
        text?.toLowerCase() === "mist" ||
        text?.toLowerCase() === "light snow" ||
        text?.toLowerCase() === "overcast"
      ) {
        setVideoBack("cloudy");
      } else if (
        text.toLowerCase() === "sunny" ||
        !text ||
        text.toLowerCase() === "clear"
      ) {
        setVideoBack("sunny");
      } else if (
        text.toLowerCase() === "light rain" ||
        text.toLowerCase() === "moderate or heavy snow showers" ||
        text.toLowerCase() === "patchy light drizzle" ||
        text.toLowerCase() === "light rain shower"
      ) {
        setVideoBack("rainy");
      } else if (
        text.toLowerCase() === "partly cloudy" ||
        text.toLowerCase() === "cloudy"
      ) {
        setVideoBack("cloudy");
      } else {
        setVideoBack("thunder");
      }
      setWeatherDetail([
        {
          temp_c,
          temp_f,
          weatherStatus: text,
          weatherImg: icon,
          last_updated,
          country,
          localtime,
          name,
          region: tz_id,
          dayForecast: hour,
        },
      ]);
    } catch (error) {
      console.log(error);
      setVideoBack("sunny");
    }
  };

  const handleInputChange = (val) => {
    if (val?.length) {
      setInputCity(val);
    } else {
      setInputCity("");
      setWeatherDetail([]);
    }
  };

  return (
    <div className="container">
      {getVideoBack === "cloudy" && (
        <video autoPlay muted loop id="myVideo">
          <source src={`./assets/videos/cloudy.mp4`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}

      {getVideoBack === "sunny" && (
        <video autoPlay muted loop id="myVideo">
          <source src={`./assets/videos/sunny.mp4`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}

      {getVideoBack === "rainy" && (
        <video autoPlay muted loop id="myVideo">
          <source src={`./assets/videos/rainy.mp4`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}

      {getVideoBack === "thunder" && (
        <video autoPlay muted loop id="myVideo">
          <source src={`./assets/videos/thunder.mp4`} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}

      <input
        type="text"
        placeholder="Bengaluru, Karnataka"
        className="searchCity"
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <div className="weather-card-main">
        <div className="weather-card">
          {getWeatherDetail?.length ? (
            getWeatherDetail?.map((report, ind) => (
              <WeatherCard key={ind} report={report} />
            ))
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/044/923/845/small/no-cold-weather-icon-png.png"
                alt="no_match"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
