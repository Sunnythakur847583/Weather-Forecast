const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "770784496fa98f30b3480e4ad2151ec1";
let citys = document.querySelector(".city");
let temp = document.querySelector('.temp');
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        citys.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + '°C';
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main.toLowerCase()) {
            case "clouds":
                weathericon.src = "img/clouds.png";
                break;
            case "clear":
                weathericon.src = "img/clear.png";
                break;
            case "rain":
                weathericon.src = "img/rain.png";
                break;
            case "drizzle":
                weathericon.src = "img/drizzle.png";
                break;
            case "mist":
                weathericon.src = "img/mist.png";
                break;
            default:
                // Default image if weather condition doesn't match any case
                weathericon.src = "img/unknown.png";
        }
        console.log(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        // You can handle the error here, e.g., display an error message to the user
    }
}

searchbtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    checkWeather(searchbox.value);
});
