import React, { useState } from "react";
import axios from "axios";
import "/src/css/Weather.css"; // Ensure the path is correct

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "6d9743d9ea1a030e073293341c92f4bb"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-12">Weather Forecast</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              value={city}
              onChange={handleInputChange}
            />
          </div>
          <div className="a1">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {weather && (
          <div className="card">
            <div className="card-body">
              <h3>{weather.name}</h3>
              <p>
                <strong>Temperature:</strong> {weather.main.temp}°C
              </p>
              <p>
                <strong>Weather:</strong> {weather.weather[0].description}
              </p>
              <p>
                <strong>Humidity:</strong> {weather.main.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weather.wind.speed} m/s
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
