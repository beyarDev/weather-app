import "./App.css";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiWindyLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import ReactLoading from "react-loading";

function App() {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});
  const [error, seterror] = useState(null);
  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((respone) => respone.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setweather(data);
          setquery("");
        },
        (error) => {
          setIsLoaded(true);
          seterror(error);
        }
      );
  }, []);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((respone) => respone.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setweather(data);
            setquery("");
          },
          (error) => {
            setIsLoaded(true);
            seterror(error);
          }
        );
    }
  };
  var appBackground =
    "url('https://www.weather2travel.com/images_content/sunshine-hours-where-and-when-is-it-sunniest.jpg')";
  if (typeof weather.main !== "undefined") {
    switch (weather.weather[0].main) {
      case "Clouds":
        appBackground =
          "url('https://images.unsplash.com/photo-1594156596782-656c93e4d504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5fGVufDB8fDB8fA%3D%3D&w=1000&q=80')";
        break;
      case "Rain":
        appBackground =
          "url('https://s7d2.scene7.com/is/image/TWCNews/heavy_rain_jpg')";
        break;
      case "Snow":
        appBackground =
          "url('https://st2.depositphotos.com/1363168/9872/i/950/depositphotos_98723840-stock-photo-winter-background-with-snowy-weather.jpg')";
      default:
    }
  }
  let dark = "white";
  if (weather.weather && weather.weather[0].main === "Snow") {
    dark = "#111";
  }

  if (error) {
    return <div>Error:{error.message}</div>;
  } else if (!isloaded) {
    return (
      <div className="loading">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#00E676"}
          height={100}
          width={100}
          className="loading"
        />
      </div>
    );
  } else
    return (
      <div className="app" style={{ color: `${dark}` }}>
        <div className="search-bar">
          <FaSearch className="icon search-icon" />
          <input
            type="text"
            onChange={(e) => setquery(e.target.value)}
            onKeyPress={(e) => search(e)}
            placeholder="Search.."
          />
          <HiOutlineLocationMarker className="icon location-icon" />
        </div>
        {weather.main && (
          <div className="container" style={{ background: `${appBackground}` }}>
            <h3>{weather.name}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            ></img>
            <h4>{new Date().toString().slice(0, 15)}</h4>
            <h1>{weather.main.temp}</h1>
            <h3>{weather.weather[0].main}</h3>
            <div className="details-container">
              <div className="details">
                <span>
                  <i>
                    <RiWindyLine />
                  </i>
                  Wind
                </span>
                <span>
                  <i>
                    <WiHumidity />
                  </i>
                  Hum
                </span>
              </div>
              <div className="details">
                <span>|</span>
                <span>|</span>
              </div>
              <div className="details">
                <span>{weather.wind.speed} Km/h</span>
                <span>{weather.main.humidity} %</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
export default App;
