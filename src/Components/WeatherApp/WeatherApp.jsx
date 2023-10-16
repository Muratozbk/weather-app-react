import React, { useEffect, useState } from 'react'
import './WeatherAppStyles.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';


const WeatherApp = () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [cityInput, setCityInput] = useState('London');
    const [wicon, setWicon] = useState(cloud_icon);
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: ""
    });


    const fetchData = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            const iconMapping = {
                "01d": clear_icon,
                "01n": clear_icon,
                '02d': cloud_icon,
                '02n': cloud_icon,
                '03d': drizzle_icon,
                '03n': drizzle_icon,
                '04d': drizzle_icon,
                '04n': drizzle_icon,
                '09d': rain_icon,
                '09n': rain_icon,
                '10d': rain_icon,
                '10n': rain_icon,
                '13d': snow_icon,
                '13n': snow_icon
            }

            setWeatherData({
                humidity: `${data.main.humidity} %`,
                windSpeed: `${Math.round(data.wind.speed)} km/h`,
                temperature: `${Math.round(data.main.temp)}°c`,
                location: data.name
            })


            setWicon(iconMapping[data.weather[0].icon] || clear_icon)

        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        fetchData(cityInput);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchData(cityInput);
        }
    };



    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={handleKeyDown} placeholder='Search' />

                <div className="search-icon"
                    onClick={() => fetchData(cityInput)}>
                    <img src={search_icon} alt="search-icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="cloud-icon" />
            </div>
            <div className="weather-temp"> {weatherData.temperature} </div>
            <div className="weather-location">{weatherData.location} </div>

            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity} </div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed} </div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp
