const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const wrapperCityName = document.querySelector(".wrapper-cityName");
const timedCityName = document.querySelector(".timed-cityName");
const bottomtitle = document.querySelector(".bottomtitle");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  convert(searchInput.value);
});

function convert(city) {
  const api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a44ac84a0376afc7ec22f54b1631dc2e`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      wrapperCityName.textContent = city;
      //timedCityName.textContent = city;
      bottomtitle.textContent = city;

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
      bottomtitle.textContent = data[0].name;
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

function getWeekDay() {
  new Date().toLocaleString("en-us", { weekday: "long" }).slice(0, 3);
  console.log(Date);
}

getWeekDay();

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
      document.querySelector(".timed-temp").textContent = Math.round(
        data.current.temp
      );
      document.querySelector(".currentTime").textContent =
        new Date().toLocaleTimeString([], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });
      document.querySelector(".mon-temp").textContent = Math.round(
        data.daily[0].temp.day
      );
      document.querySelector(".tue-temp").textContent = Math.round(
        data.daily[1].temp.day
      );
      document.querySelector(".wed-temp").textContent = Math.round(
        data.daily[2].temp.day
      );
      document.querySelector(".thu-temp").textContent = Math.round(
        data.daily[3].temp.day
      );
      document.querySelector(".fri-temp").textContent = Math.round(
        data.daily[4].temp.day
      );
    });
}
