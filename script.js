const form = document.querySelector('.weather-form');
const input = document.querySelector('.input-text');
const keyAPI = 'fca6a4420a552d119329db21023087dc';
let previousName;

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = input.value;
    input.value = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${keyAPI}&units=metric`;

    fetch(url)
        .then(data => data.json())
        .then(data => {

            const { main, name, sys, weather } = data;

            if (name !== previousName) {

                // Removing previous card if there is one
                weatherCard = document.querySelector('.weather-card');
                if(weatherCard !== null) weatherCard.remove();
               
                const mainContent = document.querySelector('.main-content');
                const card = document.createElement('div');
                card.classList.add('weather-card');
                const icon = `http://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;

                // Creating 00:00 format and adding zero if needed e.g. 15:7 to 15:07
                const sunriseDate = new Date(sys.sunrise * 1000);
                const sunriseHour = addZeroIfNeeded(sunriseDate.getHours().toString());
                const sunriseMinutes = addZeroIfNeeded(sunriseDate.getMinutes().toString());
                const sunriseTime = `${sunriseHour}:${sunriseMinutes}`;

                const sunsetDate = new Date(sys.sunset * 1000);
                const sunsetHour = addZeroIfNeeded(sunsetDate.getHours().toString());
                const sunsetMinutes = addZeroIfNeeded(sunsetDate.getMinutes().toString());
                const sunsetTime = `${sunsetHour}:${sunsetMinutes}`;

                const weatherDescription = firstLetterToUppercase(weather[0]['description']);

                const cardContent = `
                <h2 class="city-name">
                <span class="city-heading-main">${name}</span>
                <span class="city-heading-sub">${weatherDescription}</span>
                <span class="weather-icon"><img src=${icon} alt="Weather icon"></span>
                </h2>
                <div class="city-temp-container">
                    <span class="city-temp">${Math.round(main.temp)}<sup>°</sup></span>
                </div>
                <div class="weather-info">
                    <div class="weather-info-col">
                        <div class="weather-info-col">
                            <span class="weather-info-title">Humidity</span>
                            <span class="weather-info-content border-bottom">${main.humidity}%</span>
                        </div>
                        <div class="weather-info-col">
                            <span class="weather-info-title">Pressure</span>
                            <span class="weather-info-content">${main.pressure}mb</span>
                        </div>
                    </div>
                    <div class="weather-info-col">
                        <div class="weather-info-col">
                            <span class="weather-info-title">Sunrise</span>
                            <span class="weather-info-content border-bottom">${sunriseTime}</span>
                        </div>
                        <div class="weather-info-col">
                            <span class="weather-info-title">Sunset</span>
                            <span class="weather-info-content">${sunsetTime}</span>
                        </div>
                    </div>
                </div>
            `;

            card.innerHTML = cardContent;
            mainContent.append(card);
            previousName = name;

            } 
        });
});


//  Getting the weather by user location

const gps = document.querySelector('.icon-gps');

gps.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            const latitude = position.coords.latitude.toFixed(5);
            const longitude = position.coords.longitude.toFixed(5);
            const accuracy = position.coords.accuracy.toFixed(1);

            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyAPI}&units=metric`;

            fetch(geoUrl)
                .then(data => data.json())
                .then(data => getDataAndDisplay(data));

            }, error, optionsGeo);
        } else {
        alert("Your browser does not support this option");
    }
});






// Functions

function addZeroIfNeeded(time) {
    if (time.length === 1) {
        return `0${time}`;
    } else {
        return time;
    }
}

function firstLetterToUppercase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function getDataAndDisplay(data) {

            const { main, name, sys, weather } = data;

            if (name !== previousName) {

                // Removing previous card if there is one
                weatherCard = document.querySelector('.weather-card');
                if(weatherCard !== null) weatherCard.remove();
               
                const mainContent = document.querySelector('.main-content');
                const card = document.createElement('div');
                card.classList.add('weather-card');
                const icon = `http://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;

                // Creating 00:00 format and adding zero if needed e.g. 15:7 to 15:07
                const sunriseDate = new Date(sys.sunrise * 1000);
                const sunriseHour = addZeroIfNeeded(sunriseDate.getHours().toString());
                const sunriseMinutes = addZeroIfNeeded(sunriseDate.getMinutes().toString());
                const sunriseTime = `${sunriseHour}:${sunriseMinutes}`;

                const sunsetDate = new Date(sys.sunset * 1000);
                const sunsetHour = addZeroIfNeeded(sunsetDate.getHours().toString());
                const sunsetMinutes = addZeroIfNeeded(sunsetDate.getMinutes().toString());
                const sunsetTime = `${sunsetHour}:${sunsetMinutes}`;

                const weatherDescription = firstLetterToUppercase(weather[0]['description']);

                const cardContent = `
                <h2 class="city-name">
                <span class="city-heading-main">${name}</span>
                <span class="city-heading-sub">${weatherDescription}</span>
                <span class="weather-icon"><img src=${icon} alt="Weather icon"></span>
                </h2>
                <div class="city-temp-container">
                    <span class="city-temp">${Math.round(main.temp)}<sup>°</sup></span>
                </div>
                <div class="weather-info">
                    <div class="weather-info-col">
                        <div class="weather-info-col">
                            <span class="weather-info-title">Humidity</span>
                            <span class="weather-info-content border-bottom">${main.humidity}%</span>
                        </div>
                        <div class="weather-info-col">
                            <span class="weather-info-title">Pressure</span>
                            <span class="weather-info-content">${main.pressure}mb</span>
                        </div>
                    </div>
                    <div class="weather-info-col">
                        <div class="weather-info-col">
                            <span class="weather-info-title">Sunrise</span>
                            <span class="weather-info-content border-bottom">${sunriseTime}</span>
                        </div>
                        <div class="weather-info-col">
                            <span class="weather-info-title">Sunset</span>
                            <span class="weather-info-content">${sunsetTime}</span>
                        </div>
                    </div>
                </div>
            `;

            card.innerHTML = cardContent;
            mainContent.append(card);
            previousName = name;

            } 
}

function error() {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

const optionsGeo = {
    enableHighAccuracy: true,
    timeout: 5000
}
