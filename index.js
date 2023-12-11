//New function that will receive response and will update weather data points for a particular city

//Elements
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

  //Replacing inside the UI

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;

  getForecast(response.data.city);
}

// Function to format day of the week

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//New function that will search the city.
//Make api call and update UI

function searchCity(city) {
  let apiKey = "ad7tba5a453o9ae4007ed34f61a4b5a8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

// Getting the city value and replacing it with the existing city on the page

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  //Call for API and search for the city we have
  searchCity(searchInput.value);
}

// Getting a correct day for the forecast elements

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// Creating API function for weather forecast

function getForecast(city) {
  let apiKey = "ad7tba5a453o9ae4007ed34f61a4b5a8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

// Building the forecast function (jss only)

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast">
<div class="row">
    <divn class="col-2">
        <div class="weather-forecast-date">
${formatDay(day.time)}
        </div>
        <img src="${day.condition.icon_url}" alt="condition" width="60"
        />
        <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature-max">${Math.round(
                    day.temperature.maximum
                  )}⁰C</div>  
                  <div class="weather-forecast-temperature-min">${Math.round(
                    day.temperature.minimum
                  )}⁰C</div>
            </div>
    </div>
</div>
</div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tokyo");
