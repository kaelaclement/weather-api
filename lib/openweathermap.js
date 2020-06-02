const fetch = require('node-fetch');
// const fs = require('fs');


const getWeather = async (city) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIID}`;
	let data = await fetch(url);
	let jsonData = await data.json();
	// fs.writeFileSync('data.json', JSON.stringify(jsonData));

	return jsonData;
}

module.exports = {
	getWeather
};