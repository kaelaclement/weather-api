const express = require('express');
const app = express();
require('dotenv').config();
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const weatherAPI = require('./lib/openweathermap');
const getWeather = weatherAPI.getWeather;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
	// const data = await getWeather();
	// // let temp = data.main.temp;
	// // let name = data.name;

	// let weatherInfo = {
	// 	"Name": data.name,
	// 	"Country": data.sys.country,
	// 	"Description": data.weather[0].description,
	// 	"Temp (K)": data.main.temp,
	// 	"Feels like": data.main.feels_like
	// }

	// res.render('index', { weatherInfo });

	res.render('index');
});

app.post('/', async (req, res) => {
	const city = req.body.city;
	const units = req.body.units;
	const data = await getWeather(city, units);
	let weatherInfo = {
		"Name": data.name,
		"Country": data.sys.country,
		"Description": data.weather[0].description,
		"Temp": data.main.temp,
		"Feels like": data.main.feels_like
	}
	res.render('index', { weatherInfo });
});

app.listen(3000, () => {
	console.log('listening on port 3000...');
});