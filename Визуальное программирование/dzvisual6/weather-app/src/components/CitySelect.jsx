import { useState } from 'react';
import '../assets/CitySelect.css'

function CitySelect({onCitySelect}) {
    const [inputCity, setInputCity] = useState('');

    // Функция для обработки отправки формы
    const handleSubmit = (e) => {
        e.preventDefault(); //чтобы не перезагружалась страница

        if (inputCity.trim()) {
            onCitySelect(inputCity); //передаем в родительский компонент
            setInputCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='city-selector'>
            <input
                type="text"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder='Введите город'
            />
            <button type='submit'>Показать погоду</button>
        </form>
    );
}

export default CitySelect;