const fetch = require('node-fetch');
// const fs = require('fs');

const url = `https://api.openweathermap.org/data/2.5/weather?q=Manchester,uk&appid=${process.env.APIID}`;

const getWeather = async () => {
	let data = await fetch(url);
	let jsonData = await data.json();
	// fs.writeFileSync('data.json', JSON.stringify(jsonData));

	return jsonData;
}

module.exports = getWeather;