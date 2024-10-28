const fs = require("fs");

const weatherData = JSON.parse(fs.readFileSync(`${__dirname}/../data/weatherData.json`));

//show all Details
exports.getAllData = (req, res) => {
    res.status(200)
    res.json(
        {
            status: "Sucess",
            results: weatherData.length,
            data: {
                weatherInfo: weatherData
            }
        }
    )
}


//show rain details
exports.getRainDetails = (req, res) => {
    newWeatherData = weatherData.map(weatherData => ({ city: weatherData.name, Rain: weatherData.rain }))
    res.status(200)
    res.json({
        status: "Sucess",
        data: {
            Raindetails: newWeatherData
        }

    })
}

//add new City data
exports.addNewCityData = (req, res) => {
    weatherData.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/weatherData.json`, JSON.stringify(weatherData));
    res.status(201);
    res.send("Added sucessfully");
}

//remove a city 
exports.removeACity = (req, res) => {
    const city = req.params.city;
    console.log(city);
    const index = weatherData.findIndex(data => data.name.toLowerCase() == city.toLowerCase()) || -1;
    if (index == -1) {
        res.status(404)
        res.json({
            status: "City weather data not found"
        })
    }
    weatherData.splice(index, 1);
    fs.writeFileSync(`${__dirname}/../data/weatherData.json`, JSON.stringify(weatherData));
    res.status(202)
        .json({
            status: "deleted",
            msg: "suceesfull"
        })
}

//show details of specific city
exports.detailsOdSpecificCity = (req, res) => {
    const city = req.params.city;
    const cityData = weatherData.find(data => data.name.toLowerCase() === city.toLowerCase());
    if (cityData == null) {
        res.status(404);
        res.json({
            status: "city data not found"
        })
    }
    res.status(200)
        .json({
            status: "Weather data found",
            data: {
                cityData
            }
        })
}

//change rain details to no rain
exports.changeRainDetails = (req, res) => {
    const cityData = weatherData.find(data => data.name.toLowerCase() === req.params.city.toLowerCase());
    if(cityData == null){
        res.status(404);
        res.json({
            status: "city not found"
        })
    }
    weatherData.forEach(data => {
        if (data.name.toLowerCase() == req.params.city.toLowerCase()) {
            data.rain = "no rain";
        }
    });
    fs.writeFileSync(`${__dirname}/../data/weatherData.json`, JSON.stringify(weatherData));
    res.json({
        status: "changed successfully"
    })
}