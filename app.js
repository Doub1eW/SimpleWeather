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
      //timedCityName.textContent = city;
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
      //timedCityName.textContent = data[0].name;
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

// getWeekDay();

function getWeather(lat, lon) {
  document.querySelector(".right-upper-span").textContent = "°C";
  document.querySelector(".right-lower-span").textContent = "°C";
  document.querySelector(".feels-like-text").textContent = "Feels like";
  document.querySelector(".weather-icon").style.display = "block";
  //document.querySelector(".arrow").style.display = "block";

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

      // document.querySelector(".currentTime").textContent =
      //   new Date().toLocaleTimeString([], {
      //     hour12: false,
      //     hour: "2-digit",
      //     minute: "2-digit",
      //   });

      for (let i = 1; i < 6; i++) {
        document.querySelector(`.day-${i}`).textContent = getDay(
          data.daily[i].dt
        );

        document.querySelector(`.day-${i}-temp`).textContent = Math.round(
          data.daily[i].temp.day
        );

        document.querySelector(`.day-${i}-feels`).textContent = Math.round(
          data.daily[i].feels_like.day
        );

        document.querySelector(
          `.day-${i}-img`
        ).src = `/assets/${data.daily[i].weather[0].main}.png`;
      }
    });
}

// Weather type: Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds

// Weather type (athmosphere): Mist, Smoke, Haze, Dust, Fog, Sand, Dust, Ash,
// Squall, Tornado
