const weatherDetails = document.getElementById('weatherDetails');
const apiKey = '41e706d4032fcadd3155cc572e92f899';

document.getElementById('currentLocation').addEventListener('click', () => {
    if (!navigator.geolocation) {
        weatherDetails.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to fetch weather for your location');
                }
                return response.json();
            })
            .then(data => {
                weatherDetails.innerHTML = `
                    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                `;
            })
           
    });
});
