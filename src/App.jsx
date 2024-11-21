import { useEffect, useRef, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [getImage, setImage] = useState("sunny")
  const [getWeatherDetail, setWeatherDetail] = useState([]);
  const [getInputCity, setInputCity] = useState("bengaluru");
  const [getDebounceTimer, setDebounceTimer] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    if (getDebounceTimer !== 0) {
      clearTimeout(getDebounceTimer);
    }

    const newTimer = setTimeout(async () => {
      if (getInputCity?.length) {
        await fetchWeatherReport(getInputCity);
      } else {
        setImage("https://wallpapers.com/images/hd/4k-beach-sunny-day-rw0tzo78l49ateln.jpg");
      }
    }, 600);

    setDebounceTimer(newTimer);
  }, [getInputCity]);

  useEffect(() => {
    containerRef.current.style.backgroundImage = `url(${getImage})`
  }, [getImage])

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
        setImage("https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?cs=srgb&dl=pexels-eberhardgross-1367192.jpg&fm=jpg");
      } else if (
        text.toLowerCase() === "sunny" ||
        !text ||
        text.toLowerCase() === "clear"
      ) {
        setImage("https://wallpapers.com/images/hd/4k-beach-sunny-day-rw0tzo78l49ateln.jpg");
      } else if (
        text.toLowerCase() === "light rain" ||
        text.toLowerCase() === "moderate or heavy snow showers" ||
        text.toLowerCase() === "patchy light drizzle" ||
        text.toLowerCase() === "light rain shower"
      ) {
        setImage("https://wallpapers.com/images/hd/rain-4k-711bzlpbn4jhn54x.jpg");
      } else if (
        text.toLowerCase() === "partly cloudy" ||
        text.toLowerCase() === "cloudy"
      ) {
        setImage("https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?cs=srgb&dl=pexels-eberhardgross-1367192.jpg&fm=jpg");
      }else if(text.toLowerCase() === "heavy snow" ||
      text.toLowerCase() === "snowy"){
        setImage("https://wallpapercave.com/wp/wp7863075.jpg");
      }
       else {
        setImage("https://wallpapercave.com/wp/wp11743464.jpg");
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
      setImage("https://wallpapers.com/images/hd/4k-beach-sunny-day-rw0tzo78l49ateln.jpg");
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
    <div className="container" ref={containerRef} style={{backgroundImage: "url('https://wallpapers.com/images/hd/4k-beach-sunny-day-rw0tzo78l49ateln.jpg')", backgroundPosition: "100%" , backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>

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
