import React, { useState, useCallback } from 'react';
import CitySelect from './components/CitySelect';
import { getCoordinates, getWeather } from './services/WeatherService';
import WeatherList from './components/WeatherList';
import mockData from './data/mockWeather.json';
import './assets/App.css';

const USE_MOCK_DATA = false;

function App() {
  const [city, setCity] = React.useState('Moscow');
  const [weather, setWeather] = React.useState(null);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState('Moscow');

  const fetchWeather = useCallback(async () => {
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        setWeather(mockData);
        setCityName('Moscow');
      } else {
        const {lat, lon} = await getCoordinates(city); // выполняются запросы к api
        const weatherData = await getWeather(lat, lon);
        setWeather(weatherData);
        setCityName(city);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [city]); // добавляем city в зависимости

  React.useEffect(() => { 
    fetchWeather();
  }, [city, fetchWeather]);  // добавляем fetchWeather в зависимости

  return (
    <div 
      className={`app ${
        weather ? getBackgroundClass(weather.list[0].weather[0].main) : ''
      }`}
    >
      <h1 className='title'>Прогноз погоды</h1>

      <div className="city-name">{cityName}</div>
      
      <CitySelect onCitySelect={(selectedCity) => {
        setCity(selectedCity);
        setCityName(selectedCity);
      }} />
      
      {error && <p className='error'>ошибка: {error}</p>}

      {weather && <WeatherList forecast={weather.list} />}
    </div>
  );
}

function getBackgroundClass(mainWeather) {
  switch (mainWeather.toLowerCase()) {
    case 'clear':
      return 'clear-bg'; // солнечно
    case 'clouds':
      return 'cloudy-bg'; // облачно
    case 'rain':
      return 'rainy-bg'; // дождь
    default:
      return '';
  }
}

export default App;
