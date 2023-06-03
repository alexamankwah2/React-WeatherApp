import React, { useState } from "react";
import axios from "axios";
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { FaRegGrinBeam, FaWind } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineCompress } from "react-icons/md";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [units] = useState("imperial");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {data.main.temp.toFixed()}°{units === "metric" ? "C" : "F"}
              </h1>
            ) : null}
            <div className="icon">
            {data.weather ? (
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="weathericon"
              />
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          </div>
          <div className="mid">
          
          
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="min">
              <HiArrowSmDown />
              <p>min</p>
              {data.main ? (
                <p className="bold">
                  {data.main.temp_min.toFixed()}°
                  {units === "metric" ? "C" : "F"}
                </p>
              ) : null}
            </div>

            <div className="max">
              <HiArrowSmUp />
              <p>max</p>
              {data.main ? (
                <p className="bold">
                  {data.main.temp_max.toFixed()}°
                  {units === "metric" ? "C" : "F"}
                </p>
              ) : null}
            </div>
            <div className="feels">
              <FaRegGrinBeam />
              <p>Feels Like</p>
              {data.main ? (
                <p className="bold">
                  {data.main.feels_like.toFixed()}°
                  {units === "metric" ? "C" : "F"}
                </p>
              ) : null}
            </div>
            <div className="humidity">
              <IoWaterOutline />
              <p>Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <FaWind />
              <p>Wind Speed</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/h</p>
              ) : null}
            </div>
            <div className="pressure">
              <MdOutlineCompress />
              <p>Pressure</p>
              {data.main ? (
                <p className="bold">{data.main.pressure.toFixed()} m/h</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
