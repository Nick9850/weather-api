
var pEL = document.querySelector("#currentDate");
var currentDate = document.querySelector("#currentDate");
var currentCity = document.querySelector("#current-city");
var cityInput = document.querySelector(".form-control");
var iconContainer = document.querySelector("#icon-container");
var tempContainer = document.querySelector("#temp-container");
var humidContainer = document.querySelector("#humid-container");
var windContainer = document.querySelector("#wind-container");
var uviContainer = document.querySelector("#uvi-container");
var forecastGroupContainerEl = document.querySelector(
  "#forecast-group-container"
);
var cityArr = [];
var apiKey = "a77950eae898ecd8c88501ac3b12b6b6";


var currentDate = moment().format("MMM Do YY");
pEL.textContent = "Today's date " + currentDate;

document.getElementById("search-btn").addEventListener("click", function () {
  var cityInput = document.querySelector(".form-control").value;
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&units=imperial&appid=" +
    apiKey;
  

  
  fetch(queryUrl).then(function (response) {
    
    if (response.ok) {
      response.json().then(function (data) {

        

        var lon = data.coord.lon; 
        var lat = data.coord.lat;
       
        displayWeatherData(data);
        cityArr.push(cityInput);
        displayUVIData(lon,lat);

        localStorage.setItem("city", JSON.stringify(cityArr));
        
      });
    } else {
      alert("There was a problem");
    }
  });
});


var displayWeatherData = function (data) {
  currentCity.innerHTML = "<p>" + data.name + "</p>";

  
  iconContainer.innerHTML =
    "<img src='https://openweathermap.org/img/wn/" +
    data.weather[0].icon +
    ".png' >";
  

  
  tempContainer.innerHTML = "<p>" + "Temperature " + data.main.temp + "	&#8457" + "</p>";
  
  humidContainer.innerHTML = "<p>" + "Humidity " + data.main.humidity + " %" + "</p>";
  
  windContainer.innerHTML = "<p>" + "Wind Speed " + data.wind.speed + " mph" + "</p>";
  
};


var displayUVIData = function (lon,lat){


  var uviQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=28.53&lon=-81.37&appid=a77950eae898ecd8c88501ac3b12b6b6";
  
  
  fetch(uviQueryUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        
         uviContainer.innerHTML = "<p>" + "UVI "+ data.current.uvi + "</p>";
         if (data.current.uvi > 3) {
           uviContainer.className = "uvi-medium";
         } else if (data.current.uvi > 7){
          uviContainer.className = "uvi-high"
         } else {
          uviContainer.className = "uvi-low"
         }
      });
    }
  });
};


document.getElementById("search-btn").addEventListener("click", function () {
  var cityInput = document.getElementById("input-box").value;
  var searchedCities = document.createElement("button");
  searchedCities.textContent = cityInput;
  searchedCities.className = "city-button";
  document.getElementById("cities").append(searchedCities);
  document.querySelector(".city-button");

  for (let i=0; i < cityArr; i++){
    searchedCities.addEventListener("click", function () {
 console.log("button was clicked");
 })
  }
});




document.getElementById("search-btn").addEventListener("click", function () {
  forecastGroupContainerEl.replaceChildren();
  var cityInput = document.querySelector(".form-control").value;
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput +"&units=imperial&appid=" + apiKey;
  
  fetch(forecastURL).then(function (response) {
    
    if (response.ok) {
      response.json().then(function (data) {

        for (var i = 0; i < 5; i++) {

          var forecastContainerEl = document.createElement("div");
          forecastContainerEl.className = "forecast-container";
          forecastGroupContainerEl.append(forecastContainerEl);


          var forecastDateContainerEl = document.createElement("div");
          forecastDateContainerEl.className = "forecast-date-container";
          forecastDateContainerEl.textContent = "Date: " + data.list[i].dt_txt;
          forecastContainerEl.append(forecastDateContainerEl);
          var forecastCityContainerEl = document.createElement("div");
          forecastCityContainerEl.className = "forecast-city-container";
          forecastCityContainerEl.textContent = data.city.name;
          forecastContainerEl.append(forecastCityContainerEl);

          var forecastIconContainerEl = document.createElement("img");
          forecastIconContainerEl.className = "forecast-icon-container";
          forecastContainerEl.append(forecastIconContainerEl);

          var temperatureContainerEl = document.createElement("div");
          temperatureContainerEl.className = "temperature-container";
          temperatureContainerEl.textContent =
            "Temp: " + Number(data.list[i].main.temp) + "°";
          forecastContainerEl.append(temperatureContainerEl);

          var forecastHumidContainerEl = document.createElement("div");
          forecastHumidContainerEl.className = "forecast-humid-container";
          forecastHumidContainerEl.textContent =
            "Humidity: " + Number(data.list[i].main.humidity) + "%";
          forecastContainerEl.append(forecastHumidContainerEl);
          var forecastWindContainerEl = document.createElement("div");
          forecastWindContainerEl.className = "forecast-wind-container";
          forecastWindContainerEl.textContent =
            "Wind Speed: " + data.list[i].wind.speed + " MPH";
          forecastContainerEl.append(forecastWindContainerEl);
        }
      });
    }
  });
});

