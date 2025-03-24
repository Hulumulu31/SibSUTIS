import WeatherCard from "./WeatherCard";
import '../assets/WeatherList.css';

function WeatherList({ forecast }) {
  // Группировка данных по дням
  const groupedByDay = forecast.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0]; // Получаем дату без времени
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const days = Object.entries(groupedByDay).slice(0, 6);

  return (
    <div className="weather-list">
      {days.map(([date, weatherData]) => (
        <WeatherCard key={date} date={date} weatherData={weatherData} />
      ))}
    </div>
  );
}

export default WeatherList;