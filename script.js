const YOUR_API_KEY = '92678efb0ed448d291755159230911';
const searchButtons = document.querySelectorAll('.search-button');

searchButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = event.target.previousSibling.previousSibling.value;
        weatherApi(inputValue);
    })
})


async function weatherApi(place) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${YOUR_API_KEY}&q=${place}&aqi=No`);
        let result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
