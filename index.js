const express = require('express');
const app = express();
require('dotenv').config();
const hbs = require('express-handlebars');
const path = require('path');
const getWeather = require('./lib/openweathermap');

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));
app.set('view engine', '.hbs');

app.get('/', async (req, res) => {
	const data = await getWeather();
	// let temp = data.main.temp;
	// let name = data.name;

	let weatherInfo = {
		"Name": data.name,
		"Country": data.sys.country,
		"Description": data.weather[0].description,
		"Temp (K)": data.main.temp,
		"Feels like": data.main.feels_like
	}

	res.render('index', { weatherInfo });
});

app.listen(3000, () => {
	console.log('listening on port 3000...');
});