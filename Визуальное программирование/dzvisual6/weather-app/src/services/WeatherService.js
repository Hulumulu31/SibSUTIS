const API_KEY = '677dd608e9f7d08febda7ab92ce75972';

async function getCoordinates(cityName) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`; //Cоздается URL для запроса
    
    try {
        const response = await fetch(url); //для выполнения http-запроса
    
        if (!response.ok) {
            throw new Error('ошибка получения координат');
        }

        const data = await response.json(); //ответ преобразуем 
        if (data.length === 0) {
            throw new Error('город не найден');
        }

        const { lat, lon } = data[0];
        return {lat, lon}; //широта и долгота
    } catch (error) {
        console.error('Ошибка в getCoordinates:', error.message);
        throw error;
    }
}

async function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('ошибка при получении прогноза погоды');
        }

        const data = await response.json();

        return data; 
    } catch (error) {
        console.error('ошибка в getWeather:', error.message);
        throw error;
    }
}

export {getCoordinates, getWeather};