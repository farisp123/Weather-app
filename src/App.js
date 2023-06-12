import React, { useState } from 'react';
import { WiThermometer, WiHumidity } from 'react-icons/wi';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'API_KEY ';// Place your API key here

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h2 className="title">Weather App</h2>
      <input
        type="text"
        placeholder="Enter a city name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <p>Sorry, data unavailable!</p>
      ) : weatherData ? (
        <div className="weather-info">
      <h2>{weatherData.name}</h2>
      <p className='temp-text'>
        <WiThermometer className="weather-icon1" />
       <span className='temp-data'> Temperature: {weatherData.main.temp} °C </span>
      </p>
      <p>
        <WiHumidity className="weather-icon2" />
        Humidity: {weatherData.main.humidity}%
      </p>
      <p>Description: {weatherData.weather[0].description}</p>
      <br />
      <p>
      <b>
          Developed by{" "}
          <a href="https://www.linkedin.com/in/muhammed-faris-pallipath-753259242/?originalSubdomain=in">
          Trendstube.in
        </a>
        </b>
        </p>
    </div>
      ) : null}
    </div>
  );
};

export default Weather;
