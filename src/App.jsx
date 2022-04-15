import { useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "./App.css";

function App() {
  const API_KEY = `403c1aab20c94b1492901c53bdc06312`;
  const API_ICON = "https://www.weatherbit.io/static/img/icons/";
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const url = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&city=${location}`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    }
  };

  const wind = (num) => {
    let num1 = num * 3.6;
    return num1.toFixed(1);
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <input
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
          />
        </div>

        {data.data ? (
          <div className="container">
            <section className="top">
              <div className="image">
                {
                  <img
                    src={`${API_ICON}${data.data[0].weather.icon}.png`}
                    alt={data.data[0].city_name}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />
                }
              </div>
              <div className="description">
                {<p>{data.data[0].weather.description}</p>}
              </div>
              <div className="temp">
                {
                  <p style={{ color: "#feec65" }}>
                    {data.data[0].temp.toFixed(0)}
                    <small>°C</small>
                  </p>
                }
              </div>
              <div className="location">
                {
                  <p>
                    {data.data[0].city_name}
                  </p>
                }
              </div>
              <div className="date">
                {
                  <p>
                    Today &#8226;{" "}
                    {dayjs(data.data[0].ob_time.substring(0, 10)).format(
                      "DD MMM YYYY"
                    )}
                  </p>
                }
              </div>
              <div className="contenedor-icono">
                <p>
                  <a href="#" className="texto-blanco">
                    <i className="far fa-arrow-alt-circle-down"></i>
                  </a>
                </p>
              </div>
            </section>
            <section className="bottom">
              <div className="today">
                <p>Today's Highlights </p>
              </div>
              <div className="feels">
                <p className="subtitle">Feels Like</p>
                {<p>{data.data[0].app_temp.toFixed(0)}°C</p>}
              </div>
              <div className="humidity">
                <p className="subtitle">Humidity</p>
                {
                  <progress
                    max={100}
                    value={parseInt(data.data[0].rh.toFixed())}
                  ></progress>
                }
                {<p>{data.data[0].rh.toFixed()}%</p>}
              </div>
              <div className="wind">
                <p className="subtitle">Wind Speed</p>
                {<p>{wind(data.data[0].wind_spd)} km/h</p>}
              </div>
              <div className="pressure">
                <p className="subtitle">Pressure</p>
                {<p>{data.data[0].pres} mb</p>}
              </div>
            </section>
          </div>
        ) : (
          <Layout />
        )}
      </div>
    </>
  );
}

export default App;
