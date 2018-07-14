import React from 'react';

const Form = props => (
    <form id='form' onSubmit={props.getWeather}>
        <input type='text' id='zip' class='hidden' name='zip' placeholder='Enter the zipcode here'/>

        <input type='text' id='city' name='city' placeholder='Enter the city here' />
        <input type='text' id='country' name='country' placeholder='Enter the country here' />
        <button id='get-weather-btn'>Enter</button>
    </form>
)

export default Form;