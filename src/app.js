function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[dayIndex];

    return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let h3 = document.querySelector("small");
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
    hour = "0${hour}";
}
let mins = now.getMinutes();
if (mins < 10) {
    mins = "0" + mins;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = "December " + date + ", 2020 " + hour + ":" + mins;


function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#precipitation").innerHTML = ("0in");
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
        response.data.weather[0].main;

    document.querySelector("#icon").setAttribute("src", "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png");
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

    celiusTemp = response.data.main.temp;
}



function searchCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);


}


function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}



let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


let searchForm = document.querySelector("#search-form");
let h1 = document.querySelector("h1");
h1.innerHTML = ("Orlando");
searchForm.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


function showFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemp = (celiusTemp * 9) / 5 + 32;
    document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp)
    celiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp)

function showCeliusTemp(event) {
    event.preventDefault();
    celiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    document.querySelector("#temperature").innerHTML = Math.round(celiusTemp);

}

let celiusLink = document.querySelector("#celius");
celiusLink.addEventListener("click", showCeliusTemp)




searchCity("Orlando");