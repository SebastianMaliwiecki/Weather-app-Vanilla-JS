const fetchLatLng = async location => {
    try {
        const locationPromise = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=2cd3601c75784a65870073e5211ffcc5`);
        const locationResult = await locationPromise.json();
        return  {
            lat: locationResult.results[0].geometry.lat,
            lng: locationResult.results[0].geometry.lng,
        }
    } 
    catch (error) {
        console.log(error);
    }
}

const fetchWeather = async (lat, lng) => {
    try {
        const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=7248eff058ba1f79c53e30c2ba0fac6e`);
        const weatherResult = await weatherPromise.json();
        return weatherResult;
    }
    catch (error) {
        console.log(error);
    }
}

const unixConverter = async (Utimestamp) => {
    try {
        const timePromise = await fetch(`https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=${Utimestamp}`);
        const timeResult = await timePromise.json();
        return timeResult;
    }
    catch(error) {
        console.log(error);
    }
}

const updateWeatherInfo = weatherInfo => {
    document.getElementById("temperature").innerHTML = `Current temperature is ${weatherInfo.current.temp}`;
    console.log("weather info updated.");
}

document.getElementById("getWeather").addEventListener("click", async () => {
    console.log("Button has been pressed");
    let location = document.getElementById("userInput").value;
    if(location ==="")   return
    console.log("now we fetch")
    // disables button
    document.getElementById("getWeather").disabled = true;
    document.getElementById("getWeather").innerHTML = "Loading ..."
    const coordinates = await fetchLatLng(location);
    console.log(coordinates);
    const weatherInfo = await fetchWeather(coordinates.lat, coordinates.lng);
    console.log(weatherInfo)
    updateWeatherInfo(weatherInfo); 
    // un-disables button
    document.getElementById("getWeather").disabled = false;
    document.getElementById("getWeather").innerHTML = "Get Weather!"
})