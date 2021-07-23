/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/http-provider-geolocation.js
//HTML
const addressInput = document.getElementById("_address");

//API
const httpProviderGeo = (_key, _address) => `https://api.positionstack.com/v1/forward?access_key=${_key}&query=${_address}`;
const key = "e46e9538d21fabc02428d984b22e001d";

const geoAPI = async() =>{
    try {
        const resp = await fetch(httpProviderGeo(key, addressInput.value));
        if(!resp.ok) throw "Conection error";
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
;// CONCATENATED MODULE: ./src/js/http-provider-weather.js
//API
const httpProviderWeather = (_lat, _lon, _key) => `http://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lon}&units=metric&appid=${_key}`;
const http_provider_weather_key = "5e757d555cc3e81f63679d94dd05e5f6";

const weatherAPI = async(_lat, _lon) => {
    try {
        const resp = await fetch(httpProviderWeather(_lat, _lon, http_provider_weather_key));
        if (!resp.ok) throw "Conection Error";
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
;// CONCATENATED MODULE: ./src/js/unixTimeConverter.js
const unixToTime = (_time) =>{
    let a = new Date(_time*1000);
    let date = a.getDate();
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month = months[a.getMonth()];
    let year = a.getFullYear();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let parseMin = (min<10) ? `0${min}` : min;
    let parseSec = (sec<10) ? `0${sec}` : sec;
    let time = `${date}/${month}/${year} at ${hour}:${parseMin}:${parseSec}`;
    return time;
}
;// CONCATENATED MODULE: ./src/js/degreeToDirection.js
const degToDir = (_degree) => {
    _degree = parseFloat(_degree);
    if(_degree < 337.5 && _degree > 292.5){
        return "South-East";
    } else if (_degree < 292.5 && _degree > 265){
        return "South";
    } else if(_degree < 265 && _degree > 247.5){
        return "South-West";
    } else if(_degree < 247.5 && _degree > 202.5){
        return "West";
    } else if(_degree < 202.5 && _degree > 112.5){
        return "North-West";
    } else if(_degree < 112.5 && _degree > 67.5){
        return "North";
    }else if(_degree < 67.5 && _degree > 22.5){
        return "North-East"
    } else {
        return "East";
    }
}
;// CONCATENATED MODULE: ./src/index.js
//Importar el CSS


//HTML
const searchBtn = document.getElementById("_search");
const hourlyDiv = document.getElementById("_hourly");
const dailyDiv = document.getElementById("_daily");

//Importar funciones y variables que necesitamos para que funcione la aplicación
 




//Variables
let typingTimer;               
let doneTypingInterval = 500;  //time in ms
let latitude = 0;
let longitude = 0;

//Llamadas

//Funciones
const doneTyping = () => {
    geoAPI().then(resp => {
        console.log(resp.data[0]);
        latitude = resp.data[0].latitude;
        longitude = resp.data[0].longitude;
        searchBtn.removeAttribute("hidden");
    })
    .catch(error => console.log(error));
}

//Eventos
//Al dejar de teclear, empieza la cuenta atrás para llamar a la función
addressInput.addEventListener('keyup', () => {
    searchBtn.setAttribute("hidden", true);
    clearTimeout(typingTimer);
    if (addressInput.value && addressInput.value.includes(",")) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    } else {
        searchBtn.setAttribute("hidden", true);
    }
});

searchBtn.addEventListener("click", () => {
    weatherAPI(latitude, longitude).then(resp =>{
        hourlyDiv.innerHTML = `<p class="font-weight-bold mt-2">Hourly</p>`;
        dailyDiv.innerHTML = `<p class="font-weight-bold mt-2">Daily</p>`;
        resp.hourly.forEach(el =>{
            hourlyDiv.innerHTML += `<div class = "border back-white my-1">
                <p>${unixToTime(el.dt)}</p>
                <p>${el.weather[0].description.charAt(0).toUpperCase()+el.weather[0].description.slice(1)} - ${el.temp}&deg;</p>
                <div class="row">
                    <div class="col">
                        <p><span class="font-weight-bold">Wind direction</span>: ${degToDir(el.wind_deg)}</p>
                    </div>
                    <div class="col">
                        <p><span class="font-weight-bold">Wind speed</span>: ${el.wind_speed}m/s</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p><span class="font-weight-bold">Cloudiness</span>: ${el.clouds}% </p>
                    </div>
                    <div class="col">
                        <p><span class="font-weight-bold">Humidity</span>: ${el.humidity}%</p>
                    </div>
                </div>
            </div>`
        });
        resp.daily.forEach(el => {
            dailyDiv.innerHTML += `<div class = "border back-light my-1">
            <p>${unixToTime(el.dt)}</p>
            <p>${el.weather[0].description.charAt(0).toUpperCase()+el.weather[0].description.slice(1)}</p>
            <div class="row">
                <div class="col">
                    <p><span class="font-weight-bold">Min. Temp </span>: ${el.temp.min}&deg;</p>
                </div>
                <div class="col">
                    <p><span class="font-weight-bold">Max. Temp</span>: ${el.temp.max}&deg;</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p><span class="font-weight-bold">Wind direction</span>: ${degToDir(el.wind_deg)}</p>
                </div>
                <div class="col">
                    <p><span class="font-weight-bold">Wind speed</span>: ${el.wind_speed}m/s</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p><span class="font-weight-bold">Cloudiness</span>: ${el.clouds}% </p>
                </div>
                <div class="col">
                    <p><span class="font-weight-bold">Humidity</span>: ${el.humidity}%</p>
                </div>
            </div>
        </div>`
        })
    })
    .catch(error => console.log(error));
});
/******/ })()
;
//# sourceMappingURL=d7ce9fbb1bf969cd9d78.bundle.js.map