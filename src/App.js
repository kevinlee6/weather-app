import React, { Component } from 'react';
import axios from '../node_modules/axios';
import Title from './components/Title';
import Unit from './components/Unit';
import Select from './components/Select';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';

class App extends Component {
  state = {
    select: 'city',
    tempUnit: 'F',
    windUnit: 'm/s',
    city: undefined,
    country: undefined,
    temp: undefined,
    minTemp: undefined,
    maxTemp: undefined,
    humidity: undefined,
    windSpeed: undefined
  };

  toImperial = e => {
    e.preventDefault();

    const imperial = e.target,
          metric = document.getElementById('metric');

    imperial.classList.add('active');
    metric.classList.remove('active');

    const city = document.getElementById('city'),
          country = document.getElementById('country'),
          zip = document.getElementById('zip');
    if (!city.value && !country.value && !zip.value) return;

    document.getElementById('get-weather-btn').click();
  }

  toMetric = e => {
    e.preventDefault();

    const metric = e.target,
          imperial = document.getElementById('imperial');

    metric.classList.add('active');
    imperial.classList.remove('active');

    const city = document.getElementById('city'),
          country = document.getElementById('country'),
          zip = document.getElementById('zip');
    if (!city.value && !country.value && !zip.value) return;

    document.getElementById('get-weather-btn').click();
  }

  handleSelect = e => {
    e.preventDefault();
    const zip = document.getElementById('zip'),
          city = document.getElementById('city');

    this.setState({
      select: e.target.value
    });
    
    if (e.target.value === 'zip') {
      zip.classList.remove('hidden');
      city.classList.add('hidden');
      city.value = '';
    } else {
      zip.classList.add('hidden');
      city.classList.remove('hidden');
      zip.value = '';
    }
  }

  getWeather = e => {
    e.preventDefault();
    const API_KEY = '640ae4a3a93b1f787afedf64a06a972f',
          zip = e.target.zip.value,
          city = e.target.city.value,
          metric = document.getElementById('metric');

    let unit, tempUnit, windUnit;
    metric.classList.contains('active') ?
      [unit, tempUnit, windUnit] = ['metric', 'C', 'm/s'] :
      [unit, tempUnit, windUnit] = ['imperial', 'F', 'mph'];
    
    let url,
        country = e.target.country.value;
    if (country.length === 0 && zip.length) {
      country = 'us';
    } 

    if (this.state.select === 'city') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${unit}`;
    } else if (this.state.select === 'zip') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${zip},${country}&appid=${API_KEY}&units=${unit}`;
    }

    axios.get(url).then((response) => {
      const data = response.data,
            status = data.weather[0].main,
            body = document.body;
      // console.log(data);

      if (status === 'Clear') {
        body.style.background = "url('https://extras.mnginteractive.com/live/media/site47/2018/0427/20180427_060929_SunnyPublic.jpg')";
        body.style.backgroundSize = 'cover';
        body.style.color = 'white';
    } else if (status === 'Rain'){
        body.style.background = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRln6CxDtrOyWkUyU4lVsoSUvYQCdA3t8xdxb21vYZUyWG3NmFE8g')";
        body.style.backgroundSize = 'cover';
        body.style.color = 'white';
    } else if (status === 'Clouds') {
        body.style.background = "url('https://jooinn.com/images/cloudy-72.jpg')";
        body.style.backgroundSize = 'cover';
        body.style.color = 'white';
    } else if (status === 'Thunderstorm') {
        body.style.background = "url('https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/ca_0126NID_Thunderstorm_Melbourne_online.jpg?itok=yE71nMVM')";
        body.style.backgroundSize = 'cover';
        body.style.color = 'white';
    } else {
        body.style.background = 'none';
        body.style.color = 'black';
    }

      this.setState({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        tempUnit: tempUnit,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windUnit: windUnit
      });
    }).catch(error => {
      this.setState({
          tempUnit: undefined,
          windUnit: undefined,
          city: undefined,
          country: undefined,
          temp: undefined,
          minTemp: undefined,
          maxTemp: undefined,
          humidity: undefined,
          windSpeed: undefined
      });
      alert('That is not a valid city/country combination.');
    })
  }

  render() {
    return (
      <div id='content'>
        <header>
          <Title />
          <Unit
            toImperial={this.toImperial}
            toMetric={this.toMetric} />
        </header>
        <section id='selections'>
          <Select handleSelect={this.handleSelect} />
          <Form getWeather={this.getWeather} />
        </section>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp={this.state.temp}
          tempUnit={this.state.tempUnit}
          minTemp={this.state.minTemp}
          maxTemp={this.state.maxTemp}
          humidity={this.state.humidity}
          windSpeed={this.state.windSpeed}
          windUnit={this.state.windUnit} />
      </div>
    )
  }
}

export default App;