const YOUR_API_KEY = '92678efb0ed448d291755159230911';
const searchButtons = document.querySelectorAll('.search-button');
const inputBar = document.querySelectorAll('.search-input');
const today = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","Aprill", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
const day = weekday[today.getDay()];
const month = months[today.getMonth()];
let card = '';

searchButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = event.target.previousSibling.previousSibling;
        weatherApi(inputValue.value);
        resetForm(inputValue);
    })
})

inputBar.forEach((input) => {
    input.addEventListener('keypress', (event) => {
        if(event.key == 'Enter'){
            event.preventDefault();
            const inputValue = event.target;
            weatherApi(inputValue.value);
            resetForm(inputValue);
        }
    })
})

function updateDate() {
    return `${day}, ${today.getDate()} ${month} ${today.getFullYear()}`
}

function updateTime() {
    return `${today.getUTCHours()}:${today.getMinutes()} `
}

function updateCardBackground(condition) {
    const card = document.querySelector('.card');
    card.style.backgroundImage = `url("https://source.unsplash.com/random/?${condition}")`;
}

function resetForm(input) {
    input.value = '';
}

function UI(data) {
    const cardWidget = document.querySelector('.result');
    card = `<div class="card">
                <h2 class="ml-auto mr-4 mt-3 mb-0 text-white">${data.location.name}</h2>
                <p class="ml-auto mr-4 mb-0 med-font text-white">${data.current.condition.text}</p>
                <h1 class="ml-auto mr-4 large-font text-white">${data.current.temp_c}°C</h1>
                <p class="time-font mb-0 ml-4 mt-auto text-white">${updateTime()} <span class="sm-font">AM</span></p>
                <p class="ml-4 mb-4 text-white">${updateDate()}</p>
            </div>`
    cardWidget.innerHTML = card;
    updateCardBackground(data.current.condition.text)
}

async function weatherApi(place) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${YOUR_API_KEY}&q=${place}&aqi=No`);
        let result = await response.json();
        UI(result);
    } catch (error) {
        console.error(error);
    }
}
