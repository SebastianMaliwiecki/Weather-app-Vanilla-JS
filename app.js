const fetchLatLng = async (location) => {
    try {
        const locationPromise = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=2cd3601c75784a65870073e5211ffcc5`);
        const locationResult = await locationPromise.json();
        console.log(locationResult);
    } 
    catch (error) {
        console.log(error);
    }
}

document.getElementById("getWeather").addEventListener("click", () => {
    console.log("Button has been pressed");
    fetchLatLng("45645645");
})