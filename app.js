const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const wrapperCityName = document.querySelector(".wrapper-cityName");
const timedCityName = document.querySelector(".timed-cityName");
const bottomtitle = document.querySelector(".bottomtitle");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  convert(searchInput.value);
});

function getDay(dt) {
  return new Date(dt * 1000)
    .toLocaleString("en-us", { weekday: "long" })
    .slice(0, 3);
}

function convert(city) {
  const api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a44ac84a0376afc7ec22f54b1631dc2e`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      wrapperCityName.textContent = city;

      bottomtitle.textContent = "The Weather in " + city + " Today";

      getWeather(data[0].lat, data[0].lon);
    });
}

function convertCoordsCity(lat, lon) {
  const api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=a44ac84a0376afc7ec22f54b1631dc2e`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      wrapperCityName.textContent = data[0].name;

      bottomtitle.textContent = "The Weather in " + data[0].name + " Today";
    });
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      convertCoordsCity(position.coords.latitude, position.coords.longitude);
    },

    (error) => {
      console.log(error);
    }
  );
}
getCurrentLocation();

function converttime(data) {
  let unixsunrisetimestamp = data.current.sunrise;
  let unixsunsettimestamp = data.current.sunset;

  var datesunset = new Date(unixsunsettimestamp * 1000);

  var datesunrise = new Date(unixsunrisetimestamp * 1000);

  var sunsethours = datesunset.getHours();

  var sunrisehours = datesunrise.getHours();

  var sunsetminutes = datesunset.getMinutes();

  var sunriseminutes = datesunrise.getMinutes();

  var formattedsunrise = sunrisehours + ":" + sunriseminutes;

  var formattedsunset = sunsethours + ":" + sunsetminutes;
  console.log(formattedsunrise);
  console.log(formattedsunset);

  document.querySelector(".bottomboxrow4").textContent =
    "The sun rises at " + formattedsunrise + " and sets at " + formattedsunset;
}
function ifchilly(data) {
  let a = data.daily[0].temp.max;
  let b = data.daily[0].temp.min;
  if (a - b >= 10) {
    document.querySelector(".bottomboxrow5").textContent =
      "Temperature varies a bit today";
  } else {
    document.querySelector(".bottomboxrow5").textContent =
      "Temperature doesn't differ much today";
  }
}

function getWeather(lat, lon) {
  document.querySelector(".right-upper-span").textContent = "°C";
  document.querySelector(".right-lower-span").textContent = "°C";
  document.querySelector(".feels-like-text").textContent = "Feels like";
  document.querySelector(".weather-icon").style.display = "block";
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=a44ac84a0376afc7ec22f54b1631dc2e`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.querySelector(".current-temp").textContent = Math.round(
        data.current.temp
      );
      document.querySelector(".feels-like-temp").textContent = Math.round(
        data.current.feels_like
      );
      document.querySelector(
        ".weather-icon"
      ).src = `/assets/${data.daily[0].weather[0].main}.png`;
      document.querySelector(".bottomboxrow3").textContent =
        "The humidity is currently " + data.current.humidity + "%";

      document.querySelector(".bottomboxrow1").textContent =
        "Temperature ranges from " +
        Math.round(data.daily[0].temp.min) +
        " to " +
        Math.round(data.daily[0].temp.max) +
        "°";

      document.querySelector(".bottomboxrow2").textContent =
        "The wind blows at " + " " + data.current.wind_speed + " " + "M/s";
      for (let i = 1; i < 6; i++) {
        document.querySelector(`.day-${i}`).textContent = getDay(
          data.daily[i].dt
        );

        document.querySelector(`.day-${i}-temp`).textContent =
          Math.round(data.daily[i].temp.day) + "°";

        document.querySelector(`.day-${i}-feels`).textContent =
          "Feels like " + Math.round(data.daily[i].feels_like.day) + "°";

        document.querySelector(
          `.day-${i}-img`
        ).src = `/assets/${data.daily[i].weather[0].main}.png`;

        document.querySelector(`.day-${i}-description`).textContent =
          data.daily[i].weather[0].main;
      }
      converttime(data);
      ifchilly(data);
    });
}

// Weather type: Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds

// Weather type (athmosphere): Mist, Smoke, Haze, Dust, Fog, Sand, Dust, Ash,
// Squall, Tornado
