import displayWeatherData from "./app.js";

// boolean that is true if metric units have to be displayed
let metricUnits = true;

// name of the currently displayed city
let cityName = 'Bucharest';

// function that displays the weather data on the screen
const displayWeatherComponent = data => {
    const weatherDataContainer = document.querySelector('.weather-data-container');
    weatherDataContainer.innerHTML = '';

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location-div');
    
    const location = document.createElement('p');
    location.classList.add('location');
    location.textContent = `${data.name}, ${data.country}`;
    locationDiv.appendChild(location);

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc-div');

    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.textContent = data.desc;
    descDiv.appendChild(desc);

    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather-div');

    const line = document.createElement('div');
    line.classList.add('line');

    const temp = document.createElement('p');
    temp.classList.add('temp');
    temp.innerHTML = `${data.temp}<sup>${(metricUnits ? ' °C' : ' °F')}</sup>`;

    const feelsLike = document.createElement('p');
    feelsLike.classList.add('feels-like');
    feelsLike.textContent = `Feels like: ${data.feelsLike} °${(metricUnits ? 'C' : 'F')}`;

    const windSpeed = document.createElement('p');
    windSpeed.classList.add('wind-speed');
    windSpeed.textContent = `Wind speed: ${data.windSpeed} ${(metricUnits ? 'm/s' : 'mph')}`;

    const humidity = document.createElement('p');
    humidity.classList.add('humidity');
    humidity.textContent = `Humidity: ${data.humidity}%`;

    [line, temp, feelsLike, windSpeed, humidity].forEach(element => weatherDiv.appendChild(element));

    [locationDiv, descDiv, weatherDiv].forEach(element => {
        weatherDataContainer.appendChild(element)
    });
}

// adds functionality to the submit search button 
const addSubmitButtonFunctionality = () => {
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const cityInput = document.querySelector('.city-input');
        cityName = cityInput.value;

        displayWeatherData(cityName, metricUnits);
    })
}

// adds functionality to the unit change button
const addUnitsToggleFunctionality = () => {
    const checkbox = document.querySelector('.units-toggle');
    checkbox.checked = true;

    document.querySelector('.units-toggle-text').addEventListener('click', () => {
        metricUnits = !checkbox.checked;
        displayWeatherData(cityName, metricUnits);
    }); 
}

// wrapper function for initialization of the buttons;
const initButtons = () => {
    addUnitsToggleFunctionality();
    addSubmitButtonFunctionality();
}

// function that displays an error message on the screen
const displayError = (str) => {
    const weatherDataContainer = document.querySelector('.weather-data-container');
    weatherDataContainer.innerHTML = '';  

    const errorMsg = document.createElement('p');
    errorMsg.textContent = str;
    weatherDataContainer.appendChild(errorMsg);
}

export  {displayError, displayWeatherComponent, initButtons, metricUnits, cityName};