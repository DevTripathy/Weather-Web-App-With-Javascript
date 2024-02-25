const API_KEY = '8bd69a80adaa1c21e7bd2893ca206171'


//---------FETCHING THE DATA FROM API---------//
async function fetchWeatherData (currentCity) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`);

        if(!response.ok) {
            throw new Error("Unable to fetch the weather data");
        }

        const data = await response.json();
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    }
    catch(error){
        console.error(error);
    }
}


//--------ACCESSING THE HTML ELEMENTS--------//
const cityEl = document.querySelector(".City");
const tempEl = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidityEl = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");

const formEl = document.querySelector(".search-form");
const inputEl = document.querySelector(".city-input");

const descriptionIcon = document.querySelector(".description-icon");


//-------UPDATING THE UI-------//
function updateWeatherUI(data) {
    cityEl.textContent = data.name
    tempEl.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} KM/H`;
    humidityEl.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility/1000} KM/H`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString(); 

    const weatherIconName = getWeatherIconName(data.weather[0].main)

    descriptionIcon.innerHTML = `<span class="material-symbols-outlined">${weatherIconName}</span>`;
}

formEl.addEventListener('submit', function(e){
    e.preventDefault();
    const currentCity = inputEl.value;

    if(currentCity !== '')
    {
        fetchWeatherData(currentCity);
        inputEl.value = ''
    }
})


//---------CHANGING THE WEATHER ICON ACCORDING TO THE WEATHER---------//
function getWeatherIconName(weatherCondition){
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "cloud",
        Rain: "rainy",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "mist",
        Smoke: "cloud",
        Maze: "cloud",
        Fog: "foggy",
        Haze: "dehaze"

    };
    return iconMap[weatherCondition] || "help";
}