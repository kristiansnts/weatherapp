const YOUR_API_KEY = '92678efb0ed448d291755159230911';

async function weatherApi(place) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${YOUR_API_KEY}&q=${place}&aqi=No`);
        let result = await response.json();
        console.log(result.current);
    } catch (error) {
        console.error(error);
    }
}


weatherApi('Geneng');