//Importar el CSS
import "./css/style.css"

//HTML
const searchBtn = document.getElementById("_search");
const hourlyDiv = document.getElementById("_hourly");
const dailyDiv = document.getElementById("_daily");

//Importar funciones y variables que necesitamos para que funcione la aplicación
import { geoAPI, addressInput} from "./js/http-provider-geolocation"; 
import { weatherAPI } from "./js/http-provider-weather";
import { unixToTime } from "./js/unixTimeConverter";
import { degToDir } from "./js/degreeToDirection";

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