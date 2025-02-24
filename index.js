const weatherApiKey = '8735e646fb0bdd01020f2b7ede4936a8';


const weatherDataElement = document.getElementById("weather-data")

const inputCityElement = document.getElementById("city-name")

const formElement = document.querySelector("form")



formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = inputCityElement.value;
    getWeatherData(cityValue);
})



async function getWeatherData(cityValue) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherApiKey}`)



        if (!response.ok) {
            throw new Error("Network Response wasn't okay");

        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity} %`,
            `Wind Speed : ${data.wind.speed} m/s`
        ]

        weatherDataElement.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" , alt="Weather Icon">`,

            weatherDataElement.querySelector('.temperature').textContent = `${temperature}°C`,
            weatherDataElement.querySelector('.description').textContent = description,
            weatherDataElement.querySelector('.details').innerHTML = details.map((detail) =>
                `
             <div>${detail}</div>
            `).join('')
    } catch (error) {
        weatherDataElement.querySelector('.icon').innerHTML = '',
            weatherDataElement.querySelector('.temperature').textContent = '',
            weatherDataElement.querySelector('.description').textContent = 'Something went wrong. Please try again later.',
            weatherDataElement.querySelector('.details').innerHTML = ''

    }

}