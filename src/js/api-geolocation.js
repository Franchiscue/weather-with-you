//HTML
export const addressInput = document.getElementById("_address");

//API
const httpProviderGeo = (_key, _address) => `http://api.positionstack.com/v1/forward?access_key=${_key}&query=${_address}`;
const key = "Tu clave";

export const geoAPI = async() =>{
    try {
        const resp = await fetch(httpProviderGeo(key, addressInput.value));
        if(!resp.ok) throw "Conection error";
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}