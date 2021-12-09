// function that makes a request to the weather API and returns the response
// it also handles possible errors
const fetchDataFromAPI = async (city, metricUnits) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metricUnits ? `metric` : `imperial`}&appid=a0c5f9206a8c535897e2b0386b6a580d`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// function that returns an object that only contains 
// data that is going to be displayed on the screen
const parseWeatherData = data => {
    const parsedData =  {
        name: data['name'],
        country: data['sys']['country'],
        desc: data['weather'][0]['description'],
        temp: Math.floor(data['main']['temp']),
        feelsLike: data['main']['feels_like'],
        windSpeed: data['wind']['speed'],
        humidity: data['main']['humidity']
    }
    return parsedData;
}

// function that transforms the server response
// into the data that we need
const getWeatherData = async (city, metricUnits) => {
    const response = await fetchDataFromAPI(city, metricUnits);
    try {
        const data = await response.json();
        const parsedData = parseWeatherData(data);
        return parsedData;
    } catch (error) {
        console.log(error);
    }
}

export default getWeatherData;