import React from 'react';

const Weather = props => (
    <div id='weather-container'>
        {props.city && props.country &&
            <div id='weather'>
                <div id='temp'>
                    <p id='curr'>{props.temp}°{props.tempUnit}</p>
                    <div id='lowhigh'>
                        <p>Low: {props.minTemp}°{props.tempUnit}</p>
                        <p>High: {props.maxTemp}°{props.tempUnit}</p>
                    </div>
                </div>
                <p>Location: {props.city}, {props.country}</p>

                <p>Humidity: {props.humidity}%</p>
                <p>Windspeed: {props.windSpeed} {props.windUnit}</p>
            </div>
        }
    </div>
)

export default Weather;