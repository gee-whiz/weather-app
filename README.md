# Weather App

Simple vanilla JS weather lookup using the OpenWeather API and a tiny Node static server.

## Features
- Search by city for current weather
- Shows location, temperature (C), feels-like, humidity, and description
- Minimal glassy UI; works in modern browsers

## Setup
1. Install Node.js (14+ recommended).
2. Clone or download the project.
3. Set your OpenWeather API key in `main.js` (`apiKey`).
4. Install dependencies: `npm install` (none required; keeps lockfile accurate).

## Run
- Start server: `npm start`
- Open `http://localhost:3000`

## OpenWeather notes
- Uses the Current Weather endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Required params: `q` (city), `appid` (your key), `units=metric` for °C
- Free tier may have rate limits; handle 404/401 responses when key or city is invalid

## Self reflection
In this project I learned how to use AJAX to call an API, parse the JSON response, and render basic weather details in the browser.
