import '../assets/WeatherCard.css';

function WeatherCard({ date, weatherData }) {
  // Округление температуры
  const roundedTemp = (temp) => Math.round(temp);

  return (
    <div className="weather-card">
      <h3>{new Date(date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
      <div className="weather-details">
        {weatherData.map((item, index) => (
          <div key={index} className="weather-item">
            <p>{new Date(item.dt_txt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                <p>{roundedTemp(item.main.temp)}°C</p>
                <p>Ветер: {item.wind.speed} m/s</p>
                <p>Влажность: {item.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;