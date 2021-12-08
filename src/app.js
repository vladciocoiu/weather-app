let metricUnits = true;
let cityName = 'Bucharest'

const myAPIKey = 'a0c5f9206a8c535897e2b0386b6a580d';

const fetchDataFromAPI = async (city, metricUnits) => {
    let response;
    try {
        response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metricUnits ? `metric` : `imperial`}&appid=${myAPIKey}`);
        return response;
    } catch (error) {
        console.log(error);
        displayError();
    }
}

const fetchWeatherData = async (city, metricUnits) => {
    let response = await fetchDataFromAPI(city, metricUnits);
    try {
        const data = await response.json();
        createHTMLElement(parseWeatherData(data));
    } catch (error) {
        console.log(error);
        displayError();
    }
}

const parseWeatherData = data => {
    const parsedData =  {
        name: data['name'],
        country: data['sys']['country'],
        desc: data['weather'][0]['description'],
        temp: data['main']['temp'],
        feelsLike: data['main']['feels_like'],
        windSpeed: data['wind']['speed'],
        humidity: data['main']['humidity']
    }
    return parsedData;
}

const displayError = () => {
    const weatherDataContainer = document.querySelector('.weather-data-container');
    weatherDataContainer.innerHTML = '';  

    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'City not found.';
    weatherDataContainer.appendChild(errorMsg);
}

const createHTMLElement = data => {
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

    const temp = document.createElement('p');
    temp.classList.add('temp');
    temp.textContent = `${data.temp} ${(metricUnits ? ' °C' : ' °F')}`;

    const feelsLike = document.createElement('p');
    feelsLike.classList.add('feels-like');
    feelsLike.textContent = `Feels like: ${data.feelsLike} °${(metricUnits ? 'C' : 'F')}`;

    const windSpeed = document.createElement('p');
    windSpeed.classList.add('wind-speed');
    windSpeed.textContent = `Wind speed: ${data.windSpeed} ${(metricUnits ? 'm/s' : 'mph')}`;

    const humidity = document.createElement('p');
    humidity.classList.add('humidity');
    humidity.textContent = `Humidity: ${data.humidity}%`;

    [temp, feelsLike, windSpeed, humidity].forEach(element => weatherDiv.appendChild(element));

    [locationDiv, descDiv, weatherDiv].forEach(element => {
        weatherDataContainer.appendChild(element)
    });
}

const addSubmitButtonFunctionality = () => {
    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const cityInput = document.querySelector('.city-input');
        cityName = cityInput.value;

        fetchWeatherData(cityName, metricUnits);
    })
}

const addUnitsToggleFunctionality = () => {
    const checkbox = document.querySelector('.units-toggle');
    checkbox.checked = true;

    document.querySelector('.units-toggle-text').addEventListener('click', () => {
        metricUnits = !checkbox.checked;
        fetchWeatherData(cityName, metricUnits);
    }); 
}

addSubmitButtonFunctionality();
addUnitsToggleFunctionality();
fetchWeatherData(cityName, metricUnits);

