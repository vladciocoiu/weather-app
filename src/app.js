import "./style.css";

import getWeatherData from "./async.js";
import { displayWeatherComponent, displayError, initButtons, metricUnits, cityName } from "./DOM.js";

const displayWeatherData = async (cityName, metricUnits) => {
    try {
        const data = await getWeatherData(cityName, metricUnits);
        displayWeatherComponent(data);
    } catch (err) {
        console.log(err);
        displayError('City not found.');
    }
}

initButtons();
displayWeatherData(cityName, metricUnits);

export default displayWeatherData;

