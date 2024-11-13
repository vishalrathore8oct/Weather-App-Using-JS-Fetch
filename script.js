const apiKey = '7fb05af4a281ceab75775e86b996b853';
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast-cards');
const errorMessage = document.getElementById('error-message');


cityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const cityName = cityInput.value.trim();

    if (cityName) {
        getWeatherData(cityName);
    }
});

async function getWeatherData(city) {
    try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        // console.log(currentWeatherUrl);
        
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        console.log(currentWeatherData);
        

        
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        console.log(forecastData);
        

        displayCurrentWeather(currentWeatherData);

        displayForecast(forecastData);
        
        errorMessage.style.display = 'none';
    } catch (error) {
        errorMessage.style.display = 'block';
        console.error('Error fetching data:', error);
    }
}

function displayCurrentWeather(data) {
    const cityName = data.name;
    const currentDate = new Date().toLocaleDateString();
    const temp = data.main.temp;
    const weatherDesc = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('city-name').textContent = `${cityName}, ${currentDate}`;
    document.getElementById('temp').textContent = temp;
    document.getElementById('weather-desc').textContent = weatherDesc;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind-speed').textContent = windSpeed;
    document.getElementById('weather-icon').src = icon;
    document.getElementById('weather-icon').style = 'border: 1px solid black; border-radius: 50%;'
}

function displayForecast(data) {
    forecastDiv.innerHTML = ''; 

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        const temp = forecast.main.temp;
        const weatherDesc = forecast.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <p>${date}</p>
            <img src="${icon}" alt="Weather icon">
            <p>${temp}°C</p>
            <p>${weatherDesc}</p>
        `;
        forecastDiv.appendChild(card);
    }
}
