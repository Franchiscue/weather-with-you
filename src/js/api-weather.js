//API
const httpProviderWeather = (_lat, _lon, _key) => `https://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lon}&units=metric&appid=${_key}`;
const key = "Pon tu clave";

export const weatherAPI = async(_lat, _lon) => {
    try {
        const resp = await fetch(httpProviderWeather(_lat, _lon, key));
        if (!resp.ok) throw "Conection Error";
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}