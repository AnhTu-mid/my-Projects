
const apiKey = 'e8f5612b9c218d9ac7074db98ed280e9';
const city = 'Ho Chi Minh'; // replace with your city
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const forecastList = data.list;
    // Sort the forecast list by the dt property (Unix timestamp)
    forecastList.sort((a, b) => a.dt - b.dt);
    const latestForecast = forecastList[0]; // Get the latest forecast data

    const date = latestForecast.dt_txt.split(' ')[0]
    const time = latestForecast.dt_txt.split(' ')[1]
    console.log(date)
    console.log(time)
  })
  .catch(error => console.error(error));